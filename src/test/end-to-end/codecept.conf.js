const path = require('path');
const fs = require('fs');
const outputDir = path.resolve(__dirname, '../../../output');
const { getAccessibilityTestResult } = require('./accessibility/runner');
const { generateAccessibilityReport } = require('../reporters/accessibility-reporter/customReporter');

if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

const DataSetupManager = require('./exuiSupport/restApiData/DataSetupManager')


exports.config = {
  tests: './tests/*.js',
  output: outputDir,
  helpers: {
    Playwright: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: true,
      url: 'http://localhost:3000',
      timeout: 20000,
      waitForTimeout: 60000,
      getPageTimeout: 60000,
      waitForAction: 1000,
      waitForNavigation: 'domcontentloaded',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [ '--disable-gpu', '--no-sandbox', '--allow-running-insecure-content', '--ignore-certificate-errors']
      },
      windowSize: '1280x960',
      disableScreenshots: false,
      video: true,
      recordVideo: { dir: outputDir },
      keepVideoForPassedTests: false,
      keepTraceForPassedTests: false,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true,
      bypassCSP: true
    },
    PlaywrightHelpers: { require: './helpers/playwrightHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    },
    autoDelay: { enabled: true }
  },
  include: { I: './steps_file.js'},
  bootstrap: null,
  mocha: {
    reporterEnabled: 'codeceptjs-cli-reporter, mochawesome',
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true
        }
      },
      mochawesome: {
        stdout: `${outputDir}/console.log`,
        options: {
          includeScreenshots: true,
          reportDir: outputDir,
          reportFilename: 'PrL-cui-tests',
          reportTitle: 'PrL Citizen UI Tests',
          inline: true,
          html: true,
          json: true
        }
      }
    }
  },
  multiple: {
    parallel: {
      chunks: 2,
      browsers: ['chrome']
    }
  },
  bootstrap: () =>  {
    DataSetupManager.init();
  },

  teardown: async() => {
    await DataSetupManager.close();
    generateAccessibilityReport(getAccessibilityTestResult());

  },

  name: 'prl-citizen-frontend'
};

