import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../../common/components/address-lookup';
import { RESPONDENT_ADDRESS_MANUAL } from '../../../../urls';

const LOOKUP_ADDRESS = 'address-lookup';

const addressLookupFormFields = addressLookupForm.fields as FormFields;

export const form: FormContent = {
  ...addressLookupForm,
  fields: () => {
    return {
      citizenUserAddressPostcode: addressLookupFormFields.citizenUserAddressPostcode,
    };
  },
  submit: {
    text: l => l.onlyContinue,
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
      manualAddressUrl: RESPONDENT_ADDRESS_MANUAL,
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
      manualAddressUrl: RESPONDENT_ADDRESS_MANUAL,
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
