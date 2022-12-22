const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const CitizenLoginPage = require('./pages/C100-Rebuild/CitizenLoginPage');
const InternationalElement = require('./pages/InternationalElement');
const CurrentOrPreviousProceedings = require('./pages/CurrentOrPreviousProceedings');
const ConsentToApplication = require('./pages/ConsentToApplication');
const SupportYouNeedApplicant = require('./pages/SupportYouNeedDuringYourCase-Applicant');
const SupportYouNeedRespondent = require('./pages/SupportYouNeedDuringYourCase-RespondentCADA');
const UploadDocuments = require('./pages/UploadDocuments');
const CreateApplication = require('./pages/C100-Rebuild/CreateApplication');
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

const SupportYouNeedRespondent = require('./pages/SupportYouNeedDuringYourCase-RespondentCADA');
const UploadDocuments = require('./pages/UploadDocuments');


module.exports = () => {
  return actor({

    enterPinPageHappyPath() {
      return EnterPinPage.enterPin();
    },
    loginAsCitizen() {
      return Login.loginAsCitizen();
    },
    loginAsCitizenUserNamePassWord() {
      return CitizenLoginPage.loginAsCitizen();
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
    // supportYouNeedDuringYourCase() {
    //   return SupportYouNeed.supportYouNeedHappyPath();
    // },
    createC100Application() {
      return CreateApplication.createNewC100Application();
    },
    addCaseNameAndPostCode() {
      return CaseNameAndPostCode.addCaseNameAndPostCode();
    },
    screeningQuestions() {
      return ScreeningQuestions.screeningQuestions();
    },
    goToMiam() {
      return GoToMiam.goToMiam();
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
    applicantDetails() {
      return ApplicantDetails.applicantDetails();
    },
    respondentDetails() {
      return RespondentDetails.respondentDetails();
    },
    otherPersonDetails() {
      return OtherPersonDetails.otherPersonDetails();
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
    helpWithFeeEvent() {
      return HelpWithFees.helpWithFeeEvent();
    },
    checkYourAnswersEvent() {
      return CheckYourAnswers.checkYourAnswersEvent();
    }
  });
};
