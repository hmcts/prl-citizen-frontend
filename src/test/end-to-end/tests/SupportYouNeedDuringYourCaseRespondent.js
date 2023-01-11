Feature('Support You Need During Your Case- Respondent');

Scenario('Support You Need During Your Case- Respondent - basic journey @cross-browser', async ({ I }) => {
  await I.enterPinPageHappyPath();
  await I.loginAsCitizen();
  await I.supportYouNeedDuringYourCaseRespondent();
}).retry({ retries: 3, minTimeout: 30000 });
