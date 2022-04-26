import { Validator } from '../../../../app/form/validation';

export interface ComponentValues {
  enContent?: Record<string, unknown>;
  cyContent?: Record<string, unknown>;
  fieldName: string;
  subFields?: ComponentValues[];
  label?: string;
  labelSize?: string | null;
  hint?: string;
  type?: string;
}

export interface RadiosValues extends ComponentValues {
  values: RadiosItem[];
}

export interface RadiosItem {
  key: string;
  value: string;
  subFields?: ComponentValues[];
}

export interface InputValues extends ComponentValues {
  validator: Validator;
}
