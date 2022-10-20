import fs from 'fs';

import Axios from 'axios';
import htmlReporter from 'pa11y/lib/reporters/html';
import puppeteer from 'puppeteer';

import * as urls from '../../main/steps/urls';
import { config } from '../config';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

interface Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

interface PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

const ignoredA11yErrors = [];

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string, browser, page): Promise<Pa11yResult> {
  let screenCapture: string | boolean = false;
  if (!config.TestHeadlessBrowser) {
    const screenshotDir = `${__dirname}/../../../output/pa11y`;
    fs.mkdirSync(screenshotDir, { recursive: true });
    screenCapture = `${screenshotDir}/${url.replace(/^\/$/, 'home').replace('/', '')}.png`;
  }

  const { TEST_URL } = config;
  const fullUrl = `${TEST_URL.endsWith('/') ? TEST_URL.slice(0, TEST_URL.length - 1) : TEST_URL}${url}`;
  return pa11y(fullUrl, {
    ignore: ignoredA11yErrors,
    browser,
    page,
    screenCapture,
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    throw new Error(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

jest.retryTimes(3);
jest.setTimeout(15000);

describe('Accessibility', () => {
  let browser;
  let cookies;
  let hasAfterAllRun = false;

  const setup = async () => {
    if (hasAfterAllRun) {
      return;
    }
    if (browser) {
      await browser.close();
    }

    browser = await puppeteer.launch({ ignoreHTTPSErrors: true });
    browser.on('disconnected', setup);

    // Login once only for other pages to reuse session
    const page = await browser.newPage();
    await page.goto(config.TEST_URL);
    await page.type('#username', process.env.CITIZEN_USERNAME);
    await page.type('#password', process.env.CITIZEN_PASSWORD);
    await page.click('input[type="submit"]');
    cookies = await page.cookies(config.TEST_URL);
  };

  beforeAll(setup);

  afterAll(async () => {
    hasAfterAllRun = true;
    await browser.close();
  });

  const IGNORED_URLS = [
    urls.SIGN_IN_URL,
    urls.SIGN_OUT_URL,
  ];

  const urlsToTest = Object.values(urls).filter(url => !IGNORED_URLS.includes(url));

  describe.each(urlsToTest)('Page %s', url => {
    let page;

    test(`Page ${url} should have no accessibility errors`, async () => {
      page = await browser.newPage();
      await page.goto(config.TEST_URL);
      await page.setCookie(...cookies);

      await ensurePageCallWillSucceed(url);

      const result = await runPally(url, browser, page);
      const html = await htmlReporter.results(result);

      const reportsDir = `${__dirname}/../../../output/pa11y${url.slice(0, url.lastIndexOf('/'))}`;
      fs.mkdirSync(reportsDir, { recursive: true });
      fs.writeFileSync(`${reportsDir}${url.slice(url.lastIndexOf('/'))}.html`, html);

      expect(result.issues).toEqual(expect.any(Array));
      expectNoErrors(result.issues);
    });
  });
});
