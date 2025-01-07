import { firefox, type BrowserContext } from 'playwright';
import ollama from 'ollama';

async function connectToExistingBrowser() {
  // Launch Firefox in debugging mode (Firefox doesn't support CDP like Chrome)
  const browserContext = await firefox.launch({
    headless: false,
    args: ['--remote-debugging-port=9222']
  });
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

// import { firefox, type BrowserContext, type Page } from 'playwright';
// import ollama from 'ollama';
// import * as fs from 'fs/promises';

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

async function main() {
  try {
    const context = await connectToExistingBrowser();
    const page = await navigateToLinkedIn(context);
    
    // Make sure you're logged in first (manual step)
    await page.waitForTimeout(5000); // Give time to log in if needed
    
    await scrapeWaymoEmployees(page);
    
    await page.screenshot({ path: 'screenshot.png' });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();


//google-chrome --remote-debugging-port=9222


