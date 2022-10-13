import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do you want your legal representative to complete the application for you?',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_legalRepresentationApplication: {
      required: 'Select yes if you want your legal representative to complete this application',
    },
  },
});

const cy = () => ({
  title: 'Do you want your legal representative to complete the application for you? - welsh  ',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    c1A_legalRepresentationApplication: {
      required: 'Select yes if you want your legal representative to complete this application- welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_legalRepresentationApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
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
