const I = actor();
const retryCount = 3;

module.exports = {
  async clickDAApplicant() {
    I.wait('2');
    await I.retry(retryCount).waitForText('DA Applicant');
    await I.retry(retryCount).click('#main-content > div > div.govuk-grid-column-two-thirds > a:nth-child(2)');
    },

  async clickSupportYouNeedDuringYourCase() {
    I.wait('2');
    await I.retry(retryCount).click('#support-you-need-during-your-case');
  },

  async languageRequirements() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Do you have any language requirements?');
    await I.retry(retryCount).click('#languageRequirements');
    await I.retry(retryCount).click('#languageRequirements-3');
    await I.retry(retryCount).fillField('#languageDetails', 'Test Language Details');
    await I.retry(retryCount).click('Save and continue');
  },

  async reasonableAdjustments() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');
    await I.retry(retryCount).click('#reasonableAdjustments');
    await I.retry(retryCount).click('#reasonableAdjustments-2');
    await I.retry(retryCount).click('#reasonableAdjustments-3');
    await I.retry(retryCount).click('#reasonableAdjustments-4');
    await I.retry(retryCount).click('#reasonableAdjustments-5');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments2() {
    I.wait('2');
    await I.retry(retryCount).waitForText('I need documents in an alternative format');
    await I.retry(retryCount).click('#docsSupport-10');
    await I.retry(retryCount).click('#docsSupport');
    await I.retry(retryCount).click('#docsSupport-2');
    await I.retry(retryCount).click('#docsSupport-3');
    await I.retry(retryCount).click('#docsSupport-4');
    await I.retry(retryCount).click('#docsSupport-5');
    await I.retry(retryCount).click('#docsSupport-6');
    await I.retry(retryCount).click('#docsSupport-7');
    await I.retry(retryCount).click('#docsSupport-8');
    await I.retry(retryCount).fillField('#otherDetails', 'Reasonable Adjustments 2');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments3() {
    I.wait('2');
    await I.retry(retryCount).waitForText('I need help communicating and understanding');
    await I.retry(retryCount).click('#helpCommunication');
    await I.retry(retryCount).click('#helpCommunication-2');
    await I.retry(retryCount).click('#helpCommunication-3');
    await I.retry(retryCount).click('#helpCommunication-4');
    await I.retry(retryCount).click('#helpCommunication-5');
    await I.retry(retryCount).click('#helpCommunication-6');
    await I.retry(retryCount).click('#helpCommunication-7');
    await I.retry(retryCount).click('#helpCommunication-8');
    await I.retry(retryCount).click('#helpCommunication-9');
    await I.retry(retryCount).click('#helpCommunication-10');
    await I.retry(retryCount).click('#helpCommunication-11');
    await I.retry(retryCount).fillField('#describeOtherNeed', 'Reasonable Adjustments 3');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments4() {
    I.wait('2');
    await I.retry(retryCount).waitForText('I would need to bring support with me to a court hearing');
    await I.retry(retryCount).click('#courtHearing');
    await I.retry(retryCount).click('#courtHearing-2');
    await I.retry(retryCount).click('#courtHearing-3');
    await I.retry(retryCount).click('#courtHearing-4');
    await I.retry(retryCount).click('#courtHearing-5');
    await I.retry(retryCount).fillField('#communicationSupportOther', 'Reasonable Adjustments 4');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments5() {
    I.wait('2');
    await I.retry(retryCount).waitForText('I need something to make me feel comfortable during a court hearing');
    await I.retry(retryCount).click('#courtComfort');
    await I.retry(retryCount).click('#courtComfort-2');
    await I.retry(retryCount).click('#courtComfort-3');
    await I.retry(retryCount).click('#courtComfort-4');
    await I.retry(retryCount).fillField('#otherProvideDetails', 'Reasonable Adjustments 5');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments6() {
    I.wait('2');
    await I.retry(retryCount).waitForText('I need help travelling to, or moving around court buildings');
    await I.retry(retryCount).click('#travellingToCourt');
    await I.retry(retryCount).click('#travellingToCourt-2');
    await I.retry(retryCount).click('#travellingToCourt-3');
    await I.retry(retryCount).click('#travellingToCourt-4');
    await I.retry(retryCount).click('#travellingToCourt-5');
    await I.retry(retryCount).click('#travellingToCourt-6');
    await I.retry(retryCount).click('#travellingToCourt-7');
    await I.retry(retryCount).click('#travellingToCourt-8');
    await I.retry(retryCount).fillField('#travellingOtherDetails', 'Reasonable Adjustments 6');
    await I.retry(retryCount).click('Save and continue');
  },
  async reasonableAdjustments7() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Is there a reason you are unable to take part in the court proceedings?');
    await I.retry(retryCount).click('#unableForCourtProceedings');
    await I.retry(retryCount).fillField('#courtProceedingProvideDetails', 'Reasonable Adjustments 7');
    await I.retry(retryCount).click('Save and continue');
  },
  async safetyRequirements() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Do you or the children need special safety arrangements at court?');
    await I.retry(retryCount).click('#safetyArrangements');
    await I.retry(retryCount).click('#safetyArrangements-2');
    await I.retry(retryCount).click('#safetyArrangements-3');
    await I.retry(retryCount).click('#safetyArrangements-4');
    await I.retry(retryCount).click('#safetyArrangements-5');
    await I.retry(retryCount).click('#safetyArrangements-6');
    await I.retry(retryCount).click('#safetyArrangements-7');
    await I.retry(retryCount).fillField('#safetyArrangementsDetails', 'Safety Requirements');
    await I.retry(retryCount).click('Save and continue');
  },
  async summaryPage() {
    I.wait('1');
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async supportYouNeedHappyPath() {
    await this.clickDAApplicant();
    await this.clickSupportYouNeedDuringYourCase();
    await this.languageRequirements();
    await this.reasonableAdjustments();
    await this.reasonableAdjustments2();
    await this.reasonableAdjustments3();
    await this.reasonableAdjustments4();
    await this.reasonableAdjustments5();
    await this.reasonableAdjustments6();
    await this.reasonableAdjustments7();
    await this.safetyRequirements();
    await this.summaryPage();
  },
};
