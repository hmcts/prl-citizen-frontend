Feature('Current Or Previous Proceedings');

Scenario('Current Or Previous Proceedings - basic journey @nightly', async ({ I }) => {
  //await I.enterPinPageHappyPath();
  //await I.loginAsCitizen();
  //await I.currentOrPreviousProceedings();
}).retry({ retries: 3, minTimeout: 30000 });
