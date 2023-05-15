import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { en as english, cy as welsh } from '../../../common/keep-details-private/private_details_confirmed/content';

const en = {
  ...english,
  section: 'Keeping your contact details private',
  title: 'The court will keep your contact details private',
  line1: 'You have told us you want to keep these contact details private:',
  address: 'Address',
  email: 'Email',
  phoneNumber: 'Telephone number',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Save and continue',
};

const cy: typeof en = {
  ...welsh,
  section: 'Cadw eich manylion cyswllt yn breifat',
  title: 'TBydd y llys yn cadw eich manylion cyswllt yn breifat',
  line1: 'Rydych wedi dweud wrthym eich bod eisiau cadw’r manylion cyswllt canlynol yn breifat:',
  address: 'Cyfeiriad',
  email: 'E-bost',
  phoneNumber: 'Rhif ffôn',
  line2: 'Beth fydd y llys yn ei wneud',
  line3:
    'Bydd y llys yn cadw’r wybodaeth hon yn ddiogel. Bydd y manylion cyswllt hyn ond yn cael eu rhannu os bydd gorchymyn llys i wneud hynny.',
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
