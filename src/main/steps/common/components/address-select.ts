import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';

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
    line1:
      "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
    postcode: 'Postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    defaultPostcode: 'E14RRR',
    enterAddressManually: 'Or enter address manually',
    errors: {
      selectAddress: {
        notSelected: 'Select an address',
      },
    },
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
      text: `${addresses.length} address${addresses?.length !== 1 ? 'es' : ''} found (in welsh)`,
      selected: true,
    },
  ];

  options.push(...getAddressItems(addresses));

  return {
    line1:
      "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
    postcode: 'Postcode (in welsh)',
    selectAddress: 'Select an address (in welsh)',
    cannotFindAddress: 'I cannot find the address in the list (in welsh)',
    errors: {
      selectAddress: {
        notSelected: 'Select an address (in welsh)',
      },
    },
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
      labelSize: 'm',
      validator: isAddressSelected,
      options: l => l.options,
    },
  },
  submit: {
    text: l => l.continue,
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
