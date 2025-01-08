const dynamicland_book_shelf = [
    "https://bookshop.org/book/9781477325766",
    "https://bookshop.org/book/9780521292429",
    "https://archive.org/details/in.gov.ignca.12550",
    "https://bookshop.org/book/9780674699069",
    "https://www.routledge.com/Orality-and-Literacy-30th-Anniversary-Edition/Ong/p/book/9780415538381",
    "https://bookshop.org/book/9780521299558",
    "https://en.wikipedia.org/wiki/The_Educated_Mind",
    "https://www.edwardtufte.com/book/envisioning-information/",
    "https://en.wikipedia.org/wiki/Understanding_Comics",
    "https://mitpress.mit.edu/9780262581462/cognition-in-the-wild/",
    "https://bookshop.org/book/9780143117469",
    "https://bookshop.org/book/9780679740476",
    "https://en.wikipedia.org/wiki/A_Pattern_Language",
    "https://en.wikipedia.org/wiki/The_Oregon_Experiment",
    "https://en.wikipedia.org/wiki/How_Buildings_Learn",
    "https://bookshop.org/book/9780226113470",
    "https://bookshop.org/book/9780679764892",
    "http://www.newmediareader.com/",
    "https://bookshop.org/book/9780125232708",
    "https://bookshop.org/book/9781783083442",
    "https://worrydream.com/refs/Nelson_T_1974_-_Computer_Lib,_Dream_Machines.pdf",
    "https://en.wikipedia.org/wiki/Literary_Machines",
    "https://bookshop.org/book/9781541675124",
    "https://worrydream.com/refs/Allen-Conn_2003_-_Powerful_Ideas_in_the_Classroom.pdf",
    "https://www.rheingold.com/texts/tft/",
    "https://en.wikipedia.org/wiki/Sketchpad",
    "https://dougengelbart.org/content/view/201/",
    "https://dl.acm.org/doi/book/10.1145/61975",
    "https://worrydream.com/refs/Krasner_1983_-_Smalltalk-80_Bits_of_History,_Words_of_Advice.pdf",
    "https://archive.org/details/humaninterfacewh0000bolt",
    "https://worrydream.com/refs/Bolt_1979_-_Spatial_Data_Management.pdf",
    "https://worrydream.com/refs/Kim_1988_-_Viewpoint,_Toward_a_Computer_for_Visual_Thinkers.pdf",
    "https://en.wikipedia.org/wiki/Seeing_Like_a_State",
    "https://mitpress.mit.edu/9780262546799/simulation-and-its-discontents/",
    "https://bookshop.org/book/9780143036531",
    "https://bookshop.org/book/9780679745402",
    "https://bookshop.org/book/9781842300114",
    "https://web.stanford.edu/dept/SUL/sites/mac/primary/docs/satori/",
    "https://bookshop.org/book/9781732265110",
    "https://bookshop.org/book/9780804738712",
    "https://worrydream.com/refs/Piumarta_2010_-_Points_of_View.pdf",
    "https://bookshop.org/book/9781849901154"
]

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function visitBookLinks() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const bookInfo = [];
    const outputDir = 'book_covers';

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const url of dynamicland_book_shelf) {
        try {
            console.log(`Visiting: ${url}`);
            await page.goto(url, { timeout: 3000 });
            await page.waitForLoadState('networkidle');
            
            const title = await page.title();
            console.log(`Page title: ${title}`);

            // Find the largest image on the page
            const largestImage = await page.evaluate(() => {
                let maxArea = 0;
                let largestImgSrc = null;
                
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    const area = img.naturalWidth * img.naturalHeight;
                    if (area > maxArea) {
                        maxArea = area;
                        largestImgSrc = img.src;
                    }
                });
                
                return largestImgSrc;
            });

            let imageFilename = null;
            if (largestImage) {
                // Download the image and get its content type
                const imageData = await page.evaluate(async (src) => {
                    const response = await fetch(src);
                    const buffer = await response.arrayBuffer();
                    const contentType = response.headers.get('content-type');
                    return { buffer, contentType };
                }, largestImage);
                
                // Determine file extension from MIME type
                const mimeToExt = {
                    'image/jpeg': '.jpg',
                    'image/png': '.png',
                    'image/gif': '.gif',
                    'image/webp': '.webp'
                };
                
                const ext = mimeToExt[imageData.contentType] || '.jpg';
                imageFilename = `${path.basename(url)}${ext}`;
                const imagePath = path.join(outputDir, imageFilename);
                
                // Save the image with proper format
                fs.writeFileSync(imagePath, Buffer.from(imageData.buffer));
                console.log(`Saved image: ${imagePath} (${imageData.contentType})`);
            }
            
            bookInfo.push({
                url: url,
                title: title,
                imagePath: imageFilename,
                timestamp: new Date().toISOString()
            });
            
            await page.waitForTimeout(2000);
        } catch (error) {
            console.error(`Error visiting ${url}:`, error);
            bookInfo.push({
                url: url,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    await browser.close();

    // Save to JSON file
    // fs.writeFileSync(
    //     'dynamicland_bookshelf.json',
    //     JSON.stringify(bookInfo, null, 2)
    // );
}

visitBookLinks().catch(console.error);