import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';
import { getAddress } from '../../c100-rebuild/address-select-util';

const en = content => {
  return {
    postcode: 'Current postcode',
    citizenUserSelectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    defaultPostcode: 'E14RRR',
    enterAddressManually: 'Or enter address manually',
    errors: {
      citizenUserSelectAddress: {
        notSelected: 'Select an address',
      },
    },
    options: getAddress('en', content.addresses),
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

const cy = content => {
  return {
    postcode: 'Cod post cyfredol',
    citizenUserSelectAddress: 'Dewiswch gyfeiriad',
    cannotFindAddress: 'Ni allaf ddod o hyd i’r cyfeiriad yn y rhestr',
    errors: {
      citizenUserSelectAddress: {
        notSelected: 'Dewiswch gyfeiriad',
      },
    },
    options: getAddress('cy', content.addresses),
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

export const form: FormContent = {
  fields: {
    citizenUserSelectAddress: {
      type: 'select',
      label: l => l.citizenUserSelectAddress,
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
