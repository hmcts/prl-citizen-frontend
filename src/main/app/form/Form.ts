import { SummaryListContent } from '../../steps/common/models/summaryListContent';
import { Case, CaseDate, CaseWithId } from '../case/case';
import { AnyObject } from '../controller/PostController';

import { setupCheckboxParser } from './parser';

export class Form {
  constructor(private readonly fields: FormFields) {}

  /**
   * Pass the form body to any fields with a parser and return mutated body;
   */
  public getParsedBody(body: AnyObject, checkFields?: FormContent['fields']): Partial<CaseWithFormData> {
    const fields = checkFields || this.fields;

    const parsedBody = Object.entries(fields)
      .reduce((_fields: [string, FormField][], [key, field]) => {
        _fields =
          field.type === 'fieldset' && Object.keys(field?.subFields ?? {}).length
            ? [..._fields, ...(Object.entries(field.subFields) as [string, FormField][])]
            : [..._fields, [key, field]];
        return _fields;
      }, [])
      .map(setupCheckboxParser(!!body.saveAndSignOut))
      .filter(([, field]) => typeof field?.parser === 'function')
      .flatMap(([key, field]) => {
        const parsed = field.parser?.(body);
        return Array.isArray(parsed) ? parsed : [[key, parsed]];
      });

    let subFieldsParsedBody = {};
    for (const [, value] of Object.entries(fields)) {
      (value as FormOptions)?.values
        ?.filter(option => option.subFields !== undefined)
        .map(fieldWithSubFields => fieldWithSubFields.subFields)
        .map(subField => this.getParsedBody(body, subField))
        .forEach(parsedSubField => {
          subFieldsParsedBody = { ...subFieldsParsedBody, ...parsedSubField };
        });
    }

    return { ...body, ...subFieldsParsedBody, ...Object.fromEntries(parsedBody) };
  }

  /**
   * Pass the form body to any fields with a validator and return a list of errors
   */
  public getErrors(body: Partial<Case>): FormError[] {
    return Object.entries(this.fields).flatMap(fieldWithId => this.getErrorsFromField(body, ...fieldWithId));
  }

  private getErrorsFromField(body: Partial<Case>, id: string, field: FormField): FormError[] {
    const errorType = field.validator && field.validator(body[id], body);
    const errors: FormError[] = errorType ? [{ errorType, propertyName: id }] : [];

    // if there are checkboxes or options, check them for errors
    if (isFormOptions(field)) {
      const valuesErrors = field.values.flatMap(value => this.getErrorsFromField(body, value.name || id, value));

      errors.push(...valuesErrors);
    }
    // if there are subfields and the current field is selected then check for errors in the subfields
    else if (field.subFields) {
      if (body[id] === field.value || (body[id] && body[id].includes(field.value))) {
        const subFields = Object.entries(field.subFields);
        const subFieldErrors = subFields.flatMap(([subId, subField]) => this.getErrorsFromField(body, subId, subField));

        errors.push(...subFieldErrors);
      }
    }

    return errors;
  }

  public getFieldNames(): Set<string> {
    const fields = this.fields;
    const fieldNames: Set<string> = new Set();
    for (const fieldKey in fields) {
      const stepField = fields[fieldKey] as FormOptions;
      if (stepField.values && stepField.type !== 'date') {
        for (const [, value] of Object.entries(stepField.values)) {
          if (value.name) {
            fieldNames.add(value.name);
          } else {
            fieldNames.add(fieldKey);
          }
          if (value.subFields) {
            for (const field of Object.keys(value.subFields)) {
              fieldNames.add(field);
            }
          }
        }
      } else {
        fieldNames.add(fieldKey);
      }
    }

    return fieldNames;
  }

  public isComplete(body: Partial<Case>): boolean {
    for (const field of this.getFieldNames().values()) {
      if (body[field] === undefined || body[field] === null) {
        return false;
      }
    }

    return true;
  }
}
export type DropdownOptionsLookup = (lang: Record<string, never>) => [];

export type LanguageLookup = (lang: Record<string, never>) => string;

type Parser = (value: Record<string, unknown> | string[]) => void;

type Label = string | LanguageLookup;

type Warning = Label;

export type ValidationCheck = (
  value: string | string[] | CaseDate | undefined,
  formData: Partial<Case>
) => void | string;
export type FormFields = Record<string, FormField>;
export type FormFieldsFn = (userCase: Partial<Case>) => FormFields;

export interface FormContent {
  accessCodeCheck?: {
    text: Label;
    classes?: string;
  };
  submit?: {
    text: Label;
    classes?: string;
  };
  onlyContinue?: {
    text: Label;
    classes?: string;
  };
  onlycontinue?: {
    text: Label;
    classes?: string;
  };
  saveAsDraft?: {
    text: Label;
    classes?: string;
  };
  saveAndComeLater?: {
    text: Label;
    classes?: string;
  };
  cancel?: {
    text: Label;
    classes?: string;
  };
  editAddress?: {
    text: Label;
    classes?: string;
  };
  goBack?: {
    text: Label;
    classes?: string;
  };

  fields: FormFields | FormFieldsFn;
}

export type FormField = FormInput | FormOptions;

export interface FormOptions {
  id?: string;
  type: string;
  label?: Label;
  section?: Label;
  hint?: Label;
  classes?: string;
  labelHidden?: boolean;
  labelSize?: string | null;
  hideError?: boolean;
  values: FormInput[];
  attributes?: Partial<HTMLInputElement | HTMLTextAreaElement>;
  validator?: ValidationCheck;
  parser?: Parser;
  disabled?: boolean;
  rows?: SummaryListContent;
}

export interface FormInput {
  id?: string;
  name?: string;
  type?: string;
  label?: Label;
  labelSize?: string | null;
  section?: Label;
  hint?: Label;
  subtext?: Label;
  classes?: string;
  hidden?: boolean;
  selected?: boolean;
  value?: string | number;
  attributes?: Partial<HTMLInputElement | HTMLTextAreaElement>;
  validator?: ValidationCheck;
  parser?: Parser;
  warning?: Warning;
  conditionalText?: Label;
  subFields?: Record<string, FormField>;
  open?: boolean;
  options?: DropdownOptionsLookup;
  disabled?: boolean;
  detailsHtml?: Label;
  textAndHtml?: Label;
  link?: string;
  divider?: boolean | string;
  exclusive?: boolean;
  behaviour?: string;
}

function isFormOptions(field: FormField): field is FormOptions {
  return (field as FormOptions).values !== undefined;
}

export interface CsrfField {
  _csrf: string;
}

export type FormError = {
  propertyName: string;
  errorType: string;
};

interface CaseWithFormData extends CaseWithId {
  _csrf: string;
  saveAndSignOut?: string;
  accessCodeCheck?: string;
  editAddress?: string;
  saveBeforeSessionTimeout?: string;
  sendToApplicant2ForReview?: string;
  addAnotherName?: string;
  addAnotherNameHidden?: string;
}
export interface GenerateDynamicFormFields {
  fields: FormContent['fields'];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}