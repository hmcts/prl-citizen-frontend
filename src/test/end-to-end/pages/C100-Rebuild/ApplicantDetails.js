const ApplicantDetails = require("../../contents/ApplicantDetails-content");
const I = actor();
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
    await I.retry(retryCount).waitForText(ApplicantDetails.applicantDetailsPageTitle);
    await I.retry(retryCount).fillField(this.fields.applicantFirstName, ApplicantDetails.firstName);
    await I.retry(retryCount).fillField(this.fields.applicantLastName, ApplicantDetails.lastName);
    await I.retry(retryCount).click('Continue');
  },
    async confidentiality() {
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialityPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySubHeading);
    await I.retry(retryCount).click(this.fields.detailsKnownYes);
    await I.retry(retryCount).click('Continue');
  },
    async keepingConfidentialContact() {
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactSubHeading);
    await I.retry(retryCount).click(this.fields.startOptions);
    await I.retry(retryCount).click(this.fields.privateAddress);
    await I.retry(retryCount).click(this.fields.privateTelephoneNumber);
    await I.retry(retryCount).click(this.fields.privateEmail);
    await I.retry(retryCount).click('Continue');
  },
    async confidentialitySummary() {
    await I.retry(retryCount).waitForText(ApplicantDetails.keepingConfidentialContactPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySummarySubHeading);
    await I.retry(retryCount).waitForText(ApplicantDetails.confidentialitySummarySubHeading2);
    await I.retry(retryCount).click('Continue');
  },
    async provideDetailsPage() {
    await I.retry(retryCount).waitForText(ApplicantDetails.provideDetailsPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.provideDetailsPageTitleSubHeading);
    await I.retry(retryCount).click(this.fields.haveYouChangeNameYes);
    await I.retry(retryCount).fillField(this.fields.applPreviousNameField, ApplicantDetails.previousName);
    await I.retry(retryCount).click(this.fields.genderMan);
    await I.retry(retryCount).fillField(this.fields.dayDOB, ApplicantDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, ApplicantDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, ApplicantDetails.year);
    await I.retry(retryCount).waitForText(ApplicantDetails.placeOfBirthSubHeading);
    await I.retry(retryCount).fillField(this.fields.applicantPlaceOfBirth, ApplicantDetails.placeOfBirth);
    await I.retry(retryCount).click('Continue');
  },
   async relationshipToChild() {
    await I.retry(retryCount).waitForText(ApplicantDetails.relationshipToChildPageTitle);
    await I.retry(retryCount).click(this.fields.fatherOption);
    await I.retry(retryCount).click('Continue');
  },
    async addressDetailsOfApplicant() {
    await I.retry(retryCount).waitForText(ApplicantDetails.addressDetailsOfApplicantPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.addressHintText);
    await I.retry(retryCount).fillField(this.fields.addressPostcode, ApplicantDetails.postcode);
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUp() {
    await I.retry(retryCount).waitForText(ApplicantDetails.addressLookUpPageTitle);
    await I.retry(retryCount).selectOption(this.fields.addressList, ApplicantDetails.lookUpOption);
    await I.retry(retryCount).click('Continue');
   },
    async confirmAddress() {
    await I.retry(retryCount).waitForText(ApplicantDetails.confirmAddressPageTitle);
    await I.retry(retryCount).waitForText(ApplicantDetails.confirmAddressSubHeading);
    await I.retry(retryCount).click(this.fields.addressHistoryYes);
    await I.retry(retryCount).click('Continue');
  },
    async contactDetails() {
    await I.retry(retryCount).waitForText(ApplicantDetails.contactDetailsPageTitle);
    await I.retry(retryCount).click(this.fields.canProvideEmailButton);
    await I.retry(retryCount).fillField(this.fields.emailAddressField, ApplicantDetails.email);
    await I.retry(retryCount).click(this.fields.canProvideTelNumButton);
    await I.retry(retryCount).fillField(this.fields.telephoneNumberField, ApplicantDetails.phoneNumber);
    await I.retry(retryCount).waitForText(ApplicantDetails.contactDetailsSubHeading);
    await I.retry(retryCount).click(this.fields.canLeaveVoiceMailButton);
    await I.retry(retryCount).click('Continue');
  },
    async contactPreferences() {
    await I.retry(retryCount).waitForText(ApplicantDetails.contactPreferencesPageTitle);
    await I.retry(retryCount).click(this.fields.digitalOption);
    await I.retry(retryCount).click(this.fields.postOption);
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