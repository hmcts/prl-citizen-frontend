/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { PartyType } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { DocumentCategory } from '../../../../../../steps/common/documents/definitions';
import { DOCUMENT_LANGUAGE } from '../../../../../../steps/common/documents/download/utils';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
  C100_START,
  CHOOSE_CONTACT_PREFERENCE,
  DETAILS_KNOWN,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  FETCH_HEARING_DETAILS,
  REASONABLE_ADJUSTMENTS_INTRO,
  UPLOAD_DOCUMENT,
  VIEW_ALL_DOCUMENT_TYPES,
  VIEW_ALL_ORDERS,
  VIEW_TYPE_DOCUMENT,
} from '../../../../../../steps/urls';
import { hasContactPreference } from '../../../../contact-preference/util';
import { Task, TaskListConfigProps } from '../../../definitions';
import {
  doesCaseHaveId,
  isCaseClosed,
  isCaseLinked,
  isCaseOffline,
  isDocPresent,
  isDraftCase,
  isRepresentedBySolicotor,
} from '../../../utils';
import { parseC100ReturnUrl } from '../../notification-banner/utils';
import { StateTags, TaskListSection, Tasks, getContents, hasAnyHearing, isRespondentSubmitedResponse } from '../utils';

export const CA_APPLICANT: TaskListConfigProps[] = [
  {
    id: TaskListSection.ABOUT_YOU,
    content: getContents.bind(null, TaskListSection.ABOUT_YOU),
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
      return (
        isCaseLinked(caseData, userDetails) &&
        !isCaseClosed(caseData as CaseWithId) &&
        !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id) &&
        !isCaseOffline(caseData as CaseWithId)
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
          if (!caseData || !doesCaseHaveId(caseData)) {
            return C100_START;
          }
          return parseC100ReturnUrl(caseData.c100RebuildReturnUrl!);
        },
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (!caseData || !doesCaseHaveId(caseData)) {
            return StateTags.NOT_STARTED_YET;
          }
          return StateTags.IN_PROGRESS;
        },
        show: (caseData: Partial<CaseWithId>) => !caseData || !doesCaseHaveId(caseData) || isDraftCase(caseData),
      },
      {
        id: Tasks.YOUR_APPLICATION_PDF,
        href: () => {
          //** validate **
          return applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'c100-application',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          });
        },
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>) => caseData && doesCaseHaveId(caseData) && !isDraftCase(caseData),
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.YOUR_APPLICATION_PDF_WELSH,
        href: () => {
          return applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'c100-application',
            language: DOCUMENT_LANGUAGE.WELSH,
          });
        },
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>) =>
          caseData &&
          !isDraftCase(caseData) &&
          (isDocPresent(caseData, 'finalWelshDocument') || isDocPresent(caseData, 'c100DraftDocWelsh')),
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.YOUR_AOH_PDF,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'aoh-document',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          }),
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
          isCaseLinked(caseData, userDetails) && isDocPresent(caseData, 'c1ADocument'),
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.YOUR_AOH_PDF_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.APPLICANT,
            documentType: 'aoh-document',
            language: DOCUMENT_LANGUAGE.WELSH,
          }),
        stateTag: () => StateTags.SUBMITTED,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
          isCaseLinked(caseData, userDetails) && isDocPresent(caseData, 'c1AWelshDocument'),
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.MAKE_REQUEST_TO_COURT_ABOUT_CASE,
        href: () =>
          applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
            partyType: PartyType.APPLICANT,
            pageNumber: '1',
          }),
        stateTag: () => StateTags.OPTIONAL,
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) =>
          isCaseLinked(caseData, userDetails) && !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id) && !isCaseOffline(caseData as CaseWithId),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_DOCUMENTS,
    content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => isCaseLinked(caseData, userDetails) && !isCaseOffline(caseData as CaseWithId),
    tasks: (): Task[] => [
      {
        id: Tasks.UPLOAD_DOCUMENTS,
        href: () => applyParms(UPLOAD_DOCUMENT, { partyType: PartyType.APPLICANT }),
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return !isRepresentedBySolicotor(caseData as CaseWithId, userDetails.id);
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
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => isCaseLinked(caseData, userDetails) && !isCaseOffline(caseData as CaseWithId),
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
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => isCaseLinked(caseData, userDetails) && !isCaseOffline(caseData as CaseWithId),
    tasks: (): Task[] => [
      {
        id: Tasks.THE_RESPONSE_PDF,
        href: () =>
          applyParms(VIEW_TYPE_DOCUMENT, {
            partyType: PartyType.APPLICANT,
            type: 'respondent',
          }),
        stateTag: (caseData: Partial<CaseWithId>) => {
          if (
            caseData.respondentDocuments?.find(
              doc => doc.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION
            )
          ) {
            return StateTags.READY_TO_VIEW;
          }
          return StateTags.NOT_AVAILABLE_YET;
        },
        show: isCaseLinked,
        disabled: (caseData: Partial<CaseWithId>) => !isRespondentSubmitedResponse(caseData),
      },
    ],
  },
  {
    id: TaskListSection.YOUR_HEARING,
    content: getContents.bind(null, TaskListSection.YOUR_HEARING),
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => isCaseLinked(caseData, userDetails) && !isCaseOffline(caseData as CaseWithId),
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
