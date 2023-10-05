const I = actor();
const retryCount = 3;

module.exports = {
    async clickDAApplicant() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Active cases');
        await I.retry(retryCount).waitForText('FL401');
        await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a:nth-child(2)');
    },

    async clickConfirmOrEditYourContactDetails() {
        await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
        I.wait('2');
      },

      async CheckYourDetails() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Check your details');
        await I.retry(retryCount).click('Edit Name');
        await I.retry(retryCount).fillField('Place of birth', 'London');
        await I.retry(retryCount).click('#main-form-submit');
      },

      async CheckYourDetails2() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Read the information to make sure it is correct, and add any missing details');
        await I.retry(retryCount).click('Save and continue');
      },

      async confirmOrEditYourContactDetailsEvent() {
        await this.clickDAApplicant();
        await this.clickConfirmOrEditYourContactDetails();
        await this.CheckYourDetails();
        await this.CheckYourDetails2();
      }
    };
    