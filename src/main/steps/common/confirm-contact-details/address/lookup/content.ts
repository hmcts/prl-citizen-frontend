import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../../common/components/address-lookup';
import { APPLICANT_MANUAL_ADDRESS } from '../../../../urls';

const LOOKUP_ADDRESS = 'address-lookup';

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
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(LOOKUP_ADDRESS);
  const translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...translations.en,
      errors: {
        ...errors.en,
      },
      manualAddressUrl: APPLICANT_MANUAL_ADDRESS,
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
      manualAddressUrl: APPLICANT_MANUAL_ADDRESS,
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
