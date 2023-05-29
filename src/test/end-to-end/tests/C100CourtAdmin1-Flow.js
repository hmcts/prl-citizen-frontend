Feature('C100 CourtAdmin1 - flow');

Scenario('C100 CourtAdmin1 - journey @cross-browser', async ({ I }) => {
    await I.loginAsCourtAdmin1();
    await I.assignTaskToSelf();
  }).retry({ retries: 3, minTimeout: 30000 });
