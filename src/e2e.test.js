//e2e test with puppeteer
import puppeteer from 'puppeteer';
jest.setTimeout(15000);

test('Validating form submit without Data- failure', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.goto('http://localhost:3000');

  await page.waitForSelector('form');
  await page.click('button[type=submit]');
  await page.waitForSelector('.error');

  let element = await page.$('.error');
  let errorMessage = await page.evaluate((el) => el.textContent, element);
  await expect(errorMessage).toMatch('Please select one');
});

test('Success case', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.goto('http://localhost:3000');
  await page.waitForSelector('form');

  await page.click('select');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter', { delay: 300 });

  await page.type('[name="title"]', 'fake value title');
  await page.type('[name="body"]', 'fake value body');

  await page.click('button[type=submit]');

  let element = await page.$('.success');

  await page.waitForFunction(() => {
    const count = document.querySelector('.success');
    return count && count.innerHTML.length > 0;
  });

  let successMessage = await page.evaluate((el) => el.textContent, element);
  await expect(successMessage).toMatch('Success');

  //   await page.type('[]')

  //   await page.click('button[type=submit]');
});
