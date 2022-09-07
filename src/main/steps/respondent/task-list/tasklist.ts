import { CaseWithId } from '../../../app/case/case';
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getFinalDocumentStatus,
  getViewAllDocuments,
  getViewAllOrdersFromTheCourt,
} from './utils';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase, userEmail) => {
  return [
    {
      title: sectionTitles.aboutYou,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.RESPONDENT_DETAILS_KNOWN,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.RESPONDENT_CHECK_ANSWERS,
        },
        {
          id: 'support_you_need_during_your_case',
          text: taskListItems.support_you_need_during_your_case,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.RESPONDENT_TASK_LIST_URL,
        },
      ],
    },
    {
      title: sectionTitles.theApplication,
      items: [...getTheApplicationSection(taskListItems, userCase, userEmail)],
    },
    ...getYourResponseSection(sectionTitles, taskListItems, userCase),
    {
      title: sectionTitles.yourcourtHearings,
      items: [
        {
          id: 'check_details_of_your_court_hearings',
          text: taskListItems.check_details_of_your_court_hearings,
          status: getInternationalFactorsStatus(userCase),
          href: URL.INTERNATIONAL_FACTORS_START,
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

const getTheApplicationSection = (taskListItems, userCase: CaseWithId, userEmail: string) => {
  const itemList: object[] = [];
  if (userCase?.caseTypeOfApplication === 'C100') {
    itemList.push(
      {
        id: 'check_the_application',
        text: taskListItems.check_the_application,
        status: getFinalDocumentStatus(userCase, userEmail),
        href: URL.APPLICANT_CA_DA_REQUEST + '?updateCase=Yes',
      },
      {
        id: 'check_allegations_of_harm_and_violence',
        text: taskListItems.check_allegations_of_harm_and_violence,
        status: getCurrentOrOtherProceedingsStatus(userCase),
        href: URL.PROCEEDINGS_START,
      }
    );
  } else {
    itemList.push({
      id: 'check_the_application',
      text: taskListItems.check_the_application,
      status: getFinalDocumentStatus(userCase, userEmail),
      href: URL.APPLICANT_CA_DA_REQUEST + '?updateCase=Yes',
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
