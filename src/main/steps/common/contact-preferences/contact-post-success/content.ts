/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number #',
  title: 'Contact preferences updated',
  text: 'You will receive updates on the case by post.',
  continue: 'Continue',
});

export const cy = () => ({
  caption: 'Case number - welsh #',
  title: 'Contact preferences updated -welsh',
  text: 'You will receive updates on the case by post. - welsh',
  continue: 'Continue - welsh',
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
  cancel: {
    text: l => l.cancel,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>): FormContent => {
  return updateFormFields(form, generateFormFields().fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: `${translations.caption}`,
    form: updateFormFields(form, fields),
  };
};
