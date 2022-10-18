import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { form as addressLookupForm, generateContent as addressLookupGenerateContent } from '../common/address-lookup';

const addressLookupFormFields = addressLookupForm.fields as FormFields;

export const form: FormContent = {
  ...addressLookupForm,
  fields: () => {
    return {
      applicantAddressPostcode: addressLookupFormFields.addressPostcode,
    };
  },
};

export const generateContent: TranslationFn = content => {
  const en = () => {
    return {
      title: 'Address of Applicant',
      manualAddressUrl: '/c100-rebuild/applicant/address/manual',
      errors: {
        applicantAddressPostcode: {
          required: 'Enter a real postcode',
          invalid: 'Enter a real postcode',
        },
      },
    };
  };
  const cy = () => {
    return {
      title: 'Address of Applicant - welsh',
      manualAddressUrl: '/c100-rebuild/applicant/address/manual',
      errors: {
        applicantAddressPostcode: {
          required: 'Enter a real postcode - welsh',
          invalid: 'Enter a real postcode - welsh',
        },
      },
    };
  };

  const languages = {
    en,
    cy,
  };

  const addressLookupContent = addressLookupGenerateContent(content);
  const translationContent = languages[content.language]();

  return {
    ...addressLookupContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
