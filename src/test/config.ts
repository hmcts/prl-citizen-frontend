// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
    throw reason;
  });

export const config = {
  TEST_URL: process.env.PRL_CITIZEN_URL || 'https://privatelaw.aat.platform.hmcts.net/',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 10000,

  Gherkin: {
    features: './features/**/*.feature',
    steps: [
        '../steps/common.ts',
    ],
  },
  helpers: {},
};

