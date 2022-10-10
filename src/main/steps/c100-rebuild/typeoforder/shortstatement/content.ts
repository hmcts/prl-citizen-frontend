import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Describe what you want the court to do regarding the children in this application',
  subHeading: 'Summarise what you want the court to do. Give your answer in bullet points and short paragraphs.',
  setOut: 'You should set out:',
  listOfsetOut: [
    'any previous parenting plans between you and the other people in the case',
    'what happened in the previous agreements, and if they broke down',
    'why you are bringing this matter to the court',
    'what you would like the court to do',
  ],
  errors: {
    too_shortStatement: {
      required: 'Describe what you want the court to do regarding the children in this application',
    },
  },
});

const cy = () => ({
  title: 'Describe what you want the court to do regarding the children in this application - welsh',
  subHeading:
    'Summarise what you want the court to do. Give your answer in bullet points and short paragraphs. - welsh',
  setOut: 'You should set out: - welsh',
  listOfsetOut: [
    'any previous parenting plans between you and the other people in the case - welsh',
    'what happened in the previous agreements, and if they broke down - welsh',
    'why you are bringing this matter to the court - welsh',
    'what you would like the court to do - welsh',
  ],
  errors: {
    too_shortStatement: {
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
    too_shortStatement: {
      type: 'textarea',
      //label: l => l.shortStatement,
      //value : data.shortStatement ,
      //labelSize: null,
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
