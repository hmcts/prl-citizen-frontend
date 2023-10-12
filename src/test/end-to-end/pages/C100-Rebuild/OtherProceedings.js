const OtherProceedings = require("../../contents/OtherProceedings-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    childrenInvolvedCourtCaseYesButton: '//*[@id="op_childrenInvolvedCourtCase"]',
    courtOrderProtectionYesButton: '//*[@id="op_courtOrderProtection"]',
    courtProceedingsOrdersButton: '//*[@id="op_courtProceedingsOrders"]',
    courtIssued: '//*[@id="orderDetail-1"]',
    caseNo: '//*[@id="caseNo-1"]',
    dateMadeDay: '//*[@id="orderDate-1-day"]',
    dateMadeMonth: '//*[@id="orderDate-1-month"]',
    dateMadeYear: '//*[@id="orderDate-1-year"]',
    currentOrderYes: '//*[@id="currentOrder-1"]',
    copyOfOrderYes: '//*[@id="orderCopy-1"]',
    copyOfOrderNo: '//*[@id="orderCopy-1-2"]',
  },
   async otherProceedingPage() {
    await I.retry(retryCount).waitForText(OtherProceedings.otherProceedingPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherProceedings.otherProceedingTopSubHeading , 30);
    await I.retry(retryCount).click(this.fields.childrenInvolvedCourtCaseYesButton);
    await I.retry(retryCount).waitForText(OtherProceedings.otherProceedingBottomSubHeading , 30);
    // await I.wait('2');
    await I.retry(retryCount).click(this.fields.courtOrderProtectionYesButton);
    // await I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async proceedingDetails() {
    await I.retry(retryCount).waitForText(OtherProceedings.proceedingDetailsPageTitle , 30);
    // await I.wait('2');
    await I.retry(retryCount).click(this.fields.courtProceedingsOrdersButton);
    // await I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async provideDetailsOfCourtCases(copyOfOrder) {
    await I.retry(retryCount).waitForText(OtherProceedings.provideDetailsOfCourtCasesPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherProceedings.provideDetailsOfCourtCasesSubHeading , 30);
    // await I.wait('2');
    await I.retry(retryCount).waitForSelector(this.fields.courtIssued, 30);
    await I.retry(retryCount).fillField(this.fields.courtIssued, OtherProceedings.testingText);
    await I.retry(retryCount).fillField(this.fields.caseNo, OtherProceedings.caseNumber);
    await I.retry(retryCount).fillField(this.fields.dateMadeDay, OtherProceedings.day);
    await I.retry(retryCount).fillField(this.fields.dateMadeMonth, OtherProceedings.month);
    await I.retry(retryCount).fillField(this.fields.dateMadeYear, OtherProceedings.year);
    // await I.wait('2');
    await I.retry(retryCount).click(this.fields.currentOrderYes);
    await I.retry(retryCount).click(copyOfOrder ? this.fields.copyOfOrderYes : this.fields.copyOfOrderNo);
    // await I.wait('2');
    // await I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async uploadOrder() {
    const uploadTime = 5;
    await I.wait('5');
    await I.retry(retryCount).attachFile('//*[@id="document"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.wait('5');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Upload file');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click('Continue');
  },
  async uploadOrderSummary() {
    await I.retry(retryCount).waitForText(OtherProceedings.uploadOrderSummaryInfo);
    await I.retry(retryCount).waitForText(OtherProceedings.uploadOrderSummary);
    // await I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async otherProceedings() {
    await this.otherProceedingPage();
    await this.proceedingDetails();
    await this.provideDetailsOfCourtCases(false);
    // await this.uploadOrder();
    // await this.uploadOrderSummary();
  },
};
