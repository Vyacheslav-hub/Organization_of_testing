// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer';

describe('Credit Card Validator E2E', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  afterEach(async () => {
    await page.close();
  });

  test('подсвечивает Visa при вводе её номера', async () => {
    await page.waitForSelector('.card-input');
    await page.type('.card-input', '4');

    const visaActive = await page.$eval('.visa', (el) => el.classList.contains('active'));

    expect(visaActive).toBe(true);
  });

  test('подсвечивает MasterCard при вводе номера, начинающегося с 51-55', async () => {
    await page.waitForSelector('.card-input');
    await page.type('.card-input', '51');

    const mcActive = await page.$eval('.mastercard', (el) => el.classList.contains('active'));

    expect(mcActive).toBe(true);
  });

  test('подсвечивает Mir при вводе номера, начинающегося с 2200-2204', async () => {
    await page.waitForSelector('.card-input');
    await page.type('.card-input', '2200');

    const mirActive = await page.$eval('.mir', (el) => el.classList.contains('active'));

    expect(mirActive).toBe(true);
  });

  test('снимает подсветку при очистке поля', async () => {
    await page.waitForSelector('.card-input');
    await page.type('.card-input', '5');
    await page.click('.card-input', { clickCount: 3 });
    await page.keyboard.press('Backspace');

    const iconsActive = await page.$$eval('.card-icon', (icons) => icons.every((el) => !el.classList.contains('active')));

    expect(iconsActive).toBe(true);
  });
});
