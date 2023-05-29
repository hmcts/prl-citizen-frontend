Feature('C100 Rebuild - draft consent flow');

Scenario('C100 Rebuild - draft consent flow',  async ({ I }) => {
   await I.loginAsCitizen();
   await I.createC100Application();
   await I.addCaseNameAndPostCode();
   await I.withDraftConsentOrder();
   await I.typeOfOrder();
   await I.draftConsentOrder();
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
   await I.checkYourAnswersSimpleEvent();
  }).retry({ retries: 3, minTimeout: 30000 });
