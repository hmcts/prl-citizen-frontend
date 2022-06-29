import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courthearing: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courthearing: {
      required: 'Please select an answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courthearing: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'courthearing',
          label: l => l.supportworker,
          value: 'support worker or carer',
        },
        {
          name: 'courthearing',
          label: l => l.familymember,
          value: 'friend or family member',
        },
        {
          name: 'courthearing',
          label: l => l.assistance,
          value: 'assistance',
        },
        {
          name: 'courthearing',
          label: l => l.animal,
          value: 'animal',
        },
        {
          name: 'courthearing',
          label: l => l.other,
          value: 'other',
        },
        {
          divider: 'or',
        },
        {
          name: 'courthearing',
          label: l => l.nosupport,
          value: 'no need of support',
          behaviour: 'exclusive',
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
