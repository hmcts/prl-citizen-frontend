/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import {
  CHOOSE_CONTACT_PREFERENCE,
  DETAILS_KNOWN,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  FETCH_HEARING_DETAILS,
  REASONABLE_ADJUSTMENTS_INTRO,
  RESPONDENT_CHECK_ANSWERS,
  RESPOND_TO_APPLICATION,
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
import {
  hasRespondentRespondedToC7Application,
  isCaseClosed,
  isCaseLinked,
  isRepresentedBySolicotor,
} from '../../../utils';
import {
  StateTags,
  TaskListSection,
  Tasks,
  getC7ApplicationResponseStatus,
  getCheckAllegationOfHarmStatus,
  getConfirmOrEditYourContactDetailsStatus,
  getContents,
  getFinalApplicationStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
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
      id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
      href: (caseData: Partial<CaseWithId>) => `${RESPONDENT_CHECK_ANSWERS}/${caseData.id}`,
      stateTag: (caseData, userDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
        return getConfirmOrEditYourContactDetailsStatus(respondent);
      },
    },
    {
      id: Tasks.CONTACT_PREFERENCES,
      href: () => applyParms(CHOOSE_CONTACT_PREFERENCE, { partyType: PartyType.RESPONDENT }),
      disabled: isCaseClosed,
      stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
        !hasContactPreference(caseData as CaseWithId, userDetails.id) ? StateTags.TO_DO : StateTags.COMPLETED,
    },
    {
      id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
      href: (caseData: Partial<CaseWithId>) =>
        `${applyParms(DETAILS_KNOWN, { partyType: PartyType.RESPONDENT })}/${caseData.id}`,
      stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
        const respondent = getPartyDetails(caseData as CaseWithId, userDetails.id);
        return getKeepYourDetailsPrivateStatus(respondent?.response.keepDetailsPrivate);
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
        applyParms(FETCH_HEARING_DETAILS, { partyType: PartyType.RESPONDENT, caseId: caseData.id as string }),
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
        openInAnotherTab: () => true,
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
        openInAnotherTab: () => true,
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
          return hasRespondentRespondedToC7Application(caseData, userDetails)
            ? applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
                partyType: PartyType.RESPONDENT,
                documentType: 'c7-response-document',
              })
            : RESPOND_TO_APPLICATION;
        },
        stateTag: (caseData, userDetails) => {
          return getC7ApplicationResponseStatus(caseData, userDetails);
        },
        openInAnotherTab: (caseData, userDetails) => hasRespondentRespondedToC7Application(caseData, userDetails),
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
      },
    ],
  },
  hearing,
  document,
  order,
];
