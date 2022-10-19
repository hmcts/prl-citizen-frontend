import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Explain why the court should grant you permission to submit this application',
  line: 'Give your answer in bullet points and short sentences. Explain your relationship to the children in the case and why you should be allowed to make the application.',
  errors: {
    sq_permissionsRequest: {
      required: 'Explain why the court should grant you permission to submit this application',
    },
  },
});

const cy = () => ({
  title: 'Explain why the court should grant you permission to submit this application - welsh',
  line: 'Give your answer in bullet points and short sentences. Explain your relationship to the children in the case and why you should be allowed to make the application. - welsh',
  errors: {
    sq_permissionsRequest: {
      required: 'Describe what you want the court to do regarding the children in this application - welsh',
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
