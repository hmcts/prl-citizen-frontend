import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';


const en = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  Name: 'Name',
  dateOfBirth: 'Date of birth',
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    }
  },
};

const cy: typeof en = {
  section: 'Application details',
  title: 'Enter your access details',
  Name: 'Name',
  dateOfBirth: 'Date of birth',
  continue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    }
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
        }
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
