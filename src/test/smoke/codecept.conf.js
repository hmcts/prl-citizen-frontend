exports.config = {
  tests: './tests/smoke_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 180000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
      },
      windowSize: '1280x960'
    },
    GeneralHelper: { require: '../smoke/helpers/generalHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    }
  },
  include: {
  I: './steps_file.js',
  CitizenLoginPage: './pages/CitizenLoginPage',
  CreateApplication : './pages/CreateApplication.js'},
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: true,
          steps: true
        }
      },
      mochawesome: {
        stdout: './smoke-output/console.log',
        options: {
          reportDir: './smoke-output',
          reportFilename: 'report'
        }
      },
      'mocha-junit-reporter': {
        stdout: './smoke-output/console.log',
        options: {
          mochaFile: './smoke-output/result.xml',
          attachments: 'true //add screenshot for a failed test'
        }
      }
    }
  },
  name: 'prl-ccd-definitions'
};
