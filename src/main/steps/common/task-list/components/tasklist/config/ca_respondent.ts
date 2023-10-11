/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { UPDATE_CASE_YES } from '../../../../../../steps/constants';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import {
  ALLEGATION_OF_HARM_VOILENCE,
  APPLICANT_CA_DA_REQUEST,
  CA_DA_ATTENDING_THE_COURT,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPONDENT_YOURHEARINGS_HEARINGS,
  RESPOND_TO_APPLICATION,
} from '../../../../../../steps/urls';
import { isApplicationResponded, isCaseClosed } from '../../../utils';
import {
  StateTags,
  TaskListSection,
  Tasks,
  getCheckAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetailsStatus,
  getContents,
  getFinalApplicationStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getResponseStatus,
  getSupportYourNeedsDetailsStatus,
  hasAnyHearing,
  hasAnyOrder,
} from '../utils';

export const CA_RESPONDENT = [
  {
    id: TaskListSection.ABOUT_YOU,
    content: getContents.bind(null, TaskListSection.ABOUT_YOU),
    show: caseData => !isCaseClosed(caseData),
    tasks: [
      {
        id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
        href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_DETAILS_KNOWN}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData, userDetails.id);
          return getKeepYourDetailsPrivateStatus(respondent?.response.keepDetailsPrivate);
        },
      },
      {
        id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_CHECK_ANSWERS}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData, userDetails.id);
          return getConfirmOrEditYourContactDetailsStatus(respondent);
        },
      },
      {
        id: Tasks.YOUR_SUPPORT,
        href: () => {
          return `${CA_DA_ATTENDING_THE_COURT}`;
        },
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData, userDetails.id);
          return getSupportYourNeedsDetailsStatus(respondent?.response.supportYouNeed as CaseWithId);
        },
      },
    ],
  },
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    show: () => true,
    tasks: [
      {
        id: Tasks.CHECK_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return getFinalApplicationStatus(caseData, userDetails) ? APPLICANT_CA_DA_REQUEST + UPDATE_CASE_YES : null;
        },
        stateTag: (caseData, userDetails) => getFinalApplicationStatus(caseData, userDetails),
        openInAnotherTab: true,
      },
      {
        id: Tasks.CHECK_AOH_AND_VIOLENCE,
        href: (caseData, userDetails) => {
          return getCheckAllegationOfHarmStatus(caseData, userDetails) === StateTags.NOT_AVAILABLE_YET
            ? '#'
            : ALLEGATION_OF_HARM_VOILENCE + UPDATE_CASE_YES;
        },
        stateTag: (caseData, userDetails) => getCheckAllegationOfHarmStatus(caseData, userDetails),
        openInAnotherTab: true,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_RESPONSE,
    content: getContents.bind(null, TaskListSection.YOUR_RESPONSE),
    show: caseData => !isCaseClosed(caseData),
    tasks: [
      {
        id: Tasks.RESPOND_TO_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return !isApplicationResponded(caseData, userDetails.id) ? `${RESPOND_TO_APPLICATION}/flag/updateFlag` : null;
        },
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData, userDetails.id);
          return getResponseStatus(respondent);
        },
        showHint: (caseData, userDetails) => isApplicationResponded(caseData, userDetails.id),
      },
      {
        id: Tasks.RESPOND_TO_AOH_AND_VIOLENCE,
        href: () => {
          return '#';
        },
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData, userDetails.id);
          return getInternationalFactorsStatus(respondent?.response.citizenInternationalElements);
        },
        showHint: (caseData, userDetails) => isApplicationResponded(caseData, userDetails.id),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
    show: () => true,
    tasks: [
      {
        id: Tasks.VIEW_HEARING_DETAILS,
        href: (caseData: Partial<CaseWithId>) =>
          hasAnyHearing(caseData) ? `${RESPONDENT_YOURHEARINGS_HEARINGS}/${caseData.id}` : '#',
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (hasAnyHearing(caseData)) {
            return StateTags.READY_TO_VIEW;
          }
          return StateTags.NOT_AVAILABLE_YET;
        },
        disabled: (caseData: Partial<CaseWithId>) => !hasAnyHearing(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_DOCUMENTS,
    content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
    show: () => true,
    tasks: [
      {
        id: Tasks.VIEW_ALL_DOCUMENTS,
        href: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
        stateTag: () => StateTags.READY_TO_VIEW,
      },
      {
        id: Tasks.UPLOAD_DOCUMENTS,
        href: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
        stateTag: () => StateTags.TO_DO,
        show: caseData => !isCaseClosed(caseData),
        disabled: isCaseClosed,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_ORDERS,
    content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
    show: () => true,
    tasks: [
      {
        id: Tasks.VIEW_ORDERS,
        href: caseData => (hasAnyOrder(caseData) ? RESPONDENT_ORDERS_FROM_THE_COURT : '#'),
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (hasAnyOrder(caseData)) {
            return StateTags.READY_TO_VIEW;
          }
          return StateTags.NOT_AVAILABLE_YET;
        },
      },
    ],
  },
];
