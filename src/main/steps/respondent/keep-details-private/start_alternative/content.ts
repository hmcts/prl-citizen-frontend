import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';


const en = {
  section: 'Keeping your contact details private',
  title: 'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  line1: "The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.",
  line2: 'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    }
  },
};

const cy: typeof en = {
  section: 'Keeping your contact details private',
  title: 'Do you want to keep your contact details private from the other people named in the application (the applicants)?',
  line1: "The answers you give in your response will be shared with the other people named in this application (the applicants). This will include your contact details.",
  line2: 'For example, if you believe the other people in the case pose a risk to you or the children, you can ask the court to keep your contact details private.',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    startAlternative: {
      required: 'Enter your start alternative',
    }
  },
};
const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    startAlternative: {
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
