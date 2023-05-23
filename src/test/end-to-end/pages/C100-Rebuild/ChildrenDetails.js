const ChildrenDetails = require("../../contents/ChildrenDetails-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
    fields: {
        //Child Details
        mainForm: '//*[@id="main-form"]',
        tempFirstName: '//*[@name="c100TempFirstName"]',
        tempLastName: '//*[@name="c100TempLastName"]',
        //Child Details DOB
        dayDOB: '//*[@id="dateOfBirth-day"]',
        monthDOB: '//*[@id="dateOfBirth-month"]',
        yearDOB: '//*[@id="dateOfBirth-year"]',
        femaleGender: '//*[@id="gender"]',
        //Decisions court to resolve
        needsResolution: '//*[@id="needsResolution"]',
        needsResolution2: '//*[@id="needsResolution-2"]',
        //Parental responsibility
        statement: '//*[@id="statement"]',
        //Further information
        childrenKnownToSocialServices: '//*[@id="cd_childrenKnownToSocialServices"]',
        childrenKnownToSocialServicesDetail: '//*[@id="cd_childrenKnownToSocialServicesDetails"]',
        childrenSubjectOfProtectionPlan: '//*[@id="cd_childrenSubjectOfProtectionPlan"]',
        //Other Children
        otherChildrenYes: '//*[@id="ocd_hasOtherChildren"]',
    },
    async childDetailsName() {
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsNamePageTitle);
        await I.retry(retryCount).click(this.fields.mainForm);
        // await I.retry(retryCount).waitForSelector(this.fields.tempFirstName, 30);
        await I.retry(retryCount).fillField(this.fields.tempFirstName, ChildrenDetails.childFirstName);
        await I.retry(retryCount).fillField(this.fields.tempLastName, ChildrenDetails.childLastName);
        await I.retry(retryCount).waitForText('Continue');
        await I.retry(retryCount).click('Continue');
    },
    async childDetailsDOB() {
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsDOBPageTitle);
        await I.retry(retryCount).fillField(this.fields.dayDOB, ChildrenDetails.day);
        await I.retry(retryCount).fillField(this.fields.monthDOB, ChildrenDetails.month);
        await I.retry(retryCount).fillField(this.fields.yearDOB, ChildrenDetails.year);
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsDOBSubHeading)
        await I.retry(retryCount).click(this.fields.femaleGender);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async decisionsCourtToResolve() {
        await I.retry(retryCount).waitForText(ChildrenDetails.decisionsCourtToResolvePageTitle);
        await I.retry(retryCount).click(this.fields.needsResolution);
        await I.retry(retryCount).click(this.fields.needsResolution2);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async parentalResponsibility() {
        await I.retry(retryCount).waitForText(ChildrenDetails.parentalResponsibilityPageTitle);
        await I.retry(retryCount).fillField(this.fields.statement, ChildrenDetails.testingText);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async furtherInformation() {
        await I.retry(retryCount).waitForText(ChildrenDetails.furtherInformationPageTitle);
        I.wait('2');
        await I.retry(retryCount).click(this.fields.childrenKnownToSocialServices);
        I.wait('3');
        await I.retry(retryCount).fillField(this.fields.childrenKnownToSocialServicesDetail, ChildrenDetails.testingText);
        await I.retry(retryCount).waitForText(ChildrenDetails.furtherInformationSubHeading);
        I.wait('3');
        await I.retry(retryCount).click(this.fields.childrenSubjectOfProtectionPlan);
        I.wait('3');
        await I.retry(retryCount).click('Continue');
    },
    async otherChildren() {
        await I.retry(retryCount).waitForText(ChildrenDetails.otherChildrenPageTitle);
        await I.retry(retryCount).click(this.fields.otherChildrenYes);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async otherChildrenName() {
        await I.retry(retryCount).waitForText(ChildrenDetails.otherChildrenNamePageTitle);
        I.wait('1');
        await I.retry(retryCount).fillField(this.fields.tempFirstName, ChildrenDetails.firstName);
        await I.retry(retryCount).fillField(this.fields.tempLastName, ChildrenDetails.surname);
        I.wait('2');
        await I.retry(retryCount).click('Continue');
    },
    async childrenDetails() {
        await this.childDetailsName();
        await this.childDetailsDOB();
        await this.decisionsCourtToResolve();
        await this.parentalResponsibility();
        await this.furtherInformation();
        await this.otherChildren();
        await this.otherChildrenName();
        await this.childDetailsDOB();
    },
};