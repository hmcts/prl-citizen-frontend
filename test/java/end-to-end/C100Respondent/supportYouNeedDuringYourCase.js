const I = actor();

module.exports = {

  async triggerEvent() {
    await I.triggerEvent('#support_you_need_during_your_case');
  },
  async supportYourCase1() {
    const retryCount = 3;
    await I.waitForText('Would you be able to take part in hearings by video and phone?')
    await I.click('Yes, I can take part in video hearings');
    await I.click('Continue');
  },

  async supportYourCase2() {
    const retryCount = 3;
    await I.waitForText('Do you have any language requirements?');
    await I.click('#languageRequirements-2');
    await I.click('Continue');
  },
  async supportYourCase3() {
    const retryCount = 3;
    await I.waitForText('Do you or the children need special arrangements at court?');
    await I.click('#safetyArrangements-5');
    await I.click('Continue');
  },
  async supportYourCase4() {
    const retryCount = 3;
    await I.waitForText('Do you or the children need special arrangements at court?');
    await I.click('#reasonableAdjustments-5');
    await I.click('Continue');
  },
  async supportYourCase5() {
    const retryCount = 3;
    await I.waitForText('I need help travelling to, or moving around court buildings');
    await I.click('#travellingToCourt-7');
    await I.click('Continue');
  },
  async supportYourCase5() {
    const retryCount = 3;
    await I.waitForText('I need help travelling to, or moving around court buildings');
    await I.click('#travellingToCourt-7');
    await I.click('Continue');
  },
  async supportYourCase6() {
    const retryCount = 3;
    await I.waitForText('Check your answers');
    await I.click('Save and continue');
  },

  async runEventSupportYou() {
    await this.triggerEvent();
    await this.supportYourCase1();
    I.wait('2');
    await this.supportYourCase2();
    I.wait('2');
    await this.supportYourCase3();   
    I.wait('2');
    await this.supportYourCase4();   
    I.wait('2');
    await this.supportYourCase5();   
    I.wait('2');
    await this.supportYourCase6();   
  }
};
