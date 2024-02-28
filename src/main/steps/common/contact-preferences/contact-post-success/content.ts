/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';
console.info('** FOR SONAR **');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Contact preferences updated',
  text: 'You will receive updates on the case by post.',
  continue: 'Continue',
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau cyswllt wedi’u diweddaru',
  text: 'Byddwch yn cael diweddariadau am yr achos drwy’r post.',
  continue: 'Parhau',
});

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

export const generateFormFields = (): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {};

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const getFormFields = (): FormContent => {
  return updateFormFields(form, generateFormFields().fields);
};

export const generateContent: TranslationFn = content => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;

  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
  };
};
