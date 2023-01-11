Feature('C100 Rebuild - Base flow').retry(1);

Scenario(
  'C100 Rebuild - basic journey @cross-browser', 
async ({
  CitizenLoginPage,
  CreateApplication,
  CaseNameAndPostCode,
  ScreeningQuestions,
  GoToMiam,
  TypeOfOrder,
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
  CheckYourAnswers,
}) => {
    await CitizenLoginPage.loginAsCitizenUserNamePassWord();
    await CreateApplication.createNewC100Application();
    await CaseNameAndPostCode.addCaseNameAndPostCode();
    await ScreeningQuestions.screeningQuestions();
    await GoToMiam.goToMiam();
    await TypeOfOrder.typeOfOrder();
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
    await CheckYourAnswers.checkYourAnswersEvent();
});
