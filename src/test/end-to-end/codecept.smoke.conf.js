const path = require('path');
const fs = require('fs');

const outputDir = path.resolve(__dirname, '../../../output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


exports.config = {
    tests: './tests/*.js',
  output: outputDir,
    helpers: {
      Playwright: {
        // headless mode
        show: process.env.SHOW_BROWSER_WINDOW || false,
        // show: true,
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
            reportFilename: 'PrL-cui-smoke-tests',
            reportTitle: 'PrL Citizen UI smoke Tests',
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
    name: 'prl-citizen-frontend'
  };
  
  