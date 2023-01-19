import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  pagetitle: '',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courtHearing: {
      required: 'Please select an answer',
    },
    communicationSupportOther: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I would need to bring support with me to a court hearing',
  pagetitle: '',
  courtcommunication: 'Think about what you would need if the hearing was in person, by phone or video.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  supportworker: 'A support worker or carer',
  familymember: 'A friend or family member',
  assistance: 'Assistance / guide dog',
  animal: 'Therapy animal',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    courtHearing: {
      required: 'Please select an answer',
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
          value: 'support worker or carer',
        },
        {
          name: 'courtHearing',
          label: l => l.familymember,
          value: 'friend or family member',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, true);
  return {
    ...translations,
    form,
  };
};
