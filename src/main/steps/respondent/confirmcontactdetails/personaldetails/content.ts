import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  title: 'Your name and date of birth',
  firstName: 'Your first name',
  lastName: 'Your last name',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Enter Your first name',
    },
    accessCode: {
      required: 'Enter Your last name',
    },
  },
};

const cy: typeof en = {
  title: 'Eich enw a dyddiad geni',
  firstName: 'Eich enw cyntaf',
  lastName: 'Eich enw olaf',  
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    caseCode: {
      required: 'Rhowch Eich enw cyntaf',
    },
    accessCode: {
      required: 'Rhowch Eich Enw Diwethaf',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    firstName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.firstName,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
    lastName: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.lastName,
      labelSize: null,
      validator: value => isFieldFilledIn(value),
    },
  },
  accessCodeCheck: {
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
