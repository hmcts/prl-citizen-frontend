import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
console.info('** FOR SONAR **');
export const en = {
  title: 'The court will not keep your contact details private',
  line1:
    'You have told us you do not want to keep your contact details private from the other people in this application.',
  continue: 'Continue',
};

export const cy: typeof en = {
  title: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat',
  line1:
    'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn a wnaeth gais i’r llys (y ceisydd). ',
  continue: 'Parhau',
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
