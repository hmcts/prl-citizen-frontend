/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
  warningText: 'Make sure that your contact details are up to date.',
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Contact Preferences - welsh',
  subTitle: 'Personal details - welsh',
  text: 'You have decided to receive updates by email. You will still receive some information by post. - welsh',
  continue: 'Submit - welsh',
  warningText: 'Make sure that your contact details are up to date. -welsh',
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
  let applicantEmail;
  const caseNumber = content.userCase?.id!;
  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  if (content?.userCase?.applicants) {
    applicantEmail = content?.userCase?.applicants![0].value.email!;
  }

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    userEmail: applicantEmail,
  };
};
