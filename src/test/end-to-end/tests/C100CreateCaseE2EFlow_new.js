const testConfig = require('../config');


Feature('C100 Create case E2E - new');

Scenario('C100 Rebuild - basic journey', async ({ I }) => {
    await I.loginAsCitizen();
    await I.createCaseC100E2E();
}).retry(testConfig.TestRetryScenarios);
