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
        otherChildrenNo: '//*[@id="ocd_hasOtherChildren-2"]'
        },
    async childDetailsName() {
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsNamePageTitle , 30);
        await I.retry(retryCount).click(this.fields.mainForm);
        await I.retry(retryCount).waitForSelector(this.fields.tempFirstName, 30);
        await I.retry(retryCount).fillField(this.fields.tempFirstName, ChildrenDetails.childFirstName);
        await I.retry(retryCount).fillField(this.fields.tempLastName, ChildrenDetails.childLastName);
        await I.retry(retryCount).waitForText('Continue');
        await I.retry(retryCount).click('Continue');
    },
    async childDetailsDOB() {
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsDOBPageTitle , 30);
        await I.retry(retryCount).fillField(this.fields.dayDOB, ChildrenDetails.day);
        await I.retry(retryCount).fillField(this.fields.monthDOB, ChildrenDetails.month);
        await I.retry(retryCount).fillField(this.fields.yearDOB, ChildrenDetails.year);
        await I.retry(retryCount).waitForText(ChildrenDetails.childDetailsDOBSubHeading , 30);
        await I.retry(retryCount).click(this.fields.femaleGender);
        await I.retry(retryCount).click('Continue');
    },
    async decisionsCourtToResolve() {
        await I.retry(retryCount).waitForText(ChildrenDetails.decisionsCourtToResolvePageTitle , 30);
        await I.retry(retryCount).click(this.fields.needsResolution);
        await I.retry(retryCount).click(this.fields.needsResolution2);
        await I.retry(retryCount).click('Continue');
    },
    async parentalResponsibility() {
        await I.retry(retryCount).waitForText(ChildrenDetails.parentalResponsibilityPageTitle , 30);
        await I.retry(retryCount).fillField(this.fields.statement, ChildrenDetails.testingText);
        await I.retry(retryCount).click('Continue');
    },
    async furtherInformation() {
        await I.retry(retryCount).waitForText(ChildrenDetails.furtherInformationPageTitle , 30);
        await I.retry(retryCount).click(this.fields.childrenKnownToSocialServices);
        await I.retry(retryCount).fillField(this.fields.childrenKnownToSocialServicesDetail, ChildrenDetails.testingText);
        await I.retry(retryCount).waitForText(ChildrenDetails.furtherInformationSubHeading , 30);
        await I.retry(retryCount).click(this.fields.childrenSubjectOfProtectionPlan);
        await I.retry(retryCount).click('Continue');
    },
    async otherChildren(otherChildOption) {
        await I.retry(retryCount).waitForText(ChildrenDetails.otherChildrenPageTitle , 30);
        await I.retry(retryCount).click(otherChildOption ? this.fields.otherChildrenYes : this.fields.otherChildrenNo);
        await I.retry(retryCount).click('Continue');
    },
    async otherChildrenName() {
        await I.retry(retryCount).waitForText(ChildrenDetails.otherChildrenNamePageTitle , 30);
        await I.retry(retryCount).fillField(this.fields.tempFirstName, ChildrenDetails.firstName , 30);
        await I.retry(retryCount).fillField(this.fields.tempLastName, ChildrenDetails.surname , 30);
        await I.retry(retryCount).click('Continue');
    },
    async childrenDetails() {
        await this.childDetailsName();
        await this.childDetailsDOB();
        await this.decisionsCourtToResolve();
        await this.parentalResponsibility();
        await this.furtherInformation();
    },

    async noOtherChild() {
        await this.otherChildren(false);
    },

    async otherChildrenDetails() {
        await this.otherChildren(true);
        await this.otherChildrenName();
        await this.childDetailsDOB();
    },
};