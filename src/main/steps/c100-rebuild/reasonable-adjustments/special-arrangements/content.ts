import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Special arrangements',
  headingTitle: 'Do you or the children need special arrangements at court?',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  select_all_apply: 'Select all that apply to you',
  separateWaitingRoom: 'Separate waiting room',
  separateExitEntrance: 'Separate exits and entrances',
  screenWithOtherPeople: 'Screens so you and the other people in the case cannot see each other',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge',
  separateToilets: 'Separate toilets',
  visitCourtBeforeHearing: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  specialArrangementsOther: 'Other',
  specialArrangementsOtherSubField: 'Provide details of what you or the children need',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  errors: {
    specialArrangementsOtherSubField: {
      required: 'Give details of the special arrangements you or the children need',
    },
    specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Special arrangements - welsh',
  headingTitle: 'Do you or the children need special arrangements at court? - welsh',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court. - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  separateWaitingRoom: 'Separate waiting room - welsh',
  separateExitEntrance: 'Separate exits and entrances - welsh',
  screenWithOtherPeople: 'Screens so you and the other people in the case cannot see each other - welsh',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge - welsh',
  separateToilets: 'Separate toilets - welsh',
  visitCourtBeforeHearing: 'Visit to court before the hearing - welsh',
  videoLinks: 'Video links - welsh',
  videoLinksHint: 'This needs to be approved by a judge - welsh',
  specialArrangementsOther: 'Other - welsh',
  specialArrangementsOtherSubField: 'Provide details of what you or the children need - welsh',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time - welsh',
  errors: {
    specialArrangementsOtherSubField: {
      required: 'Give details of the special arrangements you or the children need - welsh',
    },
    specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    specialArrangements: {
      id: 'specialArrangements',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'specialArrangements',
          label: l => l.separateWaitingRoom,
          value: 'separateWaitingRoom',
        },
        {
          name: 'specialArrangements',
          label: l => l.separateExitEntrance,
          value: 'separateExitEntrance',
        },
        {
          name: 'specialArrangements',
          label: l => l.screenWithOtherPeople,
          hint: l => l.screenWithOtherPeopleHint,
          value: 'screenWithOtherPeople',
        },
        {
          name: 'specialArrangements',
          label: l => l.separateToilets,
          value: 'separateToilets',
        },
        {
          name: 'specialArrangements',
          label: l => l.visitCourtBeforeHearing,
          value: 'visitCourtBeforeHearing',
        },
        {
          name: 'specialArrangements',
          label: l => l.videoLinks,
          hint: l => l.videoLinksHint,
          value: 'videoLinks',
        },
        {
          name: 'specialArrangements',
          label: l => l.specialArrangementsOther,
          value: 'specialArrangementsOther',
          subFields: {
            specialArrangementsOtherSubField: {
              type: 'textarea',
              label: l => l.specialArrangementsOtherSubField,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: 'or',
        },
        {
          name: 'specialArrangements',
          label: l => l.noSafetyRequirements,
          value: 'noSafetyRequirements',
          behaviour: 'exclusive',
        },
      ],
    },
  },
  onlycontinue: {
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
