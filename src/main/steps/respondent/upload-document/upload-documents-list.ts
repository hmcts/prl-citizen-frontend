import * as URL from '../../urls';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateUploadDocumentList = (sectionTitles, taskListItems) => {
  return [
    {
      title: sectionTitles.witness_statements_and_evidence,
      items: [
        {
          id: 'your-position-statements',
          text: taskListItems.your_position_statements,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.your_position_statements,
        },
        {
          id: 'your-witness-statements',
          text: taskListItems.your_witness_statements,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.your_witness_statements,
        },
        {
          id: 'other-witness-statements',
          text: taskListItems.other_witness_statements,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.other_witness_statements,
        },
        {
          id: 'mail-screenshots-media-files',
          text: taskListItems.mail_screenshots_media_files,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.mail_screenshots_media_files,
        },
        {
          id: 'medical-records',
          text: taskListItems.medical_records,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.medical_records,
        },
        {
          id: 'letters-from-school',
          text: taskListItems.letters_from_school,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.letters_from_school,
        },
        {
          id: 'tenancy-mortgage-agreements',
          text: taskListItems.tenancy_mortgage_agreements,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.witness_statements_and_evidence +
            '&document_type=' +
            taskListItems.tenancy_mortgage_agreements,
        },
      ],
    },
    {
      title: sectionTitles.applications,
      items: [
        {
          id: 'previous-orders-submitted',
          text: taskListItems.previous_orders_submitted,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.applications +
            '&document_type=' +
            taskListItems.previous_orders_submitted,
        },
      ],
    },
    {
      title: sectionTitles.expert_reports,
      items: [
        {
          id: 'medical-records',
          text: taskListItems.medical_reports,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.expert_reports +
            '&document_type=' +
            taskListItems.medical_reports,
        },
        {
          id: 'paternity-test-reports',
          text: taskListItems.paternity_test_reports,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.expert_reports +
            '&document_type=' +
            taskListItems.paternity_test_reports,
        },
        {
          id: 'drug-and-alcohol-tests',
          text: taskListItems.drug_and_alcohol_tests,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.expert_reports +
            '&document_type=' +
            taskListItems.drug_and_alcohol_tests,
        },
        {
          id: 'police-reports',
          text: taskListItems.police_reports,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.expert_reports +
            '&document_type=' +
            taskListItems.police_reports,
        },
      ],
    },
    {
      title: sectionTitles.other_documents,
      items: [
        {
          id: 'other-documents',
          text: taskListItems.other_documents,
          href:
            URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL +
            '?' +
            'caption=' +
            sectionTitles.other_documents +
            '&document_type=' +
            taskListItems.other_documents,
        },
      ],
    },
  ];
};
