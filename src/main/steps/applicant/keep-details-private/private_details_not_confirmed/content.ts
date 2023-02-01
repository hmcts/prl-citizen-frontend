import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Keeping your contact details private',
  title: 'The court will not keep your contact details private',
  line1:
    'You have told us you do not want to keep your contact details private from the other people in this application.',
  continue: 'Save and continue',
};

const cy: typeof en = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat',
  line1:
    'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn a wnaeth gais i’r llys (y ceisydd).',
  continue: 'Save and continue',
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
