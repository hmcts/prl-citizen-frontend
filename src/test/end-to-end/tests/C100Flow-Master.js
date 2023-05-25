Feature('C100 Citizen Basic Flow - Master');

Scenario('C100 Citizen Basic Flow - Master @cross-browser', async ({ I }) => {
    await I.loginAsCitizen();
    await I.createC100Application();
    await I.startTheApplication();
    await I.addCaseNameAndPostCode();
  }).retry({ retries: 3, minTimeout: 30000 });
