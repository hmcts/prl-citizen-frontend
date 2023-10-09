/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';

import { languages as content } from './content';

export enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
  YOUR_DOCUMENTS = 'yourDocuments',

  YOUR_HEARING = 'yourHearing',

  ABOUT_YOU = 'aboutYou',
  YOUR_ORDERS = 'ordersFromTheCourt',
}
export enum Tasks {
  CHILD_ARRANGEMENT_APPLICATION = 'childArrangementApplication',
  YOUR_APPLICATION_PDF = 'yourApplicationPDF',
  VIEW_ALL_DOCUMENTS = 'viewAllDocuments',
  UPLOAD_DOCUMENTS = 'uploadDocuments',
  VIEW_HEARING_DETAILS = 'viewHearingDetails',

  EDIT_YOUR_CONTACT_DETAILS = 'editYouContactDetails',
  CONTACT_PREFERENCES = 'contactPreferences',
  KEEP_YOUR_DETAILS_PRIVATE = 'keepYourDetailsPrivate',
  YOUR_SUPPORT = 'yourSupport',
  VIEW_ORDERS = 'viewOrders',
  YOUR_APPLICATION_WITNESS_STATEMENT = 'yourAapplicationWitnessStatment',
}

export enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
  NOT_AVAILABLE_YET = 'notAvailableYet',
  READY_TO_VIEW = 'readyToView',
  SUBMITTED = 'submitted',
  OPTIONAL = 'optional',
  COMPLETED = 'completed',
  TO_DO = 'toDo',
  DOWNLOAD = 'download',
}

export interface TaskList {
  id: TaskList;
  content: Record<string, any>;
  tasks: Task;
}
export interface Task {
  id: TaskList;
  content: Record<string, any>;
  show: boolean;
  stateTag: StateTags;
  disabled?: boolean;
  showHint?: boolean;
}

export const hasAnyOrder = (caseData: Partial<CaseWithId>): boolean => !!caseData?.orderCollection?.length;

export const hasAnyHearing = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData?.hearingCollection && caseData?.hearingCollection?.length >= 1);

export const getStateTagLabel = (state: StateTags, language: string): string =>
  content?.[language]?.['stateTags']?.[state] ?? '';

export const getContents = (
  taskListSection: TaskListSection,
  caseType: CaseType,
  partyType: PartyType,
  language: string
): Record<string, any> => content[language]?.[caseType]?.[partyType]?.[taskListSection] ?? {};

export const getKeepYourDetailsPrivateStatus = keepDetailsPrivate => {
  let status = StateTags.TO_DO;
  if (keepDetailsPrivate?.confidentiality && keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = StateTags.COMPLETED;
  } else if (keepDetailsPrivate?.confidentiality || keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = StateTags.IN_PROGRESS;
  }
  return status;
};
export const getConfirmOrEditYourContactDetailsStatus = party => {
  const status = StateTags.TO_DO;
  if (party.firstName && party.lastName && party.dateOfBirth && party.placeOfBirth) {
    return StateTags.COMPLETED;
  }
  if (party.firstName || party.lastName || party.dateOfBirth || party.placeOfBirth) {
    return StateTags.IN_PROGRESS;
  }
  return status;
};
export const getSupportYourNeedsDetailsStatus = (userCase: Partial<CaseWithId>): StateTags => {
  if (
    userCase?.languageRequirements?.length &&
    userCase?.reasonableAdjustments?.length &&
    userCase?.safetyArrangements?.length &&
    userCase?.attendingToCourt?.length
  ) {
    return StateTags.COMPLETED;
  }
  return StateTags.TO_DO;
};
export const getYourWitnessStatementStatus = (userCase: Partial<CaseWithId>): StateTags => {
  return userCase.citizenUploadedDocumentList?.find(
    document => document?.value?.documentType === 'Your witness statements'
  )
    ? StateTags.DOWNLOAD
    : StateTags.NOT_AVAILABLE_YET;
};
