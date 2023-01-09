const UrgencyWithoutNotice = require("../../contents/UrgencyWithoutNotice-content");
const I = actor();
const retryCount = 3;

module.exports = {
    fields: {
        testingText: 'Testing text area',
        //Urgent Hearing
        urgentHearingReasonsYes: '//*[@id="hu_urgentHearingReasons"]',
        reasonOfUrgentHearing: '//*[@id="hu_reasonOfUrgentHearing"]',
        reasonOfUrgentHearing2: '//*[@id="hu_reasonOfUrgentHearing-2"]',
        reasonOfUrgentHearing3: '//*[@id="hu_reasonOfUrgentHearing-3"]',
        reasonOfUrgentHearing4: '//*[@id="hu_reasonOfUrgentHearing-4"]',
        otherRiskDetailsField: '//*[@id="hu_otherRiskDetails"]',
        timeOfHearingDetailsField: '//*[@id="hu_timeOfHearingDetails"]',
        earingWithNext48HrsDetails: '//*[@id="hu_hearingWithNext48HrsDetails"]',
        hearingWithNext48HrsMsgField: '//*[@id="hu_hearingWithNext48HrsMsg"]',
        //Without Notice Hearing
        withoutNoticeYes: '//*[@id="hwn_hearingPart1"]',
        withoutNoticeDetails: '//*[@id="hwn_reasonsForApplicationWithoutNotice"]',
        obstructOrderYes: '//*[@id="hwn_doYouNeedAWithoutNoticeHearing"]',
        obstructOrderDetails: '//*[@id="hwn_doYouNeedAWithoutNoticeHearingDetails"]',
        noTimeNoticeYes: '//*[@id="hwn_doYouRequireAHearingWithReducedNotice"]',
        noTimeNoticeDetails: '//*[@id="hwn_doYouRequireAHearingWithReducedNoticeDetails"]',
    },
    async qualifyUrgentHearing() {
        await I.retry(retryCount).waitForText(UrgencyWithoutNotice.qualifyUrgentHearingPageTitle);  
        await I.retry(retryCount).click(this.fields.urgentHearingReasonsYes);
        I.wait(2);
        await I.retry(retryCount).click('Continue');
      },
      async aboutSituation() {
        await I.retry(retryCount).waitForText(UrgencyWithoutNotice.aboutSituationPageTitle);    
        await I.retry(retryCount).click(this.fields.reasonOfUrgentHearing);
        await I.retry(retryCount).click(this.fields.reasonOfUrgentHearing2);
        await I.retry(retryCount).click(this.fields.reasonOfUrgentHearing3);
        await I.retry(retryCount).click(this.fields.reasonOfUrgentHearing4);
        await I.retry(retryCount).fillField(this.fields.otherRiskDetailsField, this.fields.testingText);
        await I.retry(retryCount).fillField(this.fields.timeOfHearingDetailsField, this.fields.testingText);
        await I.retry(retryCount).click(this.fields.earingWithNext48HrsDetails);
        await I.retry(retryCount).fillField(this.fields.hearingWithNext48HrsMsgField, this.fields.testingText);
        I.wait(2);
        await I.retry(retryCount).click('Continue');
      },
    async withoutNoticeHearing() {
        await I.retry(retryCount).waitForText(UrgencyWithoutNotice.withoutNoticeHearingPageTitle);  
        await I.retry(retryCount).click(this.fields.withoutNoticeYes);
        await I.retry(retryCount).click('Continue');
    },
    async withoutNoticeDetails() {
        await I.retry(retryCount).waitForText(UrgencyWithoutNotice.withoutNoticeDetailsPageTitle);
        await I.retry(retryCount).fillField(this.fields.withoutNoticeDetails, this.fields.testingText);
        await I.retry(retryCount).click(this.fields.obstructOrderYes);
        await I.retry(retryCount).fillField(this.fields.obstructOrderDetails, this.fields.testingText);
        await I.retry(retryCount).click(this.fields.noTimeNoticeYes);
        await I.retry(retryCount).fillField(this.fields.noTimeNoticeDetails, this.fields.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async urgencyWithoutNotice() {
        await this.qualifyUrgentHearing();
        await this.aboutSituation();
        await this.withoutNoticeHearing();
        await this.withoutNoticeDetails();
    },
};