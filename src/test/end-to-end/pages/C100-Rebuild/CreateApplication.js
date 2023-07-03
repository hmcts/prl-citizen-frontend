<<<<<<< HEAD
const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickCreateNewCApplication() {
    await I.retry(retryCount).waitForText('Start new C100 application');
    await I.retry(retryCount).click('Start new C100 application');
    I.wait('2');
  },

  async createNewC100Application() {
    await this.clickCreateNewCApplication();
  }

};
=======
const { I } = inject();
const retryCount = 3;

module.exports = {

  async clickCreateNewCApplication() {
    await I.wait('2');
    await I.retry(retryCount).waitForText('New child arrangements application (C100)' , 30);
    await I.wait('2');
    await I.retry(retryCount).click('New child arrangements application (C100)');
    await I.wait('2');
  },

  async createNewC100Application() {
    await this.clickCreateNewCApplication();
  }

};
>>>>>>> master
