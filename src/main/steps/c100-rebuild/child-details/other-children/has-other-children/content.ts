import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    cd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
});

const cy = () => ({
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    cd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    cd_hasOtherChildren: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      hint: l => l.hint,
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
    },
  },

  submit: {
    text: l => l.onlyContinue,
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
