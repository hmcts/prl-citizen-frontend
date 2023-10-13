const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickStartTheApplication() {
    await I.retry(retryCount).waitForText('Start the application' , 60);
    await I.retry(retryCount).click('Start the application');
  },

  async createStartTheApplication() {
    await this.clickStartTheApplication();
  }

};