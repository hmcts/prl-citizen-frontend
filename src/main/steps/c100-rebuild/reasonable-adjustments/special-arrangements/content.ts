/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
  specialArrangementsOther_subfield: 'Provide details of what you or the children need',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  errors: {
    ra_specialArrangementsOther_subfield: {
      required: 'Give details of the special arrangements you or the children need',
    },
    ra_specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Trefniadau arbennig',
  headingTitle: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
  line1:
    "Efallai y bydd angen trefniadau penodol arnoch chi neu'r plant pan fyddwch chi'n dod i'r llys. Rhaid i rai o’r addasiadau hyn gael eu cymeradwyo gan farnwr neu GLlTEF. Os yw eich anghenion yn newid, gallwch drafod hyn gyda'r llys.",
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  separateWaitingRoom: 'Ystafell aros ar wahân',
  separateExitEntrance: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screenWithOtherPeople: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screenWithOtherPeopleHint: 'Mae angen i farnwr gymeradwyo hyn',
  separateToilets: 'Toiledau ar wahân',
  visitCourtBeforeHearing: "Ymweld â'r llys cyn y gwrandawiad",
  videoLinks: 'Cyswllt fideo',
  videoLinksHint: 'Mae angen i farnwr gymeradwyo hyn',
  specialArrangementsOther: 'Arall',
  specialArrangementsOther_subfield: "Dewiswch bob un sy'n berthnasol i chi",
  noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
  errors: {
    ra_specialArrangementsOther_subfield: {
      required: "Rhowch fanylion y trefniadau arbennig sydd eu hangen arnoch chi neu'r plant",
    },
    ra_specialArrangements: {
      required: "Dewiswch p'un a oes angen trefniadau arbennig arnoch chi neu'r plant yn y llys",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_specialArrangements: {
      id: 'ra_specialArrangements',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_specialArrangements',
          label: l => l.separateWaitingRoom,
          value: 'separateWaitingRoom',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.separateExitEntrance,
          value: 'separateExitEntrance',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.screenWithOtherPeople,
          hint: l => l.screenWithOtherPeopleHint,
          value: 'screenWithOtherPeople',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.separateToilets,
          value: 'separateToilets',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.visitCourtBeforeHearing,
          value: 'visitCourtBeforeHearing',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.videoLinks,
          hint: l => l.videoLinksHint,
          value: 'videoLinks',
        },
        {
          name: 'ra_specialArrangements',
          label: l => l.specialArrangementsOther,
          value: 'specialArrangementsOther',
          subFields: {
            ra_specialArrangementsOther_subfield: {
              type: 'textarea',
              label: l => l.specialArrangementsOther_subfield,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'ra_specialArrangements',
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
