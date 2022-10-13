import { CaseWithId } from '../app/case/case';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
  AboutRespondentCase = 'aboutRespondentCase',
  AboutApplicantCase = 'aboutApplicantCase',
  AboutCaAndDaRespondentCase = 'aboutCaAndDaRespondentCase',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const ApplicantUploadFiles = 'applicantUploadFiles';
export const RespondentUploadFiles = 'respondentUploadFiles';

export const RESPONSE_MIAM_ELEMENTS = 'miam';
export const RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS = 'citizenInternationalElements';

export const URL_PATTERN_INTERNATIONAL_FACTORS = 'international-factors';
export const EVENT_INTERNATIONAL_ELEMENT = 'internationalElement';

export const EVENT_RESPONDENT_MIAM = 'respondentMiam';
