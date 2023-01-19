import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../../common/components/address-manual';
import { typeofcaseuser } from '../../../../common/typeofcaseuser';

const MANUAL_ADDRESS = 'manual-address';

const manualAddressFormFields = manualAddressForm.fields as FormFields;

export const form: FormContent = {
  //...manualAddressForm,
  fields: () => {
    return {
      citizenUserManualAddress1: manualAddressFormFields.citizenUserManualAddress1,
      citizenUserManualAddress2: manualAddressFormFields.citizenUserManualAddress2,
      citizenUserManualAddressTown: manualAddressFormFields.citizenUserManualAddressTown,
      citizenUserManualAddressCounty: manualAddressFormFields.citizenUserManualAddressCounty,
      citizenUserManualAddressPostcode: manualAddressFormFields.citizenUserManualAddressPostcode,
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
      pagetitle: '',
      errors: {
        ...errors.en,
      },
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      pagetitle: '',
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
  translationContent.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true);

  return {
    ...manualAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
