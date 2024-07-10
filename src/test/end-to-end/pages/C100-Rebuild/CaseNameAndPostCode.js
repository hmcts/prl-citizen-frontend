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
    await I.retry(retryCount).waitForText('Before you start your application' , 30);
    await I.click('Start now');
  },
  async childrensPostcode() {
    await I.retry(retryCount).waitForText('Where do the children live?' , 30);
    await I.retry(retryCount).fillField(this.fields.childrenPostcodeDetails, this.fields.childPostcode);
    await I.retry(retryCount).click('Continue');
  },
  async addCaseNameAndPostCode() {
    await this.gettingStarted();
    await this.childrensPostcode();
  },
};
