import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will not keep your contact details private',
  p1: 'You have told us you do not want to keep your contact details private from the other people in this application.',
});

const cy = () => ({
  caption: 'Cadw eich manylion cyswllt yn breifat',
  headingTitle: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat',
  p1: 'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill yn y cais hwn.',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
