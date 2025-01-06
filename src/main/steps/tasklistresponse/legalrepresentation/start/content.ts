import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
const en = {
  title: 'Will you be using a legal representative to respond to the application?',
  content:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  yes: 'Yes',
  no: 'No',
  findLegalRep: 'Find legal representation',
  needLegalAid: 'Do you need legal aid?',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application',
    },
  },
};

const cy: typeof en = {
  title: "A fyddwch yn defnyddio cynrychiolydd cyfreithiol i ymateb i'r cais?",
  content:
    "Gallwch ymateb i gais y ceisydd eich hun ac yna ailgyfeirio eich achos i'ch cynrychiolydd cyfreithiol am weddill yr achos.",
  yes: 'Byddaf',
  no: 'Na fyddaf',
  findLegalRep: 'Dod o hyd i gynrychiolydd cyfreithiol',
  needLegalAid: 'A oes arnoch chi angen cymorth cyfreithiol?',
  errors: {
    legalRepresentation: {
      required: 'Dewiswch ydw os ydych chi’n defnyddio cynrychiolydd cyfreithiol i ymateb i’r cais',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    content: {
      type: 'inset',
      label: l => l.content,
    },
    legalRepresentation: {
      type: 'radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
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
