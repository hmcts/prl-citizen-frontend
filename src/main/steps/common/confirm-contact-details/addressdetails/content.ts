import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

console.info('** FOR SONAR **');

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
  content.userCase!.citizenUserAddressText = content.userCase?.citizenUserAddressText?.includes('<br/>')
    ? content.userCase.citizenUserAddressText.split('<br/>')[0]
    : content.userCase?.citizenUserAddressText;
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
