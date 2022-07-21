import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'Do the other people named in this application (the respondents) know any of your contact details?    ',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  errors: {
    detailsKnown: {
      required: 'Select yes if the other people in the application know your contact details',
    },
  },
});

const cy = () => ({
  caption: 'Keeping your contact details private  - welsh',
  headingTitle:
    'Do the other people named in this application (the respondents) know any of your contact details? - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "I don't know - Welsh",
  errors: {
    detailsKnown: {
      required: 'Select yes if the other people in the application know your contact details - welsh',
    },
  },
});

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
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
        {
          label: l => l.three,
          value: 'I dont know',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
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
