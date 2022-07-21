const I = actor();
const retryCount = 3;

module.exports = {
  async clickRespondentLink() {
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a');
    I.wait('2');
  },

  async consentToApplication() {
    await I.retry(retryCount).click('#consent-to-the-application');
    I.wait('2');

    await I.retry(retryCount).waitForText('Your understanding of the application');
    await I.retry(retryCount).click('#doYouConsent-2');
    await I.retry(retryCount).fillField('#reasonForNotConsenting', 'test No Consent');

    await I.retry(retryCount).fillField('#applicationReceivedDate-day', '1');
    await I.retry(retryCount).fillField('#applicationReceivedDate-month', '10');
    await I.retry(retryCount).fillField('#applicationReceivedDate-year', '2020');

    await I.retry(retryCount).click('#courtPermission');
    await I.retry(retryCount).fillField('#courtOrderDetails', 'test-courtPermission');
    await I.retry(retryCount).click('Save and continue');

    I.wait('3');
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async consentToApplicationHappyPath() {
    await this.clickRespondentLink();
    await this.consentToApplication();
  },
};
