Feature('C100 Rebuild - other proceedings flow');

Scenario('C100 Rebuild - other proceedings flow flow @cross-browser',  async  I  => {
   await I.loginAsCitizenUserNamePassWord();
  await I.createC100Application();
  await I.addCaseNameAndPostCode();
  await I.screeningQuestions();
  await I.miamOtherProceedingsEvent();
  await I.otherProceedings();
  await I.typeOfOrder();
  await I.urgencyWithoutNotice();
  await I.childrenDetails();
  await I.applicantDetails();
  await I.respondentDetails();
  await I.otherPersonDetails();
  await I.safetyConcerns();
  await I.internationElements();
  await I.reasonableAdjustments();
  await I.helpWithFeeEvent();
  await I.checkYourAnswersSimpleEvent();
}).retry({ retries: 3, minTimeout: 30000 });
