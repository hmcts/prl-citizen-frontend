import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Keeping your contact details private',
  title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  onlyContinue: 'Continue',
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
  threeHint: 'This is a 8 character code',
  summaryText: 'Cysylltiadau am gymorth',
  onlyContinue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
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
          value: 'yes',
        },
        {
          label: l => l.two,
          value: 'no',
        },
        {
          label: l => l.three,
          value: 'dontKnow',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
