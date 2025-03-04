import { CaseWithId } from '../../../app/case/case';

export type FieldsConfig = {
  [key in string]: {
    fieldType: 'string|array|object';
    value?: string;
    items?: {
      type: 'string|object';
    };
    properties?: object;
  };
};

export type MandatoryFieldsConfig = {
  fieldName: string;
  value?: string;
  expression?: (caseData: CaseWithId) => { isMandatory: boolean };
  property?: string;
  fieldMeta: {
    fieldType: string;
    items?: object;
    properties?: object;
  };
};

export type FieldConfig = {
  fieldName: string;
  fieldType: string;
  value?: string;
  items?: object;
  properties?: object;
  property?: string;
  expression?: (caseData: CaseWithId) => { isMandatory: boolean };
};
