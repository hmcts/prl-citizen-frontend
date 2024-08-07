/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { C100_URL } from '../../../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court',
    },
  },
});

export const cy = () => ({
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
  specialArrangementsOther_subfield: 'Darparwch fanylion am yr hyn rydych chi neu’r plant ei angen',
  noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
  errors: {
    ra_specialArrangementsOther_subfield: {
      required: "Rhowch fanylion y trefniadau arbennig sydd eu hangen arnoch chi neu'r plant",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_specialArrangements: {
      required: "Dewiswch p'un a oes angen trefniadau arbennig arnoch chi neu'r plant yn y llys",
    },
  },
});

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const isC100Journey = req.originalUrl.startsWith(C100_URL);

    return {
      ra_specialArrangements: {
        id: 'ra_specialArrangements',
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: value => atLeastOneFieldIsChecked(value),
        values: [
          {
            name: 'ra_specialArrangements',
            label: l => l.separateWaitingRoom,
            value: isC100Journey ? 'separateWaitingRoom' : 'waitingroom',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.separateExitEntrance,
            value: isC100Journey ? 'separateExitEntrance' : 'separateexitentry',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.screenWithOtherPeople,
            hint: l => l.screenWithOtherPeopleHint,
            value: isC100Journey ? 'screenWithOtherPeople' : 'screens',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.separateToilets,
            value: isC100Journey ? 'separateToilets' : 'separatetoilets',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.visitCourtBeforeHearing,
            value: isC100Journey ? 'visitCourtBeforeHearing' : 'visitToCourt',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.videoLinks,
            hint: l => l.videoLinksHint,
            value: isC100Journey ? 'videoLinks' : 'videolinks',
          },
          {
            name: 'ra_specialArrangements',
            label: l => l.specialArrangementsOther,
            value: isC100Journey ? 'specialArrangementsOther' : 'other',
            subFields: {
              ra_specialArrangementsOther_subfield: {
                type: 'textarea',
                label: l => l.specialArrangementsOther_subfield,
                labelSize: null,
                attributes: {
                  rows: 3,
                },
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
            value: isC100Journey ? 'noSafetyRequirements' : 'noSafetyrequirements',
            exclusive: true,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return RAProvider.utils.generateContentForLocalComponent(content, languages, form);
};
