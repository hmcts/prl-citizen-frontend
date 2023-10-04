const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        placeOfBirth: '//*[@id="citizenUserPlaceOfBirth"]',
        placeofBirthValue: 'Birmingham',
        dateofBirthDay: '11',
        dateofBirthMonth: '12',
        dateofBirthYear: '2019',
        permissionFromCourt: 'test',
        keepYourDetailsPrivate: '#keep-your-details-private',
        yes: '#detailsKnown',
        saveAndContinue : '#main-form-submit',
        startAlternative: '#startAlternative',
        contactDetailsPrivate:  '#contactDetailsPrivate',
        contactDetailsPrivate2:  '#contactDetailsPrivate-2',
        contactDetailsPrivate3: '#contactDetailsPrivate-3',
        attendingToCourt: '#attendingToCourt',
        languageRequirements: '#languageRequirements',
        reasonableAdjustments2: '#reasonableAdjustments-2',
        helpCommunication2: '#helpCommunication-2',
        safetyArrangements2: '#safetyArrangements-2'
      
    },
  async clickFL401Link() {
    try {
      await I.wait('2');
      await I.retry(retryCount).click('Accept analytics cookies');
      await I.retry(retryCount).click('Hide this message');
      await I.wait('2'); 
    } catch {
      return;
    }
 
    await I.retry(retryCount).click('#tab_active-cases');
    await I.wait('5');
    //await I.retry(retryCount).click('#activI.wait('2');e-cases > table > tbody > tr:nth-child(2) > td:nth-child(1) > a');
    let numOfRows;
    try {
      numOfRows = await I.grabNumberOfVisibleElements(locate('tr').withChild(locate('td').withText('FL401')));
    } catch (error) {
      console.log('Could not grab number of rows:', error);
      return;
    }
    
    for(let i = 0; i < numOfRows; i++){
      try {
        await within(locate('tr').withChild(locate('td').withText('FL401')).at(i + 1), async () => {
       
          await I.click('a'); // click the first link in the row
        });
        break; // exit loop once link is clicked successfully
      } catch (error) {
        console.log(`Error in row ${i + 1}, but the click action might have been performed correctly:`, error);
      }
    }
    
   await I.wait('2');
  },

  

   async clickYourDetailsPrivate(){
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.keepYourDetailsPrivate);
    await I.wait('2');
    await I.retry(retryCount).waitForText('Does the other person named in your application (the respondent) know any of your contact details?'); 
    await I.retry(retryCount).click(this.fields.yes);
    await I.retry(retryCount).click(this.fields.saveAndContinue);
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you want to keep your contact details private from the other person named in the application (the'); 
    await I.retry(retryCount).click(this.fields.startAlternative);
    await I.seeCheckboxIsChecked(this.fields.contactDetailsPrivate) || await I.checkOption(this.fields.contactDetailsPrivate);
    await I.seeCheckboxIsChecked (this.fields.contactDetailsPrivate2) || await I.checkOption(this.fields.contactDetailsPrivate2);
    await I.seeCheckboxIsChecked (this.fields.contactDetailsPrivate3) || await I.checkOption(this.fields.contactDetailsPrivate3);
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
    await I.wait('5');
     await I.retry(retryCount).waitForText('The court will keep your contact details private');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
   },

   async clickEditContactDetails(){
    await I.wait('5');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    await I.wait('5');
    await I.retry(retryCount).waitForText('Place of birth');
    await I.retry(retryCount).click('#main-form > dl > div:nth-child(3) > dd.govuk-summary-list__actions > a');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.placeOfBirth, this.fields.placeofBirthValue);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
   },

   async  clickAboutYouSupportYourNeed(){
    await I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Would you be able to take part in hearings by video and phone?');
    await I.seeCheckboxIsChecked (this.fields.attendingToCourt) || await I.checkOption(this.fields.attendingToCourt);
    await I.retry(retryCount).click('Continue');
    await I.wait("2");
    await I.retry(retryCount).waitForText('Do you have any language requirements?');
    await I.seeCheckboxIsChecked (this.fields.languageRequirements) || await I.checkOption(this.fields.languageRequirements);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need suppor');  
    await I.seeCheckboxIsChecked (this.fields.reasonableAdjustments2) || await I.checkOption(this.fields.reasonableAdjustments2);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('I need help communicating and understanding');    
    await I.seeCheckboxIsChecked (this.fields.helpCommunication2) || await I.checkOption(this.fields.helpCommunication2);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you or the children need special safety arrangements at court?');     
    await I.seeCheckboxIsChecked (this.fields.safetyArrangements2) || await I.checkOption(this.fields.safetyArrangements2);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');

    await I.retry(retryCount).click(this.fields.saveAndContinue);
   },


   

  async aboutYouFL401(){
    await this.clickFL401Link();
    await this.clickYourDetailsPrivate();
    await this.clickEditContactDetails();
    await this.clickAboutYouSupportYourNeed();
  }
};
