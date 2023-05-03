import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help travelling to, or moving around court buildings',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  parkingspace: 'Parking space close to the venue',
  stepfree: 'Step free / wheelchair access',
  wheelchair: 'Use of venue wheelchair',
  toilet: 'Accessible toilet',
  lift: 'Help using a lift',
  differentchair: 'A different type of chair',
  building: 'Guiding in the building',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed.',
    },
    parkingDetails: {
      required: 'Please describe parking space details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed.',
    },
    differentChairDetails: {
      required: 'Please describe different chair details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed.',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help travelling to, or moving around court buildings',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  parkingspace: 'Parking space close to the venue',
  stepfree: 'Step free / wheelchair access',
  wheelchair: 'Use of venue wheelchair',
  toilet: 'Accessible toilet',
  lift: 'Help using a lift',
  differentchair: 'A different type of chair',
  building: 'Guiding in the building',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed. (welsh)',
    },
    parkingDetails: {
      required: 'Please describe parking space details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,[,] are not allowed. (welsh)',
    },
    differentChairDetails: {
      required: 'Please describe different chair details',
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
    travellingToCourt: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'travellingToCourt',
          label: l => l.parkingspace,
          value: 'parkingspace',
          subFields: {
            parkingDetails: {
              type: 'textarea',
              label: l => l.parkingSpaceDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'travellingToCourt',
          label: l => l.stepfree,
          value: 'stepfree',
        },
        {
          name: 'travellingToCourt',
          label: l => l.wheelchair,
          value: 'wheelchair',
        },
        {
          name: 'travellingToCourt',
          label: l => l.toilet,
          value: 'toilet',
        },
        {
          name: 'travellingToCourt',
          label: l => l.lift,
          value: 'lift',
        },
        {
          name: 'travellingToCourt',
          label: l => l.differentchair,
          value: 'differentchair',
          subFields: {
            differentChairDetails: {
              type: 'textarea',
              label: l => l.differentChairDetails,
              hint: l => l.differentChairDetailsHint,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'travellingToCourt',
          label: l => l.building,
          value: 'building',
        },
        {
          name: 'travellingToCourt',
          label: l => l.other,
          value: 'other',
          subFields: {
            travellingOtherDetails: {
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
          name: 'travellingToCourt',
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
