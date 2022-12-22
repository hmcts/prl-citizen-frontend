const OtherPersonDetails = require("../../contents/OtherPersonDetails-content");
const I = actor();
const retryCount = 3;
module.exports = {
  fields: {
    otherPersonCheckYesButton: '//*[@id="oprs_otherPersonCheck"]', 
    firstNameField: '//*[@id="c100TempFirstName"]', 
    lastNameField: '//*[@id="c100TempLastName"]', 
    hasNameChangedNoButton: '//*[@id="hasNameChanged-2"]', 
    maleGender: '//*[@id="gender"]', 
    dayDOB: '//*[@id="dateOfBirth-day"]',
    monthDOB: '//*[@id="dateOfBirth-month"]',
    yearDOB: '//*[@id="dateOfBirth-year"]', 
    grandparentOptionButton: '//*[@id="relationshipType-5"]', 
    otherPersonPostCodeField: '//*[@id="PostCode"]', 
    addressList: '//*[@id="selectAddress"]',
    liveWithFirstOptionButton: '//*[@id="liveWith"]', 
  },
   async otherPerson() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonPageTitle);
    await I.retry(retryCount).click(this.fields.otherPersonCheckYesButton);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonName() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonNamePageTitle);
    await I.retry(retryCount).fillField(this.fields.firstNameField, OtherPersonDetails.firstName);
    await I.retry(retryCount).fillField(this.fields.lastNameField, OtherPersonDetails.lastName);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonDetailsInfo() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsPageTitle);
    await I.retry(retryCount).waitForText(OtherPersonDetails.haveTheyChangedTheirNameText);
    await I.retry(retryCount).click(this.fields.hasNameChangedNoButton);
    await I.retry(retryCount).waitForText(OtherPersonDetails.genderText);
    await I.retry(retryCount).click(this.fields.maleGender);
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsDOBText);
    await I.retry(retryCount).fillField(this.fields.dayDOB, OtherPersonDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, OtherPersonDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, OtherPersonDetails.year);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonRelationship() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonRelationshipPageTitle);
    await I.retry(retryCount).click(this.fields.grandparentOptionButton);
    await I.retry(retryCount).click('Continue');
  },
    async addressOfOtherPerson() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonPageTitle);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonSubHeading);
    await I.retry(retryCount).fillField(this.fields.otherPersonPostCodeField, OtherPersonDetails.postcode);
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUpPage() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpPageTitle);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpSubHeading);
    await I.retry(retryCount).selectOption(this.fields.addressList, OtherPersonDetails.lookUpOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async confirmAddress() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.confirmAddressPageTitle);
    await I.retry(retryCount).click('Continue');
  },
   async currentlyLiveWith() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.currentlyLiveWithPageTitle);
    await I.retry(retryCount).click(this.fields.liveWithFirstOptionButton);
    await I.retry(retryCount).click('Continue');
  },
  async otherPersonDetails() {
    await this.otherPerson();
    await this.otherPersonName();
    await this.otherPersonDetailsInfo();
    await this.otherPersonRelationship();
    await this.addressOfOtherPerson();
    await this.addressLookUpPage();
    await this.confirmAddress();
    await this.currentlyLiveWith();
  },
};