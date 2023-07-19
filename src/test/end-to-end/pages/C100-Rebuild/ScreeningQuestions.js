const ScreeningQuestions = require("../../contents/ScreeningQuestions-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        writtenAgreementNo: '//*[@id="sq_writtenAgreement-2"]',
        writtenAgreementYes: '//*[@id="sq_writtenAgreement"]',
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
    async writtenAgreementButton(agreementOption) {
        await I.wait('4');
        await I.retry(retryCount).waitForText(ScreeningQuestions.writtenAgreementButtonPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(agreementOption ? this.fields.writtenAgreementYes : this.fields.writtenAgreementNo);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async beforeYouGoToCourt() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.beforeYouGoToCourtPageTitle , 30);
        await I.retry(retryCount).waitForText(ScreeningQuestions.beforeYouGoToCourtSubHeading , 30);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async otherWaysToReachAnAgreement() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.otherWaysToReachAnAgreementPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.reachingAgreementYes); 
        await I.wait('1');     
        await I.retry(retryCount).waitForText(ScreeningQuestions.otherWaysToReachAnAgreementSubHeading , 30);
        await I.retry(retryCount).fillField(this.fields.alternativeOptionTextBox, this.fields.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async usingLegalRepresentative() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.usingLegalRepresentativePageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.legalRepresentativeNo);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async permissionFromCourt() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.permissionFromCourtPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).waitForSelector(this.fields.permissionFromCourtYes, 60);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.permissionFromCourtYes);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async permissionFromCourtWhy() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.permissionFromCourtWhyPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.permissionReasonWhy1);
        await I.retry(retryCount).fillField(this.fields.reasonWhy1, this.fields.testingText);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.permissionReasonWhy2);
        await I.retry(retryCount).fillField(this.fields.reasonWhy2, this.fields.testingText);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.permissionReasonWhy3);
        await I.retry(retryCount).fillField(this.fields.reasonWhy3, this.fields.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async whyCourtShouldGrant() {
        await I.retry(retryCount).waitForText(ScreeningQuestions.whyCourtShouldGrantPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).waitForSelector(this.fields.explainWhyCourtDetails, 30);
        await I.retry(retryCount).fillField(this.fields.explainWhyCourtDetails, this.fields.testingText , 30);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async screeningQuestions() {
        await this.writtenAgreementButton(false);
        await this.beforeYouGoToCourt();
        await this.otherWaysToReachAnAgreement();
        await this.usingLegalRepresentative();
        await this.permissionFromCourt();
        await this.permissionFromCourtWhy();
        await this.whyCourtShouldGrant();
    },

    async withDraftConsentOrder() {
        await this.writtenAgreementButton(true);
    }
};
