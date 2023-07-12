import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Keeping your contact details private',
  title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    },
  },
};

const cy: typeof en = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
  one: 'Ydy',
  two: 'Nac ydy',
  three: 'Nid wyf yn gwybod',
  continue: 'Parhau',
  errors: {
    detailsKnown: {
      required: 'Rhowch eich manylion hysbys',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    detailsKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
        },
        {
          label: l => l.three,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
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
