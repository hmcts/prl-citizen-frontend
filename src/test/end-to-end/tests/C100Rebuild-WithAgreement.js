Feature('C100 Rebuild - draft consent flow');

Scenario('C100 Rebuild - draft consent flow  @nightly',  async ({ I }) => {
   await I.loginAsCitizen();
   await I.createC100Application();
   await I.startTheApplication();
   await I.addCaseNameAndPostCode();
   await I.withDraftConsentOrder();
   await I.typeOfOrder();
   await I.draftConsentOrder();
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
