const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickStartTheApplication() {
    await I.retry(retryCount).see('Start the application');
    await I.retry(retryCount).click('Start the application');
    I.wait('4');
  },

  async createStartTheApplication() {
    await this.clickStartTheApplication();
  }

};