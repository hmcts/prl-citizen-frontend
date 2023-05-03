import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    lightingProvideDetails: {
      required: 'Please describe lighting detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed.',
    },
    otherProvideDetails: {
      required: 'Please describe your need in details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed.',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    lightingProvideDetails: {
      required: 'Please describe lighting detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed. (welsh)',
    },
    otherProvideDetails: {
      required: 'Please describe your need in details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed. (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtComfort: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'courtComfort',
          label: l => l.appropriatelighting,
          value: 'appropriatelighting',
          subFields: {
            lightingProvideDetails: {
              type: 'textarea',
              attributes: {
                rows: 1,
              },
              label: l => l.lightingDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'courtComfort',
          label: l => l.break,
          value: 'breaks',
        },
        {
          name: 'courtComfort',
          label: l => l.space,
          value: 'space',
        },
        {
          name: 'courtComfort',
          label: l => l.other,
          value: 'other',
          subFields: {
            otherProvideDetails: {
              type: 'textarea',
              attributes: {
                rows: 2,
              },
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
          name: 'courtComfort',
          label: l => l.nosupport,
          value: 'nosupport',
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
