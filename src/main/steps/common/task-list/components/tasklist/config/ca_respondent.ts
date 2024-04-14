/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { CaseType, DocType, PartyType, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import {
  CHOOSE_CONTACT_PREFERENCE,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  REASONABLE_ADJUSTMENTS_INTRO,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_YOURHEARINGS_HEARINGS,
  RESPOND_TO_APPLICATION,
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
  VIEW_DOCUMENT_URL,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
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
  hasAnyHearing,
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
      href: () => applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.RESPONDENT }),
      stateTag: (caseData: Partial<CaseWithId>) => {
        if (hasOrders(caseData as CaseWithId)) {
          return StateTags.READY_TO_VIEW;
        }
        return StateTags.NOT_AVAILABLE_YET;
      },
      disabled: (caseData: Partial<CaseWithId>) => !hasOrders(caseData as CaseWithId),
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
        //** validate **
        id: Tasks.CHECK_THE_APPLICATION,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData),
        disabled: caseData => {
          return getFinalApplicationStatus(caseData) === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: true,
      },
      {
        //** validate **
        id: Tasks.CHECK_AOH_AND_VIOLENCE,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'aoh-document',
          }),
        stateTag: caseData => getCheckAllegationOfHarmStatus(caseData),
        disabled: caseData => {
          return getCheckAllegationOfHarmStatus(caseData) === StateTags.NOT_AVAILABLE_YET;
        },
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
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id)!;
          const respondentName = respondent.firstName + ' ' + respondent.lastName;
          return respondent?.response.c7ResponseSubmitted === YesOrNo.YES
            ? applyParms(VIEW_DOCUMENT_URL, {
                docType: DocType.RESPONSE_TO_CA,
                uploadedBy: PartyType.RESPONDENT,
                partyName: respondentName,
              })
            : `${RESPOND_TO_APPLICATION}/flag/updateFlag`;
        },
        stateTag: (caseData, userDetails) => {
          const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
          return getResponseStatus(respondent!);
        },
        showHint: (caseData, userDetails) => isApplicationResponded(caseData, userDetails.id),
      },
      {
        id: Tasks.RESPOND_TO_AOH_AND_VIOLENCE,
        href: () => {
          //** validate **
          return '#';
        },
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
