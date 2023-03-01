const I = actor();
const config = require('../config');

const retryCount = 3;

module.exports = {

  fields: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    support_you_need_during_your_case: 'Support you need during your case',
    check_the_application: '#check_the_application',
    check_allegations_of_harm_and_violence: '#check_allegations_of_harm_and_violence',
    respond_to_application: '#respond_to_application',
    respond_to_allegations_of_harm_and_violence: '#respond_to_allegations_of_harm_and_violence',
    check_details_of_your_court_hearings: '#check_details_of_your_court_hearings',
    view_all_documents: '#view-all-documents',
    upload_document: '#upload-document',
    view_all_orders_from_the_court: '#view-all-orders-from-the-court',
  },

  async clickKeepYourDetailsPrivate(){
    await I.retry(retryCount).click(this.fields.keep_your_details_private);
  },
  async clickConfirmOrEditYourContactDetails(){
    await I.retry(retryCount).click(this.fields.confirm_or_edit_your_contact_details);
  },
  async clickSupportYouNeedDuringYourCase(){
    await I.retry(retryCount).click(this.fields.support_you_need_during_your_case);
  },
  async clickCheckTheApplication(){
    await I.retry(retryCount).click(this.fields.check_the_application);
  },



};
