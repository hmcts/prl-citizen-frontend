const RespondentDetails = require("../../contents/RespondentDetails-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    firstNameField: '//*[@id="c100TempFirstName"]', 
    lastNameField: '//*[@id="c100TempLastName"]', 
    hasNameChangedNoButton: '//*[@id="hasNameChanged-2"]', 
    maleOption: '//*[@id="gender-2"]', 
    dayDOB: '//*[@id="dateOfBirth-day"]',
    monthDOB: '//*[@id="dateOfBirth-month"]',
    yearDOB: '//*[@id="dateOfBirth-year"]',
    respondentPlaceOfBirthField: '//*[@id="respondentPlaceOfBirth"]',
    fatherOption: '//*[@id="relationshipType-2"]', 
    respondentPostCode: '//*[@id="PostCode"]', 
    addressList: '//*[@id="selectAddress"]',
    addressHistoryNoButton: '//*[@id="addressHistory-2"]', 
    provideDetailsOfPreviousAddressesField: '//*[@id="provideDetailsOfPreviousAddresses"]', 
    donKnowEmailAddressButton: '//*[@id="donKnowEmailAddress"]', 
    donKnowTelephoneNumberButton: '//*[@id="donKnowTelephoneNumber"]', 
  },
   async enterRespondentDetails() {
    I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.enterRespondentDetailsPageTitle , 30);
    await I.retry(retryCount).fillField(this.fields.firstNameField, RespondentDetails.firstName);
    await I.retry(retryCount).fillField(this.fields.lastNameField, RespondentDetails.lastName);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
   async provideDetailsForRespondent() {
    I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.provideDetailsForRespondentPageTitle , 30);
    await I.retry(retryCount).waitForText(RespondentDetails.provideDetailsForRespondentSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.hasNameChangedNoButton);
    await I.retry(retryCount).waitForText(RespondentDetails.provideDetailsForRespondentGender , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.maleOption);
    await I.retry(retryCount).waitForText(RespondentDetails.provideDetailsForRespondentDOB , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.dayDOB, RespondentDetails.day);
    await I.retry(retryCount).fillField(this.fields.monthDOB, RespondentDetails.month);
    await I.retry(retryCount).fillField(this.fields.yearDOB, RespondentDetails.year);
    await I.retry(retryCount).waitForText(RespondentDetails.placeOfBirthText , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.respondentPlaceOfBirthField, RespondentDetails.placeOfBirth);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async respondentRelationship() {
      I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.respondentRelationshipPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.fatherOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async addressOfRespondent() {
      I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.addressOfRespondentPageTitle , 30);
    await I.retry(retryCount).waitForText(RespondentDetails.addressOfRespondentSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.respondentPostCode, RespondentDetails.postcode);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async addressLookUpPage() {
      I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.addressLookUpPageTitle , 30);
    await I.retry(retryCount).waitForText(RespondentDetails.addressLookUpSubHeading , 30);
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.addressList, RespondentDetails.lookUpOption);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async addressDetails() {
      I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.addressDetailsPageTitle , 30);
    await I.retry(retryCount).waitForText(RespondentDetails.addressDetailsTextBoxText , 30);
    await I.retry(retryCount).waitForText(RespondentDetails.addressDetailsSubHeading , 30);
    await I.retry(retryCount).waitForSelector(this.fields.addressHistoryNoButton, 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.addressHistoryNoButton);
    await I.retry(retryCount).waitForText(RespondentDetails.addressDetailsNoHintText , 30);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.provideDetailsOfPreviousAddressesField, RespondentDetails.previousAddressPostCode);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
    async contactDetailsOfResp() {
      I.wait('2');
    await I.retry(retryCount).waitForText(RespondentDetails.contactDetailsOfRespPageTitle , 30);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.donKnowEmailAddressButton);
    await I.retry(retryCount).click(this.fields.donKnowTelephoneNumberButton);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },
  async respondentDetails() {
    await this.enterRespondentDetails();
    await this.provideDetailsForRespondent();
    await this.respondentRelationship();
    await this.addressOfRespondent();
    await this.addressLookUpPage();
    await this.addressDetails();
    await this.contactDetailsOfResp();
  },
};