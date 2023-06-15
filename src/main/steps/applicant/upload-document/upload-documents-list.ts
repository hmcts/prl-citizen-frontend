/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { documents_list_items_en } from '../../../steps/respondent/upload-document/upload-document-list-items';

import { document_list_en } from './section-titles';

export const generateUploadDocumentList = (sectionTitles, taskListItems, url) => {
  const generateHref = (sectionTitle: string, taskListItem: string) => {
    return url + '?' + 'caption=' + sectionTitle + '&document_type=' + taskListItem;
  };
  return [
    {
      title: sectionTitles.witness_statements_and_evidence,
      items: [
        {
          id: 'your-position-statements',
          text: taskListItems.your_position_statements,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.your_position_statements
          }`,
        },
        {
          id: 'your-witness-statements',
          text: taskListItems.your_witness_statements,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.your_witness_statements
          }`,
        },
        {
          id: 'other-witness-statements',
          text: taskListItems.other_witness_statements,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.other_witness_statements
          }`,
        },
        {
          id: 'mail-screenshots-media-files',
          text: taskListItems.mail_screenshots_media_files,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.mail_screenshots_media_files
          }`,
        },
        {
          id: 'medical-records',
          text: taskListItems.medical_records,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.medical_records
          }`,
        },
        {
          id: 'letters-from-school',
          text: taskListItems.letters_from_school,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.letters_from_school
          }`,
        },
        {
          id: 'tenancy-mortgage-agreements',
          text: taskListItems.tenancy_mortgage_agreements,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.witness_statements_and_evidence}&docType=${
            documents_list_items_en.tenancy_mortgage_agreements
          }`,
        },
      ],
    },
    {
      title: sectionTitles.applications,
      items: [
        {
          id: 'previous-orders-submitted',
          text: taskListItems.previous_orders_submitted,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.applications}&docType=${
            documents_list_items_en.previous_orders_submitted
          }`,
        },
      ],
    },
    {
      title: sectionTitles.expert_reports,
      items: [
        {
          id: 'medical-reports',
          text: taskListItems.medical_reports,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.expert_reports}&docType=${documents_list_items_en.medical_reports}`,
        },
        {
          id: 'paternity-test-reports',
          text: taskListItems.paternity_test_reports,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.expert_reports}&docType=${
            documents_list_items_en.drug_and_alcohol_tests
          }`,
        },
        {
          id: 'drug-and-alcohol-tests',
          text: taskListItems.drug_and_alcohol_tests,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.expert_reports}&docType=${
            documents_list_items_en.paternity_test_reports
          }`,
        },
        {
          id: 'police-reports',
          text: taskListItems.police_reports,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.expert_reports}&docType=${documents_list_items_en.police_reports}`,
        },
      ],
    },
    {
      title: sectionTitles.other_documents,
      items: [
        {
          id: 'other-documents',
          text: taskListItems.other_documents,
          href: `${generateHref(
            sectionTitles.witness_statements_and_evidence,
            taskListItems.your_position_statements
          )}&parentDocType=${document_list_en.other_documents}&docType=${documents_list_items_en.other_documents}`,
        },
      ],
    },
  ];
};
