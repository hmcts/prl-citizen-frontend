import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  caption: 'Safety concerns',
  title: 'Have the children been abducted or kept outside the UK without your consent before?',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_childAbductedBefore: {
      required: 'Select yes if the children have been abducted or kept outside the UK without your consent before',
    },
  },
});

const cy = () => ({
  caption: 'Safety concerns - welsh',
  title: 'Have the children been abducted or kept outside the UK without your consent before? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    c1A_childAbductedBefore: {
      required:
        'Select yes if the children have been abducted or kept outside the UK without your consent before - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_childAbductedBefore: {
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
