const ConsentOrder = require("../../contents/ConsentOrder-content");
const { I } = inject();
const retryCount = 3;
module.exports = {

   async uploadDraftConsent() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForText(ConsentOrder.uploadDraftTitle);
    I.wait('1');
    await I.retry(retryCount).attachFile('//*[@id="document"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    I.wait('5');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Upload file');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Continue');
  },
  async uploadDraftOrderSummary() {
    await I.retry(retryCount).waitForText(ConsentOrder.consentOrderUploaded);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async draftConsentOrder() {
    await this.uploadDraftConsent();
    await this.uploadDraftOrderSummary();
  },
};
