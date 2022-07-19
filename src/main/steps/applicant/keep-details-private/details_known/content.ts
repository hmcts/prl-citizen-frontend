import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Keeping your contact details private',
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    },
  },
};

const cy: typeof en = {
  section: 'Keeping your contact details private',
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
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
