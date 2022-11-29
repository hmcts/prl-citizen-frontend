import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../../common/components/address-select';
import { RESPONDENT_ADDRESS_MANUAL, RESPONDENT_FIND_ADDRESS } from '../../../../urls';

const selectAddressFormFields = selectAddressForm.fields as FormFields;

const SELECT_ADDRESS = 'select-address';

export const form: FormContent = {
  ...selectAddressForm,
  fields: () => {
    return {
      citizenUserSelectAddress: selectAddressFormFields.citizenUserSelectAddress,
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(SELECT_ADDRESS);
  const translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...translations.en,
      errors: {
        ...errors.en,
      },
      changePostCodeUrl: RESPONDENT_FIND_ADDRESS,
      cantFindAddressUrl: RESPONDENT_ADDRESS_MANUAL,
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
      changePostCodeUrl: RESPONDENT_FIND_ADDRESS,
      cantFindAddressUrl: RESPONDENT_ADDRESS_MANUAL,
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
