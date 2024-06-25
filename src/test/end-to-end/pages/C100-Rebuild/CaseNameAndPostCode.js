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
    await I.retry(retryCount).waitForText('What you’ll need to complete your application' , 30);
    await I.retry(retryCount).click('Continue');
  },
  async childrensPostcode() {
    await I.retry(retryCount).waitForText('Where do the children live?' , 30);
    await I.retry(retryCount).fillField(this.fields.childrenPostcodeDetails, this.fields.childPostcode);
    await I.retry(retryCount).click('Continue');
  },
  async addCaseNameAndPostCode() {
    // await this.gettingStarted();
    await this.childrensPostcode();
  },
};
