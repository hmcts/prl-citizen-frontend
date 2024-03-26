/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import _ from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';
console.info('** FOR SONAR **');
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
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
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau Cyswllt',
  subTitle: 'Manylion personol',
  continue: 'Cyflwyno',
  textList: [
    'Rydych wedi penderfynu cael diweddariadau drwy’r post.',
    'Ni fyddwch yn cael diweddariadau drwy e-bost o hyn ymlaen. Gallwch dal weld diweddariadau blaenorol yn eich dangosfwrdd',
  ],
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  address: 'Cyfeiriad',
  change: 'Newid',
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

  if (content?.userCase?.applicants?.length) {
    applicantAddressObj = _.get(
      content.userCase.applicants.find(applicant => applicant.value.user.idamId === content.userIdamId),
      'value.address',
      {}
    );

    for (const key in applicantAddressObj) {
      if (applicantAddressObj[key]) {
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
