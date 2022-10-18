import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { form as selectAddressForm, generateContent as selectAddressGenerateContent } from '../common/address-select';

const selectAddressFormFields = selectAddressForm.fields as FormFields;

export const form: FormContent = {
  ...selectAddressForm,
  fields: () => {
    return {
      applicantSelectAddress: selectAddressFormFields.selectAddress,
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const en = () => {
    return {
      title: 'Select address of applicant',
      changePostCodeLabel: 'Change postcode',
      changePostCodeUrl: '/c100-rebuild/applicant/address/lookup',
      cantFindAddressUrl: '/c100-rebuild/applicant/address/manual',
    };
  };
  const cy = () => {
    return {
      title: 'Select address of applicant',
      changePostCodeLabel: 'Change postcode',
      changePostCodeUrl: '/c100-rebuild/applicant/address/lookup',
      cantFindAddressUrl: '/c100-rebuild/applicant/address/manual',
    };
  };

  const languages = {
    en,
    cy,
  };

  const selectAddressContent = selectAddressGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...selectAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
