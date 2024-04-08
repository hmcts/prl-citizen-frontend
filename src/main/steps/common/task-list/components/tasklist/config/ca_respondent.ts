/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { UPDATE_CASE } from '../../../../../../steps/constants';
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
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
} from '../../../../../../steps/urls';
import { isApplicationResponded, isCaseClosed, isCaseLinked, isRepresentedBySolicotor } from '../../../utils';
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

export const aboutYou: TaskListConfigProps = {
  id: TaskListSection.ABOUT_YOU,
  content: getContents.bind(null, TaskListSection.ABOUT_YOU),
  show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
    return (
      isCaseLinked(caseData, userDetails) &&
      !isCaseClosed(caseData) &&
      !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id)
    );
  },
  tasks: (): Task[] => [
    {
      id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
      href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_DETAILS_KNOWN}/${caseData.id}`,
      stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyDetails;
        return getKeepYourDetailsPrivateStatus(respondent?.response.keepDetailsPrivate);
      },
    },
    {
      id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
      href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_CHECK_ANSWERS}/${caseData.id}`,
      stateTag: (caseData, userDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyDetails;
        return getConfirmOrEditYourContactDetailsStatus(respondent);
      },
    },
    {
      id: Tasks.YOUR_SUPPORT,
      href: () => {
        return `${CA_DA_ATTENDING_THE_COURT}`;
      },
      stateTag: (caseData, userDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyDetails;
        return getSupportYourNeedsDetailsStatus(respondent?.response.supportYouNeed as CaseWithId);
      },
    },
  ],
};
export const hearing: TaskListConfigProps = {
  id: TaskListSection.YOUR_HEARING,
  content: getContents.bind(null, TaskListSection.YOUR_HEARING),
  show: isCaseLinked,
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
  show: isCaseLinked,
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
  show: isCaseLinked,
  tasks: (): Task[] => [
    {
      id: Tasks.UPLOAD_DOCUMENTS,
      href: () => RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
      stateTag: () => StateTags.TO_DO,
      show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
      },
    },
    {
      id: Tasks.VIEW_ALL_DOCUMENTS,
      href: () => RESPONDENT_VIEW_ALL_DOCUMENTS,
      stateTag: () => StateTags.READY_TO_VIEW,
    },
    {
      id: Tasks.UPLOAD_DOCUMENTS,
      href: () => applyParms(UPLOAD_DOCUMENT, { partyType: PartyType.RESPONDENT }),
      stateTag: () => StateTags.TO_DO,
      show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
      },
    },
    {
      id: Tasks.VIEW_ALL_DOCUMENTS,
      href: () => applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: PartyType.RESPONDENT }),
      stateTag: () => StateTags.READY_TO_VIEW,
    },
  ],
};

export const CA_RESPONDENT: TaskListConfigProps[] = [
  aboutYou,
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    show: isCaseLinked,
    tasks: (): Task[] => [
      {
        id: Tasks.CHECK_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return getFinalApplicationStatus(caseData, userDetails)
            ? applyParms(APPLICANT_CA_DA_REQUEST, { docContext: UPDATE_CASE })
            : null;
        },
        stateTag: (caseData, userDetails) => getFinalApplicationStatus(caseData, userDetails),
        openInAnotherTab: true,
      },
      {
        id: Tasks.CHECK_AOH_AND_VIOLENCE,
        href: (caseData, userDetails) => {
          return getCheckAllegationOfHarmStatus(caseData, userDetails) === StateTags.NOT_AVAILABLE_YET
            ? '#'
            : applyParms(ALLEGATION_OF_HARM_VOILENCE, { docContext: UPDATE_CASE });
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
      return (
        isCaseLinked(caseData, userDetails) &&
        !isCaseClosed(caseData) &&
        !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id)
      );
    },
    tasks: (): Task[] => [
      {
        id: Tasks.RESPOND_TO_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return !isApplicationResponded(caseData, userDetails.id) ? `${RESPOND_TO_APPLICATION}/flag/updateFlag` : null;
        },
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyDetails;
          return getResponseStatus(respondent);
        },
        showHint: (caseData, userDetails) => isApplicationResponded(caseData, userDetails.id),
      },
      {
        id: Tasks.RESPOND_TO_AOH_AND_VIOLENCE,
        href: () => {
          return '#';
        },
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyDetails;
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
