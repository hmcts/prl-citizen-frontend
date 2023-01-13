Feature('C100 Rebuild - other proceedings flow');

Scenario('C100 Rebuild - other proceedings flow flow @cross-browser',  
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
  CheckYourAnswersSimple,
}) => {
  await CitizenLoginPage.loginAsCitizenUserNamePassWord();
  await CreateApplication.createC100Application();
  await CaseNameAndPostCode.addCaseNameAndPostCode();
  await ScreeningQuestions.screeningQuestions();
  await GoToMiam.miamOtherProceedingsEvent();
  await OtherProceedings.otherProceedings();
  await TypeOfOrder.typeOfOrder();
  await UrgencyWithoutNotice.urgencyWithoutNotice();
  await ChildrenDetails.childrenDetails();
  await ApplicantDetails.applicantDetails();
  await RespondentDetails.respondentDetails();
  await OtherPersonDetails.otherPersonDetails();
  await SafetyConcerns.safetyConcerns();
  await InternationElements.internationElements();
  await ReasonableAdjustments.reasonableAdjustments();
  await HelpWithFees.helpWithFeeEvent();
  await CheckYourAnswersSimple.checkYourAnswersSimpleEvent();
}).retry({ retries: 3, minTimeout: 30000 });
