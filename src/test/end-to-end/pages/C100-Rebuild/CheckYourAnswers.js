const CYA = require("../../contents/CheckYourAnswers-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]',    
    },
    async checkYourAnswers(){
        await I.retry(retryCount).waitForText(CYA.cyaTitle , 60);
        await I.retry(retryCount).waitForText(CYA.caseName , 30);
        await I.retry(retryCount).waitForText(CYA.locationDetails , 30);
        await I.retry(retryCount).waitForText(CYA.typeOfApplication , 30);
        await I.retry(retryCount).waitForText(CYA.legalRepDetails , 30);
        await I.retry(retryCount).waitForText(CYA.permissionApplication , 30);
        await I.retry(retryCount).waitForText(CYA.miam , 30);
        await I.retry(retryCount).waitForText(CYA.miamAttendance , 30);
        await I.retry(retryCount).waitForText(CYA.miamExemption , 30);
        await I.retry(retryCount).waitForText(CYA.askingCourtDecide , 30);
        await I.retry(retryCount).waitForText(CYA.hearingDetails , 30);
        await I.retry(retryCount).waitForText(CYA.detailsOfPeopleApp , 30);
        await I.retry(retryCount).waitForText(CYA.childDetails , 30);
        await I.retry(retryCount).waitForText(CYA.additionalChildDetails , 30);
        await I.retry(retryCount).waitForText(CYA.otherChildDetails , 30);
        await I.retry(retryCount).waitForText(CYA.otherChild , 30);
        await I.retry(retryCount).waitForText(CYA.applicantDetails , 30);
        await I.retry(retryCount).waitForText(CYA.applicantOneDetails , 30);
        await I.retry(retryCount).waitForText(CYA.respondentDetails , 30);
        await I.retry(retryCount).waitForText(CYA.respondentOneDetails , 30);
        await I.retry(retryCount).waitForText(CYA.otherPeopleDetails , 30);
        await I.retry(retryCount).waitForText(CYA.otherPersonOneDetails , 30);
        await I.retry(retryCount).waitForText(CYA.whereChildLive , 30);
        await I.retry(retryCount).waitForText(CYA.pastAndCurrentProceedings , 30);
        await I.retry(retryCount).waitForText(CYA.safetyConcerns , 30);
        await I.retry(retryCount).waitForText(CYA.childSafetyConcerns , 30);
        await I.retry(retryCount).waitForText(CYA.applicantSafetyConcerns , 30);
        await I.retry(retryCount).waitForText(CYA.otherSafetyConcerns , 30);
        await I.retry(retryCount).waitForText(CYA.internationalElements , 30);
        await I.retry(retryCount).waitForText(CYA.reasonableAdjustments , 30);
        await I.retry(retryCount).waitForText(CYA.helpWithFees , 30);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth , 30);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth , 30);
        I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    }, 
    async applicationSubmitted() {
        await I.retry(retryCount).waitForText(CYA.applicationSubmittedSuccess , 30);
        await I.retry(retryCount).waitForText(CYA.applicationCaseNo , 30);
        I.wait('5');
    },
    async checkYourAnswersEvent() {
        await this.checkYourAnswers();
       // await this.applicationSubmitted();
    },
};