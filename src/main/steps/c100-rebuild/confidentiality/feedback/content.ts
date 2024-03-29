import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will keep your contact details private',
  p1: 'You have told us you want to keep these contact details private',
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass Cymru unless it is by order of the court.',
  address: 'Address',
  homePhone: 'Home phone',
  mobilePhone: 'Mobile phone',
  email: 'Email',
});

const cy = () => ({
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  headingTitle: 'Bydd y llys yn cadw eich manylion cyswllt yn breifat ar gyfer.',
  p1: "Rydych wedi dweud wrthym eich bod eisiau cadw'r manylion cyswllt yma yn breifat:",
  heading3: 'Beth fydd y llys yn ei wneud',
  p2: "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass (Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd) neu Cafcass Cymru oni bai ei fod trwy orchymyn y llys.",
  address: 'Cyfeiriad',
  homePhone: 'Home phone -welsh',
  mobilePhone: 'Mobile phone -welsh',
  email: 'E-bost',
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
