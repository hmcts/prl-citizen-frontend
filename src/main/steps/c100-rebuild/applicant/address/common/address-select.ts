import { C100Applicant } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isAddressSelected } from '../../../../../app/form/validation';

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = content => {
  const addresses = content.addresses || [];
  const options = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${addresses?.length} address${addresses?.length !== 1 ? 'es' : ''} found`,
      selected: true,
    },
  ];

  options.push(...getAddressItems(addresses));

  return {
    postcode: 'Current postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    enterAddressManually: 'Or enter address manually',
    options,
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cy = content => {
  const addresses = content.addresses || [];
  const options = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${addresses.length} address${addresses?.length !== 1 ? 'es' : ''} found - welsh`,
      selected: true,
    },
  ];

  options.push(...getAddressItems(addresses));

  return {
    postcode: 'Current postcode - welsh',
    selectAddress: 'Select an address - welsh',
    cannotFindAddress: 'I cannot find the address in the list - welsh',
    enterAddressManually: 'Or enter address manually - welsh',
    options,
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

export const form = (caseData: Partial<C100Applicant>): FormContent => {
  const { applicantSelectedAddress } = caseData;
  return {
    fields: {
      selectAddress: {
        type: 'select',
        label: l => l.selectAddress,
        labelSize: null,
        validator: isAddressSelected,
        value: applicantSelectedAddress,
        options: l => l.options,
      },
    },
  };
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
