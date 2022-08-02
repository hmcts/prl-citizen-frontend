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
  continue: 'Save and continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
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
  continue: 'Save and continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    travellingOtherDetails: {
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
    travellingToCourt: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'travellingToCourt',
          label: l => l.parkingspace,
          value: 'parking space close to the venue',
        },
        {
          name: 'travellingToCourt',
          label: l => l.stepfree,
          value: 'step free / wheelchair access',
        },
        {
          name: 'travellingToCourt',
          label: l => l.wheelchair,
          value: 'use of venue wheelchair',
        },
        {
          name: 'travellingToCourt',
          label: l => l.toilet,
          value: 'accessible toilet',
        },
        {
          name: 'travellingToCourt',
          label: l => l.lift,
          value: 'help using a lift',
        },
        {
          name: 'travellingToCourt',
          label: l => l.differentchair,
          value: 'a different type of chair',
        },
        {
          name: 'travellingToCourt',
          label: l => l.building,
          value: 'guiding in the building',
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
          value: 'no need of support',
          exclusive: true,
        },
      ],
      validator: atLeastOneFieldIsChecked,
    },
  },
  submit: {
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
