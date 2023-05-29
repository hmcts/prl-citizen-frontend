Feature('FL401 Solicitor1 - flow');

Scenario('FL401 Solicitor1 - journey @cross-browser', async ({ I }) => {
    await I.loginAsCitizen();
    await I.statementOfTruth();
  }).retry({ retries: 3, minTimeout: 30000 });
