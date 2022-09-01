const I = actor();
const retryCount = 3;

module.exports = {
  async clickRespondentLink() {
    I.wait('5');
    await I.retry(retryCount).click('//a[normalize-space()="Respondent"]');
    I.wait('2');
  },
  async clickViewAllDocuments () {

    await I.retry(retryCount).click('#view-all-documents');
        I.wait('2');
        await I.retry(retryCount).waitForText('Orders from the court');
        await I.retry(retryCount).waitForText("Respondent's documents");
        await I.retry(retryCount).waitForText("Applicant's documents");
        await I.retry(retryCount).waitForText('CAFCASS and local authority documents');
  }
};
