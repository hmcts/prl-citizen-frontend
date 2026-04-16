/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
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
  separateWaitingRoom: 'a separate waiting room in the court building',
  separateExitEntrance: 'a separate entrance and exit from the court building',
  screenWithOtherPeople:
    'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge',
  videoLinks:
    "to join the hearing by video link rather than in person (it is the judge's decision whether to allow a hearing by video link).",
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  courtGuidanceText: 'Court staff may get in touch with you about the requirements',
  errors: {
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
  separateWaitingRoom: 'ystafell aros ar wahân yn yr adeilad llys',
  separateExitEntrance: 'mynedfa ac allanfa ar wahân o’r adeilad llys',
  screenWithOtherPeople:
    'cael eich cysgodi gan sgrin breifatrwydd yn ystafell y llys (byddai sgrin breifatrwydd yn golygu na fyddai’r atebydd yn gallu eich gweld tra byddech yn yr ystafell llys).',
  screenWithOtherPeopleHint: 'Mae angen i farnwr gymeradwyo hyn',
  videoLinks:
    'ymuno â’r gwrandawiad drwy gyswllt fideo yn hytrach na bod yno wyneb yn wyneb (penderfyniad y barnwr yw p’un a ddylid caniatáu gwrandawiad drwy gyswllt fideo ai peidio).',
  noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
  courtGuidanceText: 'Efallai y bydd staff y llys yn cysylltu â chi ynghylch eich gofynion.',
  errors: {
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
        label: l => l.headingTitle,
        labelHidden: true,
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
            label: l => l.videoLinks,
            value: isC100Journey ? 'videoLinks' : 'videolinks',
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
      ra_specialArrangementsCourtGuidanceText: {
        type: 'label',
        classes: 'govuk-!-margin-bottom-6 govuk-!-font-weight-bold',
        label: l => l.courtGuidanceText,
        labelSize: 'm',
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
