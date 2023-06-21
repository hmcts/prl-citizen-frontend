import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Special arrangements',
  title: 'Do you or the children need special arrangements at court?',
  courtcommunication:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingRoom: 'Separate waiting room',
  separateExitEntry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screensHint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  visitToCourt: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Provide details of what you or the children need',
  noSupport: 'No, I do not have any safety requirements at this time',
  continue: 'Continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Trefniadau arbennig',
  title: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau arbennig?',
  courtcommunication:
    "Efallai y bydd angen trefniadau penodol arnoch chi neu'r plant pan fyddwch chi'n dod i'r llys. Rhaid i rai o’r addasiadau hyn gael eu cytuno gan farnwr neu GLlTEM. Os yw eich anghenion yn newid, gallwch drafod hyn gyda'r llys.",
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  waitingRoom: 'Ystafell aros ar wahân',
  separateExitEntry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screensHint: 'Mae angen i farnwr gymeradwyo hyn',
  toilet: 'Toiledau ar wahân',
  visitToCourt: "Ymweld â'r llys cyn y gwrandawiad",
  videoLinks: 'Cyswllt fideo',
  videoLinksHint: 'Mae angen i farnwr gymeradwyo hyn',
  other: 'Arall',
  otherDetails: 'Darparwch fanylion am yr hyn rydych chi neu’r plant ei angen',
  noSupport: 'Nac oes, nid oes gennyf unrhyw ofynion o ran diogelwch ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Disgrifiwch eich anghenion yn fanwl',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    safetyArrangements: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'safetyArrangements',
          label: l => l.waitingRoom,
          value: 'waitingroom',
        },
        {
          name: 'safetyArrangements',
          label: l => l.separateExitEntry,
          value: 'separateexitentry',
        },
        {
          name: 'safetyArrangements',
          label: l => l.screens,
          hint: l => l.screensHint,
          value: 'screens',
        },
        {
          name: 'safetyArrangements',
          label: l => l.toilet,
          value: 'separatetoilets',
        },
        {
          name: 'safetyArrangements',
          label: l => l.visitToCourt,
          value: 'visitToCourt',
        },
        {
          name: 'safetyArrangements',
          label: l => l.videoLinks,
          hint: l => l.videoLinksHint,
          value: 'videolinks',
        },
        {
          name: 'safetyArrangements',
          label: l => l.other,
          value: 'other',
          subFields: {
            safetyArrangementsDetails: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'safetyArrangements',
          label: l => l.noSupport,
          value: 'noSafetyrequirements',
          exclusive: true,
        },
      ],
      validator: atLeastOneFieldIsChecked,
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
