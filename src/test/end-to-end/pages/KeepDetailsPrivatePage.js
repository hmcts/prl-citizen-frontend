const I = actor();
const config = require('../config');

const retryCount = 3;

module.exports = {

  fields: {
    page_Title_Text: 'Keeping your contact details private',
    option_Yes: '#detailsKnown',
    option_No: '#detailsKnown-2',
    option_Idontknow: '#detailsKnown-3',
    support_you_need_during_your_case: 'Support you need during your case',
    keep_details_private_from_others_yes: '#startAlternative',
    keep_details_private_address: '#contactDetailsPrivate',
    keep_details_private_phone_number: '#contactDetailsPrivate-2',
    keep_details_private_email: '#contactDetailsPrivate-3',
    keep_details_private_from_others_no: '#startAlternative-2',

  },

  async isOtherPeopleKnowYourContactDetails_Yes(){
    await I.waitForText(this.fields.page_Title_Text);
    await I.retry(retryCount).click(this.fields.option_Yes);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  async isOtherPeopleKnowYourContactDetails_No(){
    await I.waitForText(this.fields.page_Title_Text);
    await I.retry(retryCount).click(this.fields.option_No);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  async isOtherPeopleKnowYourContactDetails_IDontknow(){
    await I.waitForText(this.fields.page_Title_Text);
    await I.retry(retryCount).click(this.fields.option_Idontknow);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  async doYouWantToKeepYourContactDetailsPrivate_Yes(){
    await I.waitForText(this.fields.page_Title_Text);
    await I.retry(retryCount).click(this.fields.keep_details_private_from_others_yes);
    if(I.seeCheckboxIsChecked(this.fields.keep_details_private_address)){

    }else{
      await I.retry(retryCount).click(this.fields.keep_details_private_address);
    }

    await I.retry(retryCount).click(this.fields.keep_details_private_phone_number);
    await I.retry(retryCount).click(this.fields.keep_details_private_email);
    await I.retry(retryCount).click('Save and continue');
    await I.retry(retryCount).click('Continue');
    await I.wait('5');

  },

  async doYouWantToKeepYourContactDetailsPrivate_No(){
    await I.waitForText(this.fields.page_Title_Text);
    await I.retry(retryCount).click(this.fields.keep_details_private_from_others_no);
    await I.retry(retryCount).click('Save and continue');
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  async fillKeepYourDetailsPrivate(){
    await I.taskListClickKeepYourDetailsPrivate();
    await this.isOtherPeopleKnowYourContactDetails_No();
    await this.doYouWantToKeepYourContactDetailsPrivate_No();
  }

};
