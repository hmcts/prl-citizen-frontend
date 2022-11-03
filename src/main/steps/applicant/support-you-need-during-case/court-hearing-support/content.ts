import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
  continue: 'Save and continue',
  errors: {
    courtHearing: {
      required: 'Please select an answer',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
    supportWorkerProvideDetails: {
      required: 'Please provide the support worker details',
    },
    familyMemberProvideDetails: {
      required: 'Please provide the family member details',
    },
    animalProvideDetails: {
      required: 'Please provide the therapy animal details',
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
  nosupport: 'No, I do not need any support at this time',
  continue: 'Save and continue',
  errors: {
    courtHearing: {
      required: 'Please select an answer',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
    supportWorkerProvideDetails: {
      required: 'Please provide the support worker details',
    },
    familyMemberProvideDetails: {
      required: 'Please provide the family member details',
    },
    animalProvideDetails: {
      required: 'Please provide the therapy animal details',
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
          value: 'support worker or carer',
          subFields: {
            supportWorkerProvideDetails: {
              type: 'textarea',
              label: l => l.supportWorkerDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'courtHearing',
          label: l => l.familymember,
          value: 'friend or family member',
          subFields: {
            familyMemberProvideDetails: {
              type: 'textarea',
              label: l => l.familyMemberDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
            animalProvideDetails: {
              type: 'textarea',
              label: l => l.animalDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: true,
        },
        {
          name: 'courtHearing',
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
