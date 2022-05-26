import { AnyObject } from '../controller/PostController';

import { CaseData, State, YesOrNo } from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  serviceType: 'serviceType',
  claimNumber: 'claimNumber',
  caseCode: 'caseCode',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }
  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  /***** case code authorization fields *****/
  serviceType: string;
  claimNumber?: string;
  caseCode?: string;
  detailsKnown?:string
  startAlternative?:string,
  doYouConsent?: YesOrNo,
  applicationReceived?: CaseDate,
  courtPermission?: YesOrNo
  reasonForNotConsenting?: string, 
  courtOrderDetails?: string,
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}

