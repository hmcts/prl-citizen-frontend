const I = actor();

module.exports = {

  async triggerEvent() {
    await I.triggerEvent('#keep-your-details-private');
  },

  async keepYourDetailsPrivate1() {
    const retryCount = 3;
    await I.waitForText('Do the other people named in this application (the applicants) know any of your contact details?');
    await I.click('Yes');
    await I.click('Continue');
  },

  async keepYourDetailsPrivate2() {
    const retryCount = 3;
    await I.waitForText('Do you want to keep your contact details private from the other people named in the application (the');
    await I.click('Yes');
    await I.waitForText('Which contact details do you want to keep private from the other people in this application?');
    await I.click('Address');
    await I.click('Save and continue');
  },

  async keepYourDetailsPrivate3() {
    const retryCount = 3;
    await I.waitForText('The court will keep your contact details private');
    await I.click('Continue');
  },
  
  async runEventKeepYourDetailsPrivate() {
    await this.triggerEvent();
    await this.keepYourDetailsPrivate1();
    I.wait('2');
    await this.keepYourDetailsPrivate2();
    I.wait('2');
    await this.keepYourDetailsPrivate3();   
  }
};

