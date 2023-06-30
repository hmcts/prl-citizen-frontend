const ApplicantDetails = require("../../contents/ApplicantDetails-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    applicantFirstName: '//*[@id="applicantFirstName"]', 
    applicantLastName: '//*[@id="applicantLastName"]', 
    detailsKnownYes: '//*[@id="detailsKnown"]', 
    startOptions: '//*[@id="start"]', 
    privateAddress: '//*[@id="contactDetailsPrivate"]', 
    privateTelephoneNumber: '//*[@id="contactDetailsPrivate-2"]', 
    privateEmail: '//*[@id="contactDetailsPrivate-3"]', 
    haveYouChangeNameYes: '//*[@id="haveYouChangeName"]', 
    applPreviousNameField: '//*[@id="applPreviousName"]', 
    genderMan: '//*[@id="gender-2"]', 
    dayDOB: '//*[@id="dateOfBirth-day"]',
    monthDOB: '//*[@id="dateOfBirth-month"]',
    yearDOB: '//*[@id="dateOfBirth-year"]',
    applicantPlaceOfBirth: '//*[@id="applicantPlaceOfBirth"]', 
    fatherOption: '//*[@id="relationshipType-2"]', 
    addressPostcode: '//*[@id="addressPostcode"]', 
    //address look up
    addressList: '//*[@id="selectAddress"]',
    addressHistoryYes: '//*[@id="addressHistory"]',
    canProvideEmailButton: '//*[@id="canProvideEmail"]', 
    emailAddressField: '//*[@id="emailAddress"]', 
    canProvideTelNumButton: '//*[@id="canProvideTelephoneNumber"]', 
    telephoneNumberField: '//*[@id="telephoneNumber"]', 
    canLeaveVoiceMailButton: '//*[@id="canLeaveVoiceMail"]', 
    digitalOption: '//*[@id="applicantContactPreferences"]', 
    postOption: '//*[@id="applicantContactPreferences-2"]', 
  },
   async fillApplicantDetails() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.applicantDetailsPageTitle , 30);
    await I.retry(retryCount).fillField(this.fields.applicantFirstName, ApplicantDetails.firstName);
    await I.retry(retryCount).fillField(this.fields.applicantLastName, ApplicantDetails.lastName);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async confidentiality() {
      I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialityPageTitle , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.detailsKnownYes);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async keepingConfidentialContact() {
      I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactPageTitle , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactSubHeading , 30);
    I.wait('4');
    await I.retry(retryCount).click(this.fields.startOptions);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.privateAddress);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.privateTelephoneNumber);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.privateEmail);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async confidentialitySummary() {
      I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactPageTitle, 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySummarySubHeading , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySummarySubHeading2 , 30);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async provideDetailsPage() {
      I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.provideDetailsPageTitle , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.provideDetailsPageTitleSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.haveYouChangeNameYes);
    I.wait('1');
    await I.retry(retryCount).fillField(this.fields.applPreviousNameField, ApplicantDetails.previousName);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.genderMan);
    I.wait('4');
    await I.retry(retryCount).fillField(this.fields.dayDOB, ApplicantDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, ApplicantDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, ApplicantDetails.year);
    await I.retry(retryCount).waitForText(ApplicantDetails.placeOfBirthSubHeading , 30);
    I.wait('4');
    await I.retry(retryCount).fillField(this.fields.applicantPlaceOfBirth, ApplicantDetails.placeOfBirth);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
   async relationshipToChild() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.relationshipToChildPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.fatherOption);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async addressDetailsOfApplicant() {
      I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.addressDetailsOfApplicantPageTitle , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.addressHintText , 30);
    I.wait('4');
    await I.retry(retryCount).fillField(this.fields.addressPostcode, ApplicantDetails.postcode);
    I.waitForText('Continue');
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUp() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.addressLookUpPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.addressList, ApplicantDetails.lookUpOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
   },
    async confirmAddress() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.confirmAddressPageTitle , 30);
    await I.retry(retryCount).waitForText(ApplicantDetails.confirmAddressSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.addressHistoryYes);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async contactDetails() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.contactDetailsPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.canProvideEmailButton);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.emailAddressField, ApplicantDetails.email);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.canProvideTelNumButton);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.telephoneNumberField, ApplicantDetails.phoneNumber);
    I.wait('2');
    await I.retry(retryCount).waitForText(ApplicantDetails.contactDetailsSubHeading , 30);
    await I.retry(retryCount).click(this.fields.canLeaveVoiceMailButton);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async contactPreferences() {
    I.wait('4');
    await I.retry(retryCount).waitForText(ApplicantDetails.contactPreferencesPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.digitalOption);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.postOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async applicantDetails() {
    await this.fillApplicantDetails();
    await this.confidentiality();
    await this.keepingConfidentialContact();
    await this.confidentialitySummary();
    await this.provideDetailsPage();
    await this.relationshipToChild();
    await this.addressDetailsOfApplicant();
    await this.addressLookUp();
    await this.confirmAddress();
    await this.contactDetails();
    await this.contactPreferences();
  },
};