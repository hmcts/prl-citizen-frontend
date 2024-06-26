const HelpWithFees = require("../contents/HelpWithFees-content");
const pcqDetails = require("../contents/PCQ-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
  fields: {
    miniDashboardTitle : 'Child arrangements and family injunction cases',
    testingSupportLink: 'Testing Support',
    statementOfTruthYes: '//*[@id="statementOfTruth"]',
  },
  async createC100DraftTS(){
    await I.retry(retryCount).waitForText(this.fields.miniDashboardTitle , 30);
    await I.retry(retryCount).click(this.fields.testingSupportLink);
    await I.retry(retryCount).click('Create Drafts');
    await I.retry(retryCount).click('Create C100 Draft');
    await I.retry(retryCount).waitForText('Check your Answers', 60);
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.statementOfTruthYes);
    await I.retry(retryCount).click('Pay and submit your application');
  }
};
