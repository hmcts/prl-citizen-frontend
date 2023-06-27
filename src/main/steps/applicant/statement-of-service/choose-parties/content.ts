//import { isObject } from 'lodash';

import { CaseDate } from '../../../../app/case/case';
import { test } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../app/form/Form';
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
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
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
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

export const cy = {
  caption: 'Case number ',
  title: 'Add a statement of service',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
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
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form = (parties: test[]): FormContent => {
  const checkboxes: { name: string; label: string; value: string }[] = [];
  parties.forEach(p => {
    checkboxes.push({
      name: 'partiesServed',
      label: p.value,
      value: p.id,
    });
  });
  const formContent: FormContent = {
    fields: () => {
      const formFields: FormFields = {
        partiesServedDate: {
          type: 'date',
          classes: 'govuk-date-input',
          label: l => l.servedDate,
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
      console.log('** form fields **' + JSON.stringify(formFields));
      return formFields;
    },
    onlyContinue: {
      text: l => l.continue,
    },
  };
  console.log('** form content **' + JSON.stringify(formContent.fields));
  return formContent;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { parentDocType, docType } = content.additionalData!.req.query;
  const parties: { id: string; value: string }[] = [];
  content.userCase?.respondents?.forEach(respondent =>
    parties.push({
      id: respondent.id,
      value: respondent.value.firstName + ' ' + respondent.value.lastName,
    })
  );
  const formData: FormContent = form(parties);
  console.log(JSON.stringify(formData));

  return {
    form: { ...formData, fields: (formData.fields as FormFieldsFn)(content.userCase || {}) },
    ...translations,
    parentDocType,
    docType,
  };
};
