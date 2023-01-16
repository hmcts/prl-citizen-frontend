import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import { typeofcaseuser } from '../../../../../steps/typeofcaseuserutil';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../../common/components/address-select';
import { APPLICANT_FIND_ADDRESS, APPLICANT_MANUAL_ADDRESS } from '../../../../urls';

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
      pagetitle: '',
      errors: {
        ...errors.en,
      },
      changePostCodeUrl: APPLICANT_FIND_ADDRESS,
      cantFindAddressUrl: APPLICANT_MANUAL_ADDRESS,
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      pagetitle: '',
      errors: {
        ...errors.cy,
      },
      changePostCodeUrl: APPLICANT_FIND_ADDRESS,
      cantFindAddressUrl: APPLICANT_MANUAL_ADDRESS,
    };
  };

  const languages = {
    en,
    cy,
  };

  const selectAddressContent = selectAddressGenerateContent(content);
  const translationContent = languages[content.language]();
  translationContent.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication);

  return {
    ...selectAddressContent,
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
