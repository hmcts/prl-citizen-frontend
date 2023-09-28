const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        placeOfBirth: '//*[@id="citizenUserPlaceOfBirth"]',
        placeofBirthValue: 'Birmingham',
        dateofBirthDay: '11',
        dateofBirthMonth: '12',
        dateofBirthYear: '2019',
        permissionFromCourt: 'test'
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

  async clickRespondToApplication() {
   await I.wait('2');
    await I.retry(retryCount).click('#respond_to_application');
   await I.wait('2');
   },

   async clickRespondConsentToApplication() {
   await I.wait('2');
    await I.retry(retryCount).click('#consent-to-the-application');
   await I.wait('2');
    await I.retry(retryCount).click('#doYouConsent');
    await I.retry(retryCount).fillField("#applicationReceivedDate-day", this.fields.dateofBirthDay);
    await I.retry(retryCount).fillField("#applicationReceivedDate-month", this.fields.dateofBirthMonth);
    await I.retry(retryCount).fillField("#applicationReceivedDate-year", this.fields.dateofBirthYear);
    await I.retry(retryCount).click('#courtPermission');
    await I.retry(retryCount).fillField("#courtOrderDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(5) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickYourDetailsPrivate(){
    await I.wait('2');
    await I.retry(retryCount).click('#keep-your-details-private');
    await I.wait('2');
    await I.retry(retryCount).click('#detailsKnown');
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#startAlternative');
    await I.seeCheckboxIsChecked('#contactDetailsPrivate') || await I.checkOption('#contactDetailsPrivate');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-2') || await I.checkOption('#contactDetailsPrivate-2');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-3') || await I.checkOption('#contactDetailsPrivate-3');
    await I.wait('5');
    await I.retry(retryCount).click('#main-form-submit');
    await I.wait('5');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickEditContactDetails(){
    await I.wait('5');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    await I.wait('5');
    await I.retry(retryCount).click('#main-form > dl > div:nth-child(3) > dd.govuk-summary-list__actions > a');
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.placeOfBirth, this.fields.placeofBirthValue);
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async  clickAboutYouSupportYourNeed(){
    await I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#attendingToCourt') || await I.checkOption('#attendingToCourt');
    await I.retry(retryCount).click('#main-form > div:nth-child(7) > div > button');
    await I.wait("2");
    await I.seeCheckboxIsChecked ('#languageRequirements') || await I.checkOption('#languageRequirements');
    await I.retry(retryCount).click('#main-form > div:nth-child(8) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#safetyArrangements-2') || await I.checkOption('#safetyArrangements-2');
   // await I.retry(retryCount).click('#main-form > div:nth-child(12) > div > button');
   await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#reasonableAdjustments-2') || await I.checkOption('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(10) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#docsSupport-3') || await I.checkOption('#docsSupport-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#helpCommunication-3') || await I.checkOption('#helpCommunication-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('Assistance / guide dog') || await I.checkOption('Assistance / guide dog');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#courtComfort-2') || await I.checkOption('#courtComfort-2');
    await I.retry(retryCount).click('Continue');
   await I.wait('2');
    await I.seeCheckboxIsChecked ('#travellingToCourt-3') || await I.checkOption('#travellingToCourt-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },
//About you section ---- three for C100

   async clickRespondYourDetailsPrivate(){
    await I.wait('2');
    await I.retry(retryCount).click('#keep-your-details-private');
   await I.wait('2');
    await I.retry(retryCount).click('#detailsKnown');
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#startAlternative');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate') || await I.checkOption('#contactDetailsPrivate');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-2') || await I.checkOption('#contactDetailsPrivate-2');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-3') || await I.checkOption('#contactDetailsPrivate-3');
    await I.retry(retryCount).click('#main-form-submit');
   await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickRespondYourDetailsSupportYourNeed(){
   await I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#attendingToCourt') || await I.checkOption('#attendingToCourt');
    await I.retry(retryCount).click('#main-form > div:nth-child(7) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#languageRequirements') || await I.checkOption('#languageRequirements');
    await I.retry(retryCount).click('#main-form > div:nth-child(8) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#safetyArrangements-2') || await I.checkOption('#safetyArrangements-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(12) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#reasonableAdjustments-2') || await I.checkOption('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(10) > div > button');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#docsSupport-3') || await I.checkOption('#docsSupport-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#helpCommunication-3') || await I.checkOption('#helpCommunication-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('Assistance / guide dog') || await I.checkOption('Assistance / guide dog');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#courtComfort-2') || await I.checkOption('#courtComfort-2');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.seeCheckboxIsChecked ('#travellingToCourt-3') || await I.checkOption('#travellingToCourt-3');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickOnMIAM(){
    await I.wait('2');
    await I.retry(retryCount).click('#medation-miam');
    await I.wait('2');
    await I.retry(retryCount).click('#miamStart');
    await I.retry(retryCount).click('#main-form > div:nth-child(4) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
    await I.wait('2');
   },

   async clickOnInternationalElement(){
    await I.wait('2');
    await I.retry(retryCount).click('#international-factors');
    await I.wait('2');
    await I.retry(retryCount).click('#start');
    await I.retry(retryCount).fillField("#iFactorsStartProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#parents');
    await I.retry(retryCount).fillField("#iFactorsParentsProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#jurisdiction');
    await I.retry(retryCount).fillField("#iFactorsJurisdictionProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#request');
    await I.retry(retryCount).fillField("#iFactorsRequestProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    await I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

  async aboutYouFL401(){
    await this.clickFL401Link();
    await this.clickYourDetailsPrivate();
    await this.clickEditContactDetails();
    await this.clickAboutYouSupportYourNeed();
  }
};
