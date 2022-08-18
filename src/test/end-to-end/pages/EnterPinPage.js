const I = actor();
const config = require('../config');

const retryCount = 3;

// eslint-disable-next-line no-unused-vars
const baseUrl = config.baseUrl;

module.exports = {

  fields: {
    submit: 'input[type="submit"]'
  },

  async enterPin() {
    await I.retry(retryCount).amOnPage(baseUrl);
    try {
      await I.retry(retryCount).click('Accept analytics cookies');
      await I.retry(retryCount).click('Hide this message');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('//*[@id="caseCode"]');
      await I.retry(retryCount).fillField('#caseCode', config.citizenFrontEnd.caseCode);
      await I.retry(retryCount).fillField('#accessCode', config.citizenFrontEnd.accessCode);
    } catch {
      await I.retry(retryCount).fillField('#caseCode', config.citizenFrontEnd.caseCode);
      await I.retry(retryCount).fillField('#accessCode', config.citizenFrontEnd.accessCode);
    }
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('3');
  }
};
