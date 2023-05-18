exports.config = {
  tests: './tests/C100Flow-Master.js',
  output: './output',
  helpers: {
    Puppeteer: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      //show: true,
      url: 'http://localhost:3000',
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 180000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
      },
      windowSize: '1280x960'
    },
    PuppeteerHelpers: { require: './helpers/puppeterHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {},
  name: 'prl-citizen-frontend'
};

