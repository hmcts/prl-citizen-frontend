const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickStartTheApplication() {
    await I.retry(retryCount).see('Start the application');
    await I.retry(retryCount).click('Start the application');
    await I.retry(retryCount).waitForNavigation();
    I.wait('2');
  },

  async createStartTheApplication() {
    await this.clickStartTheApplication();
  }

};