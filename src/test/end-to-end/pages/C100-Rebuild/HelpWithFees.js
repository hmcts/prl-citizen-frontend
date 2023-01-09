const HelpWithFees = require("../../contents/HelpWithFees-content");
const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        helpWithFeeYes: '//*[@id="hwf_needHelpWithFees"]', 
        alreadyAppliedYes: '//*[@id="hwf_feesAppliedDetails"]', 
        helpWithFeeRef: '//*[@id="helpWithFeesReferenceNumber"]',
    },
    async helpWithFee(){
        await I.retry(retryCount).waitForText(HelpWithFees.helpWithFeesYesNoTitle);
        await I.retry(retryCount).click(this.fields.helpWithFeeYes);
        await I.retry(retryCount).click('Continue');
    },
    async alreadyApplied() {
        await I.retry(retryCount).waitForText(HelpWithFees.alreadyAppliedHelpWithFee);
        await I.retry(retryCount).click(this.fields.alreadyAppliedYes);
        await I.retry(retryCount).waitForText(HelpWithFees.alreadyAppliedEnterRef);
        await I.retry(retryCount).fillField(this.fields.helpWithFeeRef, HelpWithFees.helpWithFeesRefNo);
        await I.retry(retryCount).click('Continue');
        I.waitForNavigation();
    },
    async helpWithFeeEvent() {
        await this.helpWithFee();
        await this.alreadyApplied();
    },
};