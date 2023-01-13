const ReasonableAdjustments = require("../../contents/ReasonableAdjustments-content");
const { I } = inject();
const retryCount = 3;
module.exports = {
  fields: {
    typeOfHearingVideo: '//*[@id="ra_typeOfHearing"]',
    typeOfHearingPhone: '//*[@id="ra_typeOfHearing-2"]',
    noLanguageRequirementsButton: '//*[@id="ra_languageNeeds-5"]',
    separateWaitingRoom: '//*[@id="ra_specialArrangements"]',
    separateToilet: '//*[@id="ra_specialArrangements-4"]',
    visitCourt: '//*[@id="ra_specialArrangements-5"]',
    documentAlternateFormat: '//*[@id="ra_disabilityRequirements"]',
    bringSupport: '//*[@id="ra_disabilityRequirements-3"]',
    documentColour: '//*[@id="ra_documentInformation"]',
    documentColourDetails: '//*[@id="ra_specifiedColorDocuments_subfield"]',
    documentReadOut: '//*[@id="ra_documentInformation-6"]',
    guideDog: '//*[@id="ra_supportCourt-3"]',
    
  },
  async typeOfHearing() {
    await I.retry(retryCount).waitForText(ReasonableAdjustments.typeOfHearingPageTitle);
    await I.retry(retryCount).click(this.fields.typeOfHearingVideo);
    await I.retry(retryCount).click(this.fields.typeOfHearingPhone);
    await I.retry(retryCount).click('Continue');
  },
  async languageNeeds() {
    await I.retry(retryCount).waitForText(ReasonableAdjustments.languageNeedsPageTitle);
    await I.retry(retryCount).click(this.fields.noLanguageRequirementsButton);
    await I.retry(retryCount).click('Continue');
  },
  async specialArrangements() {
    await I.retry(retryCount).waitForText(ReasonableAdjustments.specialArrangementsPageTitle);
    await I.retry(retryCount).click(this.fields.separateWaitingRoom);
    await I.retry(retryCount).click(this.fields.separateToilet);
    await I.retry(retryCount).click(this.fields.visitCourt);
    await I.retry(retryCount).click('Continue');
  },
  async disabilityRequirements() {
    await I.retry(retryCount).waitForText(ReasonableAdjustments.disabilityRequirementsPageTitle);
    await I.retry(retryCount).click(this.fields.documentAlternateFormat);
    await I.retry(retryCount).click(this.fields.bringSupport);
    await I.retry(retryCount).click('Continue');
  },
  async documentInformation() {
    await I.retry(retryCount).waitForText(ReasonableAdjustments.documentInformationPageTitle);
    await I.retry(retryCount).click(this.fields.documentColour);
    await I.retry(retryCount).fillField(this.fields.documentColourDetails, ReasonableAdjustments.documentColourYellow);
    await I.retry(retryCount).click(this.fields.documentReadOut);
    await I.retry(retryCount).click('Continue');
  },
  async bringSupport(){
    await I.retry(retryCount).waitForText(ReasonableAdjustments.bringSupportTitle);
    await I.retry(retryCount).click(this.fields.guideDog);
    await I.retry(retryCount).click('Continue');
  },
  async reasonableAdjustments() {
    await this.typeOfHearing();
    await this.languageNeeds();
    await this.specialArrangements();
    await this.disabilityRequirements();
    await this.documentInformation();
    await this.bringSupport();
  },
};