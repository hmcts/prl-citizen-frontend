const I = actor();
const retryCount = 3;

module.exports = {
      async clickDAApplicant() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Active cases');
        await I.runAccessibilityTest();

        await I.retry(retryCount).waitForText('FL401');
        await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a:nth-child(2)');
      },

      async clickKeepYourDetailsPrivate1() {
        await I.retry(retryCount).click('#keep-your-details-private');
        I.wait('2');
      },

      async KeepYourDetailsPrivate2() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Does the other person named in your application (the respondent) know any of your contact details?');
        await I.runAccessibilityTest();

        await I.retry(retryCount).click('Yes');
        await I.retry(retryCount).click('Save and continue');
      },

      async KeepYourDetailsPrivate3() {
        I.wait('2');
        await I.retry(retryCount).waitForText('Do you want to keep your contact details private from the other person named in the application (the');
        await I.runAccessibilityTest();

        await I.retry(retryCount).click('Address');
        await I.retry(retryCount).click('Save and continue');
      },

      async KeepYourDetailsPrivate4() {
        I.wait('2');
        await I.retry(retryCount).waitForText('The court will keep your contact details private');
        await I.retry(retryCount).WaitForText('Address');
        await I.retry(retryCount).click('Save and continue');
      },

      async keepYourDetailsPrivateEvent() {
        await this.clickDAApplicant();
        await this.clickKeepYourDetailsPrivate1();
        await this.KeepYourDetailsPrivate2();
        await this.KeepYourDetailsPrivate3();
        await this.KeepYourDetailsPrivate4();
      }    
};