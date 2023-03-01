/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { PartyDetailsEnum } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number #{caseNumber}',
  title: 'Contact Preferences',
  continue: 'Submit',
  textList: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Contact Preferences -welsh',
  continue: 'Submit - welsh',
  textList: [
    'You have decided to receive updates by post. -welsh',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard. -welsh',
  ],
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

export const getFormFields = (): FormContent => {
  return updateFormFields(form, generateFormFields().fields);
};

export const generateContent: TranslationFn = content => {
  const caseNumber: string = content.userCase?.id!;
  let applicantAddressObj;
  let value;
  const applicantAddress: string[] = [];

  if (content?.userCase?.applicants) {
    applicantAddressObj = content?.userCase?.applicants![0].value?.address! ?? {};
    for (const key in applicantAddressObj) {
      switch (key) {
        case PartyDetailsEnum.AddressLine1:
          value = applicantAddressObj[key];
          applicantAddress.push(value);
          break;
        case PartyDetailsEnum.PostTown:
          value = applicantAddressObj[key];
          applicantAddress.push(value);
          break;
        case PartyDetailsEnum.PostCode:
          value = applicantAddressObj[key];
          applicantAddress.push(value);
          break;
      }
    }
  }
  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    addresses: applicantAddress,
  };
};
