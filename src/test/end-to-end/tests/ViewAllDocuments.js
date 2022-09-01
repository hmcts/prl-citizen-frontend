Feature('View All Documents');

Scenario('View All Documents - basic journey @cross-browser', async ({ I }) => {
  //await I.enterPinPageHappyPath();
  await I.loginAsCitizen();
  await I.viewAllDocuments();
  }).retry({ retries: 3, minTimeout: 30000 });
