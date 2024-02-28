const testConfig = require('../config');

Feature('C100 Rebuild - with urgency flow');

Scenario('C100 Rebuild - urgent hearing flow @nightly',  async ({ I }) => {
    await I.loginAsCitizen();
    await I.createC100Application();
    await I.startTheApplication();
    await I.addCaseNameAndPostCode();
    await I.screeningQuestions();
    await I.miamUrgent();
    await I.urgencyWithoutNotice();
    await I.typeOfOrder();
    await I.childrenDetails();
    await I.noOtherChild();
    await I.applicantDetails();
    await I.respondentDetails();
    await I.withoutOtherPerson();
    await I.otherProceedings();
    await I.safetyConcerns();
    await I.internationElements();
    await I.reasonableAdjustments();
    await I.withHelpWithFeeEvent();
    await I.checkYourAnswersSimpleEvent();
}).retry(testConfig.TestRetryScenarios);
