const CYA = require("../../contents/CheckYourAnswers-content");
const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]',    
    },
    async checkYourAnswersSimple() {
        await I.retry(retryCount).waitForText(CYA.cyaTitle);
        await I.retry(retryCount).waitForText(CYA.caseName);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth);
        I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    },
    async checkYourAnswersSimpleEvent() {
        await this.checkYourAnswersSimple();
    }
  
};