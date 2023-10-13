Feature('C100 Respondent - flow');

Scenario('C100 Respondent - journey', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await I.respondentTaskList();
  }).retry({ retries: 3, minTimeout: 30000 });
