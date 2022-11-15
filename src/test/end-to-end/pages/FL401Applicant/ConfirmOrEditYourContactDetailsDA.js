const I = actor();
const retryCount = 3;
module.exports = {

async clickDAApplicant() {
    await I.retry(retryCount).waitForText('FL401 applications where you are an applicant');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/1666183410575606'])");
    I.wait('1');
},

async ConfirmContactDetailsApplicant() {
    await I.retry(retryCount).waitForText('confirm-or-edit-your-contact-details');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    I.wait('2');
      await I.retry(retryCount).waitForText('Date of birth');
      await I.retry(retryCount).click('Edit Date of birth');
      I.wait('1');
      await I.retry(retryCount).fillField('#citizenUserDateOfBirth-day', '3');
      await I.retry(retryCount).fillField('#citizenUserDateOfBirth-month', '4');
      await I.retry(retryCount).fillField('#citizenUserDateOfBirth-year', '1980');
      await I.retry(retryCount).fillField('#citizenUserPlaceOfBirth', 'London');
      await I.retry(retryCount).click('Continue');
      I.wait('2');
      await I.retry(retryCount).click('Save and continue');
    I.wait('1');
},
async ApplicantConfirmDetails() {
    await this.clickDAApplicant();
    await this.ConfirmContactDetailsApplicant();
  }
  };

  