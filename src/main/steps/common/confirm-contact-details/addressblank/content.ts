import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = ({ manualAddressContent }) => {
  return {
    title: 'Your Address',
    errors: {
      citizenUserAddress1: manualAddressContent.errors.address1,
      citizenUserAddressTown: manualAddressContent.errors.addressTown,
      citizenUserAddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const cy: typeof en = ({ manualAddressContent }) => {
  return {
    title: 'Beth yw eich cyfeiriad?',
    errors: {
      citizenUserAddress1: manualAddressContent.errors.address1,
      citizenUserAddressTown: manualAddressContent.errors.addressTown,
      citizenUserAddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    citizenUserAddress1: manualAddressFormFields.address1,
    citizenUserAddress2: manualAddressFormFields.address2,
    applicant1Address3: manualAddressFormFields.address3,
    citizenUserAddressTown: manualAddressFormFields.addressTown,
    citizenUserAddressCounty: manualAddressFormFields.addressCounty,
    citizenUserAddressPostcode: manualAddressFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const manualAddressContent = manualAddressGenerateContent(content);
  const translations = languages[content.language]({ manualAddressContent });

  return {
    ...manualAddressContent,
    ...translations,
    form,
  };
};
