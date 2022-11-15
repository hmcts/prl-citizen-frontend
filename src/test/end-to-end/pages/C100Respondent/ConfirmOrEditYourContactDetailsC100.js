const I = actor();
const retryCount = 3;
module.exports = {

  async clickCARespondent() {
    await I.retry(retryCount).waitForText('C100 applications where you are an respondent');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/16661841571620'])");
    I.wait('1');
},
  async ConfirmContactDetailsCA() {
    await I.retry(retryCount).waitForText('confirm-or-edit-your-contact-details');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    I.wait('2');
      await I.retry(retryCount).waitForText('Name');
      await I.retry(retryCount).click("(//a[@class='govuk-link'])[4]");
      I.wait('1');
      await I.retry(retryCount).see('Previous name(s), if any (optional)');
      await I.retry(retryCount).fillField('//input[@id="previousName"]', 'Rob');
      await I.retry(retryCount).click('Continue');
      I.wait('2');
      await I.retry(retryCount).click('Save and continue');
      I.wait('1');
},
  
  async HappyConfirmDetailsCA() {
    await this.clickCARespondent();
    await this.ConfirmContactDetailsCA();
}
};
