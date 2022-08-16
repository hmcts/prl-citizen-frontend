const I = actor();
const retryCount = 3;

module.exports = {

  async clickRespondentLink() {
    I.wait('2');
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a');
  }
};
