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

  async clickTaskList(taskListName){
    let tasklistElement;
    if (taskListName == 'Keep your details private'){
      tasklistElement = this.fields.keep_your_details_private;
    }
    if (taskListName == 'Confirm or edit your contact details'){
      tasklistElement = this.fields.confirm_or_edit_your_contact_details;
    }
    if (taskListName == 'Support you need during your case'){
      tasklistElement = this.fields.support_you_need_during_your_case;
    }
    if (taskListName == 'Check the application (PDF)'){
      tasklistElement = this.fields.check_the_application;
    }
    if (taskListName == 'Check the allegations of harm and violence (PDF)'){
      tasklistElement = this.fields.check_allegations_of_harm_and_violence;
    }
    if (taskListName == 'Respond to the application'){
      tasklistElement = this.fields.respond_to_application;
    }
    if (taskListName == 'Respond to the allegations of harm and violence'){
      tasklistElement = this.fields.respond_to_allegations_of_harm_and_violence;
    }
    if (taskListName == 'Check details of your court hearings'){
      tasklistElement = this.fields.check_details_of_your_court_hearings;
    }
    if (taskListName == 'View all documents'){
      tasklistElement = this.fields.view_all_documents;
    }
    if (taskListName == 'Upload Documents'){
      tasklistElement = this.fields.upload_document;
    }
    if (taskListName == 'View all orders from the court'){
      tasklistElement = this.fields.view_all_orders_from_the_court;
    }
    await I.retry(retryCount).click(tasklistElement);
  }
};
