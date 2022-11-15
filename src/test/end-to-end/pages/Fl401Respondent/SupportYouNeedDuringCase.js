const InternationalElement = require("../C100Respondent/InternationalElement");

const I = actor();
const retryCount = 3;

module.exports = {
  
async clickDARespondent() {
        await I.retry(retryCount).waitForText('FL401 applications where you are an respondent');
        await I.retry(retryCount).click("(//a[@class='govuk-link'])[9]");
        I.wait('1');
      },    

  async clickSupportYouNeedDuringYourCase() {
    await I.retry(retryCount).click('#support_you_need_during_your_case');
    I.wait('2');
  },

  async AttendingTheCourt() {
    await I.retry(retryCount).waitForText('Would you be able to take part in hearings by video and phone?');
    await I.retry(retryCount).click('#respondentAttendingToCourt');
    await I.retry(retryCount).click('#respondentAttendingToCourt-2');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async languageRequirements() {
    await I.retry(retryCount).waitForText('Do you have any language requirements?');
    await I.retry(retryCount).click('#respondentLangRequirements');
    await I.retry(retryCount).click('#respondentLangRequirements-2');
    await I.retry(retryCount).click('#respondentLangRequirements-3');
    await I.retry(retryCount).fillField('#respondentLangDetails', 'Test');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async SpecialArrangements() {
    await I.retry(retryCount).waitForText('Do you or the children need special arrangements at court?');
    await I.retry(retryCount).click('#respondentSpecialArrangements');
    await I.retry(retryCount).click('#respondentSpecialArrangements-2');
    await I.retry(retryCount).click('#respondentSpecialArrangements-5');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async ReasonableAdjustments1() {
    await I.retry(retryCount).waitForText('Do you have a physical, mental or learning disability or health condition that means you need suppor');
    await I.retry(retryCount).click('#respondentReasonableAdjustments-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async ReasonableAdjustments2() {
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
  async ReasonableAdjustments3() {
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

  async ReasonableAdjustments4() {
    await I.retry(retryCount).waitForText('I would need to bring support with me to a court hearing');
    await I.retry(retryCount).click('#respondentCourtHearing-7');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },

  async ReasonableAdjustments5() {
    await I.retry(retryCount).waitForText('I need something to make me feel comfortable during a court hearing');
    await I.retry(retryCount).click('#respondentCourtComfort-2');
    await I.retry(retryCount).click('#respondentCourtComfort-3');
    await I.retry(retryCount).click('#respondentCourtComfort-4');
    await I.retry(retryCount).fillField('#respondentOtherProvideDetails', 'Reasonable breaks');
    await I.retry(retryCount).click('Save and continue');
    I.wait('2');
  },
  async ReasonableAdjustments6() {
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
  
  async summaryPage() {
    await I.retry(retryCount).waitForText('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async InternationalElement() {
    await this.clickDARespondent();
    await this.clickSupportYouNeedDuringYourCase();
    await this.AttendingTheCourt();
    await this.languageRequirements();
    await this.SpecialArrangements();
    await this.ReasonableAdjustments1();
    await this.ReasonableAdjustments2();
    await this.ReasonableAdjustments3();
    await this.ReasonableAdjustments4();
    await this.ReasonableAdjustments5();
    await this.ReasonableAdjustments6()
    await this.summaryPage();
  }
};
