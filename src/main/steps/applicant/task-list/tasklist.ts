/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getViewAllOrdersFromTheCourt } from '../../../steps/respondent/task-list/utils';
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getSupportYourNeedsDetails,
  getViewAllDocuments,
  getYourApplication,
} from './utils';

export const generateApplicantTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.applicantYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.APPLICANT_CHECK_ANSWERS,
        },
        {
          id: 'support-you-need-during-your-case',
          text: taskListItems.support_you_need_during_your_case,
          status: getSupportYourNeedsDetails(userCase),
          href: URL.LANGUAGE_REQUIREMENTS,
        },
      ],
    },
    {
      title: sectionTitles.yourApplication,
      items: [
        {
          id: 'your-application',
          text: taskListItems.your_application,
          status: getYourApplication(),
          href: URL.YOUR_APPLICATION_FL401,
        },
        {
          id: 'your-application-witness-statment',
          text: taskListItems.your_application_witness_statement,
          status: getYourApplication(),
          href: URL.APPLICANT + URL.YOUR_WITNESS_STATEMENTS,
        },
      ],
    },
    {
      title: sectionTitles.courtHearings,
      items: [
        {
          id: 'check-details-of-your-court-hearings',
          text: taskListItems.details_of_court_hearings,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
      ],
    },
    {
      title: sectionTitles.yourDocuments,
      items: [
        {
          id: 'upload-document',
          text: taskListItems.upload_document,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
        },
        {
          id: 'view-all-documents',
          text: taskListItems.view_all_documents,
          status: getViewAllDocuments(),
          href: URL.APPLICANT_VIEW_ALL_DOCUMENTS,
        },
      ],
    },
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'view-all-orders-from-the-court',
          text: taskListItems.view_all_orders_from_the_court,
          status: getViewAllOrdersFromTheCourt(userCase),
          href: getViewAllOrdersFromTheCourt(userCase) === 'READY_TO_VIEW' ? URL.APPLICANT_ORDERS_FROM_THE_COURT : '#',
        },
      ],
    },
  ];
};
