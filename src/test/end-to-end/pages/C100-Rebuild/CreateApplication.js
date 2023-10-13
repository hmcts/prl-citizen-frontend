const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickCreateNewCApplication() {
    await I.retry(retryCount).waitForText('New child arrangements application (C100)' , 30);
    await I.retry(retryCount).click('New child arrangements application (C100)');
  },

  async createNewC100Application() {
    await this.clickCreateNewCApplication();
  }

};
