/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DocCategory, DocType } from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';

export const generateUploadDocumentList = (sectionTitles, taskListItems, url) => {
  return [
    {
      title: sectionTitles.witness_statements_and_evidence,
      items: [
        {
          id: 'your-position-statements',
          text: taskListItems.your_position_statements,
          href: applyParms(url, { docCategory: DocCategory.WITNESS_STATEMENT, docType: DocType.POSITION_STATEMENTS }),
        },
        {
          id: 'your-witness-statements',
          text: taskListItems.your_witness_statements,
          href: applyParms(url, {
            docCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.YOUR_WITNESS_STATEMENTS,
          }),
        },
        {
          id: 'other-witness-statements',
          text: taskListItems.other_witness_statements,
          href: applyParms(url, {
            docCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.OTHER_PEOPLE_WITNESS_STATEMENTS,
          }),
        },
        {
          id: 'mail-screenshots-media-files',
          text: taskListItems.mail_screenshots_media_files,
          href: applyParms(url, { docCategory: DocCategory.WITNESS_STATEMENT, docType: DocType.MEDIA_FILES }),
        },
        {
          id: 'medical-records',
          text: taskListItems.medical_records,
          href: applyParms(url, { docCategory: DocCategory.WITNESS_STATEMENT, docType: DocType.MEDICAL_RECORDS }),
        },
        {
          id: 'letters-from-school',
          text: taskListItems.letters_from_school,
          href: applyParms(url, { docCategory: DocCategory.WITNESS_STATEMENT, docType: DocType.LETTERS_FROM_SCHOOL }),
        },
        {
          id: 'tenancy-mortgage-agreements',
          text: taskListItems.tenancy_mortgage_agreements,
          href: applyParms(url, {
            docCategory: DocCategory.WITNESS_STATEMENT,
            docType: DocType.TENANCY_AND_MORTGAGE_AVAILABILITY,
          }),
        },
      ],
    },
    {
      title: sectionTitles.applications,
      items: [
        {
          id: 'previous-orders-submitted',
          text: taskListItems.previous_orders_submitted,
          href: applyParms(url, { docCategory: DocCategory.APPLICATIONS, docType: DocType.PREVIOUS_ORDERS }),
        },
      ],
    },
    {
      title: sectionTitles.expert_reports,
      items: [
        {
          id: 'medical-reports',
          text: taskListItems.medical_reports,
          href: applyParms(url, { docCategory: DocCategory.EXPERT_REPORTS, docType: DocType.MEDICAL_REPORTS }),
        },
        {
          id: 'paternity-test-reports',
          text: taskListItems.paternity_test_reports,
          href: applyParms(url, { docCategory: DocCategory.EXPERT_REPORTS, docType: DocType.PATERNITY_TEST_REPORTS }),
        },
        {
          id: 'drug-and-alcohol-tests',
          text: taskListItems.drug_and_alcohol_tests,
          href: applyParms(url, { docCategory: DocCategory.EXPERT_REPORTS, docType: DocType.DRUG_ALCOHOL_TESTS }),
        },
        {
          id: 'police-reports',
          text: taskListItems.police_reports,
          href: applyParms(url, { docCategory: DocCategory.EXPERT_REPORTS, docType: DocType.POLICE_REPORTS }),
        },
      ],
    },
    {
      title: sectionTitles.other_documents,
      items: [
        {
          id: 'other-documents',
          text: taskListItems.other_documents,
          href: applyParms(url, { docCategory: DocCategory.OTHER_DOCUMENTS, docType: DocType.OTHER_DOCUMENTS }),
        },
      ],
    },
  ];
};
