import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
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
  legal: 'Do you need legal aid?',
};

const cy: typeof en = {
  title: "A fyddwch yn defnyddio cynrychiolydd cyfreithiol i ymateb i'r cais?",
  insetText:
    "Gallwch ymateb i gais y ceisydd eich hun ac yna ailgyfeirio eich achos i'ch cynrychiolydd cyfreithiol am weddill yr achos.",
  one: 'Byddaf',
  two: 'Na fyddaf',
  continue: 'Cadw a pharhau',
  errors: {
    legalRepresentation: {
      required: 'Dewiswch ydw os ydych chi’n defnyddio cynrychiolydd cyfreithiol i ymateb i’r cais',
    },
  },
  find: 'Dod o hyd i gynrychiolydd cyfreithiol',
  legal: 'A oes arnoch chi angen cymorth cyfreithiol?',
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
