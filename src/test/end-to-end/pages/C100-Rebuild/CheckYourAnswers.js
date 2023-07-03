<<<<<<< HEAD
const CYA = require("../../contents/CheckYourAnswers-content");
const { I } = inject();
const retryCount = 3;

module.exports = {
    fields: {
        statementOfTruthYes: '//*[@id="statementOfTruth"]',    
    },
    async checkYourAnswers(){
        await I.retry(retryCount).waitForText(CYA.cyaTitle);
        await I.retry(retryCount).waitForText(CYA.caseName);
        await I.retry(retryCount).waitForText(CYA.locationDetails);
        await I.retry(retryCount).waitForText(CYA.typeOfApplication);
        await I.retry(retryCount).waitForText(CYA.legalRepDetails);
        await I.retry(retryCount).waitForText(CYA.permissionApplication);
        await I.retry(retryCount).waitForText(CYA.miam);
        await I.retry(retryCount).waitForText(CYA.miamAttendance);
        await I.retry(retryCount).waitForText(CYA.miamExemption);
        await I.retry(retryCount).waitForText(CYA.askingCourtDecide);
        await I.retry(retryCount).waitForText(CYA.hearingDetails);
        await I.retry(retryCount).waitForText(CYA.detailsOfPeopleApp);
        await I.retry(retryCount).waitForText(CYA.childDetails);
        await I.retry(retryCount).waitForText(CYA.additionalChildDetails);
        await I.retry(retryCount).waitForText(CYA.otherChildDetails);
        await I.retry(retryCount).waitForText(CYA.otherChild);
        await I.retry(retryCount).waitForText(CYA.applicantDetails);
        await I.retry(retryCount).waitForText(CYA.applicantOneDetails);
        await I.retry(retryCount).waitForText(CYA.respondentDetails);
        await I.retry(retryCount).waitForText(CYA.respondentOneDetails);
        await I.retry(retryCount).waitForText(CYA.otherPeopleDetails);
        await I.retry(retryCount).waitForText(CYA.otherPersonOneDetails);
        await I.retry(retryCount).waitForText(CYA.whereChildLive);
        await I.retry(retryCount).waitForText(CYA.pastAndCurrentProceedings);
        await I.retry(retryCount).waitForText(CYA.safetyConcerns);
        await I.retry(retryCount).waitForText(CYA.childSafetyConcerns);
        await I.retry(retryCount).waitForText(CYA.applicantSafetyConcerns);
        await I.retry(retryCount).waitForText(CYA.otherSafetyConcerns);
        await I.retry(retryCount).waitForText(CYA.internationalElements);
        await I.retry(retryCount).waitForText(CYA.reasonableAdjustments);
        await I.retry(retryCount).waitForText(CYA.helpWithFees);
        await I.retry(retryCount).waitForText(CYA.statementOfTruth);
        await I.retry(retryCount).waitForText(CYA.confirmStatementTruth);
        I.wait('5');
        await I.retry(retryCount).click(this.fields.statementOfTruthYes);
        await I.retry(retryCount).click('Submit your application');
    }, 
    async applicationSubmitted() {
        await I.retry(retryCount).waitForText(CYA.applicationSubmittedSuccess);
        await I.retry(retryCount).waitForText(CYA.applicationCaseNo);
        I.wait('5');
    },
    async checkYourAnswersEvent() {
        await this.checkYourAnswers();
       // await this.applicationSubmitted();
    },
=======
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
>>>>>>> master
};