Feature('Feature - 2');

Scenario('International Element - basic journey @cross-browser', async ({ I }) => {
  await I.enterPinPageHappyPath();
  await I.loginAsCitizen();
  await I.supportYouNeedDuringYourCase();
}).retry({ retries: 3, minTimeout: 30000 });
