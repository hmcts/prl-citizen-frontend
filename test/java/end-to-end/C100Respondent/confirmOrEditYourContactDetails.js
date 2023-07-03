const I = actor();

module.exports = {

  async triggerEvent() {
    await I.triggerEvent('#confirm-or-edit-your-contact-details');
  },

  async checkYourDetails() {
    const retryCount = 3;
    await I.waitForText('Date of birth');
    await I.click('Edit Name');
    await I.waitForText('Your name and date of birth');
    await I.fillField('Your first name', 'Smith');
    await I.fillField('Your last name', 'William');
    await I.fillField("Previous name(s), if any (optional)", 'Richard');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-day', '10');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-month', '10');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-year', '2010');
    await I.fillField('Place of birth', 'London');
    await I.click('Continue');
  },
  async checkYourDetails2() {
    const retryCount = 3;
    await I.waitForText('Address');
    await I.click('Edit Address');
    await I.selectPostCodeLookupAddress('Your current postcode', 'Sw200lr');
    I.wait('2');

    await I.waitForText('Your name and date of birth');
    await I.fillField('Your first name', 'Smith');
    await I.fillField('Your last name', 'William');
    await I.fillField("Previous name(s), if any (optional)", 'Richard');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-day', '10');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-month', '10');
    await I.retry(retryCount).fillField('#citizenUserDateOfBirth-year', '2010');
    await I.fillField('Place of birth', 'London');
    await I.click('Continue');
  },

  async runEventcheckYourDetails() {
    await this.triggerEvent();
    I.wait('2');
    await this.checkYourDetails();
  }
};