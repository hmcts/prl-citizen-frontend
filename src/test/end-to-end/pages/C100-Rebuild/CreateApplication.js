const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickCreateNewCApplication() {
    await I.retry(retryCount).waitForText('Your private law account');
    await I.retry(retryCount).click('Start new C100 application');
  },

  async createNewC100Application() {
    await this.clickCreateNewCApplication();
  }

};
