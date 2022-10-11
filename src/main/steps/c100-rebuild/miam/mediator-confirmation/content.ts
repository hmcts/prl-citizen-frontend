import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Has a mediator confirmed that you do not need to attend a MIAM?',
  one: 'Yes',
  two: 'No',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM?',
    },
  },
});

const cy = () => ({
  title: 'Has a mediator confirmed that you do not need to attend a MIAM? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM? - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_mediatorDocument: {
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
