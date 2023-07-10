const CYA = require("../../contents/CheckYourAnswers-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]',    
    },
    async checkYourAnswersSimple() {
        await I.wait('4');
        await I.retry(retryCount).waitForText(CYA.cyaTitle , 60);
        await I.retry(retryCount).waitForText(CYA.caseName , 60);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth , 60);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth , 60);
        await I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    },
    async checkYourAnswersSimpleEvent() {
        await this.checkYourAnswersSimple();
    }
  
};