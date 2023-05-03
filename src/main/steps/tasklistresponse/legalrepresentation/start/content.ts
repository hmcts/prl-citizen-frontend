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
  continue: 'Save and continue',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application',
    },
  },
  find: 'Find legal representation',
  legal: 'Find legal representation',
};

const cy: typeof en = {
  title: "A fyddwch yn defnyddio cynrychiolydd cyfreithiol i ymateb i'r cais?",
  insetText:
    "Gallwch ymateb i gais y ceisydd eich hun ac yna ailgyfeirio eich achos i'ch cynrychiolydd cyfreithiol am weddill yr achos.",
  one: 'Byddaf',
  two: 'Na fyddaf',
  continue: 'Save and continue -welsh',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application -welsh',
    },
  },
  find: 'Find legal representation -welsh',
  legal: 'Find legal representation -welsh',
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
