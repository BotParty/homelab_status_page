import { chromium } from '@playwright/test';
import fs from 'fs';

const data = `https://x.com/LayersKeyframes/status/1867899725472763980`;
console.log(data);
async function downloadTweetImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(data);
    // Wait for the image to load
    const imageElement = await page.waitForSelector('img[alt="Image"]');
    
    if (imageElement) {
      const imageUrl = await imageElement.getAttribute('src');
      if (imageUrl) {
        // Download the image
        const imageBuffer = await page.evaluate(async (url) => {
          const response = await fetch(url);
          const buffer = await response.arrayBuffer();
          return buffer;
        }, imageUrl);

        // Save the image
        fs.writeFileSync('downloaded_tweet_image.jpg', Buffer.from(imageBuffer));
        console.log('Image downloaded successfully!');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

// Run the function
downloadTweetImage();
