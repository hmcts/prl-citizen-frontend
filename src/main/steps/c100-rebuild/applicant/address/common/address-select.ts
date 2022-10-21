import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isAddressSelected } from '../../../../../app/form/validation';

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));

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

export const form: FormContent = {
  fields: {
    selectAddress: {
      type: 'select',
      label: l => l.selectAddress,
      labelSize: null,
      validator: isAddressSelected,
      options: l => l.options,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

const languages = {
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
