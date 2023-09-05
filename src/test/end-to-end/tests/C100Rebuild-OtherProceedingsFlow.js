Feature('C100 Rebuild - other proceedings flow');

Scenario('C100 Rebuild - other proceedings flow @master @nightly',  async ({ I }) => {
  await I.loginAsCitizen();
  await I.createC100Application();
  await I.startTheApplication();
  await I.addCaseNameAndPostCode();
  await I.screeningQuestions();
  await I.miamOtherProceedingsEvent();
  await I.otherProceedings();
  await I.typeOfOrder();
  await I.urgencyWithoutNotice();
  await I.childrenDetails();
  await I.noOtherChild();
  await I.applicantDetails();
  await I.respondentDetails();
  await I.withoutOtherPerson();
  await I.safetyConcerns();
  await I.internationElements();
  await I.reasonableAdjustments();
  await I.helpWithFeeEvent();
  await I.checkYourAnswersSimpleEvent();
}).retry({ retries: 3, minTimeout: 30000 });
