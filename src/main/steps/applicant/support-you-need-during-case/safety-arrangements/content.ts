import { SafetyArrangemensEnum } from '../../../../app/case/definition';
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
          value: SafetyArrangemensEnum.waitingroom,
        },
        {
          name: 'safetyArrangements',
          label: l => l.separateexitentry,
          value: SafetyArrangemensEnum.separateexitentry,
        },
        {
          name: 'safetyArrangements',
          label: l => l.screens,
          hint: l => l.screenshint,
          value: SafetyArrangemensEnum.screens,
        },
        {
          name: 'safetyArrangements',
          label: l => l.toilet,
          value: SafetyArrangemensEnum.toilet,
        },
        {
          name: 'safetyArrangements',
          label: l => l.advancedview,
          value: SafetyArrangemensEnum.advancedview,
        },
        {
          name: 'safetyArrangements',
          label: l => l.videolinks,
          hint: l => l.videolinkshint,
          value: SafetyArrangemensEnum.videolinks,
        },
        {
          name: 'safetyArrangements',
          label: l => l.other,
          value: SafetyArrangemensEnum.other,
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
          value: SafetyArrangemensEnum.nosupport,
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
