const I = actor();
const retryCount = 3;

module.exports = {

async clickDARespondent() {
    await I.retry(retryCount).waitForText('FL401 applications where you are an respondent');
    await I.retry(retryCount).click("(//a[@class='govuk-link'])[9]");
    I.wait('2');
  },

  async KeepYourDetailsPrivate() {
    await I.retry(retryCount).waitForText('Keep your details private');
    await I.retry(retryCount).click('#Keep your details private');
    I.wait('2');
    await I.retry(retryCount).waitForText('Does the other person named in your application (the respondent) know any of your contact details?');
        await I.retry(retryCount).click('#detailsKnown');
        
        await I.retry(retryCount).click('Save and continue');
        I.wait('2');
    
     await I.retry(retryCount).waitForText('Do you want to keep your contact details private from the other person named in the application (the)');
    await I.retry(retryCount).click('#startAlternative');
        
     await I.retry(retryCount).waitForText('Make sure you only select details the respondent does not already know.');
    await I.retry(retryCount).click('#contactDetailsPrivate');
    await I.retry(retryCount).click('#contactDetailsPrivate-2');
    await I.retry(retryCount).click('#contactDetailsPrivate-3');
    await I.retry(retryCount).click('#contactDetailsPrivate-4');
    
     await I.retry(retryCount).click('Save and continue');
        I.wait('3');
     await I.retry(retryCount).waitForText('The court will keep your contact details private');
    
        await I.retry(retryCount).click('Continue');
      },

      async supportYouNeedHappyPath() {
        await this.clickDAApplicant()
        await this.KeepYourDetailsPrivate()
    }
  };
    