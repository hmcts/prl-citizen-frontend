import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/common/address-select';
import { RESPONDENT_FIND_ADDRESS } from '../../../urls';

const en = ({ selectAddressContent }) => {
  return {
    title: 'Your address',
    currentPostcodeLabel: 'Current postcode',
    currentPostcode: 'MK9 3DX',
    changePostCodeUrlLink: 'Change postcode',
    selectAddress: 'Select an address',
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: RESPONDENT_FIND_ADDRESS,
    continue: 'Continue',
  };
};

const cy: typeof en = ({ selectAddressContent }) => {
  return {
    title: 'Your address',
    currentPostcodeLabel: 'Current postcode',
    currentPostcode: 'MK9 3DX',
    changePostCodeUrlLink: 'Change postcode',
    selectAddress: 'Select an address',
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: RESPONDENT_FIND_ADDRESS,
    continue: 'Continue',
  };
};

const languages = {
  en,
  cy,
};

// export const form: FormContent = {
//   fields: {
//     currentPostcodeLabel: {
//       type: 'label',
//       label: l => l.currentPostcodeLabel,
//       labelSize: null,
//     },
//     currentPostcode: {
//       type: 'label',
//       label: l => l.currentPostcode,
//       labelSize: null,
//     },
//     changePostCodeUchangePostCodeUrlLinkrl: {
//       type: 'label',
//       label: l => l.changePostCodeUrlLink,
//       labelSize: null,
//     },
//     selectAddress: {
//       type: 'select',
//       label: l => l.selectAddress,
//       labelSize: 'm',
//       validator: isAddressSelected,
//       options: l => l.options,
//     },

//   },
//   submit: {
//     text: l => l.continue,
//   },
// };

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    applicant1SelectAddress: selectAddressFormFields.selectAddress,
  },
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language]({ selectAddressContent });

  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
