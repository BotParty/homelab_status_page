//https://hn.algolia.com/?q=playwright
import { chromium, BrowserContext } from '@playwright/test';
import { webkit } from '@playwright/test';

import * as fs from 'fs';

async function scrapeHackerNews() {
    try {
        // Connect to the existing browser instance
        // Note: You'll need to launch Chrome with remote debugging enabled
        // e.g., chrome.exe --remote-debugging-port=9222
        //const browser = await chromium.connectOverCDP('http://localhost:9222');
        const browser = await chromium.launch()
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to Hacker News
        await page.goto('https://news.ycombinator.com');

        // Get all links from the page
        const links = await page.evaluate(() => {
            const anchors = document.querySelectorAll('.titleline > a');
            return Array.from(anchors, a => ({
                title: a.textContent,
                url: a.href
            }));
        });

        // Read existing links if file exists
        let existingLinks = [];
        if (fs.existsSync('parsed_links.json')) {
            const fileContent = fs.readFileSync('parsed_links.json', 'utf-8');
            existingLinks = JSON.parse(fileContent);
        }

        // Combine existing and new links
        const allLinks = [...existingLinks, ...links];

        // Write to JSON file
        fs.writeFileSync('parsed_links.json', JSON.stringify(allLinks, null, 2));

        console.log(`Successfully scraped ${links.length} links`);
        await browser.close();
        return allLinks
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the scraper
//scrapeHackerNews();

export default scrapeHackerNews

if (import.meta.main) {
    scrapeHackerNews();
}
