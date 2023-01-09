const ConsentOrder = require("../../contents/ConsentOrder-content");
const I = actor();
const retryCount = 3;
module.exports = {
  
   async uploadDraftConsent() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForText(ConsentOrder.uploadDraftTitle);
    await I.retry(retryCount).attachFile('//*[@id="document"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Upload file');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Continue');
  },
  async uploadDraftOrderSummary() {
    await I.retry(retryCount).waitForText(ConsentOrder.consentOrderUploaded);
    await I.retry(retryCount).click('Continue');
  },
  async draftConsentOrder() {
    await this.uploadDraftConsent();
    await this.uploadDraftOrderSummary();
  },
};