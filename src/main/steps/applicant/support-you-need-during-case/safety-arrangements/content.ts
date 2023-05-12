import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Safety requirements',
  title: 'Do you or the children need special safety arrangements at court?',
  courtcommunication:
    'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingroom: 'Separate waiting room',
  separateexitentry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screenshint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Video links',
  videolinkshint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Safety requirements',
  title: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
  courtcommunication:
    'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  waitingroom: 'Ystafell aros ar wahân',
  separateexitentry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screenshint: 'Mae angen i farnwr gymeradwyo hyn',
  toilet: 'Toiledau ar wahân',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Cyswllt fideo',
  videolinkshint: 'Mae angen i farnwr gymeradwyo hyn',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
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
          label: l => l.waitingroom,
          value: 'waitingroom',
        },
        {
          name: 'safetyArrangements',
          label: l => l.separateexitentry,
          value: 'separateexitentry',
        },
        {
          name: 'safetyArrangements',
          label: l => l.screens,
          hint: l => l.screenshint,
          value: 'screens',
        },
        {
          name: 'safetyArrangements',
          label: l => l.toilet,
          value: 'separatetoilets',
        },
        {
          name: 'safetyArrangements',
          label: l => l.advancedview,
          value: 'advancedview',
        },
        {
          name: 'safetyArrangements',
          label: l => l.videolinks,
          hint: l => l.videolinkshint,
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
          divider: true,
        },
        {
          name: 'safetyArrangements',
          label: l => l.nosupport,
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
