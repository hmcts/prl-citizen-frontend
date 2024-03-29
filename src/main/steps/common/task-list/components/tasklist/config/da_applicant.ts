/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseClosed, isRepresentedBySolicotor } from '../../../../../../steps/common/task-list/utils';
import {
  APPLICANT_ATTENDING_THE_COURT,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_WITNESS_STATEMENTS_DA,
  APPLICANT_YOURHEARINGS_HEARINGS,
  YOUR_APPLICATION_FL401,
} from '../../../../../../steps/urls';
import {
  StateTags,
  TaskListSection,
  Tasks,
  getConfirmOrEditYourContactDetailsStatus,
  getContents,
  getKeepYourDetailsPrivateStatus,
  getSupportYourNeedsDetailsStatus,
  getYourWitnessStatementStatus,
  hasAnyHearing,
  hasAnyOrder,
} from '../utils';

export const DA_APPLICANT: TaskListConfigProps[] = [
  {
    id: TaskListSection.ABOUT_YOU,
    content: getContents.bind(null, TaskListSection.ABOUT_YOU),
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
      return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
    },
    tasks: (): Task[] => [
      {
        id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: (caseData: Partial<CaseWithId>) =>
          getKeepYourDetailsPrivateStatus(caseData?.applicantsFL401?.response?.keepDetailsPrivate),
      },
      {
        id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
        disabled: isCaseClosed,
        stateTag: (caseData: Partial<CaseWithId>) =>
          getConfirmOrEditYourContactDetailsStatus(caseData?.applicantsFL401),
      },
      // {
      //   id: Tasks.CONTACT_PREFERENCES,
      //   href: (caseData: Partial<CaseWithId>) => `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/${caseData.id}`,
      //   disabled: isCaseClosed,
      //   stateTag: () => StateTags.SUBMITTED,
      // },
      {
        id: Tasks.YOUR_SUPPORT,
        href: () => {
          return `${APPLICANT_ATTENDING_THE_COURT}`;
        },
        disabled: isCaseClosed,
        stateTag: (caseData: Partial<CaseWithId>) => getSupportYourNeedsDetailsStatus(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_APPLICATION,
    content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
    tasks: (): Task[] => [
      {
        id: Tasks.YOUR_APPLICATION_PDF,
        href: () => YOUR_APPLICATION_FL401,
        stateTag: () => StateTags.DOWNLOAD,
        openInAnotherTab: true,
      },
      {
        id: Tasks.YOUR_APPLICATION_WITNESS_STATEMENT,
        href: () => APPLICANT_WITNESS_STATEMENTS_DA,
        stateTag: caseData => getYourWitnessStatementStatus(caseData),
        openInAnotherTab: true,
      },
    ],
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
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
    tasks: (): Task[] => [
      {
        id: Tasks.UPLOAD_DOCUMENTS,
        href: () => APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
        },
        disabled: isCaseClosed,
        stateTag: () => StateTags.TO_DO,
      },
      {
        id: Tasks.VIEW_ALL_DOCUMENTS,
        href: () => APPLICANT_VIEW_ALL_DOCUMENTS,
        stateTag: () => StateTags.READY_TO_VIEW,
        show: (caseData: Partial<CaseWithId>) => !isCaseClosed(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_ORDERS,
    content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
    tasks: (): Task[] => [
      {
        id: Tasks.VIEW_ORDERS,
        href: caseData => (hasAnyOrder(caseData) ? APPLICANT_ORDERS_FROM_THE_COURT : '#'),
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
];
