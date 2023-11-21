/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  C100_DOWNLOAD_APPLICATION,
  C100_START,
} from '../../../../../../steps/urls';
import { isCaseClosed, isCaseLinked, isDraftCase } from '../../../utils';
import { StateTags, TaskListSection, Tasks, getContents, hasAnyHearing, hasAnyOrder } from '../utils';

export const CA_APPLICANT = [
  {
    id: TaskListSection.ABOUT_YOU,
    content: getContents.bind(null, TaskListSection.ABOUT_YOU),
    show: isCaseLinked,
    tasks: [
      {
        id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: () => StateTags.SUBMITTED,
      },
      {
        id: Tasks.CONTACT_PREFERENCES,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: () => StateTags.SUBMITTED,
      },
      {
        id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: () => StateTags.SUBMITTED,
      },
      {
        id: Tasks.SUPPORT_YOU_NEED,
        href: () => {
          return `${APPLICANT_TASKLIST_HEARING_NEEDS}`;
        },
        disabled: isCaseClosed,
        stateTag: () => StateTags.SUBMITTED,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_APPLICATION,
    content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
    tasks: [
      {
        id: Tasks.CHILD_ARRANGEMENT_APPLICATION,
        href: (caseData: Partial<CaseWithId>) => {
          if (!caseData) {
            return C100_START;
          }
          return caseData.c100RebuildReturnUrl;
        },
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (!caseData) {
            return StateTags.NOT_STARTED_YET;
          }
          return StateTags.IN_PROGRESS;
        },
        show: (caseData: Partial<CaseWithId>) => !caseData || isDraftCase(caseData),
      },
      {
        id: Tasks.YOUR_APPLICATION_PDF,
        href: () => C100_DOWNLOAD_APPLICATION,
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_DOCUMENTS,
    content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
    show: isCaseLinked,
    tasks: [
      {
        id: Tasks.UPLOAD_DOCUMENTS,
        href: () => APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
        show: isCaseLinked,
        disabled: isCaseClosed,
        stateTag: () => StateTags.OPTIONAL,
      },
      {
        id: Tasks.VIEW_ALL_DOCUMENTS,
        href: () => APPLICANT_VIEW_ALL_DOCUMENTS,
        stateTag: () => StateTags.READY_TO_VIEW,
        show: isCaseLinked,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_ORDERS,
    content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
    show: isCaseLinked,
    tasks: [
      {
        id: Tasks.VIEW_ORDERS,
        href: () => APPLICANT_ORDERS_FROM_THE_COURT,
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (hasAnyOrder(caseData)) {
            return StateTags.READY_TO_VIEW;
          }
          return StateTags.NOT_AVAILABLE_YET;
        },
        disabled: (caseData: Partial<CaseWithId>) => !hasAnyOrder(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
    show: isCaseLinked,
    tasks: [
      {
        id: Tasks.VIEW_HEARING_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_YOURHEARINGS_HEARINGS}/${caseData.id}`,
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
];
