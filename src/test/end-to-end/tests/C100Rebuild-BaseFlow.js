Feature('C100 Rebuild - Base flow');

Scenario('C100 Rebuild - basic journey @nightly', async ({ I }) => {
    await I.loginAsCitizen();
    await I.createC100Application();
    await I.startTheApplication();
    await I.addCaseNameAndPostCode();
    await I.screeningQuestions();
    await I.goToMiam();
    await I.typeOfOrder();
    await I.urgencyWithoutNotice();
    await I.childrenDetails();
    await I.applicantDetails();
    await I.respondentDetails();
    await I.otherPersonDetails();
    await I.otherProceedings();
    await I.safetyConcerns();
    await I.internationElements();
    await I.reasonableAdjustments();
    await I.helpWithFeeEvent();
    await I.checkYourAnswersEvent();
  }).retry({ retries: 3, minTimeout: 30000 });
