const I = actor();
const retryCount = 3;

module.exports = {
  async clickCADARespondent() {
    I.wait('2');
    await I.retry(retryCount).waitForText('DA Applicant');
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a:nth-child(5)');
    I.wait('2');
  },

  async clickSupportYouNeedDuringYourCase() {
    await I.retry(retryCount).click('#support-you-need-during-your-case');
    I.wait('2');
  },

  async attendingTheCourt() {
    await I.retry(retryCount).waitForText('Would you be able to take part in hearings by video and phone?');
    await I.retry(retryCount).click('#attendingToCourt');
    await I.retry(retryCount).click('#attendingToCourt-2');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async languageRequirements() {
    await I.retry(retryCount).waitForText('Do you have any language requirements?');
    await I.retry(retryCount).click('#languageRequirements');
    await I.retry(retryCount).click('#languageRequirements-2');
    await I.retry(retryCount).click('#languageRequirements-3');
    await I.retry(retryCount).fillField('#languageDetails', 'Test Language Details');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async reasonableAdjustments() {
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
    await I.retry(retryCount).click('#reasonableAdjustments');
    await I.retry(retryCount).click('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#reasonableAdjustments-3');
    await I.retry(retryCount).click('#reasonableAdjustments-4');
    await I.retry(retryCount).click('#reasonableAdjustments-5');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },
  async reasonableAdjustments2() {
    await I.retry(retryCount).waitForText('I need documents in an alternative format');
    await I.retry(retryCount).click('#docsSupport');
    await I.retry(retryCount).fillField('#docsDetails', 'respondentDocsSupport');
    await I.retry(retryCount).click('#docsSupport-2');
    await I.retry(retryCount).click('#docsSupport-3');
    await I.retry(retryCount).click('#docsSupport-4');
    await I.retry(retryCount).fillField('#largePrintDetails', 'respondentLargePrintDetails');
    await I.retry(retryCount).click('#docsSupport-5');
    await I.retry(retryCount).click('#docsSupport-6');
    await I.retry(retryCount).click('#docsSupport-7');
    await I.retry(retryCount).click('#docsSupport-8');
    await I.retry(retryCount).fillField('#otherDetails', 'Reasonable Adjustments 2');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async reasonableAdjustments3() {
    await I.retry(retryCount).waitForText('I need help communicating and understanding');
    await I.retry(retryCount).click('#helpCommunication');
    await I.retry(retryCount).click('#helpCommunication-2');
    await I.retry(retryCount).click('#helpCommunication-3');
    await I.retry(retryCount).click('#helpCommunication-4');
    await I.retry(retryCount).click('#helpCommunication-5');
    await I.retry(retryCount).fillField('#signLanguageDetails', 'respondentSignLanguageDetails');
    await I.retry(retryCount).click('#respondentHelpCommunication-6');
    await I.retry(retryCount).click('#respondentHelpCommunication-7');
    await I.retry(retryCount).click('#respondentHelpCommunication-8');
    await I.retry(retryCount).click('#respondentHelpCommunication-9');
    await I.retry(retryCount).click('#respondentHelpCommunication-10');
    await I.retry(retryCount).click('#respondentHelpCommunication-11');
    await I.retry(retryCount).fillField('#respondentDescribeOtherNeed', 'Reasonable Adjustments 3');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async reasonableAdjustments4() {
    await I.retry(retryCount).waitForText('I would need to bring support with me to a court hearing');
    await I.retry(retryCount).click('#respondentCourtHearing');
    await I.retry(retryCount).fillField('#respondentSupportWorkerDetails', 'respondentSupportWorkerDetails');
    await I.retry(retryCount).click('#respondentCourtHearing-2');
    await I.retry(retryCount).fillField('#respondentFamilyDetails', 'respondentFamilyDetails');
    await I.retry(retryCount).click('#respondentCourtHearing-3');
    await I.retry(retryCount).click('#respondentCourtHearing-4');
    await I.retry(retryCount).fillField('#respondentTherapyDetails', 'respondentTherapyDetails');
    await I.retry(retryCount).click('#respondentCourtHearing-5');
    await I.retry(retryCount).fillField('#respondentCommSupportOther', 'respondentCommSupportOther');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async reasonableAdjustments5() {
    await I.retry(retryCount).waitForText('I need something to make me feel comfortable during a court hearing');
    await I.retry(retryCount).click('#respondentCourtComfort');
    await I.retry(retryCount).fillField('#respondentLightingDetails', 'respondentLightingDetails');
    await I.retry(retryCount).click('#respondentCourtComfort-2');
    await I.retry(retryCount).click('#respondentCourtComfort-3');
    await I.retry(retryCount).click('#respondentCourtComfort-4');
    await I.retry(retryCount).fillField('#respondentOtherProvideDetails', 'respondentOtherProvideDetails');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async reasonableAdjustments6() {
    await I.retry(retryCount).waitForText('I need help travelling to, or moving around court buildings');
    await I.retry(retryCount).click('#respondentTravellingToCourt');
    await I.retry(retryCount).fillField('#respondentParkingDetails', 'respondentParkingDetails');
    await I.retry(retryCount).click('#respondentTravellingToCourt-2');
    await I.retry(retryCount).click('#respondentTravellingToCourt-3');
    await I.retry(retryCount).click('#respondentTravellingToCourt-4');
    await I.retry(retryCount).click('#respondentTravellingToCourt-5');
    await I.retry(retryCount).click('#respondentTravellingToCourt-6');
    await I.retry(retryCount).fillField('#respondentDifferentChairDetails', 'respondentDifferentChairDetails');
    await I.retry(retryCount).click('#respondentTravellingToCourt-7');
    await I.retry(retryCount).click('#respondentTravellingToCourt-8');
    await I.retry(retryCount).fillField('#respondentTravellingOtherDetails', 'Reasonable Adjustments 6');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async summaryPage() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async supportYouNeedHappyPath() {
    await this.clickCADARespondent();
    await this.clickSupportYouNeedDuringYourCase();
    await this.attendingTheCourt();
    await this.languageRequirements();
    await this.specialArrangements();
    await this.reasonableAdjustments();
    await this.reasonableAdjustments2();
    await this.reasonableAdjustments3();
    await this.reasonableAdjustments4();
    await this.reasonableAdjustments5();
    await this.reasonableAdjustments6();
    await this.summaryPage();
  },
};
