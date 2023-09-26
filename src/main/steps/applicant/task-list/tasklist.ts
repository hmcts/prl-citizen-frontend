/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SectionStatus, State } from '../../../app/case/definition';
import { hasContactPreference } from '../../../steps/common/contact-preferences/util';
import { hasAnyHearing } from '../../../steps/respondent/task-list/tasklist';
import {
  getViewAllHearingsFromTheCourt,
  getViewAllOrdersFromTheCourt,
} from '../../../steps/respondent/task-list/utils';
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getSupportYourNeedsDetails,
  getUploadDocuments,
  getViewAllDocuments,
  getYourApplication,
  getYourWitnessStatement,
} from './utils';

export const generateApplicantTaskList = (
  sectionTitles,
  taskListItems,
  userCase,
  userIdamId,
  isRepresentedBySolicotor
) => {
  const isCaseClosed = userCase.state === State.ALL_FINAL_ORDERS_ISSUED;

  return [
    !isCaseClosed && !isRepresentedBySolicotor
      ? {
          title: sectionTitles.applicantYourDetails,
          items: [
            {
              id: 'keep-your-details-private',
              text: taskListItems.keep_your_details_private,
              status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
              href: URL.APPLICANT_DETAILS_KNOWN + '/' + userCase.id,
            },
            {
              id: 'contact-preference',
              text: taskListItems.contact_preference,
              status: !hasContactPreference(userCase, userIdamId) ? SectionStatus.TO_DO : SectionStatus.COMPLETED,
              href: URL.FETCH_CONTACT_PREFERENCES + '/' + userCase.id,
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
              href: URL.APPLICANT_ATTENDING_THE_COURT,
            },
          ],
        }
      : null,
    {
      title: sectionTitles.yourApplication,
      items: [...getTheApplication(taskListItems, userCase)],
    },
    ...(!isCaseClosed && !isRepresentedBySolicotor
      ? getYourResponse(sectionTitles, taskListItems, userCase, userIdamId)
      : []),
    {
      title: sectionTitles.courtHearings,
      items: [
        {
          id: 'check-details-of-your-court-hearings',
          text: taskListItems.details_of_court_hearings,
          status: getViewAllHearingsFromTheCourt(userCase),
          href:
            getViewAllHearingsFromTheCourt(userCase) === 'READY_TO_VIEW'
              ? `${URL.APPLICANT_YOURHEARINGS_HEARINGS}/${userCase.id}`
              : '#',
          disabled: !hasAnyHearing(userCase),
        },
      ],
    },
    {
      title: sectionTitles.yourDocuments,
      items: [
        !isRepresentedBySolicotor
          ? {
              id: 'upload-document',
              text: taskListItems.upload_document,
              status: getUploadDocuments(),
              href: URL.APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
            }
          : null,
        !isCaseClosed
          ? {
              id: 'view-all-documents',
              text: taskListItems.view_all_documents,
              status: getViewAllDocuments(),
              href: URL.APPLICANT_VIEW_ALL_DOCUMENTS,
            }
          : null,
      ],
    },
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'view-all-orders-from-the-court',
          text: taskListItems.view_all_orders_from_the_court,
          status: getViewAllOrdersFromTheCourt(userCase),
          href:
            getViewAllOrdersFromTheCourt(userCase) === 'READY_TO_VIEW' ? `${URL.APPLICANT_ORDERS_FROM_THE_COURT}` : '#',
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
        openInAnotherTab: true,
      },
      {
        id: 'your-application-witness-statment',
        text: taskListItems.your_application_witness_statement,
        status: getYourWitnessStatement(userCase),
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
