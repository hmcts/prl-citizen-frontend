import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';

const en = {
  title: 'Review the address of {name}',
  citizenUserAddressText: 'address',
  continue: 'Save and continue',
  editAddress: 'Edit Address',
  errors: {},
};

const cy: typeof en = {
  title: 'Adolygu cyfeiriad {name}',
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
    citizenUserAddressText: content.userCase?.citizenUserAddressText,
    title: interpolate(translations.title, { name: content.userCase!.citizenUserFullName! }),
    form,
  };
};
