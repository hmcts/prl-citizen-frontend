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
        await I.retry(retryCount).waitForText(SafetyConcerns.safetyConcernsPageTitle);
        await I.retry(retryCount).click('Continue');
    },
    async concernsSafety() {
        await I.retry(retryCount).waitForText(SafetyConcerns.concernsSafety);
        await I.retry(retryCount).click(this.fields.concernsSafetyYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.concernsSafetyYesInfo);
        await I.retry(retryCount).click('Continue');
    },
    async concernAboutWhoChildApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.concernAboutWho);
        await I.retry(retryCount).click(this.fields.concernAboutChildren);
        await I.retry(retryCount).click(this.fields.concernAboutYourself);
        await I.retry(retryCount).click('Continue');
    },
    async behaviourChildrenExperienced() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whatBehaviourChildren);
        await I.retry(retryCount).click(this.fields.physicalAbuse);
        await I.retry(retryCount).click(this.fields.abduction);
        await I.retry(retryCount).click(this.fields.witnessingDomesticAbuse);
        await I.retry(retryCount).click('Continue');
    },
    async describePhysicalAbuseChild() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describePhysicalAbuseTitle);
        await I.retry(retryCount).waitForText(SafetyConcerns.whichChildren);
        await I.retry(retryCount).click(this.fields.childOne);
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async whyChildAbducted() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whyChildAbduction);
        await I.retry(retryCount).fillField(this.fields.explainConcernsDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.whereChildrenNow, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async childrenPassport() {
        await I.retry(retryCount).waitForText(SafetyConcerns.doChildrenHavePassport);
        await I.retry(retryCount).click(this.fields.childrenPassportYes);
        await I.retry(retryCount).click('Continue');
    },
    async childrenPassportDetails() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childrenPassportDetails);
        await I.retry(retryCount).click(this.fields.childMoreThanOnePassport);
        await I.retry(retryCount).click(this.fields.childPassportPossession);
        await I.retry(retryCount).click('Continue');
    },
    async passportOfficeNotified() {
        await I.retry(retryCount).waitForText(SafetyConcerns.passportOfficeNotified);
        await I.retry(retryCount).click(this.fields.passportOfficeNotifiedYes);
        await I.retry(retryCount).click('Continue');
    },
    async childAbductedBefore() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childAbductedBefore);
        await I.retry(retryCount).click(this.fields.childAbductedBeforeYes);
        await I.retry(retryCount).click('Continue');
    },
    async previousAbductionDetails() {
        await I.retry(retryCount).waitForText(SafetyConcerns.previousAbductionDetailsTitle);
        await I.retry(retryCount).fillField(this.fields.previousAbductionDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.policeInvolvedYes);
        await I.retry(retryCount).fillField(this.fields.policeInvolvedDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },

    //Safety Concerns for Applicant
    async behaviourApplicantExperienced() {
        await I.retry(retryCount).waitForText(SafetyConcerns.whatBehaviourApplicantTitle);
        await I.retry(retryCount).click(this.fields.physicalAbuseApplicant);
        await I.retry(retryCount).click(this.fields.emotionalAbuseApplicant);
        await I.retry(retryCount).click('Continue');
    },
    async describePhysicalAbuseApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describePhysicalAbuseApplicantTitle);
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async describeEmotionalAbuseApplicant() {
        await I.retry(retryCount).waitForText(SafetyConcerns.describeEmotionalAbuseApplicantTitle);
        await I.retry(retryCount).fillField(this.fields.behaviourDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).fillField(this.fields.behaviourStartDate, SafetyConcerns.testingText);
        await I.retry(retryCount).click(this.fields.ongoingBehaviourYes);
        await I.retry(retryCount).click(this.fields.seekHelpYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.seekHelpYesText);
        await I.retry(retryCount).fillField(this.fields.seekHelpDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },

    //Other Concerns
    async otherConcerns() {
        await I.retry(retryCount).waitForText(SafetyConcerns.childImpactedDrugAlcohol);
        await I.retry(retryCount).click(this.fields.otherConcernsYes);
        await I.retry(retryCount).fillField(this.fields.otherConcernsDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async otherConcernsSafety() {
        await I.retry(retryCount).waitForText(SafetyConcerns.otherConcernsSafetyTitle);
        await I.retry(retryCount).click(this.fields.otherConcernsSafetyYes);
        await I.retry(retryCount).fillField(this.fields.otherConcernsSafetyDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async courtToDo() {
        await I.retry(retryCount).waitForText(SafetyConcerns.courtToDoTitle);
        await I.retry(retryCount).fillField(this.fields.courtToDoDetails, SafetyConcerns.testingText);
        await I.retry(retryCount).click('Continue');
    },

    //Contact with child
    async contactWithChildAndOtherPeople() {
        await I.retry(retryCount).waitForText(SafetyConcerns.contactWithChildTitle);
        await I.retry(retryCount).waitForText(SafetyConcerns.childSpendingTimeSubtitle);
        await I.retry(retryCount).click(this.fields.supervisedYes);
        await I.retry(retryCount).waitForText(SafetyConcerns.contactOtherWaysSubtitle);
        await I.retry(retryCount).click(this.fields.otherWaysContactYes);
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
