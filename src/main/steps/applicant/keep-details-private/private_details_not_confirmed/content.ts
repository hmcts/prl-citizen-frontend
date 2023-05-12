import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { en as english, cy as welsh } from '../../../common/keep-details-private/private_details_not_confirmed/content';

const en = {
  ...english,
  section: 'Keeping your contact details private',
  continue: 'Save and continue',
};

const cy = {
  ...welsh,
  section: 'Cadw eich manylion cyswllt yn breifat',
  continue: 'Cadw a pharhau',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
