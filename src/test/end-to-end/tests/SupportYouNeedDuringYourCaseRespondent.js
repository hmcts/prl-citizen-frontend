Feature('Support You Need During Your Case- Respondent');

Scenario('Support You Need During Your Case- Respondent - basic journey @cross-browser', async ({ I }) => {
  await I.enterPinPageHappyPath();
  await I.loginAsCitizen();
  //await I.supportYouNeedDuringYourCase();
}).retry({ retries: 3, minTimeout: 30000 });
