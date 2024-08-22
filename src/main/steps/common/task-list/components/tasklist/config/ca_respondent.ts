/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { DOCUMENT_LANGUAGE } from '../../../../../../steps/common/documents/download/utils';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { getPartyDetails } from '../../../../../../steps/tasklistresponse/utils';
import {
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
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
  VIEW_TYPE_DOCUMENT,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
import {
  hasRespondentRespondedToC7Application,
  isCaseClosed,
  isCaseLinked,
  isDocPresent,
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
      id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
      href: (caseData: Partial<CaseWithId>) =>
        `${applyParms(DETAILS_KNOWN, { partyType: PartyType.RESPONDENT })}/${caseData.id}`,
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
        id: Tasks.CHECK_THE_APPLICATION,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH),
        disabled: caseData => {
          return getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH) === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.CHECK_THE_APPLICATION_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
            language: DOCUMENT_LANGUAGE.WELSH,
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.WELSH),
        show: caseData => {
          return (
            getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.WELSH) !== StateTags.NOT_AVAILABLE_YET &&
            isDocPresent(caseData, 'finalWelshDocument')
          );
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.CHECK_AOH_AND_VIOLENCE,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'aoh-document',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          }),
        stateTag: caseData => getCheckAllegationOfHarmStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH),
        disabled: caseData => {
          return getCheckAllegationOfHarmStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH) === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.CHECK_AOH_AND_VIOLENCE_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'aoh-document',
            language: DOCUMENT_LANGUAGE.WELSH,
          }),
        stateTag: caseData => getCheckAllegationOfHarmStatus(caseData, DOCUMENT_LANGUAGE.WELSH),
        show: caseData => {
          return isDocPresent(caseData, 'c1AWelshDocument');
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.MAKE_REQUEST_TO_COURT_ABOUT_CASE,
        href: () =>
          applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
            partyType: PartyType.RESPONDENT,
            pageNumber: '1',
          }),
        stateTag: () => StateTags.OPTIONAL,
        show: isCaseLinked,
        disabled: isCaseClosed,
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
        href: () => RESPOND_TO_APPLICATION,
        stateTag: (caseData, userDetails) => {
          return getC7ApplicationResponseStatus(caseData, userDetails);
        },
        show: (caseData, userDetails) => !hasRespondentRespondedToC7Application(caseData, userDetails),
      },
      {
        id: Tasks.THE_RESPONSE_PDF,
        href: () =>
          applyParms(VIEW_TYPE_DOCUMENT, {
            partyType: PartyType.RESPONDENT,
            type: 'respondent',
          }),
        stateTag: () => StateTags.READY_TO_VIEW,
        show: (caseData, userDetails) => hasRespondentRespondedToC7Application(caseData, userDetails),
      },
    ],
  },
  hearing,
  document,
  order,
];
