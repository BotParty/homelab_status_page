import { chromium, type BrowserContext } from 'playwright';

async function connectToExistingBrowser() {
  // Connect to the existing Chrome instance
  const browserContext = await chromium.connectOverCDP('http://localhost:9222');
  return browserContext;
}

async function navigateToLinkedIn(context: BrowserContext) {
  // Create a new page in the existing browser context
  const page = await context.newPage();
  
  // Navigate to LinkedIn
  await page.goto('https://www.linkedin.com');
  
  // Basic wait to ensure page loads
  await page.waitForLoadState('networkidle');
  
  return page;
}

async function main() {
  try {
    const context = await connectToExistingBrowser();
    const page = await navigateToLinkedIn(context);
    
    // Your LinkedIn automation code here
    
    // Don't close the browser since we're using an existing instance
    // Just close the page when done
    await page.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();


//google-chrome --remote-debugging-port=9222


google-chrome \
--remote-debugging-port=9222 \
--user-data-dir=/tmp/chrome-profile \
--disable-web-security
