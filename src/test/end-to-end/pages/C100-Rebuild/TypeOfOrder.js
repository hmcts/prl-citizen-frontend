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
        await I.retry(retryCount).waitForText(TypeOfOrder.askingCourtPageTitle);
        await I.retry(retryCount).click(this.fields.courtToDo1);
        await I.retry(retryCount).click(this.fields.courtToDo2);
        await I.retry(retryCount).click(this.fields.courtToDo3);
        await I.retry(retryCount).click(this.fields.courtToDo3Nested);
        await I.retry(retryCount).click(this.fields.courtToDo4);
        await I.retry(retryCount).click(this.fields.courtToDo4Nested);
        await I.retry(retryCount).click('Continue');
    },
    async askingCourtSummary() {
        await I.retry(retryCount).waitForText(TypeOfOrder.askingCourtSummaryPageTitle);
        await I.retry(retryCount).click('Continue');
    },
    async courtShortStatement() {
        await I.retry(retryCount).waitForText(TypeOfOrder.courtShortStatementPageTitle);
        await I.retry(retryCount).fillField(this.fields.shortStatement, this.fields.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async typeOfOrder() {
        await this.askingCourt();
        await this.askingCourtSummary();
        await this.courtShortStatement();
    },
};