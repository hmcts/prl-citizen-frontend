import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Your address',
  citizenUserAddressText: 'address',
  continue: 'Save and continue',
  editAddress: 'Edit Address',
  errors: {},
};

const cy: typeof en = {
  title: 'Eich cyfeiriad',
  citizenUserAddressText: 'cyfeiriad',
  continue: 'Arbed a pharhau',
  editAddress: 'Golygu Cyfeiriad',
  errors: {},
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    citizenUserAddressText: {
      type: 'label',
      label: l => l.citizenUserAddressText,
      labelSize: 'm',
    },
  },
  submit: {
    text: l => l.continue,
  },
  editAddress: {
    text: l => l.editAddress,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
