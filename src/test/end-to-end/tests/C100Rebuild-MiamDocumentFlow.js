Feature('C100 Rebuild - Basic Miam Document flow');

Scenario('C100 Rebuild - basic miam document journey @nightly', async ({ I }) => {
  await I.loginAsCitizen();
  await I.createC100Application();
  await I.startTheApplication();
  await I.addCaseNameAndPostCode();
  await I.screeningQuestions();
  await I.miamSignedDocument();
  await I.typeOfOrder();
  await I.urgencyWithoutNotice();
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
}).retry({ retries: 3, minTimeout: 30000 });
