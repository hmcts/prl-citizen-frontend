const HTMLCS = require('html_codesniffer');
const fs = require('fs');
const testConfig = require('../config');

const result = {
  PASSED: 'passed',
  FAILED: 'failed'
};

const resultObj = {
  appName: 'PRL-CCD-DEFINITIONS',
  passCount: 0,
  failCount: 0,
  tests: []
};

async function runAccessibility(url, page) {
  // Add HMTL code sniffer script
  await page.addScriptTag({ path: 'node_modules/html_codesniffer/build/HTMLCS.js' });

  const screenshotPath = `${testConfig.TestOutputDir}/assets`;
  const screenshotName = `${Date.now()}.png`;
  const screenshotReportRef = `assets/${screenshotName}`;

  console.log(`analyzing the page URL ${url}`);
  const accessibilityErrorsOnThePage = await page.evaluate(() => {
    const processIssue = function(issue) {
      return {
        code: issue.code,
        message: issue.msg,
        type: 'error',
        element: issue.element,
        runner: 'htmlcs'
      };
    };

    const STANDARD = 'WCAG2AA';
    let messages = null;

    HTMLCS.process(STANDARD, window.document, () => {
      messages = HTMLCS
        .getMessages()
        .filter(m => {
          return m.type === HTMLCS.ERROR;
        })
        .map(processIssue);
    });
    return messages;
  });

  try {
    await page.screenshot({ path: `${screenshotPath}/${screenshotName}`, fullPage: true });
    // eslint-disable-next-line id-blacklist
  } catch (err) {
    // eslint-disable-next-line id-blacklist
    console.log(`screenshot error ${err}`);
    fs.mkdirSync(screenshotPath, { recursive: true });
    await page.screenshot({ path: `${screenshotPath}/${screenshotName}`, fullPage: true });
  }
  // eslint-disable-next-line no-use-before-define
  updateResultObject(url, await page.title(), screenshotReportRef, accessibilityErrorsOnThePage);
}

function updateResultObject(url, pageTitle, screenshotReportRef, accessibilityErrorsOnThePage) {
  const isPageAccessible = accessibilityErrorsOnThePage.length === 0 ? result.PASSED : result.FAILED;

  const urlArr = url.split('/');
  const urlArrLengthBefore = 2;
  const urlArrLengthAfter = 1;

  if (isPageAccessible === result.PASSED) {
    resultObj.passCount += 1;
  } else {
    resultObj.failCount += 1;
  }

  resultObj.tests.push({
    name: `${urlArr[urlArr.length - urlArrLengthBefore]}/${urlArr[urlArr.length - urlArrLengthAfter]}`,
    pageUrl: url,
    documentTitle: pageTitle,
    status: isPageAccessible,
    screenshot: screenshotReportRef,
    a11yIssues: accessibilityErrorsOnThePage
  });

  console.log('Page analysis completed');
}

function getAccessibilityTestResult() {
  return resultObj;
}

module.exports = { runAccessibility, getAccessibilityTestResult };