const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

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
  console.log('15');
  console.log('-');
  // console.log(os.tmpdir()),
  await page.goto(url);
  console.log('20', __dirname);
  // const savedPath = 'argon-client/build/static/media/'
  const savedPath = os.tmpdir();
  console.log(os.tmpdir(),'---',path.resolve(savedPath, 'example1vcb.png'));
  
  await page.screenshot({ path: path.resolve(savedPath, 'example1vcb.png') });
  console.log('25');
  // OUR WEB SCRAPPING CODE GOES HERE

  await browser.close();
  console.log('45');
};

module.exports = runService;
