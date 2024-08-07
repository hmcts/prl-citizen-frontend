const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const EXUILogin = require('./exuiSupport/pages/Login');

const InternationalElement = require('./pages/InternationalElement');
const CurrentOrPreviousProceedings = require('./pages/CurrentOrPreviousProceedings');
const ConsentToApplication = require('./pages/ConsentToApplication');
const SupportYouNeedApplicant = require('./pages/SupportYouNeedDuringYourCase-Applicant');
const SupportYouNeedRespondent = require('./pages/SupportYouNeedDuringYourCase-RespondentCADA');
const UploadDocuments = require('./pages/uploadDocuments');
const CreateApplication = require('./pages/C100-Rebuild/CreateApplication');
const StartTheApplication= require('./pages/C100-Rebuild/MiniDashboard')
const CaseNameAndPostCode = require('./pages/C100-Rebuild/CaseNameAndPostCode');
const ScreeningQuestions = require('./pages/C100-Rebuild/ScreeningQuestions'); 
const GoToMiam = require('./pages/C100-Rebuild/GoToMiam');
const TypeOfOrder = require('./pages/C100-Rebuild/TypeOfOrder');
const UrgencyWithoutNotice = require('./pages/C100-Rebuild/UrgencyWithoutNotice');
const ChildrenDetails = require('./pages/C100-Rebuild/ChildrenDetails');
const ApplicantDetails = require('./pages/C100-Rebuild/ApplicantDetails');
const RespondentDetails = require('./pages/C100-Rebuild/RespondentDetails');
const OtherPersonDetails = require('./pages/C100-Rebuild/OtherPersonDetails');
const OtherProceedings = require('./pages/C100-Rebuild/OtherProceedings');
const SafetyConcerns = require('./pages/C100-Rebuild/SafetyConcerns');
const InternationElement = require('./pages/C100-Rebuild/InternationElement');
const ReasonableAdjustments = require('./pages/C100-Rebuild/ReasonableAdjustments');
const HelpWithFees = require('./pages/C100-Rebuild/HelpWithFees');
const CheckYourAnswers = require('./pages/C100-Rebuild/CheckYourAnswers');
const ConsentOrder = require('./pages/C100-Rebuild/ConsentOrder');
const CheckYourAnswersSimple = require('./pages/C100-Rebuild/CheckYourAnswersSimple');
const RespondentEvents = require('./pages/RespondentEvents');
const ApplicantAboutYouFL401 = require('./pages/FL-401Applicant/ApplicantAboutYouFL401.js');
const ActivateAccessCode = require('./pages/ActivateAccessCode.js')

const createCaseE2E = require('./pages/C100-Rebuild/C100CreateCaseE2E.js');
const commonActions = require('./pages/commonActions.js')
module.exports = () => {
  return actor({

    clickCheckBoxWithLabel(label) {
      return commonActions.clickCheckBoxWithLabel(label);
    },

    clickRadioOption(fieldName, value) {
      return commonActions.clickRadioOption(fieldName, value);

    },

    selectOptionWithLabel(name, pos) {
      return commonActions.selectOptionWithLabel(name, pos);

    },

    clickLink(linkText) {
      return commonActions.clickLink(linkText);

    },

    clickButton(label) {
      return commonActions.clickButton(label);

    },

    clickFieldWithID(id) {
      return commonActions.clickFieldWithID(id);

    },

    fillFieldWithLabel(name, value) {
      return commonActions.fillFieldWithLabel(name, value);

    },

    fillFieldWithId(id, value) {
      return commonActions.fillFieldWithId(id, value);

    },

    enterDate(dateField, day, month, year) {
      return commonActions.enterDate(dateField, day, month, year);

    },
    selectFile(fieldName, filePath) {
      return commonActions.selectFile(fieldName, filePath);
    },

    enterPinPageHappyPath() {
      return EnterPinPage.enterPin();
    },
    loginAsCitizen() {
      return Login.loginAsCitizen();
    },
    loginAsPRLCitizen() {
      return Login.loginAsPRLCitizen();
    },
    internationalElement() {
      return InternationalElement.clickInternationalElementHappyPath();
    },
    currentOrPreviousProceedings() {
      return CurrentOrPreviousProceedings.currentOrPreviousProceedingsHappyPath();
    },
    consentToApplication() {
      return ConsentToApplication.consentToApplicationHappyPath();
    },
    supportYouNeedDuringYourCaseApplicant() {
      return SupportYouNeedApplicant.supportYouNeedHappyPath();
    },
    supportYouNeedDuringYourCaseRespondent() {
      return SupportYouNeedRespondent.supportYouNeedHappyPath();
    },
    uploadDocuments () {
      return UploadDocuments.clickUploadDocuments();
    },
    createC100Application() {
      return CreateApplication.createNewC100Application();
    },
    startTheApplication() {
      return StartTheApplication.clickStartTheApplication();
    },
    addCaseNameAndPostCode() {
      return CaseNameAndPostCode.addCaseNameAndPostCode();
    },
    screeningQuestions() {
      return ScreeningQuestions.screeningQuestions();
    },
    withDraftConsentOrder() {
      return ScreeningQuestions.withDraftConsentOrder();
    },
    goToMiam() {
      return GoToMiam.goToMiam();
    },
    miamSignedDocument() {
      return GoToMiam.miamSignedDocument();
    },
    miamUrgent() {
      return GoToMiam.miamUrgent();
    },
    miamOtherProceedingsEvent() {
      return GoToMiam.miamOtherProceedingsEvent();
    },
    typeOfOrder() {
      return TypeOfOrder.typeOfOrder();
    },
    urgencyWithoutNotice() { 
      return UrgencyWithoutNotice.urgencyWithoutNotice();
    },
    childrenDetails() {
      return ChildrenDetails.childrenDetails();
    },
    otherChildrenDetails() {
      return ChildrenDetails.otherChildrenDetails();
    },
    noOtherChild() {
      return ChildrenDetails.noOtherChild();
    },
    applicantDetails() {
      return ApplicantDetails.applicantDetails();
    },
    respondentDetails() {
      return RespondentDetails.respondentDetails();
    },
    otherPersonDetails() {
      return OtherPersonDetails.otherPersonDetails();
    },
    withoutOtherPerson(){
      return OtherPersonDetails.withoutOtherPerson();
    },
    otherProceedings() {
      return OtherProceedings.otherProceedings();
    },
    safetyConcerns() {
      return SafetyConcerns.safetyConcerns();
    },
    internationElements() {
      return InternationElement.internationElements();
    },
    reasonableAdjustments() {
      return ReasonableAdjustments.reasonableAdjustments();
    },
    withHelpWithFeeEvent() {
      return HelpWithFees.withHelpWithFeeEvent();
    },
    withoutHelpWithFees() {
      return HelpWithFees.withoutHelpWithFees();
    },
    checkYourAnswersEvent() {
      return CheckYourAnswers.checkYourAnswersEvent();
    },
    checkAnswersAndPay() {
      return CheckYourAnswers.checkAnswersAndPay();
    },
    checkYourAnswersSimpleEvent() {
      return CheckYourAnswersSimple.checkYourAnswersSimple();
    },
    draftConsentOrder() {
      return ConsentOrder.draftConsentOrder();
    },
    respondentTaskList(caseId){
      return RespondentEvents.respondentTaskList(caseId);
    },
    respondentAboutYou(caseId){
      return RespondentEvents.respondentAboutYou(caseId);
    },
    aboutYouFL401() {
      return ApplicantAboutYouFL401.aboutYouFL401();
    },
    navigateToAcitivateAccessCodePage(){
      return ActivateAccessCode.navigateToAcitivateAccessCodePage();
    },
    fillAndSubmitActivateAccessCode(caseNumber, accessCode){
      return ActivateAccessCode.fillAndSubmitActivateAccessCode(caseNumber, accessCode);
    },
    confirmAccessCodeActivated(){
      return ActivateAccessCode.confirmAccessCodeActivated();
    },

    // EXUI login steps
    loginAsSolicitor() {
      return EXUILogin.loginAsSolicitor();
    },
    loginAsRespondentSolicitor() {
      return EXUILogin.loginAsRespondentSolicitor();
    },
    loginAsCourtAdmin() {
      return EXUILogin.loginAsCourtAdmin();
    },
    loginAsCaseManager() {
      return EXUILogin.loginAsCaseManager();
    },
    loginAsStokeCourtAdmin() {
      return EXUILogin.loginAsStokeCourtAdmin();
    },
    loginAsSwanseaCourtAdmin() {
      return EXUILogin.loginAsSwanseaCourtAdmin();
    },
    loginAsCourtAdminTSSolicitorApplication() {
      return EXUILogin.loginAsCourtAdminTSSolicitorApplication();
    },

    loginAsJudge() {
      return EXUILogin.loginAsJudge();
    },
    loginAsLegalAdviser() {
      return EXUILogin.loginAsLegalAdviser();
    },
    loginAsOldCourtAdmin() {
      return EXUILogin.loginAsOldCourtAdmin();
    },
    createCaseC100E2E(){
      return createCaseE2E.createCaseC100E2E({});
    }


  });
};
