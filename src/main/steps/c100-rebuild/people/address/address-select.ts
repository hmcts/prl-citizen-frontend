import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isAddressSelected } from '../../../../app/form/validation';

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
      text: `Daethpwyd o hyd i ${addresses.length} o gyfeiriad${addresses?.length !== 1 ? 'au' : ''}`,
      selected: true,
    },
  ];

  options.push(...getAddressItems(addresses));

  return {
    postcode: 'Cod post cyfredol',
    selectAddress: 'Dewiswch gyfeiriad',
    cannotFindAddress: 'Ni allaf ddod o hyd i’r cyfeiriad yn y rhestr',
    enterAddressManually: 'Neu theipiwch y cyfeiriad',
    options,
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

export const form = (caseData: Partial<C100RebuildPartyDetails>): FormContent => {
  const { selectedAddress } = caseData.address ?? {};
  return {
    fields: {
      selectAddress: {
        type: 'select',
        label: l => l.selectAddress,
        labelSize: null,
        validator: isAddressSelected,
        value: selectedAddress,
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
