/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import {
  CaseType,
  CitizenInternationalElements,
  PartyType,
  YesOrNo,
  hearingStatus,
} from '../../../../../app/case/definition';
import { getPartyDetails } from '../../../../../steps/tasklistresponse/utils';
import { TaskListContent } from '../../definitions';

import { languages as content } from './content';

export enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
  YOUR_DOCUMENTS = 'yourDocuments',

  YOUR_HEARING = 'yourHearing',

  ABOUT_YOU = 'aboutYou',
  YOUR_ORDERS = 'ordersFromTheCourt',
  THE_APPLICATION = 'theApplication',
  YOUR_RESPONSE = 'yourResponse',
  THE_RESPONSE = 'theResponse',
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
  CHECK_THE_APPLICATION = 'checkTheApplication',
  CHECK_AOH_AND_VIOLENCE = 'checkAllegationsOfHarmAndViolence',
  RESPOND_TO_THE_APPLICATION = 'respondToTheApplication',
  RESPOND_TO_AOH_AND_VIOLENCE = 'respondToAOHAndViolence',
  THE_RESPONSE_PDF = 'theResponsePDF',
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
  VIEW = 'view',
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
  openInAnotherTab?: boolean;
}

export const hasAnyOrder = (caseData: Partial<CaseWithId>): boolean => !!caseData?.orderCollection?.length;

export const hasAnyHearing = (caseData: Partial<CaseWithId>): boolean => {
  const inactiveHmcStatus: string[] = [
    hearingStatus.HEARING_REQUESTED,
    hearingStatus.AWAITING_LISTING,
    hearingStatus.EXCEPTION,
  ];
  return !!(caseData?.hearingCollection ?? []).find(hearing => !inactiveHmcStatus.includes(hearing.hmcStatus!));
};

export const getStateTagLabel = (state: StateTags, language: string): string =>
  content?.[language]?.['stateTags']?.[state] ?? '';

export const getContents = (
  taskListSection: TaskListSection,
  caseType: CaseType,
  partyType: PartyType,
  language: string
): TaskListContent => content[language]?.[caseType]?.[partyType]?.[taskListSection] ?? {};

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
  const summaryField = [
    party.firstName,
    party.lastName,
    party.placeOfBirth,
    party.address?.AddressLine1,
    party.phoneNumber,
    party.email,
    party.dateOfBirth,
  ];
  if (summaryField.every(currentValue => currentValue)) {
    return StateTags.COMPLETED;
  }
  if (summaryField.some(currentValue => currentValue)) {
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

export const getCheckAllegationOfHarmStatus = (caseData, userDetails): StateTags => {
  let status = StateTags.READY_TO_VIEW;

  if (!caseData?.c1ADocument?.document_binary_url) {
    return StateTags.NOT_AVAILABLE_YET;
  }

  const respondent = getPartyDetails(caseData, userDetails.id);
  if (respondent?.response?.citizenFlags?.isAllegationOfHarmViewed === YesOrNo.YES) {
    status = StateTags.VIEW;
  }
  return status;
};

export const getResponseStatus = (respondent): StateTags => {
  if (
    respondent.response.citizenInternationalElements &&
    respondent.response.consent &&
    respondent.response.currentOrPreviousProceedings &&
    respondent.response.keepDetailsPrivate &&
    respondent.response.miam &&
    respondent.response.legalRepresentation &&
    respondent.response.safetyConcerns &&
    respondent.response.supportYouNeed
  ) {
    return StateTags.COMPLETED;
  }
  if (
    respondent.response.citizenInternationalElements ||
    respondent.response.consent ||
    respondent.response.currentOrPreviousProceedings ||
    respondent.response.keepDetailsPrivate ||
    respondent.response.miam ||
    respondent.response.legalRepresentation ||
    respondent.response.safetyConcerns ||
    respondent.response.supportYouNeed
  ) {
    return StateTags.IN_PROGRESS;
  }

  return StateTags.TO_DO;
};

export const getInternationalFactorsStatus = (
  internationalFactors: CitizenInternationalElements | undefined
): StateTags => {
  if (
    ((internationalFactors?.childrenLiveOutsideOfEnWl === YesOrNo.YES &&
      internationalFactors?.childrenLiveOutsideOfEnWlDetails) ||
      internationalFactors?.childrenLiveOutsideOfEnWl === YesOrNo.NO) &&
    ((internationalFactors?.parentsAnyOneLiveOutsideEnWl === YesOrNo.YES &&
      internationalFactors?.parentsAnyOneLiveOutsideEnWlDetails) ||
      internationalFactors?.parentsAnyOneLiveOutsideEnWl === YesOrNo.NO) &&
    ((internationalFactors?.anotherPersonOrderOutsideEnWl === YesOrNo.YES &&
      internationalFactors?.anotherPersonOrderOutsideEnWlDetails) ||
      internationalFactors?.anotherPersonOrderOutsideEnWl === YesOrNo.NO) &&
    ((internationalFactors?.anotherCountryAskedInformation === YesOrNo.YES &&
      internationalFactors?.anotherCountryAskedInformationDetaails) ||
      internationalFactors?.anotherCountryAskedInformation === YesOrNo.NO)
  ) {
    return StateTags.COMPLETED;
  }

  if (
    internationalFactors?.childrenLiveOutsideOfEnWl ||
    internationalFactors?.parentsAnyOneLiveOutsideEnWl ||
    internationalFactors?.anotherPersonOrderOutsideEnWl ||
    internationalFactors?.anotherCountryAskedInformation
  ) {
    return StateTags.IN_PROGRESS;
  }
  return StateTags.TO_DO;
};

export const getFinalApplicationStatus = (caseData, userDetails): StateTags => {
  let result = StateTags.READY_TO_VIEW;

  if (!caseData?.finalDocument?.document_binary_url) {
    return StateTags.NOT_AVAILABLE_YET;
  }

  const respondent = getPartyDetails(caseData, userDetails.id);
  if (respondent?.response?.citizenFlags?.isApplicationViewed === YesOrNo.YES) {
    result = StateTags.VIEW;
  }
  return result;
};
