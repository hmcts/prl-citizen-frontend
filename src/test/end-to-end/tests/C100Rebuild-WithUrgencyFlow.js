Feature('C100 Rebuild - with urgency flow');

Scenario('C100 Rebuild - urgent hearing flow @cross-browser',  async  ({ I }) => {
    await I.loginAsCitizenUserNamePassWord();
    await I.createC100Application();
    await I.addCaseNameAndPostCode();
    await I.screeningQuestions();
    await I.miamUrgent();
    await I.urgencyWithoutNotice();
    await I.typeOfOrder();
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
