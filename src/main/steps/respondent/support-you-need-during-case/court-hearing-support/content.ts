import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  supportWorkerDetails: 'Tell us who you will bring',
  familymember: 'A friend or family member',
  familyMemberDetails: 'Tell us who you will bring',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  animalDetails: 'Describe what you need',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    respondentCourtHearing: {
      required: 'Please select an answer',
    },
    respondentSupportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    respondentFamilyDetails: {
      required: 'Please provide family member details',
    },
    respondentTherapyDetails: {
      required: 'Please provide therapy animal details',
    },
    respondentCommSupportOther: {
      required: 'Please provide the details',
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
  supportWorkerDetails: 'Tell us who you will bring',
  familymember: 'A friend or family member',
  familyMemberDetails: 'Tell us who you will bring',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  animalDetails: 'Describe what you need',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    respondentCourtHearing: {
      required: 'Please select an answer',
    },
    respondentSupportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    respondentFamilyDetails: {
      required: 'Please provide family member details',
    },
    respondentTherapyDetails: {
      required: 'Please provide therapy animal details',
    },
    respondentCommSupportOther: {
      required: 'Please provide the details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentCourtHearing: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'respondentCourtHearing',
          label: l => l.supportworker,
          value: 'support worker or carer',
          subFields: {
            respondentSupportWorkerDetails: {
              type: 'textarea',
              label: l => l.supportWorkerDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentCourtHearing',
          label: l => l.familymember,
          value: 'friend or family member',
          subFields: {
            respondentFamilyDetails: {
              type: 'textarea',
              label: l => l.familyMemberDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentCourtHearing',
          label: l => l.assistance,
          value: 'assistance',
        },
        {
          name: 'respondentCourtHearing',
          label: l => l.animal,
          value: 'animal',
          subFields: {
            respondentTherapyDetails: {
              type: 'textarea',
              label: l => l.animalDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentCourtHearing',
          label: l => l.other,
          value: 'other',
          subFields: {
            respondentCommSupportOther: {
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
          name: 'respondentCourtHearing',
          label: l => l.nosupport,
          value: 'no need of support',
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
