/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { DOCUMENT_LANGUAGE } from '../../../../../../steps/common/documents/download/utils';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import {
  isCaseClosed,
  isCaseLinked,
  isDocPresent,
  isRepresentedBySolicotor,
} from '../../../../../../steps/common/task-list/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  DETAILS_KNOWN,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  REASONABLE_ADJUSTMENTS_INTRO,
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
} from '../../../../../../steps/urls';
import {
  StateTags,
  TaskListSection,
  Tasks,
  getConfirmOrEditYourContactDetailsStatus,
  getContents,
  getKeepYourDetailsPrivateStatus,
  hasAnyHearing,
} from '../utils';

export const DA_APPLICANT: TaskListConfigProps[] = [
  {
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
          `${applyParms(DETAILS_KNOWN, { partyType: PartyType.APPLICANT })}/${caseData.id}`,
        stateTag: (caseData: Partial<CaseWithId>) =>
          getKeepYourDetailsPrivateStatus(caseData?.applicantsFL401?.response?.keepDetailsPrivate),
      },
      {
        id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
        stateTag: (caseData: Partial<CaseWithId>) =>
          getConfirmOrEditYourContactDetailsStatus(caseData?.applicantsFL401),
      },
      {
        id: Tasks.SUPPORT_YOU_NEED,
        href: () => {
          return applyParms(REASONABLE_ADJUSTMENTS_INTRO, {
            partyType: PartyType.APPLICANT,
          });
        },
        disabled: isCaseClosed,
        stateTag: () => StateTags.OPTIONAL,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_APPLICATION,
    show: isCaseLinked,
    content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
    tasks: (): Task[] => [
      {
        // ** validate **
        id: Tasks.YOUR_APPLICATION_PDF,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'fl401-application',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          }),
        stateTag: () => StateTags.DOWNLOAD,
        openInAnotherTab: () => true,
      },
      {
        // ** validate **
        id: Tasks.YOUR_APPLICATION_PDF_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'fl401-application',
            language: DOCUMENT_LANGUAGE.WELSH,
          }),
        stateTag: caseData =>
          caseData.finalWelshDocument?.document_filename ? StateTags.DOWNLOAD : StateTags.NOT_AVAILABLE_YET,
        openInAnotherTab: () => true,
        show: caseData => isDocPresent(caseData, 'finalWelshDocument'),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
    show: isCaseLinked,
    tasks: (): Task[] => [
      {
        id: Tasks.VIEW_HEARING_DETAILS,
        href: (caseData: Partial<CaseWithId>) =>
          hasAnyHearing(caseData) ? `${APPLICANT_YOURHEARINGS_HEARINGS}/${caseData.id}` : '#',
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
    show: isCaseLinked,
    tasks: (): Task[] => [
      {
        id: Tasks.UPLOAD_DOCUMENTS,
        href: () => applyParms(UPLOAD_DOCUMENT, { partyType: PartyType.APPLICANT }),
        stateTag: () => StateTags.TO_DO,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
        },
      },
      {
        id: Tasks.VIEW_ALL_DOCUMENTS,
        href: () => applyParms(VIEW_ALL_DOCUMENT_TYPES, { partyType: PartyType.APPLICANT }),
        stateTag: () => StateTags.READY_TO_VIEW,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_ORDERS,
    content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
    show: isCaseLinked,
    tasks: (): Task[] => [
      {
        id: Tasks.VIEW_ORDERS,
        href: () => applyParms(VIEW_ALL_ORDERS, { partyType: PartyType.APPLICANT }),
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (hasOrders(caseData as CaseWithId)) {
            return StateTags.READY_TO_VIEW;
          }
          return StateTags.NOT_AVAILABLE_YET;
        },
        disabled: (caseData: Partial<CaseWithId>) => !hasOrders(caseData as CaseWithId),
      },
    ],
  },
];
