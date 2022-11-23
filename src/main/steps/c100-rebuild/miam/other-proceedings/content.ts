/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export const en = () => ({
  title: 'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? ',
  localAuthority: 'These will usually involve a local authority.',
  one: 'Yes',
  two: 'No',
  errors: {
    miam_otherProceedings: {
      required:
        'Select yes if the children are involved in any emergency protection, care or supervision proceedings(or have been)',
    },
  },
});

export const cy = () => ({
  title:
    'Are the children involved in any emergency protection, care or supervision proceedings (or have they been)? - welsh  ',
  localAuthority: 'These will usually involve a local authority. - Welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    miam_otherProceedings: {
      required:
        'Select yes if the children are involved in any emergency protection, care or supervision proceedings(or have been) - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_otherProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      hint: l => l.localAuthority,
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
