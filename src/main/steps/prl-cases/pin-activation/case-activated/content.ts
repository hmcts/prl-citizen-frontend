/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';
console.info('** FOR SONAR **');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Case added to your account',
  text: 'The case can now be seen on your child arrangements and family injunction account.',
  continue: 'Continue',
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Achos wedi’i ychwanegu i’ch cyfrif',
  text: 'Gallwch nawr weld yr achos yn eich cyfrif trefniadau plant a gwaharddeb teulu.',
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
  let caseNumber;

  if (content.userCase !== null) {
    caseNumber = content.userCase?.id!;
  } else {
    caseNumber = '';
  }

  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
  };
};
