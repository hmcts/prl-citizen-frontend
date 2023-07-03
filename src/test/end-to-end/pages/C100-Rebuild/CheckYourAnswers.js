const CYA = require("../../contents/CheckYourAnswers-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]',    
    },
    async checkYourAnswers(){
        await I.retry(retryCount).waitForText(CYA.cyaTitle , 60);
        await I.retry(retryCount).waitForText(CYA.caseName , 60);
        await I.retry(retryCount).waitForText(CYA.locationDetails , 60);
        await I.retry(retryCount).waitForText(CYA.typeOfApplication , 60);
        await I.retry(retryCount).waitForText(CYA.legalRepDetails , 60);
        await I.retry(retryCount).waitForText(CYA.permissionApplication , 60);
        await I.retry(retryCount).waitForText(CYA.miam , 60);
        await I.retry(retryCount).waitForText(CYA.miamAttendance , 60);
        await I.retry(retryCount).waitForText(CYA.miamExemption , 60);
        await I.retry(retryCount).waitForText(CYA.askingCourtDecide , 60);
        await I.retry(retryCount).waitForText(CYA.hearingDetails , 60);
        await I.retry(retryCount).waitForText(CYA.detailsOfPeopleApp , 60);
        await I.retry(retryCount).waitForText(CYA.childDetails , 60);
        await I.retry(retryCount).waitForText(CYA.additionalChildDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherChildDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherChild , 60);
        await I.retry(retryCount).waitForText(CYA.applicantDetails , 60);
        await I.retry(retryCount).waitForText(CYA.applicantOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.respondentDetails , 60);
        await I.retry(retryCount).waitForText(CYA.respondentOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherPeopleDetails , 60);
        await I.retry(retryCount).waitForText(CYA.otherPersonOneDetails , 60);
        await I.retry(retryCount).waitForText(CYA.whereChildLive , 60);
        await I.retry(retryCount).waitForText(CYA.pastAndCurrentProceedings , 60);
        await I.retry(retryCount).waitForText(CYA.safetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.childSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.applicantSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.otherSafetyConcerns , 60);
        await I.retry(retryCount).waitForText(CYA.internationalElements , 60);
        await I.retry(retryCount).waitForText(CYA.reasonableAdjustments , 60);
        await I.retry(retryCount).waitForText(CYA.helpWithFees , 60);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth , 60);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth , 60);
        await I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    }, 
    async applicationSubmitted() {
        await I.retry(retryCount).waitForText(CYA.applicationSubmittedSuccess , 60);
        await I.retry(retryCount).waitForText(CYA.applicationCaseNo , 60);
        await I.wait('5');
    },
    async checkYourAnswersEvent() {
        await this.checkYourAnswers();
       // await this.applicationSubmitted();
    },
};