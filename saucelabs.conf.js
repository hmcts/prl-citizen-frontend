/* eslint-disable no-console */

const testConfig = require('./src/test/end-to-end/config.js');
const supportedBrowsers = require('./src/test/end-to-end/crossbrowser/supportedBrowsers.js');
//const testUserConfig = require('./src/test/end-to-end/config.js').config;
// eslint-disable-next-line no-magic-numbers
const waitForTimeout = parseInt(process.env.WAIT_FOR_TIMEOUT) || 50000;
// eslint-disable-next-line no-magic-numbers
const smartWait = parseInt(process.env.SMART_WAIT) || 50000;
const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  acceptSslCerts: true,
  tags: ['Private Law'],
  maxDuration: 5000,
};

function merge(intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(defaultSauceOptions, candidateCapabilities['sauce:options']);
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities,
      });
    } else {
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  tests: './src/test/end-to-end/tests/*.js',
  //teardown: testUserConfig.teardown,
  output: `${process.cwd()}/${testConfig.TestOutputDir}`,
  helpers: {
    WebDriver: {
      url: process.env.PRL_CITIZEN_URL,
      keepCookies: true,
      browser,
      smartWait,
      waitForTimeout,
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {},
    },
    SauceLabsReportingHelper: {
      require: './src/test/end-to-end/helpers/SauceLabsReportingHelper.js',
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
    GeneralHelper: { require: './src/test/end-to-end/helpers/generalHelper.js' }
  },
  plugins: {
    //autoLogin: testUserConfig.AutoLogin,
    retryFailedStep: {
      enabled: true,
      retries: 2,
    },
    autoDelay: {
      enabled: true,
      delayAfter: 1000,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  include: {
    I: './src/test/end-to-end/steps_file.js',
    config: './src/test/end-to-end/config.js',
    loginPage: './src/test/end-to-end/pages/Login.js',
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: { mochaFile: `${testConfig.TestOutputDir}/result.xml` },
      },
      mochawesome: {
        stdout: testConfig.TestOutputDir + '/console.log',
        options: {
          reportDir: testConfig.TestOutputDir,
          reportName: 'index',
          reportTitle: 'Crossbrowser results',
          inlineAssets: true,
        },
      },
    },
  },
  multiple: {
    microsoft: {
      browsers: getBrowserConfig('microsoft'),
    },
    chrome: {
      browsers: getBrowserConfig('chrome'),
    },
    firefox: {
      browsers: getBrowserConfig('firefox'),
    },
    safari: {
      browsers: getBrowserConfig('safari'),
    },
  },
  name: 'PRL Citizen FE Cross-Browser Tests',
};

exports.config = setupConfig;