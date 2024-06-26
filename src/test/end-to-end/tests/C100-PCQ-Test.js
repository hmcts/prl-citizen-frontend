const testConfig = require('../config');

Feature('C100 - PCQ Flow');

Scenario('C100 - PCQ submit - @master @nightly', async ({ I }) => {
  await I.loginAsCitizen();
  await I.createC100DraftTS();
  await I.submitPCQ();
 }).retry(testConfig.TestRetryScenarios);

Scenario('C100 - DO NOT want to submit PCQ - @master @nightly', async ({ I }) => {
  await I.loginAsCitizen();
  await I.createC100DraftTS();
  await I.DontWantSubmitPCQ();
}).retry(testConfig.TestRetryScenarios);
