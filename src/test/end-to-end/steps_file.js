const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');
const InternationalElement = require('./pages/InternationalElement');
const generalHelper = require('./helpers/generalHelper');
const Miam= require('./pages/Miam');

const CurrentOrPreviousProceedings = require('./pages/CurrentOrPreviousProceedings');
const ConsentToApplication = require('./pages/ConsentToApplication');
const SupportYouNeed = require('./pages/SupportYouNeedDuringYourCase');

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
    amOnHistoryPageWithSuccessNotification() {
      return generalHelper.amOnHistoryPageWithSuccessNotification();
    },
    miam() {
      return Miam.addMIAM();

    supportYouNeedDuringYourCase() {
      return SupportYouNeed.supportYouNeedHappyPath();
    }
  });
};
