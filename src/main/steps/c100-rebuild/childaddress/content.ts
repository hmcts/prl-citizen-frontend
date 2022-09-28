import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  headingTitle: 'Where do the children live?',
  paragraph1: 'Please tell us the postcode of the children you’re making this application about.',
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application.`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living.`,
    iconFallbackText: 'Warning',
  },
  postcodeLabel: 'Postcode',
  detailsLabel: "Why we use the term 'children'",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition.`,
  errors: {
    postcode: {
      required: 'Enter a full postcode, with or without a space',
      invalid: 'Enter a valid full postcode, with or without a space',
    },
  },
});

const cy = () => ({
  headingTitle: 'Where do the children live? - welsh',
  paragraph1: `Please tell us the postcode of the children 
              you’re making this application about. - welsh`,
  paragraph2: `This information will be used to identify which court will handle your application.
                If the children have a different postcode, enter the one that is most 
                convenient to most children in the application. - welsh`,
  warningText: {
    text: `You should only enter your own postcode if the children live with you at the address,
          or you don't know where the children are living. - welsh`,
    iconFallbackText: 'Warning - welsh',
  },
  postcodeLabel: 'Postcode - welsh',
  detailsLabel: "Why we use the term 'children' - welsh",
  detailsContent: `We use ‘children’ as a general term to mean whether you have a child or children.
                   We do this to avoid repetition. - welsh`,
  errors: {
    postcode: {
      required: 'Enter a full postcode, with or without a space - welsh',
      invalid: 'Enter a valid full postcode, with or without a space - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    postcode: {
      id: 'postcode',
      type: 'text',
      classes: 'govuk-input--width-10',
      label: l => l.postcodeLabel,
      labelSize: null,
      section: l => l.section,
      validator: value => isFieldFilledIn(value) || isInvalidPostcode(value),
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
