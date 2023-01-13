Feature('C100 Rebuild - with urgency flow');

Scenario('C100 Rebuild - urgent hearing flow @cross-browser',  async ({
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
    await GoToMiam.miamUrgent();
    await UrgencyWithoutNotice.urgencyWithoutNotice();
    await TypeOfOrder.typeOfOrder();
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
