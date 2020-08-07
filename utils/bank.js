const puppeteer = require('puppeteer');

const runService = async () => {
  console.log('00');
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 400,
    args: ['--no-sandbox']
  });
  console.log('05');

  const page = await browser.newPage();

  
  const url = 'https://vcbdigibank.vietcombank.com.vn/';
  console.log('15'),
  await Promise.all([
    console.log('18'),
    await page.goto(url),
    console.log('20'),
    await page.screenshot({ path: 'argon-client/build/static/media/example1vcb.png' })
  ]);
  console.log('25');
  // OUR WEB SCRAPPING CODE GOES HERE

  await browser.close();
  console.log('45');
};

module.exports = runService;
