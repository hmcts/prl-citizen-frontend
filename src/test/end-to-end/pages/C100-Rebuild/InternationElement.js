const InternationElement = require("../../contents/InternationalElement-content");
const I = actor();
const retryCount = 3;
module.exports = {
  fields: {
    internationalStartYesButton: '//*[@id="ie_internationalStart"]', 
    provideDetailsField: '//*[@id="ie_provideDetailsStart"]', 
    internationalParentsYesButton: '//*[@id="ie_internationalParents"]', 
    rovideDetailsParentsField: '//*[@id="ie_provideDetailsParents"]', 
    internationalJurisdictionYesButton: '//*[@id="ie_internationalJurisdiction"]', 
    provideDetailsJurisdictionField: '//*[@id="ie_provideDetailsJurisdiction"]', 
    internationalRequestYesButton: '//*[@id="ie_internationalRequest"]', 
    provideDetailsRequestField: '//*[@id="ie_provideDetailsRequest"]', 
  },
   async childrenBasedInternational() {
    await I.retry(retryCount).waitForText(InternationElement.childrenBasedInternationalPageTitle);
    await I.retry(retryCount).click(this.fields.internationalStartYesButton);
    await I.retry(retryCount).fillField(this.fields.provideDetailsField, InternationElement.testingText);
    await I.retry(retryCount).click('Continue');
  },
   async childParentsBasedInternational() {
    await I.retry(retryCount).waitForText(InternationElement.childParentsBasedInternationalPageTitle);
    await I.retry(retryCount).click(this.fields.internationalParentsYesButton);
    await I.retry(retryCount).fillField(this.fields.rovideDetailsParentsField, InternationElement.testingText);
    await I.retry(retryCount).click('Continue');
  },
   async internationalJurisdiction() {
    await I.retry(retryCount).waitForText(InternationElement.internationalJurisdictionPageTitle);
    await I.retry(retryCount).click(this.fields.internationalJurisdictionYesButton);
    await I.retry(retryCount).fillField(this.fields.provideDetailsJurisdictionField, InternationElement.testingText);
    await I.retry(retryCount).click('Continue');
  },
   async internationalRequest() {
    await I.retry(retryCount).waitForText(InternationElement.internationalRequestPageTitle);
    await I.retry(retryCount).click(this.fields.internationalRequestYesButton);
    await I.retry(retryCount).fillField(this.fields.provideDetailsRequestField, InternationElement.testingText);
    await I.retry(retryCount).click('Continue');
  },
  async internationElements() {
    await this.childrenBasedInternational();
    await this.childParentsBasedInternational();
    await this.internationalJurisdiction();
    await this.internationalRequest();
  },
};