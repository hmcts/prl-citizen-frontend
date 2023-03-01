import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { en as english, cy as welsh } from '../../../common/keep-details-private/private_details_confirmed/content';

const en = {
  ...english,
  section: 'Keeping your contact details private',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Save and continue',
};

const cy: typeof en = {
  ...welsh,
  section: 'Keeping your contact details private',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Save and continue',
};

const languages = {
  en,
  cy,
};

export const formWithFields: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form: formWithFields,
  };
};
