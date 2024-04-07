Feature('C100 Respondent About You - flow');

Scenario('C100 Respondent About You journey', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await I.respondentAboutYou();
  }).retry({ retries: 3, minTimeout: 30000 });
