#!/usr/bin/env bun

/* 
  crawl-dynamicland.ts

  This script uses:
   - Bun (JavaScript runtime)
   - Playwright for headless browsing
   - AWS S3 SDK for storing the crawled HTML

  Usage:
    1. bun install
    2. bun crawl-dynamicland.ts
*/

import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';
import path from 'path';

// ---------- CONFIGURE THESE VALUES -----------
const START_URL = 'https://dynamicland.org/';
const MAX_DEPTH = 10; // Safety limit so we don't inadvertently get stuck in an infinite crawl
// --------------------------------------------

// Add these configurations


const OUTPUT_DIR = './dynamicland-content';

/**
 * Clean up a URL into a valid S3 key (path).
 * E.g. "https://dynamicland.org/about" => "dynamicland.org/about.html"
 */
function makeS3KeyFromUrl(url: string): string {
  const withoutProtocol = url.replace(/^https?:\/\//, '');
  // Convert trailing slash pages to something more standard
  const sanitized = withoutProtocol.endsWith('/')
    ? withoutProtocol.slice(0, -1)
    : withoutProtocol;
  // For simplicity, ensure `.html` extension
  return sanitized + '.html';
}

/**
 * Sanitize filename to be safe for filesystem
 */
function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9.-]/gi, '_');
}

/**
 * Extract text content from the page
 */
async function extractPageContent(page) {
  const content = {
    url: page.url(),
    title: await page.title(),
    text: await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style');
      scripts.forEach(s => s.remove());
      return document.body.innerText;
    }),
    timestamp: new Date().toISOString()
  };
  return content;
}

/**
 * Save content locally
 */
async function saveLocally(url: string, content: any, type: 'json' | 'image') {
  const filename = sanitizeFilename(makeS3KeyFromUrl(url));
  const filepath = path.join(OUTPUT_DIR, type === 'json' ? 'json' : 'images', filename);
  
  try {
    await writeFile(
      filepath, 
      type === 'json' ? JSON.stringify(content, null, 2) : content
    );
    console.log(`Saved: ${filepath}`);
  } catch (err) {
    console.error(`ERROR saving ${url} locally:`, err);
  }
}

async function saveHtmlLocally(url: string, htmlContent: string) {
  const filename = makeS3KeyFromUrl(url);
  const filepath = path.join(OUTPUT_DIR, 'html', filename);
  
  try {
    await writeFile(filepath, htmlContent);
    console.log(`Saved HTML: ${filepath}`);
  } catch (err) {
    console.error(`ERROR saving HTML ${url} locally:`, err);
  }
}

async function main() {
  // Create output directories
  await Promise.all([
    writeFile(path.join(OUTPUT_DIR, 'images'), ''),
    writeFile(path.join(OUTPUT_DIR, 'json'), ''),
    writeFile(path.join(OUTPUT_DIR, 'html'), '')
  ]).catch(() => {}); // Ignore if directories exist

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // BFS or DFS
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [];

  // Start with homepage
  queue.push({ url: START_URL, depth: 0 });

  while (queue.length > 0) {
    const { url, depth } = queue.shift()!;

    // Check depth limit or if visited
    if (depth > MAX_DEPTH) {
      console.log(`Reached max depth (${MAX_DEPTH}) at: ${url}`);
      continue;
    }
    if (visited.has(url)) continue;
    visited.add(url);

    console.log(`Crawling [depth=${depth}]: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (err) {
      console.warn(`Could not load: ${url}`, err);
      continue;
    }

    // Grab page content
    let content: string;
    try {
      content = await page.content();
    } catch (err) {
      console.warn(`Could not get content: ${url}`, err);
      continue;
    }

    // Save HTML locally
    await saveHtmlLocally(url, content);

    // Extract and save text content
    const pageContent = await extractPageContent(page);
    await saveLocally(url, pageContent, 'json');

    // Download images
    try {
      const images = await page.$$eval('img', (imgs) =>
        imgs.map((img) => ({
          src: img.src,
          alt: img.alt
        })).filter(img => img.src)
      );

      for (const img of images) {
        if (!img.src) continue;
        
        try {
          const imageResponse = await page.goto(img.src);
          if (imageResponse) {
            const buffer = await imageResponse.body();
            const imageFilename = sanitizeFilename(new URL(img.src).pathname);
            await saveLocally(imageFilename, buffer, 'image');
          }
        } catch (err) {
          console.warn(`Could not download image: ${img.src}`, err);
        }
        
        // Return to the original page
        await page.goto(url);
      }
    } catch (err) {
      console.warn(`Could not extract images from: ${url}`, err);
    }

    // Extract links (only from the same domain to avoid external infinite crawl)
    try {
      const links = await page.$$eval('a', (anchors) =>
        anchors
          .map((a) => a.getAttribute('href'))
          .filter(Boolean)
      );

      for (const link of links) {
        if (!link) continue;

        // Normalize link (in case of relative links)
        const nextUrl = new URL(link, url).toString();

        // We only want to crawl dynamicland.org links
        if (!nextUrl.startsWith(START_URL)) continue;

        if (!visited.has(nextUrl)) {
          queue.push({ url: nextUrl, depth: depth + 1 });
        }
      }
    } catch (err) {
      console.warn(`Could not extract links from: ${url}`, err);
    }
  }

  await browser.close();
  console.log('Crawl complete!');
}

main().catch((err) => {
  console.error('Unexpected error in main:', err);
  process.exit(1);
});
