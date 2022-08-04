const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const InternationalElement = require('./pages/InternationalElement');
const generalHelper = require('./helpers/generalHelper');
const CurrentOrPreviousProceedings = require('./pages/CurrentOrPreviousProceedings');
const ConsentToApplication = require('./pages/ConsentToApplication');
const SupportYouNeed = require('./pages/SupportYouNeedDuringYourCase-Applicant');
const SupportYouNeedRespondent = require('./pages/SupportYouNeedDuringYourCase-RespondentCADA');

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
    supportYouNeedDuringYourCase() {
      return SupportYouNeed.supportYouNeedHappyPath();
    },
    supportYouNeedDuringYourCaseRespondent() {
      return SupportYouNeedRespondent.supportYouNeedHappyPath();
    },
    amOnHistoryPageWithSuccessNotification() {
      return generalHelper.amOnHistoryPageWithSuccessNotification();
    }
  });
};
