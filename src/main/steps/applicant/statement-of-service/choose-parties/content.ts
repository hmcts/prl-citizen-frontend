//import { isObject } from 'lodash';

import { CommonContent } from '../../../../../main/steps/common/common.content';
import { CaseDate } from '../../../../app/case/case';
import { test } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  isDateInputInvalid,
  isFutureDate,
} from '../../../../app/form/validation';

export const en = {
  caption: 'Case number ',
  title: 'Add a statement of service',
  whowasserved: 'Who was served?',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  servedDate: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  uplodFileText1:
    'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.',
  uploadFileHeading: 'Upload a document',
  errors: {
    partiesServedDate: {
      required: 'Please select the date on which the party/parties is/are served',
    },
    partiesServed: {
      required: 'Please select the party/parties that is/are served',
    },
  },
};

export const cy = {
  caption: 'Case number ',
  title: 'Add a statement of service',
  continue: 'Continue',
  whowasserved: 'Who was served?',
  add: 'Submit',
  servedDate: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  uplodFileText1:
    'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.',
  uploadFileHeading: 'Upload a document',
  errors: {
    partiesServedDate: {
      required: 'Please select the date on which the party/parties is/are served',
    },
    partiesServed: {
      required: 'Please select the party/parties that is/are served',
    },
  },
};

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (parties: test[]): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };
  const checkboxes: { name: string; label: string; value: string }[] = [];
  parties.forEach(p => {
    checkboxes.push({
      name: 'partiesServed',
      label: p.value,
      value: p.id,
    });
  });
  const fields = {
    partiesServedDate: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.servedDate,
      labelSize: 's',
      hint: l => l.servedDateHint,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('citizenUserDateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
    partiesServed: {
      type: 'checkboxes',
      label: l => l.whowasserved,
      values: [...checkboxes],
      validator: atLeastOneFieldIsChecked,
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

const getParties = (content: CommonContent) => {
  const parties: { id: string; value: string }[] = [];
  content.userCase?.respondents?.forEach(respondent =>
    parties.push({
      id: respondent.id,
      value: respondent.value.firstName + ' ' + respondent.value.lastName,
    })
  );
  content.userCase?.applicants?.forEach(applicant =>
    parties.push({
      id: applicant.id,
      value: applicant.value.firstName + ' ' + applicant.value.lastName,
    })
  );
  return parties;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const parties: { id: string; value: string }[] = getParties(content);
  return {
    ...translations,
    form: updateFormFields(form, generateFormFields(parties).fields),
  };
};
