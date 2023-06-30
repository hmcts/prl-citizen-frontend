const OtherPersonDetails = require("../../contents/OtherPersonDetails-content");
const { I } = inject();
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
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.otherPersonCheckYesButton);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonName() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonNamePageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.firstNameField, OtherPersonDetails.firstName);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.lastNameField, OtherPersonDetails.lastName);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonDetailsInfo() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.haveTheyChangedTheirNameText , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.hasNameChangedNoButton);
    await I.retry(retryCount).waitForText(OtherPersonDetails.genderText , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.maleGender);
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsDOBText , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.dayDOB, OtherPersonDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, OtherPersonDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, OtherPersonDetails.year);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonRelationship() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonRelationshipPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.grandparentOptionButton);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async addressOfOtherPerson() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.otherPersonPostCodeField, OtherPersonDetails.postcode);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUpPage() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.addressList, OtherPersonDetails.lookUpOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async confirmAddress() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.confirmAddressPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async currentlyLiveWith() {
    I.wait('2');
    await I.retry(retryCount).waitForText(OtherPersonDetails.currentlyLiveWithPageTitle , 30);
    await I.retry(retryCount).waitForSelector(this.fields.liveWithFirstOptionButton, 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.liveWithFirstOptionButton);
    I.wait('2');
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