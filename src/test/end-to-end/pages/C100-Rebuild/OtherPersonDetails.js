const OtherPersonDetails = require("../../contents/OtherPersonDetails-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    otherPersonCheckYesButton: '//*[@id="oprs_otherPersonCheck"]', 
    otherPersonCheckNoButton: '//*[@id="oprs_otherPersonCheck-2"]',
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
    liveWithFirstOptionButton: '//*[@id="mainlyLiveWith"]', 
    livingArrangementsButton: '//*[@id="liveWith-2"]', 
  },
   async otherPerson(otherPersonOption) {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonPageTitle , 30);
    await I.retry(retryCount).click(otherPersonOption ? this.fields.otherPersonCheckYesButton : this.fields.otherPersonCheckNoButton);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonName() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonNamePageTitle , 30);
    await I.retry(retryCount).fillField(this.fields.firstNameField, OtherPersonDetails.firstName);
    await I.retry(retryCount).fillField(this.fields.lastNameField, OtherPersonDetails.lastName);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonDetailsInfo() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherPersonDetails.haveTheyChangedTheirNameText , 30);
    await I.retry(retryCount).click(this.fields.hasNameChangedNoButton);
    await I.retry(retryCount).waitForText(OtherPersonDetails.genderText , 30);
    await I.retry(retryCount).click(this.fields.maleGender);
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonDetailsDOBText , 30);
    await I.retry(retryCount).fillField(this.fields.dayDOB, OtherPersonDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, OtherPersonDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, OtherPersonDetails.year);
    await I.retry(retryCount).click('Continue');
  },
   async otherPersonRelationship() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.otherPersonRelationshipPageTitle , 30);
    await I.retry(retryCount).click(this.fields.grandparentOptionButton);
    await I.retry(retryCount).click('Continue');
  },
    async addressOfOtherPerson() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressOfOtherPersonSubHeading , 30);
    await I.retry(retryCount).fillField(this.fields.otherPersonPostCodeField, OtherPersonDetails.postcode);
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUpPage() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpPageTitle , 30);
    await I.retry(retryCount).waitForText(OtherPersonDetails.addressLookUpSubHeading , 30);
    await I.retry(retryCount).selectOption(this.fields.addressList, OtherPersonDetails.lookUpOption);
    await I.retry(retryCount).click('Continue');
  },
    async confirmAddress() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.confirmAddressPageTitle , 30);
    await I.retry(retryCount).click('Continue');
  },
   async currentlyLiveWith() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.currentlyLiveWithPageTitle , 30);
    await I.retry(retryCount).waitForSelector(this.fields.liveWithFirstOptionButton, 30);
    await I.retry(retryCount).click(this.fields.liveWithFirstOptionButton);
    await I.retry(retryCount).click('Continue');
  },
  async livingArrangements() {
    await I.retry(retryCount).waitForText(OtherPersonDetails.opLivingArrangements , 30);
    await I.retry(retryCount).waitForSelector(this.fields.livingArrangementsButton, 30);
    await I.retry(retryCount).click(this.fields.livingArrangementsButton);
    await I.retry(retryCount).click('Continue');
  },

  //With Other Person
  async otherPersonDetails() {
    await this.otherPerson(true);
    await this.otherPersonName();
    await this.otherPersonDetailsInfo();
    await this.otherPersonRelationship();
    await this.addressOfOtherPerson();
    await this.addressLookUpPage();
    await this.confirmAddress();
    await this.currentlyLiveWith();
    await this.livingArrangements();
  },

  //Without Other Person 
  async withoutOtherPerson(){
    await this.otherPerson(false);
    await this.currentlyLiveWith();
    await this.livingArrangements();
  }

};
