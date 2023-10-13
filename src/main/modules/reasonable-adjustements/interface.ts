import {
  CommonComponentMasterFlagCode,
  CommonComponentServiceID,
  CommonComponentUserAction,
  PartyType,
  YesOrNo,
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
  roleOnCase: PartyType;
  details?: RAFlagDetails[];
}

export interface RAFlagDetails {
  id: string;
  value: RAFlagValue;
}

export interface RAFlagValue {
  name: string;
  name_cy: string;
  subTypeValue: string;
  subTypeValue_cy: string;
  subTypeKey: string;
  otherDescription: string;
  otherDescription_cy: string;
  flagComment: string;
  flagComment_cy: string;
  flagUpdateComment: string;
  dateTimeModified: string;
  dateTimeCreated: string;
  path: Path[];
  hearingRelevant: YesOrNo;
  flagCode: string;
  status: string;
  availableExternally: YesOrNo;
}

export interface Path {
  id: string;
  name: string;
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
