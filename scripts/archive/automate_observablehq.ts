const { chromium, firefox, webkit } = require("playwright");

async function connectToExistingBrowsers() {
  // Firefox
  // const firefoxBrowser = await firefox.connectOverCDP("http://localhost:9222");
  // const firefoxPage = await firefoxBrowser.newPage();
  // console.log("Connected to Firefox");

  // Chrome
  const chromeBrowser = await chromium.connectOverCDP("http://localhost:9222");
  const chromePage = await chromeBrowser.newPage();
  console.log("Connected to Chrome");

  // Safari Technology Preview
  // const safariTPBrowser = await webkit.connect("http://localhost:9222");
  // const safariTPPage = await safariTPBrowser.newPage();
  // console.log("Connected to Safari Technology Preview");

  return {
    //firefox: { browser: firefoxBrowser, page: firefoxPage },
    chrome: { browser: chromeBrowser, page: chromePage },
    //safariTP: { browser: safariTPBrowser, page: safariTPPage },
  };
}

// Example usage
async function main() {
  try {
    const browsers = await connectToExistingBrowsers();
    // Use the browser instances as needed

    // Remember to close connections when done
    //await browsers.firefox.browser.close();
    await browsers.chrome.browser.close();
    //await browsers.safariTP.browser.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

// const { firefox } = require('playwright');

// (async () => {
//   const browser = await firefox.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   // Interact with the page, capture errors, etc.
// })();
// // save as observable-collect-errors.js
// const { chromium } = require('playwright');
// const fs = require('fs');
// const fetch = require('node-fetch'); // For sending data to the server

// (async () => {
//   // Use a persistent context so we can store login cookies
//   const userDataDir = 'user-data';
//   const browser = await chromium.launchPersistentContext(userDataDir, {
//     headless: false, // Show browser on screen
//   });

//   const page = await browser.newPage();

//   // Capture console errors
//   const errors = [];
//   page.on('console', message => {
//     if (message.type() === 'error') {
//       errors.push({
//         text: message.text(),
//         location: message.location(),
//         timestamp: Date.now()
//       });
//     }
//   });

//   // Navigate to ObservableHQ
//   await page.goto('https://observablehq.com');
//   await page.waitForTimeout(5000);

//   // Check if logged in: If not, wait for user to log in manually.
//   // You can try to detect login by checking for a known element that only appears if logged in.
//   // For simplicity, we'll just wait some time for the user to complete login if needed.

//   // Example: Wait until a known logged-in selector appears
//   // (Selector may differ depending on Observable's current UI)
//   try {
//     await page.waitForSelector('nav a[title="Your Notebooks"]', { timeout: 60000 });
//     console.log("Logged in confirmed.");
//   } catch {
//     console.log("You might need to log in manually in the opened browser window.");
//     // Wait some more time for user to log in
//     await page.waitForTimeout(60000); // 1 minute for the user to log in
//   }

//   // Once logged in, navigate or do something that might produce errors (optional)
//   // For demonstration, we just wait a bit more to capture errors
//   await page.waitForTimeout(5000);

//   // Save errors to a JSON file
//   fs.writeFileSync('errors.json', JSON.stringify(errors, null, 2));
//   console.log("Errors saved to errors.json");

//   // Send the errors to a server endpoint
//   // Replace with your server endpoint
//   const response = await fetch('YOUR_SERVER_ENDPOINT', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ errors })
//   });

//   if (response.ok) {
//     console.log("Errors successfully sent to server.");
//   } else {
//     console.error("Failed to send errors to server:", response.status, response.statusText);
//   }

//   await browser.close();
// })();
