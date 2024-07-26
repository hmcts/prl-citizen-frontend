const I = actor();
const retryCount = 3;

module.exports = {
    fields: {

    },

    async clickActiveCaseLink(caseId) {

        await I.waitForElement('#tab_active-cases');
        await I.retry(retryCount).click('#tab_active-cases');
        await I.waitForText('Ongoing cases');
        await I.click(`//a[contains(text(),'${caseId}')]`);

    },

    async clickEventLink(linkText) {
        const selector = `//a[contains(text(),"${linkText}")]`;
        await I.waitForElement(selector);
        await I.click(selector);
    },

    async clickEditLinkForField(fieldName) {
        const selector = `//div[contains(@class,'govuk-summary-list')]//dt[contains(@class,'govuk-summary-list__key')][contains(text(),"${fieldName}")]/..//a`;
        await I.waitForElement(selector);
        await I.click(selector);
    },

    async eventKeepYourDetailsPrivate() {
        await this.clickEventLink('Keep your details private');
        await I.waitForText('Do the other people named in this application (the applicants) know any of your contact details?');
        await I.runAccessibilityTest();

        await I.checkOption('#detailsKnown');
        await I.click('Continue');

        await I.waitForText('Do you want to keep your contact details private from the other people named in the application (the applicants)?');
        await I.runAccessibilityTest();

        await I.checkOption('#startAlternative-2');
        await I.click('Save and continue');

        await I.waitForText('The court will not keep your contact details private');
        await I.runAccessibilityTest();

        await I.click('Continue');

        await I.waitForElement('.app-task-list');

    },


    async eventConfirmOrEditYourContactDetails() {
        await this.clickEventLink('Confirm or edit your contact details');
        await I.waitForText('Check your details');
        await I.runAccessibilityTest();

        await this.clickEditLinkForField('Place of birth');

        await I.waitForText('Your name and date of birth');

        await I.fillField('#citizenUserPlaceOfBirth', 'testapplocation');
        await I.click('Continue');
        await I.waitForText('Save and continue');
        await I.runAccessibilityTest();

        await this.clickEditLinkForField('Address history');
        await I.waitForText('Have you lived at this address for more than 5 years?');
        await I.checkOption('#isAtAddressLessThan5Years');
        await I.click('Continue');

        await this.clickEditLinkForField('Email');
        await I.waitForText('Your contact details');
        await I.runAccessibilityTest();

        await I.fillField('#citizenUserEmailAddress', 'respondentemail@mailinator.com');
        await I.click('Continue');

        await I.waitForText('Save and continue');
        await I.runAccessibilityTest();

        await I.click('Save and continue');
        await I.waitForElement('.app-task-list');

    },

    async eventSupportYouNeedDuringYourCase() {
        await this.clickEventLink('Support you need during your case');
        await I.waitForText('Tell us if you need support');
        await I.runAccessibilityTest();

        await I.click('Start now');

        await I.waitForText('Language requirements and special arrangements');
        await I.runAccessibilityTest();

        await I.fillField('#ra_languageReqAndSpecialArrangements', 'none test');
        await I.click('Continue');

        await I.waitForText('Review your language requirements and special arrangements');
        await I.runAccessibilityTest();

        await I.click('Submit and continue');

        await I.waitForText('Do you have a physical, mental or learning disability or health condition that means you need support during your case?');

        [
            '#_enabled-PF0001-RA0001-RA0004',
            '#_enabled-PF0001-RA0001-RA0002'
        ].forEach(async opt => {
            await I.checkOption(opt);
        });
        await I.click('Continue');

        await I.waitForText('I need adjustments to get to, into and around our buildings');
        [
            '#_enabled-PF0001-RA0001-RA0004-RA0024'
        ].forEach(async opt => {
            await I.checkOption(opt);
        });

        await I.click('Continue');

        await I.waitForText('I need documents in an alternative format');
        await I.runAccessibilityTest();

        [
            '#_enabled-PF0001-RA0001-RA0002-RA0010'
        ].forEach(async opt => {
            await I.checkOption(opt);
        });

        await I.click('Continue');

        await I.waitForText("Review the support you've requested");
        await I.runAccessibilityTest();

        await I.click('Submit');
        await I.waitForText('You have submitted your request to the court');

        await I.click('Close and return to case overview');
        await I.waitForElement('.app-task-list');
    },

    async eventUploadDocuments(documentType) {
        await this.clickEventLink('Upload Documents');
        await I.waitForText('Select the type of document');
        await I.runAccessibilityTest();

        const documentLinkElement = `//a[contains(text(),"${documentType}")]`
        await I.click(documentLinkElement);

        // await I.waitForElement(`//h1[contains(text(),"${documentType}")]`);
        await I.waitForText('Has the court asked for this document?');
        await I.checkOption('#hasCourtAskedForThisDoc');
        await I.click('Continue');

        await I.waitForText('Before you submit a document');
        await I.click('Continue');

        await I.waitForText('Sharing your documents');
        await I.runAccessibilityTest();

        await I.checkOption('#haveReasonForDocNotToBeShared');
        await I.click('Continue');

        await I.waitForText('You can write your statement in the text box or upload it.');

        await I.attachFile('#uploadDocumentFileUpload', '../resource/dummy.pdf')
        await I.click('//button[contains(text(),"Upload file")]');
        await I.waitForElement('#filesUploadedList');

        await I.wait('5');
        await I.fillField('//textarea', 'test statement');
        await I.checkOption('#declarationCheck');

        await I.click('#main-form button');

        await I.waitForText('Document submitted');
        await I.runAccessibilityTest();

        await I.click('Close and return to case overview');
        await I.waitForElement('.app-task-list');

    },

    async verifyViewAllDocuments(documentsList) {
        await this.clickEventLink('View all documents');
        await I.waitForText("Respondent's documents");
        await I.runAccessibilityTest();

        for (const doc of documentsList) {
            const locator = `//a[contains(text(), "${doc}")]`
            await I.waitForElement(locator);
        }

        await I.click('Case view');
        await I.waitForElement('.app-task-list');

    }
};
