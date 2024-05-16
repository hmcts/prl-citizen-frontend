/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { generateTheResponseTasks } from '..';
import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  APPLICANT_CHECK_ANSWERS,
  C100_START,
  CHOOSE_CONTACT_PREFERENCE,
  DETAILS_KNOWN,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  FETCH_HEARING_DETAILS,
  REASONABLE_ADJUSTMENTS_INTRO,
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
import { Task, TaskListConfigProps } from '../../../definitions';
import { isCaseClosed, isCaseLinked, isDraftCase, isRepresentedBySolicotor } from '../../../utils';
import { StateTags, TaskListSection, Tasks, getContents, hasAnyHearing } from '../utils';

export const CA_APPLICANT: TaskListConfigProps[] = [
  {
    id: TaskListSection.ABOUT_YOU,
    content: getContents.bind(null, TaskListSection.ABOUT_YOU),
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
      return (
        isCaseLinked(caseData, userDetails) &&
        !isCaseClosed(caseData as CaseWithId) &&
        !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id)
      );
    },
    tasks: (): Task[] => [
      {
        id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
        stateTag: () => StateTags.SUBMITTED,
      },
      {
        id: Tasks.CONTACT_PREFERENCES,
        href: () => applyParms(CHOOSE_CONTACT_PREFERENCE, { partyType: PartyType.APPLICANT }),
        disabled: isCaseClosed,
        stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
          !hasContactPreference(caseData as CaseWithId, userDetails.id) ? StateTags.TO_DO : StateTags.COMPLETED,
      },
      {
        id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
        href: (caseData: Partial<CaseWithId>) =>
          `${applyParms(DETAILS_KNOWN, { partyType: PartyType.APPLICANT })}/${caseData.id}`,
        stateTag: () => StateTags.SUBMITTED,
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
    content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
    tasks: (): Task[] => [
      {
        id: Tasks.CHILD_ARRANGEMENT_APPLICATION,
        href: (caseData: Partial<CaseWithId>) => {
          if (!caseData) {
            return C100_START;
          }
          return caseData.c100RebuildReturnUrl!;
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
        href: () => {
          //** validate **
          return applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'c100-application',
          });
        },
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
        openInAnotherTab: () => true,
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
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
        },
        stateTag: () => StateTags.OPTIONAL,
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
  {
    id: TaskListSection.THE_RESPONSE,
    content: getContents.bind(null, TaskListSection.THE_RESPONSE),
    show: isCaseLinked,
    tasks: (caseData, content): Task[] => generateTheResponseTasks(caseData, content),
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
    show: isCaseLinked,
    tasks: (): Task[] => [
      {
        id: Tasks.VIEW_HEARING_DETAILS,
        href: (caseData: Partial<CaseWithId>) =>
          applyParms(FETCH_HEARING_DETAILS, { partyType: PartyType.APPLICANT, caseId: caseData.id as string }),
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
