import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'You do not have to attend a MIAM',
  safetyConcerns:
    'As there are (or have been) safety concerns about the children, you do not have to attend a Mediation Information and Assessment Meeting (MIAM).',
  giveDetails: 'You will be asked to give details of the proceedings in the following screens.',
});

const cy = () => ({
  pageTitle: 'You do not have to attend a MIAM - welsh  ',
  safetyConcerns:
    'As there are (or have been) safety concerns about the children, you do not have to attend a Mediation Information and Assessment Meeting (MIAM). - welsh  ',
  giveDetails: 'You will be asked to give details of the proceedings in the following screens. - welsh  ',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
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
