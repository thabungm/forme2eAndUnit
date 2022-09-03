import puppeteer from 'puppeteer';
jest.setTimeout(15000);
test('Validating form submit WITHOUT data', async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  page.goto('http://localhost:3000');
  await page.waitForSelector('form');
  await page.click('button[type=submit]');
  await page.waitForSelector('.error');

  let element = await page.$('.error');
  let errorMessage = await page.evaluate((el) => el.textContent, element);
  await expect(errorMessage).toMatch('Please select one');
});

test('Validating form submit WITH data', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.goto('http://localhost:3000');
  await page.waitForSelector('form');

  await page.click('select');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter', { delay: 300 });

  await page.type('[name="title"]', 'title fake');
  await page.type('[name="body"]', 'body fake');
  await page.click('button[type=submit]');

  await page.waitForFunction(() => {
    const count = document.querySelector('.success');
    return count && count.innerText.length;
  });
  let element = await page.$('.success');
  let successMessage = await page.evaluate((el) => el.textContent, element);
  await expect(successMessage).toMatch('Success');
});
