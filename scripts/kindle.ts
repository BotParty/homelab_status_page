import asyncio
from playwright.async_api import async_playwright

async def capture_text_and_screenshot(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto(url)
        
        # Get the text
        page_text = await page.text_content("body")
        
        # Get a full-page screenshot
        await page.screenshot(path="page_screenshot.png", full_page=True)
        
        await browser.close()
        return page_text

async def main():
    text = await capture_text_and_screenshot("https://example.com")
    print("Extracted Text:")
    print(text)

asyncio.run(main())
