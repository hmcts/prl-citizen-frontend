/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getSupportYourNeedsDetails,
} from './utils';

export const generateApplicantTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.aboutYou,
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
          id: 'application-submitted',
          text: taskListItems.application_submitted,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
        {
          id: 'witness-statement',
          text: taskListItems.witness_statement,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.APPLICANT_CHECK_ANSWERS,
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
      title: sectionTitles.ordersFromCourt,
      items: [
        {
          id: 'orders',
          text: taskListItems.orders,
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
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
        {
          id: 'see-all-documents',
          text: taskListItems.see_all_documents,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.APPLICANT_CHECK_ANSWERS,
        },
        {
          id: 'see-all-documents-alternative-view',
          text: taskListItems.see_all_documents_alternative_view,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.APPLICANT_CHECK_ANSWERS,
        },
      ],
    },
    {
      title: sectionTitles.finalDecision,
      items: [
        {
          id: 'view-all-final-order',
          text: taskListItems.view_all_final_order,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
      ],
    },
  ];
};
