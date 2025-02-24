import { CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
  AboutRespondentCase = 'aboutRespondentCase',
  AboutApplicantCase = 'aboutApplicantCase',
  AboutCaAndDaRespondentCase = 'aboutCaAndDaRespondentCase',
  C100 = 'c100',
  Screening = 'screening',
  ApplicationWithinProceedings = 'applicationWithinProceedings',
  RA = 'cuira',
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
  subDir?: string;
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

export const NO_NEED_OF_SUPPORT = 'No, I do not have any language requirements at this time';
export const NO_NEED_OF_SUPPORT_AT_THIS_TIME = 'No, I do not need any extra support at this time';
export const NO_I_DO_NOT_NEED_OF_SUPPORT_AT_THIS_TIME = 'I do not need any of this support at this time';
export const NO_HEARINGS = 'nohearings';

// CONSTANTS for SupportYouNeedDuringYourCaseService.ts file
export const LANGUAGE_INTERPRETER = 'languageinterpreter';
export const OTHER = 'other';
export const DOCS_FORMAT = 'docsformat';
export const COMM_HELP = 'commhelp';
export const HEARING_SUPPORT = 'hearingsupport';
export const HEARING_COMFORT = 'hearingcomfort';
export const TRAVELLING_HELP = 'travellinghelp';
export const DOCS_PRINT = 'docsprint';
export const LARGE_PRINT_DOCS = 'largeprintdocs';
export const SIGN_LANGUAGE = 'signlanguage';
export const SUPPORT_WORKER = 'supportworker';
export const FAMILY_MEMBER = 'familymember';
export const ANIMAL = 'animal';
export const APPROPRIATE_LIGHTING = 'appropriatelighting';
export const PARKING_SPACE = 'parkingspace';
export const DIFFERENT_CHAIR = 'differentchair';
export const NO_SUPPORT = 'nosupport';
export const NO_INTERPRETER = 'nointerpreter';
export const INVALID_DATE = 'Invalid Date';

export enum HEARING_METHOD {
  TEL = 'TEL',
  TELBTM = 'TELBTM',
  TELCVP = 'TELCVP',
  TELSKYP = 'TELSKYP',
  TELOTHER = 'TELOTHER',
  TELTEMP = 'TELTEMP',
  VID = 'VID',
  VIDOTHER = 'VIDOTHER',
  VIDSKYPE = 'VIDSKYPE',
  VIDCVP = 'VIDCVP',
  VIDTEAMS = 'VIDTEAMS',
  VIDVHS = 'VIDVHS',
  VIDPVL = 'VIDPVL',
  INTER = 'INTER',
  NA = 'NA',
  ONPPRS = 'ONPPRS',
}
