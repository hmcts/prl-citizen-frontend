// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { generateContent as commonContent } from '../content';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Safety concerns',
  title: 'Provide details of the children’s passports',
  childrenMoreThanOnePassport: 'Do the children have more than one passport?',
  possessionChildrenPassport: 'Who is in possession of the children’s passports?',
  select_all_relevant: 'Select all that apply',
  one: 'Yes',
  two: 'No',
  option1: 'Mother',
  option2: 'Father',
  option3: 'Other',
  otherDetails: 'Provide more details',
  errors: {
    c1A_childrenMoreThanOnePassport: {
      required: 'Select yes if the children have more than one passport',
    },
    c1A_possessionChildrenPassport: {
      required: "Specify who is in possession of the children's passports",
    },
    c1A_provideOtherDetails: {
      required: 'Please provide the details',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Safety concerns - welsh',
  title: 'Provide details of the children’s passports - welsh',
  childrenMoreThanOnePassport: 'Do the children have more than one passport? - welsh',
  possessionChildrenPassport: 'Who is in possession of the children’s passports? - welsh',
  select_all_relevant: 'Select all that apply - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  option1: 'Mother - welsh',
  option2: 'Father - welsh',
  option3: 'Other - welsh',
  otherDetails: 'Provide more details - welsh',
  errors: {
    c1A_childrenMoreThanOnePassport: {
      required: 'Select yes if the children have more than one passport - welsh',
    },
    c1A_possessionChildrenPassport: {
      required: "Specify who is in possession of the children's passports - welsh",
    },
    c1A_provideOtherDetails: {
      required: 'Please provide the details - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_childrenMoreThanOnePassport: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childrenMoreThanOnePassport,
      labelSize: 'm',
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
    c1A_possessionChildrenPassport: {
      id: 'PRL_c1A_possessionChildrenPassport',
      type: 'checkboxes',
      label: l => l.possessionChildrenPassport,
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option1,
          value: 'Mother',
        },
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option2,
          value: 'Father',
        },
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option3,
          value: 'Other',
          subFields: {
            c1A_provideOtherDetails: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...commonContent(content),
    ...translations,
    form,
  };
};
