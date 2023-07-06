// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo, passportPossessionRelative } from '../../../../../app/case/definition';
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
    PRL_c1A_childrenMoreThanOnePassport: {
      required: 'Select yes if the children have more than one passport',
    },
    PRL_c1A_possessionChildrenPassport: {
      required: "Specify who is in possession of the children's passports",
    },
    PRL_c1A_provideOtherDetails: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
  otherDetails: 'Darparwch fwy o fanylion',
  errors: {
    PRL_c1A_childrenMoreThanOnePassport: {
      required: 'Dewiswch oes os oes gan y plant fwy nag un pasbort',
    },
    PRL_c1A_possessionChildrenPassport: {
      required: "Nodwch ym meddiant pwy y mae pasbortau'r plant",
    },
    PRL_c1A_provideOtherDetails: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_childrenMoreThanOnePassport: {
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
    PRL_c1A_possessionChildrenPassport: {
      id: 'PRL_c1A_possessionChildrenPassport',
      type: 'checkboxes',
      label: l => l.possessionChildrenPassport,
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option1,
          value: passportPossessionRelative.MOTHER,
        },
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option2,
          value: passportPossessionRelative.FATHER,
        },
        {
          name: 'PRL_c1A_possessionChildrenPassport',
          label: l => l.option3,
          value: passportPossessionRelative.OTHER,
          subFields: {
            PRL_c1A_provideOtherDetails: {
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
