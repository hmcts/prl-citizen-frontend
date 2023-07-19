import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';
import { getSupportYourNeedsDetails } from '../../../steps/applicant/task-list/utils';
import { UPDATE_CASE_YES } from '../../../steps/constants';
import * as URL from '../../urls';

import {
  getCheckAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetails,
  getFinalApplicationStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getResponseStatus,
  getUploadDocuments,
  getViewAllDocuments,
  getViewAllHearingsFromTheCourt,
  getViewAllOrdersFromTheCourt,
  isApplicationResponded,
} from './utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (
  sectionTitles,
  taskListItems,
  userCase,
  userIdamId,
  isRepresentedBySolicotor
) => {
  const isCaseClosed = userCase.state === 'ALL_FINAL_ORDERS_ISSUED';
  return [
    !isCaseClosed && !isRepresentedBySolicotor
      ? {
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
        }
      : null,
    {
      title: sectionTitles.theApplication,
      items: [...getTheApplicationSection(taskListItems, userCase, userIdamId)],
    },
    ...(!isCaseClosed && !isRepresentedBySolicotor
      ? getYourResponseSection(sectionTitles, taskListItems, userCase, userIdamId)
      : []),
    {
      title: sectionTitles.yourcourtHearings,
      items: [
        {
          id: 'check_details_of_your_court_hearings',
          text: taskListItems.check_details_of_your_court_hearings,
          status: getViewAllHearingsFromTheCourt(userCase),
          href:
            getViewAllHearingsFromTheCourt(userCase) === 'READY_TO_VIEW'
              ? URL.RESPONDENT_YOURHEARINGS_HEARINGS + '/' + userCase.id
              : '#',
          disabled: !hasAnyHearing(userCase),
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
        !isCaseClosed && !isRepresentedBySolicotor
          ? {
              id: 'upload-document',
              text: taskListItems.upload_document,
              status: getUploadDocuments(),
              href: URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
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
          href: getViewAllOrdersFromTheCourt(userCase) === 'READY_TO_VIEW' ? URL.RESPONDENT_ORDERS_FROM_THE_COURT : '#',
        },
      ],
    },
  ];
};

export const hasAnyHearing = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData?.hearingCollection && caseData?.hearingCollection?.length >= 1);

const getTheApplicationSection = (taskListItems, userCase: CaseWithId, userIdamId) => {
  const itemList: object[] = [];
  if (userCase?.caseTypeOfApplication === 'C100') {
    itemList.push(
      {
        id: 'check_the_application',
        text: taskListItems.check_the_application,
        status: getFinalApplicationStatus(userCase, userIdamId),
        href:
          getFinalApplicationStatus(userCase, userIdamId) === SectionStatus.NOT_AVAILABLE_YET
            ? '#'
            : URL.APPLICANT_CA_DA_REQUEST + UPDATE_CASE_YES,
        openInAnotherTab: true,
      },
      {
        id: 'check_allegations_of_harm_and_violence',
        text: taskListItems.check_allegations_of_harm_and_violence,
        status: getCheckAllegationOfHarmStatus(userCase, userIdamId),
        href:
          getCheckAllegationOfHarmStatus(userCase, userIdamId) === SectionStatus.NOT_AVAILABLE_YET
            ? '#'
            : URL.ALLEGATION_OF_HARM_VOILENCE + UPDATE_CASE_YES,
        openInAnotherTab: true,
      }
    );
  } else {
    itemList.push({
      id: 'check_the_application',
      text: taskListItems.check_the_application,
      status: getFinalApplicationStatus(userCase, userIdamId),
      href:
        getFinalApplicationStatus(userCase, userIdamId) === SectionStatus.NOT_AVAILABLE_YET
          ? '#'
          : URL.APPLICANT_CA_DA_REQUEST + UPDATE_CASE_YES,
      openInAnotherTab: true,
    });
  }

  return itemList;
};

const getYourResponseSection = (sectionTitles, taskListItems, userCase: CaseWithId, userId: string) => {
  if (userCase?.caseTypeOfApplication === 'C100') {
    const hasCitizenResponse = isApplicationResponded(userCase, userId);
    return [
      {
        title: sectionTitles.yourResponse,
        items: [
          {
            id: 'respond_to_application',
            text: taskListItems.respond_to_application,
            status: getResponseStatus(userCase, userId),
            href: !hasCitizenResponse ? `${URL.RESPOND_TO_APPLICATION}/flag/updateFlag` : null,
            hint: hasCitizenResponse ? taskListItems.respond_to_application_hint : null,
          },
          {
            id: 'respond_to_allegations_of_harm_and_violence',
            text: taskListItems.respond_to_allegations_of_harm_and_violence,
            status: getInternationalFactorsStatus(userCase),
            href: '#',
            hint: hasCitizenResponse ? taskListItems.respond_to_application_hint : null,
          },
        ],
      },
    ];
  }
  return [];
};
