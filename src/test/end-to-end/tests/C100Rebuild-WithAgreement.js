const CheckYourAnswersSimple = require("../pages/C100-Rebuild/CheckYourAnswersSimple");

Feature('C100 Rebuild - draft consent flow');

Scenario('C100 Rebuild - draft consent flow @cross-browser',  async ({
   CitizenLoginPage,
   CreateApplication,
   CaseNameAndPostCode,
   ScreeningQuestions,
   TypeOfOrder,
   ConsentOrder,
   UrgencyWithoutNotice,
   ChildrenDetails,
   ApplicantDetails,
   RespondentDetails,
   OtherPersonDetails,
   OtherProceedings,
   SafetyConcerns,
   InternationElements,
   ReasonableAdjustments,
   HelpWithFees,
   CheckYourAnswersSimple,
 }) => {
   await CitizenLoginPage.loginAsCitizenUserNamePassWord();
   await CreateApplication.createC100Application();
   await CaseNameAndPostCode.addCaseNameAndPostCode();
   await ScreeningQuestions.withDraftConsentOrder();
   await TypeOfOrder.typeOfOrder();
   await ConsentOrder.draftConsentOrder();
   await UrgencyWithoutNotice.urgencyWithoutNotice();
   await ChildrenDetails.childrenDetails();
   await ApplicantDetails.applicantDetails();
   await RespondentDetails.respondentDetails();
   await OtherPersonDetails.otherPersonDetails();
   await OtherProceedings.otherProceedings();
   await SafetyConcerns.safetyConcerns();
   await InternationElements.internationElements();
   await ReasonableAdjustments.reasonableAdjustments();
   await HelpWithFees.helpWithFeeEvent();
   await CheckYourAnswersSimple.checkYourAnswersSimpleEvent();
  }).retry({ retries: 3, minTimeout: 30000 });
