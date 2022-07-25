import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isAddressSelected } from '../../../../app/form/validation';

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
    postcode: 'Postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'Or enter address manually',
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
      text: `${addresses.length} cyfeiriad${addresses?.length !== 1 ? 'au' : ''} wedi’i ddarganfod`,
      selected: true,
    },
  ];

  options.push(...getAddressItems(addresses));

  return {
    postcode: 'Cod post',
    selectAddress: 'Dewiswch gyfeiriad',
    cannotFindAddress: 'Neu nodwch y cyfeiriad â llaw',
    errors: {
      selectAddress: {
        notSelected: 'Dewiswch gyfeiriad',
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
