Feature('Keep Your Details Private');

Scenario('Keep Your Details Private @cross-browser', async ({ I }) => {
  await I.loginAsCitizen();
  await I.clickOnActiveCase();
  await I.fillKeepYourDetailsPrivate();
}).retry({ retries: 3, minTimeout: 30000 });
