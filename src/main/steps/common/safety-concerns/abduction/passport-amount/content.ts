/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { YesOrNo, passportPossessionRelative } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';
import { generateContent as parentContent } from '../content';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { C100_URL } from '../../../../../steps/urls';

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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
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
  otherDetails: 'Darparwch fwy o fanylion',
  errors: {
    c1A_childrenMoreThanOnePassport: {
      required: 'Dewis oes os oes gan y plant fwy nag un pasbort',
    },
    c1A_possessionChildrenPassport: {
      required: "Nodwch ym meddiant pwy y mae pasbortau'r plant? ",
    },
    c1A_provideOtherDetails: {
      required: 'Darparwch fwy o fanylion',
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
  fields:(userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL)
    return  {
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
          value: C100rebuildJourney?'Mother':passportPossessionRelative.MOTHER,
        },
        {
          name: 'c1A_possessionChildrenPassport',
          label: l => l.option2,
          value: C100rebuildJourney?'Father':passportPossessionRelative.FATHER,
        },
        {
          name: 'c1A_possessionChildrenPassport',
          label: l => l.option3,
          value: C100rebuildJourney?'Other':passportPossessionRelative.OTHER,
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
  }},
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form,parentContent);
};
