Feature('C100 Respondent - flow');

Scenario('C100 Respondent - journey @cross-browser', async ({ I }) => {
    await I.loginAsCitizen();
    await I.respondentTaskList();
  }).retry({ retries: 3, minTimeout: 30000 });
