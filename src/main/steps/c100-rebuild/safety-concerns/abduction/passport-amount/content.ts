/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: 'Darparu manylion pasbortau y plant',
  childrenMoreThanOnePassport: 'A oes gan y plant fwy nag un pasbort?',
  possessionChildrenPassport: "Ym meddiant pwy y mae pasbortau'r plant?",
  select_all_relevant: "Dewiswch bob un sy'n berthnasol",
  one: 'Oes',
  two: 'Nac oes',
  option1: 'Mam',
  option2: 'Tad',
  option3: 'Arall',
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
      id: 'c1A_possessionChildrenPassport',
      type: 'checkboxes',
      label: l => l.possessionChildrenPassport,
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_possessionChildrenPassport',
          label: l => l.option1,
          value: 'Mother',
        },
        {
          name: 'c1A_possessionChildrenPassport',
          label: l => l.option2,
          value: 'Father',
        },
        {
          name: 'c1A_possessionChildrenPassport',
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
    ...commonContent(content),
    ...translations,
    form,
  };
};
