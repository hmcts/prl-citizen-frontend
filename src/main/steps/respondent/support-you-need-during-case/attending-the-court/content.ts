import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Attending the court',
  title: 'Would you be able to take part in hearings by video and phone?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply',
  summaryText: 'Contacts for help',
  videoHearings: 'Yes, I can take part in video hearings',
  phoneHearings: 'Yes, I can take part in phone hearings',
  noHearings: 'No, I cannot take part in either video or phone hearings',
  noHearingsHint: 'If you choose this option please tell us why in case we can assist you',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  continue: 'Save and continue',
  errors: {
    respondentAttendingToCourt: {
      required: 'Please select an answer',
    },
    respondentHearingDetails: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'Would you be able to take part in hearings by video and phone?',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply',
  summaryText: 'Contacts for help',
  videoHearings: 'Yes, I can take part in video hearings',
  phoneHearings: 'Yes, I can take part in phone hearings',
  noHearings: 'No, I cannot take part in either video or phone hearings',
  noHearingsHint: 'If you choose this option please tell us why in case we can assist you',
  noHearingDetails: 'Explain why you are unable to take part in video or phone hearings',
  continue: 'Save and continue',
  errors: {
    respondentAttendingToCourt: {
      required: 'Please select an answer',
    },
    respondentHearingDetails: {
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
    respondentAttendingToCourt: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'respondentAttendingToCourt',
          label: l => l.videoHearings,
          value: 'video hearings',
        },
        {
          name: 'respondentAttendingToCourt',
          label: l => l.phoneHearings,
          value: 'phone hearings',
        },
        {
          divider: true,
        },
        {
          name: 'respondentAttendingToCourt',
          label: l => l.noHearings,
          hint: l => l.noHearingsHint,
          value: 'no hearings',
          exclusive: true,
          subFields: {
            respondentHearingDetails: {
              type: 'textarea',
              label: l => l.noHearingDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
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
