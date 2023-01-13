const { I } = inject();
const config = require('../../config');

const retryCount = 3;

// eslint-disable-next-line no-unused-vars
const baseUrl = config.baseUrl;

module.exports = {

  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async loginAsCitizenUserNamePassWord() {
    try {
      await I.retry(retryCount).amOnPage(baseUrl);
      await I.retry(retryCount).click('Accept additional cookies');
      I.wait('1');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).fillField(this.fields.email, config.citizenFrontEnd.email);
      await I.retry(retryCount).fillField(this.fields.password, config.citizenFrontEnd.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.citizenFrontEnd.email);
      await I.retry(retryCount).fillField(this.fields.password, config.citizenFrontEnd.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    I.waitForNavigation();
  }
};
