Feature('International Element');

Scenario('International Element - basic journey @cross-browser', async ({ I }) => {
  await I.enterPinPageHappyPath();
  await I.loginAsCitizen();
  //await I.internationalElement();
  }).retry({ retries: 3, minTimeout: 30000 });
