const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickStartTheApplication() {
    await I.wait('6');
    await I.retry(retryCount).waitForText('Start the application' , 60);
    await I.wait('2');
    await I.retry(retryCount).click('Start the application');
    await I.waitForNavigation(); 
    await I.wait('2');
  },

  async createStartTheApplication() {
    await this.clickStartTheApplication();
  }

};