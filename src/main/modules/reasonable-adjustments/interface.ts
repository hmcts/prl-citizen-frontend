import {
  CommonComponentMasterFlagCode,
  CommonComponentServiceID,
  CommonComponentUserAction,
} from '../../app/case/definition';
import { Language } from '../../steps/common/common.content';

export interface RARequestPayload {
  hmctsServiceId: CommonComponentServiceID;
  callbackUrl: string;
  logoutUrl: string;
  masterFlagCode: CommonComponentMasterFlagCode;
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
  id: string;
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
  path: Path[];
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
  action: CommonComponentUserAction;
  correlationId: string;
}

export interface RequestPromise {
  correlationId: string;
  resolve: (data: RAFlags) => void;
  reject: (error: string | Error) => void;
}
