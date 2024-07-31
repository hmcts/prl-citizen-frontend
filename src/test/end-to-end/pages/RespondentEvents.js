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
        activeCases: '//*[@id="active-cases"]/table/tbody/tr',
        doYouHaveLegalRepLink: '//a[contains(text(),"Do you have a legal representative?")]',
        saveAndContinueButton: '//button[contains(text(),"Save and continue")]',
        continueButton: '//button[contains(text(),"Continue")]',
        submitButton: '//button[contains(text(),"Submit")]',
        saveAndSubmitButton: '//button[contains(text(),"Save and submit")]',
        reviewAndSubmitButton: '//button[contains(text(),"Review and submit")]',
        submitYourResponseButton: '//button[contains(text(),"Submit your response")]',
        startNowButton: '//button[contains(text(),"Start now")]',
        closeAndReturnToCaseOverviewButton: '//button[contains(text(),"Close and return to case overview")]'

    },

    async clickEventLink(linkText){
      const selector = `//a[contains(text(),"${linkText}")]`;
      await I.waitForElement(selector);
      await I.click(selector);
    },

    async clickEditLinkForField(fieldName){
      const selector = `//div[contains(@class,'govuk-summary-list')]//dt[contains(@class,'govuk-summary-list__key')][contains(text(),"${fieldName}")]/..//a`;
      await I.waitForElement(selector);
      await I.click(selector);
    },

  async clickRespondentLink(caseId) {
    try {
      await I.wait('2');
      await I.retry(retryCount).click('Accept analytics cookies');
      await I.retry(retryCount).click('Hide this message');
      await I.wait('2'); 
    } catch {
      return;
    }
    
    await I.waitForElement('#tab_active-cases');
    await I.retry(retryCount).click('#tab_active-cases');
    await I.waitForText('Ongoing cases');
    await I.click(`//a[contains(text(),'${caseId}')]`);
   
  },

  async clickRespondToApplication() {
    await I.waitForElement('#respondToTheApplication')
    await I.runAccessibilityTest();

    await I.retry(retryCount).click('#respondToTheApplication');

   },

   async setLegalRepresenttation(isLegaLRepresentativePresent){
    await I.waitForElement(this.fields.doYouHaveLegalRepLink);
     await I.runAccessibilityTest();

     await I.click(this.fields.doYouHaveLegalRepLink);
     await I.waitForText('Will you be using a legal representative to respond to the application?');
     await I.click(isLegaLRepresentativePresent ? '#legalRepresentation' : '#legalRepresentation-2'); 
     await I.click(this.fields.saveAndContinueButton);
     await I.waitForText('Complete your response');
     await I.click(this.fields.continueButton);

   },

   async clickRespondConsentToApplication() {
     await I.waitForElement('#consent-to-the-application');
     await I.runAccessibilityTest();

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
     await this.clickEventLink('Keep your details private');
     await I.waitForText('Keeping your contact details private');
     await I.runAccessibilityTest();

     await I.retry(retryCount).click('#detailsKnown');
    await I.click(this.fields.continueButton);

     await I.waitForText('Do you want to keep your contact details private from the other people named in the application (the applicants)?');
     await I.checkOption('#startAlternative');


     await I.checkOption('.govuk-checkboxes #contactDetailsPrivate');
     await I.checkOption('.govuk-checkboxes #contactDetailsPrivate-2');
     await I.checkOption('.govuk-checkboxes #contactDetailsPrivate-3');
     await I.click(this.fields.saveAndContinueButton);

     await I.waitForText('The court will keep your contact details private');
     await I.runAccessibilityTest();

     await I.click(this.fields.continueButton);

     await I.waitForText('About you');
   },

   async completeContactPreference(){
     await this.clickEventLink('Contact preferences');
     await I.waitForText('How would you prefer to be contacted?');
     await I.runAccessibilityTest();

     await I.checkOption('#partyContactPreference');
     await I.click(this.fields.saveAndContinueButton);


     await I.waitForText('Make sure that your contact details are up to date.');
     await I.runAccessibilityTest();

     await I.click(this.fields.submitButton);
     await I.waitForText('Contact preferences updated');
     await I.click(this.fields.continueButton);
     await I.waitForText('Respond to the application');

   }, 

   async clickEditContactDetails(){
     await this.clickEventLink('Confirm or edit your contact details');
     await this.clickEditLinkForField('Place of birth');

     await I.waitForElement(this.fields.placeOfBirth);
     await I.runAccessibilityTest();

     await I.fillField('#citizenUserDateOfBirth-day', '01');
     await I.fillField('#citizenUserDateOfBirth-month', '01');
     await I.fillField('#citizenUserDateOfBirth-year', '2020');
     await I.retry(retryCount).fillField(this.fields.placeOfBirth, this.fields.placeofBirthValue);
    await I.click(this.fields.continueButton);
     await I.waitForText('Check your details');

     await this.clickEditLinkForField('Address');
     await I.fillField('#citizenUserAddressPostcode','B1 1LS');
     await I.click(this.fields.continueButton);
     await I.waitForText('Select an address');
     const firstAddress = await I.grabTextFrom('#citizenUserSelectAddress option:nth-of-type(2)');
     await I.selectOption('#citizenUserSelectAddress', firstAddress);
     await I.click(this.fields.continueButton);
     await I.waitForText('Your Address');
     await I.runAccessibilityTest();

     await I.click(this.fields.continueButton);
     await I.waitForText('Have you lived at this address for more than 5 years?');
     await I.checkOption('#isAtAddressLessThan5Years');
     await I.click(this.fields.continueButton);
     await I.waitForText('Check your details');
     await I.runAccessibilityTest();


     await this.clickEditLinkForField('Phone number');
     await I.waitForText('Your contact details');
     await I.fillField('#citizenUserPhoneNumber','09876543211');
     await I.click(this.fields.continueButton);
     await I.waitForText('Check your details');


     await I.click(this.fields.saveAndContinueButton);
     await I.waitForText('Respond to the application');

   },

   async  clickAboutYouSupportYourNeed(){
     await this.clickEventLink('Support you need during your case');
     await I.waitForText('Requesting support');
     await I.runAccessibilityTest();

      await I.click(this.fields.startNowButton);
     await I.waitForText('Language requirements and special arrangements');
     await I.click(this.fields.continueButton);

     await I.waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
     await I.checkOption('#_enabled-PF0001-RA0001-RA0004');
     await I.checkOption('#_enabled-PF0001-RA0001-RA0002');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need adjustments to get to, into and around our buildings');
     await I.checkOption('#_enabled-PF0001-RA0001-RA0004-RA0025');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need documents in an alternative format');
     await I.runAccessibilityTest();

     await I.checkOption('#_enabled-PF0001-RA0001-RA0002-RA0010');
     await I.click(this.fields.continueButton);

     await I.waitForText("Review the support you've requested");
     await I.runAccessibilityTest();

    await I.click(this.fields.submitButton);

     await I.waitForText('You have submitted your request to the court');
     await I.runAccessibilityTest();

    await I.click(this.fields.closeAndReturnToCaseOverviewButton);

     await I.waitForText('About you');


   },
//About you section ---- three for C100

   async clickRespondYourDetailsPrivate(){
     await this.clickEventLink('Keep your details private');
     await I.waitForText('Do the other people named in this application (the applicants) know any of your contact details?');
     await I.runAccessibilityTest();

     await I.checkOption('#detailsKnown');
     await I.click(this.fields.continueButton);

     await I.waitForText('Do you want to keep your contact details private from the other people named in the application (the applicants)?');
     await I.runAccessibilityTest();

     await I.checkOption('#startAlternative');

     await I.waitForElement('#contactDetailsPrivate');
     await I.checkOption('#contactDetailsPrivate');
     await I.checkOption('#contactDetailsPrivate-2');
     await I.checkOption('#contactDetailsPrivate-3');

     await I.click(this.fields.saveAndContinueButton);

     await I.waitForText('The court will keep your contact details private');
     await I.runAccessibilityTest();

     await I.click(this.fields.continueButton);

   },

   async clickRespondYourDetailsSupportYourNeed(){
    I.wait('2');
    await I.retry(retryCount).click('#support_you_need_during_your_case');
     await I.waitForText('Would you be able to take part in hearings by video and phone?');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_typeOfHearing');
     await I.checkOption('#ra_typeOfHearing-2');
      await I.click(this.fields.continueButton);


     await I.waitForText('Do you have any language requirements?');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_languageNeeds');
     await I.checkOption('#ra_languageNeeds-2');
     await I.click(this.fields.continueButton);

     await I.waitForText('Do you or the children need special arrangements at court?');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_specialArrangements');
     await I.checkOption('#ra_specialArrangements-2');
     await I.checkOption('#ra_specialArrangements-3');
     await I.checkOption('#ra_specialArrangements-4');
     await I.checkOption('#ra_specialArrangements-5');
     await I.checkOption('#ra_specialArrangements-6');
     await I.click(this.fields.continueButton);


     await I.waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
     await I.checkOption('#ra_disabilityRequirements');
     await I.checkOption('#ra_disabilityRequirements-2');
     await I.checkOption('#ra_disabilityRequirements-3');
     await I.checkOption('#ra_disabilityRequirements-4');
     await I.checkOption('#ra_disabilityRequirements-5');
     await I.click(this.fields.continueButton);


     await I.waitForText('I need documents in an alternative format');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_documentInformation-2');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need help communicating and understanding');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_communicationHelp-2');
     await I.checkOption('#ra_communicationHelp-3');
     await I.checkOption('#ra_communicationHelp-4');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need to bring support with me to a court hearing');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_supportCourt-3');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need something to feel comfortable during a court hearing');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_feelComportable-2');
     await I.checkOption('#ra_feelComportable-3');
     await I.click(this.fields.continueButton);

     await I.waitForText('I need help travelling to, or moving around court buildings');
     await I.runAccessibilityTest();

     await I.checkOption('#ra_travellingCourt-2');
     await I.checkOption('#ra_travellingCourt-3');
     await I.checkOption('#ra_travellingCourt-4');
     await I.click(this.fields.continueButton);

     await I.waitForText('Your hearing needs and requirments');
     await I.runAccessibilityTest();

     await I.click(this.fields.saveAndContinueButton);

   },

  async completeMakeAllegationsOfHarmAndViolence(){
    await this.clickEventLink('Make allegations of harm and violence');
    await I.waitForText('The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm');
    await I.runAccessibilityTest();

    await I.click(this.fields.continueButton);

    await I.waitForText('Do you have any concerns for your safety or the safety of the children?');
    await I.checkOption('#c1A_haveSafetyConcerns-2');
    await I.click(this.fields.continueButton);
    await I.waitForText('Check your Answers');
    await I.runAccessibilityTest();

    await I.click(this.fields.saveAndSubmitButton);
    await I.waitForText('Respond to the application');
  },

   async clickOnInternationalElement(){
     await I.waitForElement('a#international-factors');
     await I.runAccessibilityTest();

     await I.retry(retryCount).click('a#international-factors');
     await I.waitForText("Are the children's lives mainly based outside of England and Wales?");
     await I.checkOption('#start-2');
    await I.click(this.fields.continueButton);

     await I.waitForText("Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?");
     await I.runAccessibilityTest();

     await I.checkOption('#parents-2');
     await I.click(this.fields.continueButton);


     await I.waitForText("Could another person in the application apply for a similar order in a country outside England or Wales?");
     await I.runAccessibilityTest();

     await I.checkOption('#jurisdiction-2');
     await I.click(this.fields.continueButton);

     await I.waitForText("Has another country asked (or been asked) for information or help for the children?");
     await I.runAccessibilityTest();

     await I.checkOption('#request-2');
     await I.click(this.fields.continueButton);

     await I.waitForText("Check your answers");
     await I.runAccessibilityTest();

     await I.waitForText("nternational elements");
     await I.click(this.fields.saveAndContinueButton);

   },

   async submitMIAM(){
     await I.waitForElement('#medation-miam');
     await I.runAccessibilityTest();

     await I.click('#medation-miam');
     await I.waitForText('Have you attended a Mediation Information and Assessment Meeting (MIAM)?');
     await I.runAccessibilityTest();

     await I.checkOption('#miamStart')
     await I.click(this.fields.continueButton);
     await I.waitForText('Mediation Information and Assessment Meeting (MIAM) attendance');
     await I.click(this.fields.saveAndContinueButton);
   },

  async completeCurrentOrPreviousProceedings(){
    await this.clickEventLink('Current or previous proceedings');
    await I.waitForText('Have you or the children ever been involved in court proceedings?');
    await I.runAccessibilityTest();

    await I.checkOption('#proceedingsStart-2');
    await I.checkOption('#proceedingsStartOrder-2');
    await I.click(this.fields.continueButton);
    await I.waitForText('Check your answers');
    await I.click(this.fields.saveAndContinueButton);
    await I.waitForText('Respond to the application');

  },

  async completeReviewAndSubmit(){
    await I.waitForElement(this.fields.reviewAndSubmitButton);
    await I.click(this.fields.reviewAndSubmitButton);
    await I.waitForText('Check your answers');
    await I.click('#declarationCheck');
    await I.click(this.fields.submitYourResponseButton);
    await I.waitForText('Equality and diversity questions');
    await I.runAccessibilityTest();

    await I.click(`//button[contains(text(),"I don't want to answer these questions")]`);
    await I.waitForText('Response submitted successfully');
    await I.click(this.fields.continueButton);
  },

   async respondentTaskList(caseId) {
     await this.clickRespondentLink(caseId);

    await this.clickRespondToApplication();

     await this.setLegalRepresenttation();
    await this.clickRespondConsentToApplication();
    await this.clickRespondYourDetailsPrivate();

     await this.completeContactPreference();
     await this.clickEditContactDetails();
    await this.clickRespondYourDetailsSupportYourNeed();


     await this.submitMIAM();
     await this.completeCurrentOrPreviousProceedings();

     await this.completeMakeAllegationsOfHarmAndViolence();
    await this.clickOnInternationalElement();
    await this.completeReviewAndSubmit();
  },
  async respondentAboutYou(caseId){
    await this.clickRespondentLink(caseId);
    await this.clickYourDetailsPrivate();
    await this.completeContactPreference();
    await this.clickEditContactDetails();
    await this.clickAboutYouSupportYourNeed();
  }
};
