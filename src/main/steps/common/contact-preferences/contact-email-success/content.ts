/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
import { CaseWithId } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number #{caseNumber}',
  title: 'Contact preferences updated',
  text: 'You will receive digital updates about the case.',
  continue: 'Continue',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder.",
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Contact preferences updated- welsh',
  text: 'You will receive digital updates about the case. - welsh',
  continue: 'Continue - welsh',
  warningText: "If you cannot find the emails in your inbox, check your 'spam' folder. -welsh",
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

export const getFormFields = (caseData: Partial<CaseWithId>): FormContent => {
  return updateFormFields(form, generateFormFields().fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { fields } = generateFormFields();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
  };
};
