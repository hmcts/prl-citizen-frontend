/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { UPDATE_CASE_YES } from '../../../../../../steps/constants';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import {
  ALLEGATION_OF_HARM_VOILENCE,
  APPLICANT_CA_DA_REQUEST,
  CHOOSE_CONTACT_PREFERENCE,
  REASONABLE_ADJUSTMENTS_INTRO,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPONDENT_YOURHEARINGS_HEARINGS,
  RESPOND_TO_APPLICATION,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
import { isApplicationResponded, isCaseClosed, isRepresentedBySolicotor } from '../../../utils';
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
  hasAnyHearing,
  hasAnyOrder,
} from '../utils';

export const aboutYou: TaskListConfigProps = {
  id: TaskListSection.ABOUT_YOU,
  content: getContents.bind(null, TaskListSection.ABOUT_YOU),
  show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
    return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
  },
  tasks: (): Task[] => [
    {
      id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
      href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_DETAILS_KNOWN}/${caseData.id}`,
      disabled: isCaseClosed,
      stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
        return getKeepYourDetailsPrivateStatus(respondent?.response.keepDetailsPrivate);
      },
    },
    {
      id: Tasks.CONTACT_PREFERENCES,
      href: () => applyParms(CHOOSE_CONTACT_PREFERENCE, { partyType: PartyType.RESPONDENT }),
      disabled: isCaseClosed,
      stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
        !hasContactPreference(caseData as CaseWithId, userDetails.id) ? StateTags.TO_DO : StateTags.COMPLETED,
      show: (caseData: Partial<CaseWithId>) => caseData.caseTypeOfApplication === CaseType.C100,
    },
    {
      id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
      href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_CHECK_ANSWERS}/${caseData.id}`,
      disabled: isCaseClosed,
      stateTag: (caseData, userDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
        return getConfirmOrEditYourContactDetailsStatus(respondent);
      },
    },
    {
      id: Tasks.SUPPORT_YOU_NEED,
      href: () => {
        return applyParms(REASONABLE_ADJUSTMENTS_INTRO, {
          partyType: PartyType.RESPONDENT,
        });
      },
      disabled: isCaseClosed,
      stateTag: () => StateTags.OPTIONAL,
    },
  ],
};
export const hearing: TaskListConfigProps = {
  id: TaskListSection.YOUR_HEARING,
  content: getContents.bind(null, TaskListSection.YOUR_HEARING),
  show: () => true,
  tasks: (): Task[] => [
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
};
export const order: TaskListConfigProps = {
  id: TaskListSection.YOUR_ORDERS,
  content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
  show: () => true,
  tasks: (): Task[] => [
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
};
export const document: TaskListConfigProps = {
  id: TaskListSection.YOUR_DOCUMENTS,
  content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
  show: () => true,
  tasks: (): Task[] => [
    {
      id: Tasks.VIEW_ALL_DOCUMENTS,
      href: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
      stateTag: () => StateTags.READY_TO_VIEW,
    },
    {
      id: Tasks.UPLOAD_DOCUMENTS,
      href: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
      stateTag: () => StateTags.TO_DO,
      show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
      },
      disabled: isCaseClosed,
    },
  ],
};

export const CA_RESPONDENT: TaskListConfigProps[] = [
  aboutYou,
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    show: () => true,
    tasks: (): Task[] => [
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
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
      return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
    },
    tasks: (): Task[] => [
      {
        id: Tasks.RESPOND_TO_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return !isApplicationResponded(caseData, userDetails.id) ? `${RESPOND_TO_APPLICATION}/flag/updateFlag` : null;
        },
        disabled: isCaseClosed,
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
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
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
          return getInternationalFactorsStatus(respondent?.response.citizenInternationalElements);
        },
        showHint: (caseData, userDetails) => isApplicationResponded(caseData, userDetails.id),
      },
    ],
  },
  hearing,
  document,
  order,
];
