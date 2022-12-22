const ScreeningQuestions = require("../../contents/ScreeningQuestions-content");
const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        writtenAgreementNo: '//*[@id="sq_writtenAgreement-2"]',
        testingText: 'Testing text area',
        reachingAgreementYes: '//*[@id="sq_alternativeRoutes"]',
        alternativeOptionTextBox: '//*[@id="sq_agreementReason"]',
        testingText: 'Testing text area',
        legalRepresentativeNo: '//*[@id="sq_legalRepresentation-2"]',
        //Permission from Court
        permissionFromCourtYes: '//*[@id="sq_courtPermissionRequired"]',
        permissionReasonWhy1: '//*[@id="sq_permissionsWhy"]',
        reasonWhy1: '//*[@id="sq_doNotHaveParentalResponsibility_subfield"]',
        permissionReasonWhy2: '//*[@id="sq_permissionsWhy-2"]',
        reasonWhy2: '//*[@id="sq_courtOrderPrevent_subfield"]',
        permissionReasonWhy3: '//*[@id="sq_permissionsWhy-3"]',
        reasonWhy3: '//*[@id="sq_anotherReason_subfield"]',
        explainWhyCourtDetails: '//*[@id="sq_permissionsRequest"]',
    },
    async writtenAgreementButton() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.writtenAgreementButtonPageTitle);
        await I.retry(retryCount).click(this.fields.writtenAgreementNo);
        await I.retry(retryCount).click('Continue');
    },
    async beforeYouGoToCourt() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.beforeYouGoToCourtPageTitle);
        await I.retry(retryCount).waitForText(ScreeningQuestions.beforeYouGoToCourtSubHeading);
        await I.retry(retryCount).click('Continue');
    },
    async otherWaysToReachAnAgreement() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.otherWaysToReachAnAgreementPageTitle);
        await I.retry(retryCount).click(this.fields.reachingAgreementYes);      
        await I.retry(retryCount).waitForText(ScreeningQuestions.otherWaysToReachAnAgreementSubHeading);
        await I.retry(retryCount).fillField(this.fields.alternativeOptionTextBox, this.fields.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async usingLegalRepresentative() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.usingLegalRepresentativePageTitle);
        await I.retry(retryCount).click(this.fields.legalRepresentativeNo);
        await I.retry(retryCount).click('Continue');
    },
    async permissionFromCourt() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.permissionFromCourtPageTitle);
        await I.retry(retryCount).click(this.fields.permissionFromCourtYes);
        await I.retry(retryCount).click('Continue');
    },
    async permissionFromCourtWhy() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.permissionFromCourtWhyPageTitle);
        await I.retry(retryCount).click(this.fields.permissionReasonWhy1);
        await I.retry(retryCount).fillField(this.fields.reasonWhy1, this.fields.testingText);
        await I.retry(retryCount).click(this.fields.permissionReasonWhy2);
        await I.retry(retryCount).fillField(this.fields.reasonWhy2, this.fields.testingText);
        await I.retry(retryCount).click(this.fields.permissionReasonWhy3);
        await I.retry(retryCount).fillField(this.fields.reasonWhy3, this.fields.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async whyCourtShouldGrant() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.whyCourtShouldGrantPageTitle);
        await I.retry(retryCount).fillField(this.fields.explainWhyCourtDetails, this.fields.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async screeningQuestions() {
        await this.writtenAgreementButton();
        await this.beforeYouGoToCourt();
        await this.otherWaysToReachAnAgreement();
        await this.usingLegalRepresentative();
        await this.permissionFromCourt();
        await this.permissionFromCourtWhy();
        await this.whyCourtShouldGrant();
    },
};
