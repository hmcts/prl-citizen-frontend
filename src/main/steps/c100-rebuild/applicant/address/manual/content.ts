import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { form as manualAddressForm, generateContent as manualAddressGenerateContent } from '../common/address-manual';

const manualAddressFormFields = manualAddressForm.fields as FormFields;

export const form: FormContent = {
  ...manualAddressForm,
  fields: () => {
    return {
      applicantAddress1: manualAddressFormFields.address1,
      applicantAddress2: manualAddressFormFields.address2,
      applicantAddressTown: manualAddressFormFields.addressTown,
      applicantAddressCounty: manualAddressFormFields.addressCounty,
      applicantAddressPostcode: manualAddressFormFields.addressPostcode,
      applicantAddressHistory: manualAddressFormFields.addressHistory,
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const en = () => {
    return {
      title: 'Address details of applicant',
    };
  };
  const cy = () => {
    return {
      title: 'Address details of applicant - welsh',
    };
  };

  const languages = {
    en,
    cy,
  };

  const manualAddressContent = manualAddressGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...manualAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
