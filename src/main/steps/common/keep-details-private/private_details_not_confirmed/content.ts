import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

export const en = {
  title: 'The court will not keep your contact details private',
  section: 'Keeping your contact details private',
  line1:
    'You have told us you do not want to keep your contact details private from the other people in this application.',
  [PartyType.APPLICANT]: {
    continue: 'Save and continue',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Continue',
  },
};

export const cy: typeof en = {
  title: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat',
  section: 'Cadw eich manylion cyswllt yn breifat',
  line1:
    'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn a wnaeth gais i’r llys (y ceisydd). ',
  [PartyType.APPLICANT]: {
    continue: 'Cadw a pharhau',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Parhau',
  },
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
    ...translations[getCasePartyType(content.userCase!, content.userIdamId!)],
    form,
  };
};
