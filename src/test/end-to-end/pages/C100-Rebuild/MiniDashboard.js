const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickStartTheApplication() {
    await I.retry(retryCount).waitForText('Start the application' , 60);
    I.wait('2');
    await I.retry(retryCount).click('Start the application');
    I.wait('2');
  },

  async createStartTheApplication() {
    await this.clickStartTheApplication();
  }

};