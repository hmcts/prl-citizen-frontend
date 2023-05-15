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
  continue: 'Submit',
  textList: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
  warningText: 'Make sure that your contact details are up to date.',
  address: 'Address',
  change: 'Change',
  addressLowerCase: 'address',
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Contact Preferences -welsh',
  subTitle: 'Personal details -welsh',
  continue: 'Submit - welsh',
  textList: [
    'You have decided to receive updates by post. -welsh',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard. -welsh',
  ],
  warningText: 'Make sure that your contact details are up to date. -welsh',
  address: 'Cyfeiriad',
  change: 'Change (welsh)',
  addressLowerCase: 'cyfeiriad',
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
  const caseNumber: string = content.userCase?.id!;
  let applicantAddressObj;
  const applicantAddress: string[] = [];

  if (content?.userCase?.applicants) {
    applicantAddressObj = content?.userCase?.applicants![0].value?.address! ?? {};
    for (const key in applicantAddressObj) {
      if (applicantAddressObj[key] !== '' || applicantAddressObj[key] !== null) {
        applicantAddress.push(applicantAddressObj[key]);
      }
    }
  }

  const translations = languages[content.language]();
  const { fields } = generateFormFields();

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
    addresses: applicantAddress.filter(item => item),
  };
};
