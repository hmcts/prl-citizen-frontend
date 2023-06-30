const { I } = inject();
const retryCount = 3;

module.exports = {

  fields: {
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    caseName: '//*[@id="applicantCaseName"]',
    caseNameDetails: 'Test Case',
    childrenPostcodeDetails: '//*[@id="c100RebuildChildPostCode"]',
    childPostcode: 'B1 1LS'

  },
  async gettingStarted() {
    I.wait('4');
    await I.retry(retryCount).waitForText('What you’ll need to complete your application' , 30);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
    I.wait('4');
  },
  async enterCaseName() {
    I.wait('4');
    await I.retry(retryCount).waitForText('Enter Case Name' , 60);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.caseName, this.fields.caseNameDetails);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async childrensPostcode() {
    I.wait('4');
    await I.retry(retryCount).waitForText('Where do the children live?' , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.childrenPostcodeDetails, this.fields.childPostcode);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async addCaseNameAndPostCode() {
    await this.gettingStarted();
    await this.enterCaseName();
    await this.childrensPostcode();
  },
};
