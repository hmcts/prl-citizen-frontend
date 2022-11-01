import { CaseWithId } from '../../../app/case/case';
import { getSupportYourNeedsDetails } from '../../../steps/applicant/task-list/utils';
import * as URL from '../../urls';

import {
  getCheckAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetails,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getViewAllDocuments,
  getViewAllOrdersFromTheCourt,
} from './utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase, userIdamId) => {
  return [
    {
      title: sectionTitles.aboutYou,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase, userIdamId),
          href: URL.RESPONDENT_DETAILS_KNOWN + '/' + userCase.id,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase, userIdamId),
          href: URL.RESPONDENT_CHECK_ANSWERS + '/' + userCase.id,
        },
        {
          id: 'support_you_need_during_your_case',
          text: taskListItems.support_you_need_during_your_case,
          status: getSupportYourNeedsDetails(userCase),
          href: URL.CA_DA_ATTENDING_THE_COURT,
        },
      ],
    },
    {
      title: sectionTitles.theApplication,
      items: [...getTheApplicationSection(taskListItems, userCase, userIdamId)],
    },
    ...getYourResponseSection(sectionTitles, taskListItems, userCase),
    {
      title: sectionTitles.yourcourtHearings,
      items: [
        {
          id: 'check_details_of_your_court_hearings',
          text: taskListItems.check_details_of_your_court_hearings,
          status: getInternationalFactorsStatus(userCase),
          href: URL.CHECK_HEARINGS_DETAILS,
        },
      ],
    },
    {
      title: sectionTitles.yourDocuments,
      items: [
        {
          id: 'view-all-documents',
          text: taskListItems.view_all_documents,
          status: getViewAllDocuments(),
          href: getViewAllDocuments() === 'READY_TO_VIEW' ? URL.RESPONDENT_VIEW_ALL_DOCUMENTS : '#',
        },
        {
          id: 'upload-document',
          text: taskListItems.upload_document,
          status: getInternationalFactorsStatus(userCase),
          href: URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
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
          href: getViewAllOrdersFromTheCourt(userCase) === 'READY_TO_VIEW' ? URL.RESPONDENT_ORDERS_FROM_THE_COURT : '#',
        },
      ],
    },
  ];
};

const getTheApplicationSection = (taskListItems, userCase: CaseWithId, userIdamId) => {
  const itemList: object[] = [];
  if (userCase?.caseTypeOfApplication === 'C100') {
    itemList.push(
      {
        id: 'check_the_application',
        text: taskListItems.check_the_application,
        status: getMiamStatus(userCase),
        href: `${URL.APPLICANT}${URL.APPLICANT_CA_DA_REQUEST}`,
      },
      {
        id: 'check_allegations_of_harm_and_violence',
        text: taskListItems.check_allegations_of_harm_and_violence,
        status: getCheckAllegationOfHarmStatus(userCase, userIdamId),
        href: URL.ALLEGATION_OF_HARM_VOILENCE + '?updateCase=Yes',
      }
    );
  } else {
    itemList.push({
      id: 'check_the_application',
      text: taskListItems.check_the_application,
      status: getMiamStatus(userCase),
      href: URL.MIAM_START,
    });
  }

  return itemList;
};

const getYourResponseSection = (sectionTitles, taskListItems, userCase: CaseWithId) => {
  if (userCase?.caseTypeOfApplication === 'C100') {
    return [
      {
        title: sectionTitles.yourResponse,
        items: [
          {
            id: 'respond_to_application',
            text: taskListItems.respond_to_application,
            status: getInternationalFactorsStatus(userCase),
            href: URL.RESPOND_TO_APPLICATION,
          },
          {
            id: 'respond_to_allegations_of_harm_and_violence',
            text: taskListItems.respond_to_allegations_of_harm_and_violence,
            status: getInternationalFactorsStatus(userCase),
            href: URL.INTERNATIONAL_FACTORS_START,
          },
        ],
      },
    ];
  }
  return [];
};
