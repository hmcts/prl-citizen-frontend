/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { generateTheResponseTasks } from '..';
import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { transformFileName } from '../../../../../../steps/common/documents/download/utils';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  C100_START,
  CHOOSE_CONTACT_PREFERENCE,
  DOWNLOAD_DOCUMENT,
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
        href: (caseData: Partial<CaseWithId>) => `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`,
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
        href: (caseData: Partial<CaseWithId>) => {
          const document = caseData?.finalDocument;
          const draftDocumentId = document?.document_url
            ? document.document_url.substring(document.document_url.lastIndexOf('/') + 1)
            : '';
          return applyParms(DOWNLOAD_DOCUMENT, {
            partyType: PartyType.APPLICANT,
            documentId: draftDocumentId,
            documentName: transformFileName(document?.document_filename ?? ''),
            documentType: 'c100-application-document',
          });
        },
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
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
        href: () => APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return !isCaseClosed(caseData) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
        },
        stateTag: () => StateTags.OPTIONAL,
      },
      {
        id: Tasks.VIEW_ALL_DOCUMENTS,
        href: () => APPLICANT_VIEW_ALL_DOCUMENTS,
        stateTag: () => StateTags.READY_TO_VIEW,
      },
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
