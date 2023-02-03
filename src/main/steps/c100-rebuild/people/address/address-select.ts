import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isAddressSelected } from '../../../../app/form/validation';
import { getAddress } from '../../address-select-util';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = content => {
  return {
    postcode: 'Current postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    enterAddressManually: 'Or enter address manually',
    options: getAddress('en', content.addresses),
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cy = content => {
  return {
    postcode: 'Cod post cyfredol',
    selectAddress: 'Dewiswch gyfeiriad',
    cannotFindAddress: 'Ni allaf ddod o hyd i’r cyfeiriad yn y rhestr',
    enterAddressManually: 'Neu theipiwch y cyfeiriad',
    options: getAddress('cy', content.addresses),
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
