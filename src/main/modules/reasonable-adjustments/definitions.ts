import { Language } from '../../steps/common/common.content';

export interface RARequestPayload {
  hmctsServiceId: RACommonComponent.SERVICE_ID;
  callbackUrl: string;
  logoutUrl: string;
  masterFlagCode: RACommonComponent.MASTER_FLAG_CODE;
  correlationId: string;
  existingFlags: RAFlags;
  language: Language;
}

export interface RAFlags {
  partyName: string;
  roleOnCase: string;
  details: RAFlagDetail[] | [];
}

export interface RAFlagDetail {
  id?: string;
  value: RAFlagValue;
}

export interface RAFlagValue {
  name: string;
  name_cy: string;
  subTypeValue?: string;
  subTypeValue_cy?: string;
  subTypeKey?: string;
  otherDescription?: string;
  otherDescription_cy?: string;
  flagComment?: string;
  flagComment_cy?: string;
  flagUpdateComment?: string;
  dateTimeModified?: string;
  dateTimeCreated: string;
  path: Path[] | string[];
  hearingRelevant: string;
  flagCode: string;
  status: string;
  availableExternally: string;
}

export interface Path {
  id?: string;
  value?: string;
  name?: string;
}

export interface RAPostResponse {
  url: string;
}

export interface RAData {
  flagsAsSupplied: RAFlags;
  replacementFlags: RAFlags;
  action: RACommonComponentUserAction;
  correlationId: string;
}

export interface RequestPromise {
  correlationId: string;
  resolve: (data: RAFlags) => void;
  reject: (error: string | Error) => void;
}

export enum RACommonComponent {
  SERVICE_ID = 'ABA5',
  MASTER_FLAG_CODE = 'RA0001',
}

export enum RACommonComponentUserAction {
  SUBMIT = 'submit',
  CANCEL = 'cancel',
}

export enum RASupportCaseEvent {
  RA_CA_REQUEST_SUPPORT = 'c100RequestSupport',
  RA_CA_MANAGE_SUPPORT = 'c100ManageSupport',
  RA_DA_REQUEST_SUPPORT = 'fl401RequestSupport',
  RA_DA_MANAGE_SUPPORT = 'fl401ManageSupport',
}

export enum RADataTransformContext {
  EXTERNAL = 'cc',
  INTERNAL = 'prl',
  FLATTEN = 'flatten',
}

export enum RASupportContext {
  REQUEST_SUPPORT = 'request',
  MANAGE_SUPPORT = 'manage',
}

export enum RARootContext {
  C100_REBUILD = 'c100-rebuild',
  RESPONDENT = 'respondent',
}

export enum RALocalComponentC100SupportNeeds {
  DOCUMENTS_SUPPORT = 'documentsHelp',
  COMMUNICATION_HELP = 'communicationHelp',
  COURT_HEARING_SUPPORT = 'extraSupport',
  COURT_HEARING_COMFORT = 'feelComfortableSupport',
  TRAVELLING_TO_COURT = 'helpTravellingMovingBuildingSupport',
  NO_SUPPORT = 'noSupportRequired',
}

export enum RALocalComponentRespondentSupportNeeds {
  DOCUMENTS_SUPPORT = 'docsformat',
  COMMUNICATION_HELP = 'commhelp',
  COURT_HEARING_SUPPORT = 'hearingsupport',
  COURT_HEARING_COMFORT = 'hearingcomfort',
  TRAVELLING_TO_COURT = 'travellinghelp',
  NO_SUPPORT = 'nosupport',
}
