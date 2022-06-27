import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../../common/components/address-manual';

const MANUAL_ADDRESS = 'manual-address';

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
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(MANUAL_ADDRESS);
  const translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...translations.en,
      errors: {
        ...errors.en,
      },
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
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
