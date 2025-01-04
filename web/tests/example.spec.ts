import { test, expect } from '@playwright/test';
import fs from 'fs';

const ERROR_FILE_PATH = 'homelab/data/errors.json';

// Ensure the directory exists
if (!fs.existsSync('homelab/data')) {
  fs.mkdirSync('homelab/data', { recursive: true });
}

// Initialize errors.json if it doesn't exist
if (!fs.existsSync(ERROR_FILE_PATH)) {
  fs.writeFileSync(ERROR_FILE_PATH, '[]');
}

test('example test', async ({ page }) => {
  try {
    await page.goto('/');
    // Your test code here
  } catch (error) {
    // Read existing errors
    const existingErrors = JSON.parse(fs.readFileSync(ERROR_FILE_PATH, 'utf-8'));
    
    // Add new error
    existingErrors.push({
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    });
    
    // Write back to file
    fs.writeFileSync(ERROR_FILE_PATH, JSON.stringify(existingErrors, null, 2));
    throw error;
  }
}); 