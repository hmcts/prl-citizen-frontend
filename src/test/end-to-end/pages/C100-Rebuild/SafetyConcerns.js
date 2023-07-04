const SafetyConcerns = require("../../contents/SafetyConcerns-content");
const { I } = inject();
const retryCount = 3;

module.exports = {

    fields: {
        concernsSafetyYes: '//*[@id="c1A_haveSafetyConcerns"]',
        concernAboutChildren: '//*[@id="c1A_safetyConernAbout"]',
        concernAboutYourself: '//*[@id="c1A_safetyConernAbout-2"]',

        physicalAbuse: '//*[@id="c1A_concernAboutChild"]',
        abduction: '//*[@id="c1A_concernAboutChild-6"]',
        witnessingDomesticAbuse: '//*[@id="c1A_concernAboutChild-7"]',

        childOne: '//*[@id="childrenConcernedAbout"]',
        behaviourDetails: '//*[@id="behaviourDetails"]',
        behaviourStartDate: '//*[@id="behaviourStartDate"]',
        ongoingBehaviourYes: '//*[@id="isOngoingBehaviour"]',
        seekHelpYes: '//*[@id="seekHelpFromPersonOrAgency"]',
        seekHelpDetails: '//*[@id="seekHelpDetails"]',

        //Child Abduction
        explainConcernsDetails: '//*[@id="c1A_abductionReasonOutsideUk"]',
        whereChildrenNow: '//*[@id="c1A_childsCurrentLocation"]',

        //Children Passport
        childrenPassportYes: '//*[@id="c1A_passportOffice"]',
        childMoreThanOnePassport: '//*[@id="c1A_childrenMoreThanOnePassport"]',
        childPassportPossession: '//*[@id="c1A_possessionChildrenPassport"]',
        passportOfficeNotifiedYes: '//*[@id="c1A_abductionPassportOfficeNotified"]',
        childAbductedBeforeYes: '//*[@id="c1A_childAbductedBefore"]',

        //Previous Abductions
        previousAbductionDetails: '//*[@id="c1A_previousAbductionsShortDesc"]',
        policeInvolvedYes: '//*[@id="c1A_policeOrInvestigatorInvolved"]',
        policeInvolvedDetails: '//*[@id="c1A_policeOrInvestigatorOtherDetails"]',

        //Applicant Safety Concerns
        physicalAbuseApplicant: '//*[@id="c1A_concernAboutApplicant"]',
        emotionalAbuseApplicant: '//*[@id="c1A_concernAboutApplicant-3"]',

        otherConcernsYes: '//*[@id="c1A_otherConcernsDrugs"]',
        otherConcernsDetails: '//*[@id="c1A_otherConcernsDrugsDetails"]',
        otherConcernsSafetyYes: '//*[@id="c1A_childSafetyConcerns"]',
        otherConcernsSafetyDetails: '//*[@id="c1A_childSafetyConcernsDetails"]',
        courtToDoDetails: '//*[@id="c1A_keepingSafeStatement"]',

        //contact with child
        supervisedYes: '//*[@id="c1A_supervisionAgreementDetails-2"]',
        otherWaysContactYes: '//*[@id="c1A_agreementOtherWaysDetails"]',
    },
    async safetyConcernsLandingPage() {
        await I.retry(retryCount).waitForText(SafetyConcerns.safetyConcernsPageTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async concernsSafety() {
        await I.retry(retryCount).waitForText(SafetyConcerns.concernsSafety , 30);
        await I.retry(retryCount).click(this.fields.concernsSafetyYes);
        await I.wait('2');
        await I.retry(retryCount).waitForText(SafetyConcerns.concernsSafetyYesInfo , 30);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async concernAboutWhoChildApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.concernAboutWho , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.concernAboutChildren);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.concernAboutYourself);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async behaviourChildrenExperienced() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whatBehaviourChildren , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.physicalAbuse);
        await I.retry(retryCount).click(this.fields.abduction);
        await I.retry(retryCount).click(this.fields.witnessingDomesticAbuse);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async describePhysicalAbuseChild() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describePhysicalAbuseTitle , 30);
        await I.retry(retryCount).waitForText(SafetyConcerns.whichChildren , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.childOne);
        await I.retry(retryCount).waitForSelector(this.fields.behaviourDetails, 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).waitForSelector(this.fields.behaviourStartDate, 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.wait('2');
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText , 30);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async whyChildAbducted() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whyChildAbduction , 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.explainConcernsDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.whereChildrenNow, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async childrenPassport() {
        await I.retry(retryCount).waitForText(SafetyConcerns.doChildrenHavePassport , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.childrenPassportYes);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async childrenPassportDetails() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childrenPassportDetails , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.childMoreThanOnePassport);
        await I.retry(retryCount).click(this.fields.childPassportPossession);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async passportOfficeNotified() {
        await I.retry(retryCount).waitForText(SafetyConcerns.passportOfficeNotified , 30);
        await I.retry(retryCount).click(this.fields.passportOfficeNotifiedYes);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async childAbductedBefore() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childAbductedBefore , 30);
        await I.retry(retryCount).click(this.fields.childAbductedBeforeYes);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async previousAbductionDetails() {
        await I.retry(retryCount).waitForText(SafetyConcerns.previousAbductionDetailsTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.previousAbductionDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.policeInvolvedYes);
        await I.retry(retryCount).fillField(this.fields.policeInvolvedDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },

    //Safety Concerns for Applicant
    async behaviourApplicantExperienced() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whatBehaviourApplicantTitle , 30);
        await I.retry(retryCount).click(this.fields.physicalAbuseApplicant);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.emotionalAbuseApplicant);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async describePhysicalAbuseApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describePhysicalAbuseApplicantTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText , 30);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async describeEmotionalAbuseApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describeEmotionalAbuseApplicantTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText , 30);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },

    //Other Concerns
    async otherConcerns() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childImpactedDrugAlcohol , 30);
        await I.wait('2');
        await I.retry(retryCount).waitForSelector(this.fields.otherConcernsYes, 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.otherConcernsYes);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.otherConcernsDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async otherConcernsSafety() {
        await I.retry(retryCount).waitForText(SafetyConcerns.otherConcernsSafetyTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.otherConcernsSafetyYes);
        await I.retry(retryCount).fillField(this.fields.otherConcernsSafetyDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async courtToDo() {
        await I.retry(retryCount).waitForText(SafetyConcerns.courtToDoTitle , 30);
        await I.wait('2');
        await I.retry(retryCount).fillField(this.fields.courtToDoDetails, SafetyConcerns.testingText);
        await I.wait('2');
        await I.retry(retryCount).click('Continue');
    },

    //Contact with child
    async contactWithChildAndOtherPeople() {
        await I.retry(retryCount).waitForText(SafetyConcerns.contactWithChildTitle , 30);
        await I.retry(retryCount).waitForText(SafetyConcerns.childSpendingTimeSubtitle , 30);
        await I.wait('2');
        await I.retry(retryCount).click(this.fields.supervisedYes);
        await I.wait('2');
        await I.retry(retryCount).waitForText(SafetyConcerns.contactOtherWaysSubtitle , 30);
        await I.retry(retryCount).click(this.fields.otherWaysContactYes);
        await I.retry(retryCount).waitForText('Continue');
        await I.retry(retryCount).click('Continue');
    },
    async safetyConcerns() {
        await this.safetyConcernsLandingPage();
        await this.concernsSafety();
        await this.concernAboutWhoChildApplicant();
        await this.behaviourChildrenExperienced();
        await this.describePhysicalAbuseChild();
        await this.whyChildAbducted();
        await this.childrenPassport();
        await this.childrenPassportDetails();
        await this.passportOfficeNotified();
        await this.childAbductedBefore();
        await this.previousAbductionDetails();
        await this.behaviourApplicantExperienced();
        await this.describePhysicalAbuseApplicant();
        await this.describeEmotionalAbuseApplicant();
        await this.otherConcerns();
        await this.otherConcernsSafety();
        await this.courtToDo();
        await this.contactWithChildAndOtherPeople();
    },
};
