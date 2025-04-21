// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';

describe('Credit Card Validator E2E', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('проверка валидной карты и подсветки системы', async () => {
    await page.waitForSelector('.card-input');
    await page.type('.card-input', '4539578763621486');
    await page.click('button');

    await page.waitForSelector('.result');
    const resultText = await page.$eval('.result', (el) => el.textContent);

    expect(resultText).toContain('Карта действительна (VISA)');

    const visaActive = await page.$eval('.visa', (el) => el.classList.contains('active'));
    expect(visaActive).toBe(true);
  });

  test('проверка невалидной карты', async () => {
    await page.click('.card-input', { clickCount: 3 });
    await page.type('.card-input', '4539578763621487');
    await page.click('button');

    await page.waitForSelector('.result');
    const resultText = await page.$eval('.result', (el) => el.textContent);

    expect(resultText).toBe('Карта недействительна');
  });
});
