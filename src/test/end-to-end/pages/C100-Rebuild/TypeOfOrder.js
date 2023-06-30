const TypeOfOrder = require("../../contents/TypeOfOrder-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        testingText: 'Testing text area',

        //What are you asking court to do?
        courtToDo1: '//*[@id="too_courtOrder"]',
        courtToDo2: '//*[@id="too_courtOrder-2"]',
        courtToDo3: '//*[@id="too_courtOrder-3"]',
        courtToDo3Nested: '//*[@id="too_stopOtherPeopleDoingSomethingSubField"]',
        courtToDo4: '//*[@id="too_courtOrder-4"]',
        courtToDo4Nested: '//*[@id="too_resolveSpecificIssueSubField"]',
        
        //Statement
        shortStatement: '//*[@id="too_shortStatement"]',
    },
    async askingCourt() {
        I.wait('4');
        await I.retry(retryCount).waitForText(TypeOfOrder.askingCourtPageTitle , 30);
        I.wait('1');
        await I.retry(retryCount).click(this.fields.courtToDo1);
        await I.retry(retryCount).click(this.fields.courtToDo2);
        await I.retry(retryCount).click(this.fields.courtToDo3);
        I.wait('1');
        await I.retry(retryCount).click(this.fields.courtToDo3Nested);
        await I.retry(retryCount).click(this.fields.courtToDo4);
        I.wait('1');
        await I.retry(retryCount).click(this.fields.courtToDo4Nested);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async askingCourtSummary() {
        I.wait('4');
        await I.retry(retryCount).waitForText(TypeOfOrder.askingCourtSummaryPageTitle , 30);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async courtShortStatement() {
        I.wait('4');
        await I.retry(retryCount).waitForText(TypeOfOrder.courtShortStatementPageTitle , 30);
        await I.retry(retryCount).fillField(this.fields.shortStatement, this.fields.testingText);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async typeOfOrder() {
        await this.askingCourt();
        await this.askingCourtSummary();
        await this.courtShortStatement();
    },
};