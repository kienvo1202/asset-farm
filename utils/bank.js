const puppeteer = require('puppeteer');

const runService = async () => {

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 400
    });
    const page = await browser.newPage();

    const url = 'https://vcbdigibank.vietcombank.com.vn/';
    await page.goto(url);
    await page.screenshot({path:'example1vcb.png'})
    // OUR WEB SCRAPPING CODE GOES HERE

    await browser.close();
};

module.exports = runService;