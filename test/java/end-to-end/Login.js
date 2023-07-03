const I = actor();
const config = require('../config');

const retryCount = 3;

// eslint-disable-next-line no-unused-vars
const baseUrl = config.baseUrl;

module.exports = {
  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async loginAsCitizenUser() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    //await I.retry(retryCount).amOnPage(baseUrl);

    try {
      await I.retry(retryCount).click('#cookie-accept-submit');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
  },
  
    
}
  




