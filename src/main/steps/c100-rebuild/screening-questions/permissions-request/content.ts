/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Explain why the court should grant you permission to submit this application',
  line: 'Give your answer in bullet points and short sentences. Explain your relationship to the children in the case and why you should be allowed to make the application.',
  errors: {
    sq_permissionsRequest: {
      required: 'Explain why the court should grant you permission to submit this application',
    },
  },
});

export const cy = () => ({
  title: "Esboniwch pam y dylai'r llys roi caniatâd i chi gyflwyno'r cais hwn",
  line: "Rhowch eich ateb mewn pwyntiau bwled a brawddegau byr. Esboniwch eich perthynas â'r plant yn yr achos a pham y dylech gael caniatâd i wneud y cais.",
  errors: {
    sq_permissionsRequest: {
      required: "Esboniwch pam y dylai'r llys roi caniatâd i chi gyflwyno'r cais hwn",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_permissionsRequest: {
      type: 'textarea',
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value),
    },
  },
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
