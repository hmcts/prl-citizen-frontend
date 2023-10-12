exports.config = {
  tests: './tests/*.js',
  output: './output',
  helpers: {
    Playwright: {
      // headless mode
      // show: process.env.SHOW_BROWSER_WINDOW || false,
      show: true,
      url: 'http://localhost:3000',
      waitForTimeout: 60000,
      getPageTimeout: 60000,
      waitForAction: 1000,
      waitForNavigation: 'domcontentloaded',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [ '--disable-gpu', '--no-sandbox', '--allow-running-insecure-content', '--ignore-certificate-errors']
      },
      windowSize: '1280x960'
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
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {},
  name: 'prl-citizen-frontend'
};

