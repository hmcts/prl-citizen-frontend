/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number #{caseNumber}',
  title: 'Contact Preferences',
  subTitle: 'Personal details',
  text: 'You have decided to receive updates by email. You will still receive some information by post.',
  continue: 'Submit',
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Contact Preferences - welsh',
  subTitle: 'Personal details - welsh',
  text: 'You have decided to receive updates by email. You will still receive some information by post. - welsh',
  continue: 'Submit - welsh',
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

export const generateFormFields = (caseData: any): GenerateDynamicFormFields => {
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

export const getFormFields = (caseData: any): FormContent => {
  return updateFormFields(form, generateFormFields(caseData.userCase!.applicants).fields);
};

export const generateContent: TranslationFn = content => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;

  // ! Need to change this EMAIL from the actual caseData
  const tempEmail = 'test@email.com';
  const translations = languages[content.language]();
  const { fields } = generateFormFields(content.userCase!.applicants);
  console.log('content.userCase!', content.userCase!);
  console.log('email ->', content.userCase!.applicants);

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    userEmail: tempEmail,
  };
};
