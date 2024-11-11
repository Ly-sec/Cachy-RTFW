const puppeteer = require('puppeteer');

async function scrapeFirstSearchResult(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://wiki.cachyos.org/');
        await page.waitForSelector('button[aria-label="Search"]');
        await page.click('button[aria-label="Search"]');
        await page.waitForSelector('input.pagefind-ui__search-input');
        await page.type('input.pagefind-ui__search-input', query);
        await page.waitForSelector('ol');
        await page.waitForSelector('div.pagefind-ui__results-area');
        await page.waitForSelector('p.pagefind-ui__result-title:not(.pagefind-ui__loading)', { timeout: 5000 });

        const firstResult = await page.evaluate(() => {
            const firstItem = document.querySelector('li.pagefind-ui__result');
            const title = firstItem?.querySelector('.pagefind-ui__result-title')?.innerText.trim();
            const excerpt = firstItem?.querySelector('.pagefind-ui__result-excerpt')?.innerText.trim();
            const link = firstItem?.querySelector('.pagefind-ui__result-link')?.getAttribute('href');
            return title && link && !title.includes('. . .') ? { title, excerpt, link } : null;
        });

        return firstResult;
    } catch (error) {
        console.error('Error scraping wiki:', error);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = { scrapeFirstSearchResult };