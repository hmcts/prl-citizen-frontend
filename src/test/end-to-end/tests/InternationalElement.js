Feature('International Element');

Scenario('International Element - basic journey @nightly', async ({ I }) => {
  //await I.enterPinPageHappyPath();
  //await I.loginAsCitizen();
  //await I.internationalElement();
  }).retry({ retries: 3, minTimeout: 30000 });
