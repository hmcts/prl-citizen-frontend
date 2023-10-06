Feature('FL401 Respondent About You - flow');

Scenario('FL401 Respondent About You journey', async ({ I }) => {
    await I.loginAsCitizen();
    await I.aboutYouFL401();
  }).retry({ retries: 3, minTimeout: 30000 });
