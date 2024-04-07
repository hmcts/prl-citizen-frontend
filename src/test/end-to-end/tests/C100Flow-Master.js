const testConfig = require('../config');

Feature('C100 Citizen Basic Flow - Master');

Scenario('C100 Citizen Basic Flow - Master @cross-browser @nightly @smoke', async ({ I }) => {
    await I.loginAsCitizen();
    await I.createC100Application();
    await I.startTheApplication();
    await I.addCaseNameAndPostCode();
  }).retry({ retries: testConfig.TestRetryScenarios, minTimeout: 30000 });;
