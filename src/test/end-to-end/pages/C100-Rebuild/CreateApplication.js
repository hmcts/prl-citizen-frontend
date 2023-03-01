const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickCreateNewCApplication() {
    await I.retry(retryCount).waitForText('Child arrangements and family injunction cases');
    await I.retry(retryCount).waitForText('New child arrangements application (C100)');
    await I.retry(retryCount).click('New child arrangements application (C100)');
    I.wait('2');
    await I.retry(retryCount).waitForText('You have not started your application');
  },

  async createNewC100Application() {
    await this.clickCreateNewCApplication();
  }

};