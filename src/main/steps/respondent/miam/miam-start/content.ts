import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { miam_collapse_content } from './miam-details-content';


const en = {
  title: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  miamDetailsLabel: "What is a Mediation Information and Assessment Meeting (MIAM)?",
  miamSubFields: miam_collapse_content,
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    miamStart: {
      required: 'Enter your details known',
    }
  },
};

const cy: typeof en = {
  title: 'Enter your access details',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  miamDetailsLabel: "What is a Mediation Information and Assessment Meeting (MIAM)?",
  miamSubFields:"Testing subfields",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    miamStart: {
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
      miamDetails:{
        type: 'detailsHtml',
        label: l => l.miamDetailsLabel,
        detailsHtml: l => l.miamSubFields,
      },
      miamStart: {
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
