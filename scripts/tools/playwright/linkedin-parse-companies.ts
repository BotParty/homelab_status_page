import fs from 'fs';
import { firefox, type BrowserContext } from 'playwright';
import ollama from 'ollama';
<<<<<<< HEAD

// async function connectToExistingBrowser() {
//   // Launch Firefox in debugging mode (Firefox doesn't support CDP like Chrome)
//   const browserContext = await firefox.launch({
//     headless: false,
//     args: ['--remote-debugging-port=9222']
//   });
//   return browserContext;
// }

import { chromium } from 'playwright';
=======
>>>>>>> 068df34 (simplify)

async function connectToExistingBrowser() {
  // Connect to existing Chrome instance running with remote debugging
  const browserContext = await chromium.connectOverCDP('http://localhost:9222');
  const context = browserContext.contexts()[0]; // Get the default context
  return context;
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



interface EmployeeProfile {
  name: string;
  title: string;
  profileUrl: string;
  imageAnalysis?: string;
}

// ... existing browser connection code ...

async function analyzeProfileWithLlama(profileText: string) {
  const response = await ollama.chat({
    model: 'llama2:13b',
    messages: [{
      role: 'user',
      content: `Extract the following information from this LinkedIn profile text. Return JSON format only:
      - Full Name
      - Current Title
      ${profileText}`
    }]
  });
  return response.message.content;
}

async function analyzeProfileImageWithLlava(imageBuffer: Buffer) {
  const response = await ollama.chat({
    model: 'llava:13b',
    messages: [{
      role: 'user',
      content: 'Describe this person\'s professional appearance from their LinkedIn photo.'
    }],
    images: [imageBuffer.toString('base64')]
  });
  return response.message.content;
}

async function scrapeWaymoEmployees(page: Page) {
  // Navigate to Waymo company page
  await page.goto('https://www.linkedin.com/company/waymo/people/');
  await page.waitForLoadState('networkidle');

  const employees: EmployeeProfile[] = [];
  
  // Find and loop through employee profiles
  const profileCards = await page.$$('[data-test-id="employee-card"]');
  
  for (const card of profileCards) {
    try {
      const profileUrl = await card.$eval('a', (el) => el.href);
      await page.goto(profileUrl);
      await page.waitForLoadState('networkidle');

      // Get profile text content
      const profileText = await page.$eval('[data-test-id="profile-content"]', el => el.textContent);
      const profileData = await analyzeProfileWithLlama(profileText);

      // Get profile image
      const imageElement = await page.$('img.profile-photo');
      const imageBuffer = await imageElement?.screenshot();
      const imageAnalysis = imageBuffer ? await analyzeProfileImageWithLlava(imageBuffer) : undefined;

      employees.push({
        ...JSON.parse(profileData),
        profileUrl,
        imageAnalysis
      });

      // Save progress after each profile
      await fs.writeFile('waymo-employees.json', JSON.stringify(employees, null, 2));
      
    } catch (error) {
      console.error('Error processing profile:', error);
    }
  }
}

async function analyzeLoginPageWithLlama(html: string) {
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: [{
      role: 'user',
      content: `analyze this html string and then generate the playwright selectors and code to login and navigate to the next page.
      HTML: ${html}`
    }]
  });
  
  return response.message.content
}

async function loginToLinkedIn(page: Page) {
  // Wait for initial page load
  await page.waitForLoadState('networkidle');
  
  // Get page HTML and analyze with llama
  const html = await page.content();
  console.log('html', html)
  const selectors = await analyzeLoginPageWithLlama(html);
  console.log('selectors', selectors)
  // Click "Sign in with email" if present
  try {
    await page.click(selectors.emailSignInButton);
    await page.waitForTimeout(1000); // Small delay for transition
  } catch (e) {
    console.log('No email sign-in button found, proceeding with direct login');
  }

  // Fill in credentials
  await page.fill(selectors.emailInput, 'mail@adnanwahab.com');
  await page.fill(selectors.passwordInput, 'sicp.123');
  
  // Click submit and wait for navigation
  await page.click(selectors.submitButton);
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  
  // Verify login was successful
  const currentUrl = page.url();
  if (!currentUrl.includes('feed')) {
    throw new Error('Login appears to have failed');
  }
}

async function main() {
  try {
    const context = await connectToExistingBrowser();
    const page = await navigateToLinkedIn(context);
    
    // Add login step before proceeding
    await loginToLinkedIn(page);
    
<<<<<<< HEAD
    // Remove manual login wait since we now handle it programmatically
    // await page.waitForTimeout(5000);
    
    await scrapeWaymoEmployees(page);
    
    await page.screenshot({ path: 'screenshot.png' });
=======
    // Don't close the browser since we're using an existing instance
    // Just close the page when done
    //await page.close();
    await page.screenshot({ path: 'screenshot.png' });


>>>>>>> 068df34 (simplify)
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);


//google-chrome --remote-debugging-port=9222


