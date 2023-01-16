const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const InternationalElement = require('./pages/InternationalElement');
const CurrentOrPreviousProceedings = require('./pages/CurrentOrPreviousProceedings');
const ConsentToApplication = require('./pages/ConsentToApplication');
const SupportYouNeedApplicant = require('./pages/SupportYouNeedDuringYourCase-Applicant');
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
      }
  });
};
