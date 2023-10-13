const HelpWithFees = require("../../contents/HelpWithFees-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        helpWithFeeYes: '//*[@id="hwf_needHelpWithFees"]', 
        helpWithFeesNo: '//*[@id="hwf_needHelpWithFees-2"]', 
        alreadyAppliedYes: '//*[@id="hwf_feesAppliedDetails"]', 
        helpWithFeeRef: '//*[@id="helpWithFeesReferenceNumber"]',
    },
    async helpWithFee(hwfOption){
        await I.retry(retryCount).waitForText(HelpWithFees.helpWithFeesYesNoTitle , 30);
        await I.retry(retryCount).click(hwfOption ? this.fields.helpWithFeeYes : this.fields.helpWithFeesNo);
        await I.retry(retryCount).click('Continue');
    },
    async alreadyApplied() {
        await I.retry(retryCount).waitForText(HelpWithFees.alreadyAppliedHelpWithFee , 60);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.alreadyAppliedYes);
        await I.retry(retryCount).waitForText(HelpWithFees.alreadyAppliedEnterRef , 60);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.helpWithFeeRef, HelpWithFees.helpWithFeesRefNo);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async withHelpWithFeeEvent() {
        await this.helpWithFee(true);
        await this.alreadyApplied();
    },
    async withoutHelpWithFees() {
        await this.helpWithFee(false);
    },
};