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
    saveAndContinue: '#main-form-submit',
    startAlternative: '#startAlternative',
    address: '#contactDetailsPrivate',
    phoneNumber: '#contactDetailsPrivate-2',
    email: '#contactDetailsPrivate-3',
    attendingToCourt: '#attendingToCourt',
    languageRequirements: '#languageRequirements',
    reasonableAdjustments2: '#reasonableAdjustments-2',
    helpCommunication2: '#helpCommunication-2',
    supportCase: '#support-you-need-during-your-case',
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

    let numOfRows;
    try {
      numOfRows = await I.grabNumberOfVisibleElements(locate('tr').withChild(locate('td').withText('FL401')));
    } catch (error) {
      console.log('Could not grab number of rows:', error);
      return;
    }

    for (let i = 0; i < numOfRows; i++) {
      try {
        await within(locate('tr').withChild(locate('td').withText('FL401')).at(i + 1), async () => {

          await I.click('a');
        });
        break; // exit loop once link is clicked successfully
      } catch (error) {
        console.log(`Error in row ${i + 1}, but the click action might have been performed correctly:`, error);
      }
    }

    await I.wait('2');
  },

  async clickYourDetailsPrivate() {
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.keepYourDetailsPrivate);
    await I.runAccessibilityTest();

    await I.wait('2');
    await I.retry(retryCount).waitForText('Does the other person named in your application (the respondent) know any of your contact details?');
    await I.retry(retryCount).click(this.fields.yes);
    await I.retry(retryCount).click(this.fields.saveAndContinue);
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you want to keep your contact details private from the other person named in the application (the');
    await I.retry(retryCount).click(this.fields.startAlternative);

    let isAddressChecked = await I.grabAttributeFrom(this.fields.address, 'checked');
    if (!isAddressChecked) {
      await I.checkOption(this.fields.address);
    }
    let isPhoneNumberChecked = await I.grabAttributeFrom(this.fields.phoneNumber, 'checked');
    if (!isPhoneNumberChecked) {
      await I.checkOption(this.fields.phoneNumber);
    }

    let isEmailChecked = await I.grabAttributeFrom(this.fields.phoneNumber, 'checked');
    if (!isEmailChecked) {
      await I.checkOption(this.fields.phoneNumber);
    }

    await I.wait('5');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
    await I.wait('5');
    await I.retry(retryCount).waitForText('The court will keep your contact details private');
    await I.retry(retryCount).click(this.fields.saveAndContinue);
  },

  async clickEditContactDetails() {
    await I.wait('5');
    await I.retry(retryCount).click('#confirm-or-edit-your-contact-details');
    await I.runAccessibilityTest();

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

  async clickAboutYouSupportYourNeed() {


    await I.wait('5');
    await I.retry(retryCount).click(this.fields.supportCase);
    await I.wait('5');
    await I.retry(retryCount).waitForText('Would you be able to take part in hearings by video and phone?');

    let isAttendingToCourtChecked = await I.grabAttributeFrom(this.fields.attendingToCourt, 'checked');
    if (!isAttendingToCourtChecked) {
      await I.checkOption(this.fields.attendingToCourt);
    }
    await I.retry(retryCount).click('Continue');
    await I.wait("2");
    await I.retry(retryCount).waitForText('Do you have any language requirements?');

    let isLanguageRequirementsChecked = await I.grabAttributeFrom(this.fields.languageRequirements, 'checked');
    if (!isLanguageRequirementsChecked) {
      await I.checkOption(this.fields.languageRequirements);
    }

    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need suppor');

    let isReasonableAdjustments2Checked = await I.grabAttributeFrom(this.fields.reasonableAdjustments2, 'checked');
    if (!isReasonableAdjustments2Checked) {
      await I.checkOption(this.fields.reasonableAdjustments2);
    }

    await I.retry(retryCount).click('Continue');
    await I.wait('2');

    await I.retry(retryCount).waitForText('I need help communicating and understanding');

    let isHelpCommunication2Checked = await I.grabAttributeFrom(this.fields.helpCommunication2, 'checked');
    if (!isHelpCommunication2Checked) {
      await I.checkOption(this.fields.helpCommunication2);
    }
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Do you or the children need special safety arrangements at court?');

    let isSafetyArrangements2Checked = await I.grabAttributeFrom(this.fields.safetyArrangements2, 'checked');
    if (!isSafetyArrangements2Checked) {
      await I.checkOption(this.fields.safetyArrangements2);
    }
    await I.retry(retryCount).click('Continue');
    await I.wait('2');

    await I.retry(retryCount).click(this.fields.saveAndContinue);
  },

  async aboutYouFL401() {
    await this.clickFL401Link();
    await this.clickYourDetailsPrivate();
    await this.clickEditContactDetails();
    await this.clickAboutYouSupportYourNeed();

  }
};
