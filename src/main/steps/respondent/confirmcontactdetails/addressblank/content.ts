import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/common/address-manual';

const en = ({ manualAddressContent, userCase }) => {
  return {
    title: "Your Address",
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const cy: typeof en = ({ manualAddressContent, userCase }) => {
return {
    title: 'Beth yw eich cyfeiriad?',
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    applicant1Address1: manualAddressFormFields.address1,
    applicant1Address2: manualAddressFormFields.address2,
    applicant1Address3: manualAddressFormFields.address3,
    applicant1AddressTown: manualAddressFormFields.addressTown,
    applicant1AddressCounty: manualAddressFormFields.addressCounty,
    applicant1AddressPostcode: manualAddressFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const manualAddressContent = manualAddressGenerateContent(content);
  const translations = languages[content.language]({ manualAddressContent, userCase: content.userCase });

  return {
    ...manualAddressContent,
    ...translations,
    form,
  };
};
