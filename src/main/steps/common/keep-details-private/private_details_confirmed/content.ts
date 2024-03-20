import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
console.info('** FOR SONAR **');
export const en = {
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private',
  address: 'Address',
  email: 'Email',
  phoneNumber: 'Phone Number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass Cymru unless it is by order of the court.',
  continue: 'Continue',
};

export const cy: typeof en = {
  title: 'Bydd y llys yn cadw eich manylion cyswllt yn breifat',
  line1: "Rydych wedi dweud wrthym eich bod eisiau cadw'r manylion cyswllt yma yn breifat",
  address: 'Cyfeiriad',
  email: 'E-bost',
  phoneNumber: 'Rhif ffôn',
  line2: 'Beth fydd y llys yn ei wneud',
  line3:
    'Bydd y llys yn cadw’r wybodaeth hon yn ddiogel. Bydd y manylion cyswllt hyn ond yn cael eu rhannu os bydd gorchymyn llys i wneud hynny.',
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
