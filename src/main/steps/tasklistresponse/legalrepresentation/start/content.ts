//import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  title: 'Will you be using a legal representative to respond to the application?',
  insetText:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    legalRepresentation: {
      required: 'Enter your answer',
    },
  },
};

const cy: typeof en = {
  title: 'Will you be using a legal representative to respond to the application?',
  insetText:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    legalRepresentation: {
      required: 'Enter your answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
