import { CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
  AboutRespondentCase = 'aboutRespondentCase',
  AboutApplicantCase = 'aboutApplicantCase',
  AboutCaAndDaRespondentCase = 'aboutCaAndDaRespondentCase',
  C100 = 'c100',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>, req?: AppRequest) => PageLink;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  getController?: any;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  postController?: any;
  sanitizeQueryString?: (fromurl: string, toUrl: string, queryString: Record<string, string>) => Record<string, string>;
}

export const ApplicantUploadFiles = 'applicantUploadFiles';
export const RespondentUploadFiles = 'respondentUploadFiles';
export const UploadDocumentSucess = 'upload-documents-success';
export const UploadDocument = 'upload-document';

export const RESPONSE_MIAM_ELEMENTS = 'miam';
export const RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS = 'citizenInternationalElements';

export const URL_PATTERN_INTERNATIONAL_FACTORS = 'international-factors';
export const EVENT_INTERNATIONAL_ELEMENT = 'citizenInternationalElement';

export const EVENT_RESPONDENT_MIAM = 'respondentMiam';
export const UPDATE_CASE_YES = '?updateCase=Yes';

export const ordinalNumberMap = new Map<number, string>([
  [1, 'First'],
  [2, 'Second'],
  [3, 'Third'],
  [4, 'Fourth'],
  [5, 'Fifth'],
  [6, 'Sixth'],
  [7, 'Seventh'],
  [8, 'Eighth'],
  [9, 'Ninth'],
  [10, 'Tenth'],
  [11, 'Eleventh'],
  [12, 'Twelfth'],
  [13, 'Thirteenth'],
  [14, 'Fourteenth'],
  [15, 'Fifteenth'],
  [16, 'Sixteenth'],
  [17, 'Seventeenth'],
  [18, 'Eighteenth'],
  [19, 'Nineteenth'],
  [20, 'Twentieth'],
]);

export const NO_NEED_OF_SUPPORT = 'No, I do not have any language requirements at this time';
export const NO_NEED_OF_SUPPORT_AT_THIS_TIME = 'No, I do not need any extra support at this time';
export const NO_I_DO_NOT_NEED_OF_SUPPORT_AT_THIS_TIME = 'I do not need any of this support at this time';
export const NO_HEARINGS = 'no hearings';
