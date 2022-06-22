const EnterPinPage = require('./pages/EnterPinPage');
const Login = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');
const InternationalElement = require('./pages/InternationalElement');
const generalHelper = require('./helpers/generalHelper');
const Miam= require('./pages/Miam');

module.exports = () => {
  return actor({
    
    enterPinPageHappyPath() {
      return EnterPinPage.enterPin();
    },
    loginAsCitizen() {
      return Login.loginAsCitizen();
    },
    homePage() {
      return HomePage.clickRespondentLink();
    },
    internationalElement() {
      return InternationalElement.clickInternationalElement();
    },
    amOnHistoryPageWithSuccessNotification() {
      return generalHelper.amOnHistoryPageWithSuccessNotification();
    },
    miam() {
      return Miam.addMIAM();
    }
  });
};
