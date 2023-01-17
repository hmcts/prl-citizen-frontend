const CitizenLoginPage = require('./pages/CitizenLoginPage.js');
const CreateApplication = require('./pages/CreateApplication');
const generalHelper = require('./helpers/generalHelper');
module.exports = () => {
  return actor({
    loginAsCitizenUserNamePassWord() {
      return CitizenLoginPage.loginAsCitizenUserNamePassWord();
    },
    createC100Application() {
      return CreateApplication.createNewC100Application();
    },
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
  });
};
