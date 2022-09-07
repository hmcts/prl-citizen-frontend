const I = actor();
const retryCount = 3;

module.exports = {
  async clickRespondentLink() {
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a');
    I.wait('2');
  },
  async clickInternationalElement() {
    await I.retry(retryCount).click('#international-factors');
    I.wait('2');

    await I.retry(retryCount).waitForText('Do the children live outside of England or Wales?');
    await I.retry(retryCount).click('#start');
    await I.retry(retryCount).fillField('#iFactorsStartProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');

    await I.retry(retryCount).waitForText('Do the childrens\' parents or anyone significant to the children live outside of England or Wales?');
    await I.retry(retryCount).click('#parents');
    await I.retry(retryCount).fillField('#iFactorsParentsProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');

    await I.retry(retryCount).waitForText('Could another person in the application apply for a similar order in a country outside England or Wales?');
    await I.retry(retryCount).click('#jurisdiction');
    await I.retry(retryCount).fillField('#iFactorsJurisdictionProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');

    await I.retry(retryCount).waitForText('Has another country asked (or been asked) for information or help for the children?');
    await I.retry(retryCount).click('#request');
    await I.retry(retryCount).fillField('#iFactorsRequestProvideDetails', 'test');
    await I.retry(retryCount).click('Continue');
    I.wait('2');

    I.wait('3');
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async clickInternationalElementHappyPath() {
    await this.clickRespondentLink();
    await this.clickInternationalElement();
  },
};
