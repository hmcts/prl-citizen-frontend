import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need to bring support with me to a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
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
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtHearing: {
      required: 'Select what help you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need to bring support with me to a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
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
    courtHearing: {
      required: 'Select what help you need to bring support with you to a court hearing',
    },
    supportWorkerDetails: {
      required: 'Please provide support worker details',
    },
    familyProviderDetails: {
      required: 'Please provide family member details',
    },
    therapyDetails: {
      required: 'Please provide therapy animal details',
    },
    communicationSupportOther: {
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
    courtHearing: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'courtHearing',
          label: l => l.supportworker,
          value: 'supportworker',
          subFields: {
            supportWorkerDetails: {
              type: 'textarea',
              label: l => l.supportWorkerDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'courtHearing',
          label: l => l.familymember,
          value: 'familymember',
          subFields: {
            familyProviderDetails: {
              type: 'textarea',
              label: l => l.familyMemberDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'courtHearing',
          label: l => l.assistance,
          value: 'assistance',
        },
        {
          name: 'courtHearing',
          label: l => l.animal,
          value: 'animal',
          subFields: {
            therapyDetails: {
              type: 'textarea',
              label: l => l.animalDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'courtHearing',
          label: l => l.other,
          value: 'other',
          subFields: {
            communicationSupportOther: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
              attributes: {
                rows: 2,
              },
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          divider: true,
        },
        {
          name: 'courtHearing',
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
