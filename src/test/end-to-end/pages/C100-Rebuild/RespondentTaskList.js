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
  async clickRespondentLink() {
    I.wait('2');
    await I.retry(retryCount).click('#tab_active-cases');
    await I.retry(retryCount).click('#active-cases > table > tbody > tr:nth-child(2) > td:nth-child(1) > a');
    I.wait('2');
  },

  async clickRespondToApplication() {
    I.wait('2');
    await I.retry(retryCount).click('#respond_to_application');
    I.wait('2');
   },

   async clickRespondConsentToApplication() {
    I.wait('2');
    await I.retry(retryCount).click('#consent-to-the-application');
    I.wait('2');
    await I.retry(retryCount).click('#doYouConsent');
    await I.retry(retryCount).fillField("#applicationReceivedDate-day", this.fields.dateofBirthDay);
    await I.retry(retryCount).fillField("#applicationReceivedDate-month", this.fields.dateofBirthMonth);
    await I.retry(retryCount).fillField("#applicationReceivedDate-year", this.fields.dateofBirthYear);
    await I.retry(retryCount).click('#courtPermission');
    await I.retry(retryCount).fillField("#courtOrderDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(5) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickYourDetailsPrivate(){
    I.wait('2');
    await I.retry(retryCount).click('#keep-your-details-private');
    I.wait('2');
    await I.retry(retryCount).click('#detailsKnown');
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#startAlternative');
    await I.seeCheckboxIsChecked('#contactDetailsPrivate') || await I.checkOption('#contactDetailsPrivate');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-2') || await I.checkOption('#contactDetailsPrivate-2');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-3') || await I.checkOption('#contactDetailsPrivate-3');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickEditContactDetails(){
    I.wait('2');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    I.wait('2');
    await I.retry(retryCount).click('#main-form > dl > div:nth-child(3) > dd.govuk-summary-list__actions > a');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.placeOfBirth, this.fields.placeofBirthValue);
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async  clickAboutYouSupportYourNeed(){
    I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#attendingToCourt') || await I.checkOption('#attendingToCourt');
    await I.retry(retryCount).click('#main-form > div:nth-child(7) > div > button');
    I.wait("2");
    await I.seeCheckboxIsChecked ('#languageRequirements') || await I.checkOption('#languageRequirements');
    await I.retry(retryCount).click('#main-form > div:nth-child(8) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#safetyArrangements-2') || await I.checkOption('#safetyArrangements-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(12) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#reasonableAdjustments-2') || await I.checkOption('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(10) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#helpCommunication-3') || await I.checkOption('#helpCommunication-3');
    await I.retry(retryCount).click('#main-form > div:nth-child(16) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },


   async clickRespondYourDetailsPrivate(){
    I.wait('2');
    await I.retry(retryCount).click('#keep-your-details-private');
    I.wait('2');
    await I.retry(retryCount).click('#detailsKnown');
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#startAlternative');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate') || await I.checkOption('#contactDetailsPrivate');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-2') || await I.checkOption('#contactDetailsPrivate-2');
    await I.seeCheckboxIsChecked ('#contactDetailsPrivate-3') || await I.checkOption('#contactDetailsPrivate-3');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },

   async clickRespondYourDetailsSupportYourNeed(){
    I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#attendingToCourt') || await I.checkOption('#attendingToCourt');
    await I.retry(retryCount).click('#main-form > div:nth-child(7) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#languageRequirements') || await I.checkOption('#languageRequirements');
    await I.retry(retryCount).click('#main-form > div:nth-child(8) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#safetyArrangements-2') || await I.checkOption('#safetyArrangements-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(12) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#reasonableAdjustments-2') || await I.checkOption('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#main-form > div:nth-child(10) > div > button');
    I.wait('2');
    await I.seeCheckboxIsChecked ('#helpCommunication-3') || await I.checkOption('#helpCommunication-3');
    await I.retry(retryCount).click('#main-form > div:nth-child(16) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
   },

   async clickOnMIAM(){
    I.wait('2');
    await I.retry(retryCount).click('#medation-miam');
    I.wait('2');
    await I.retry(retryCount).click('#miamStart');
    await I.retry(retryCount).click('#main-form > div:nth-child(4) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
    I.wait('2');
   },

   async clickOnInternationalElement(){
    I.wait('2');
    await I.retry(retryCount).click('#international-factors');
    I.wait('2');
    await I.retry(retryCount).click('#start');
    await I.retry(retryCount).fillField("#iFactorsStartProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#parents');
    await I.retry(retryCount).fillField("#iFactorsParentsProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#jurisdiction');
    await I.retry(retryCount).fillField("#iFactorsJurisdictionProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#request');
    await I.retry(retryCount).fillField("#iFactorsRequestProvideDetails", this.fields.permissionFromCourt);
    await I.retry(retryCount).click('#main-form > div:nth-child(3) > div > button');
    I.wait('2');
    await I.retry(retryCount).click('#main-form-submit');
   },
   async respondentTaskList() {
    await this.clickRespondentLink();
    await this.clickRespondToApplication();
    await this.clickRespondConsentToApplication();
    await this.clickRespondYourDetailsPrivate();
    await this.clickRespondToApplication();
    await this.clickRespondYourDetailsSupportYourNeed();
    await this.clickOnMIAM();
    await this.clickOnInternationalElement();
  },
  async respondentAboutYou(){
    await this.clickRespondentLink();
    await this.clickYourDetailsPrivate();
    await this.clickEditContactDetails();
    await this.clickAboutYouSupportYourNeed();
  }
};
