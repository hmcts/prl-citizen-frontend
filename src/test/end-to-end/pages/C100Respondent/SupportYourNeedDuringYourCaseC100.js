const I = actor();
const retryCount = 3;
module.exports = {

async clickCARespondent() {
    await I.retry(retryCount).waitForText('C100 applications where you are an respondent');
    await I.retry(retryCount).click("(a[href='/respondent/task-list/16661841571620'])");
    I.wait('1');
},

async clickSupportYouNeedDuringYourCaseCA() {
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    I.wait('2');
  },

  async AttendingTheCourtCA() {
    await I.retry(retryCount).waitForText('Would you be able to take part in hearings by video and phone?');
    await I.retry(retryCount).click('#respondentAttendingToCourt');
    await I.retry(retryCount).click('#respondentAttendingToCourt-2');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async languageRequirementsCA() {
    await I.retry(retryCount).waitForText('Do you have any language requirements?');
    await I.retry(retryCount).click('#respondentLangRequirements');
    await I.retry(retryCount).click('#respondentLangRequirements-2');
    await I.retry(retryCount).click('#respondentLangRequirements-3');
    await I.retry(retryCount).fillField('#respondentLangDetails', 'Test');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async SpecialArrangementsCA() {
    await I.retry(retryCount).waitForText('Do you or the children need special arrangements at court?');
    await I.retry(retryCount).click('#respondentSpecialArrangements');
    await I.retry(retryCount).click('#respondentSpecialArrangements-2');
    await I.retry(retryCount).click('#respondentSpecialArrangements-5');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async CAReasonableAdjustments1() {
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need suppor');
    await I.retry(retryCount).click('#respondentReasonableAdjustments-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async CAReasonableAdjustments2() {
    await I.retry(retryCount).waitForText('I need documents in an alternative format');
    await I.retry(retryCount).click('#respondentDocsSupport');
    await I.retry(retryCount).fillField('#respondentDocsDetails', 'Blue');
    await I.retry(retryCount).click('#respondentDocsSupport-2');
    await I.retry(retryCount).click('#respondentDocsSupport-3');
    await I.retry(retryCount).click('#respondentDocsSupport-4');
    await I.retry(retryCount).fillField('#respondentLargePrintDetails', 'Large');
    await I.retry(retryCount).click('#respondentDocsSupport-5');
    await I.retry(retryCount).click('#respondentDocsSupport-6');
    await I.retry(retryCount).click('#respondentDocsSupport-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async CAReasonableAdjustments3() {
    await I.retry(retryCount).waitForText('I need help communicating and understanding');
    await I.retry(retryCount).click('#respondentHelpCommunication');
    await I.retry(retryCount).click('#respondentHelpCommunication-2');
    await I.retry(retryCount).click('#respondentHelpCommunication-3');
    await I.retry(retryCount).click('#respondentHelpCommunication-4');
    await I.retry(retryCount).click('#respondentHelpCommunication-5');
    await I.retry(retryCount).fillField('#respondentSignLanguageDetails', 'Interpreter');
    await I.retry(retryCount).click('#respondentHelpCommunication-11');
    await I.retry(retryCount).fillField('#respondentDescribeOtherNeed', 'Test');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async CAReasonableAdjustments4() {
    await I.retry(retryCount).waitForText('I would need to bring support with me to a court hearing');
    await I.retry(retryCount).click('#respondentCourtHearing-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async CAReasonableAdjustments5() {
    await I.retry(retryCount).waitForText('I need something to make me feel comfortable during a court hearing');
    await I.retry(retryCount).click('#respondentCourtComfort-2');
    await I.retry(retryCount).click('#respondentCourtComfort-3');
    await I.retry(retryCount).click('#respondentCourtComfort-4');
    await I.retry(retryCount).fillField('#respondentOtherProvideDetails', 'Reasonable breaks');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  
  async CAReasonableAdjustments6() {
    await I.retry(retryCount).waitForText('I need help travelling to, or moving around court buildings');
    await I.retry(retryCount).click('#respondentTravellingToCourt');
    await I.retry(retryCount).fillField('#respondentParkingDetails', 'Yes');
    await I.retry(retryCount).click('#respondentTravellingToCourt-2');
    await I.retry(retryCount).click('#respondentTravellingToCourt-2');
    await I.retry(retryCount).click('#respondentTravellingToCourt-3');
    await I.retry(retryCount).click('#respondentTravellingToCourt-4');
    await I.retry(retryCount).click('#respondentTravellingToCourt-5');
    await I.retry(retryCount).click('#respondentTravellingToCourt-6');
    await I.retry(retryCount).fillField('#respondentDifferentChairDetails', 'chair with back support');
    await I.retry(retryCount).click('#respondentTravellingToCourt-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  
  async summaryPageCA() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async InternationalElementCA() {
    await this.clickDARespondent();
    await this.clickSupportYouNeedDuringYourCaseCA();
    await this.AttendingTheCourtCA();
    await this.languageRequirementsCA();
    await this.SpecialArrangementsCA();
    await this.CAReasonableAdjustments1();
    await this.CAReasonableAdjustments2();
    await this.CAReasonableAdjustments3();
    await this.CAReasonableAdjustments4();
    await this.CAReasonableAdjustments5();
    await this.CAReasonableAdjustments6()
    await this.summaryPageCA();
  }
};