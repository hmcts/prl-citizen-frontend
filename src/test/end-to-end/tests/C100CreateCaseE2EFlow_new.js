const testConfig = require('../config');


Feature('C100 Create case E2E - new @debug');

Scenario('C100 Rebuild - basic journey @master @nightly', async ({ I }) => {
    await I.loginAsCitizen();
    await I.createCaseC100E2E();
}).retry(testConfig.TestRetryScenarios);
