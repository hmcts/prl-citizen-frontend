/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getViewAllOrdersFromTheCourt } from '../../../steps/respondent/task-list/utils';
import * as URL from '../../urls';

import {
  getApplicantViewAllHearingsFromTheCourt,
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getSupportYourNeedsDetails,
  getViewAllDocuments,
  getYourApplication,
} from './utils';

export const generateApplicantTaskList = (sectionTitles, taskListItems, userCase, userIdamId) => {
  return [
    {
      title: sectionTitles.applicantYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
          href: URL.APPLICANT_DETAILS_KNOWN + '/' + userCase.id,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase, userIdamId),
          href: URL.APPLICANT_CHECK_ANSWERS + '/' + userCase.id,
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
      items: [...getTheApplication(taskListItems, userCase)],
    },
    ...getYourResponse(sectionTitles, taskListItems, userCase, userIdamId),
    {
      title: sectionTitles.courtHearings,
      items: [
        {
          id: 'check-details-of-your-court-hearings',
          text: taskListItems.details_of_court_hearings,
          status: getApplicantViewAllHearingsFromTheCourt(userCase),
          href: URL.APPLICANT_YOURHEARINGS_HEARINGS,
        },
      ],
    },
    {
      title: sectionTitles.yourDocuments,
      items: [
        {
          id: 'upload-document',
          text: taskListItems.upload_document,
          status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
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

const getTheApplication = (taskListItems, userCase) => {
  if (userCase?.caseTypeOfApplication === 'C100') {
    return [
      {
        id: 'your_application_ca',
        text: taskListItems.your_application_ca,
        status: getYourApplication(),
        href: URL.YOUR_APPLICATION_FL401,
      },
      {
        id: 'your_allegations_of_harm',
        text: taskListItems.your_allegations_of_harm,
        status: getYourApplication(),
        href: URL.APPLICANT + URL.YOUR_WITNESS_STATEMENTS,
      },
      {
        id: 'respond_to_other_side_aoh_violence',
        text: taskListItems.respond_to_other_side_aoh_violence,
        status: getYourApplication(),
        href: URL.APPLICANT + URL.YOUR_WITNESS_STATEMENTS,
      },
    ];
  } else {
    return [
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
        href: URL.APPLICANT_WITNESS_STATEMENTS_DA,
      },
    ];
  }
};

const getYourResponse = (sectionTitles, taskListItems, userCase, userIdamId) => {
  if (userCase?.caseTypeOfApplication === 'C100') {
    return [
      {
        title: sectionTitles.theResponse,
        items: [
          {
            id: 'response_to_your_application',
            text: taskListItems.response_to_your_application,
            status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
            href: URL.APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
          },
          {
            id: 'check_other_side_aoh_and_violence',
            text: taskListItems.check_other_side_aoh_and_violence,
            status: getViewAllDocuments(),
            href: URL.APPLICANT_VIEW_ALL_DOCUMENTS,
          },
        ],
      },
    ];
  }
  return [];
};
