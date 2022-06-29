import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'British Sign Language interpreter',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the court hearing',
  courthearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    helpcommunication: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'British Sign Language interpreter',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the court hearing',
  courthearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    helpcommunication: {
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
    helpcommunication: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'helpcommunication',
          label: l => l.hearingloop,
          value: 'hearing loop',
        },
        {
          name: 'helpcommunication',
          label: l => l.infraredreceiver,
          value: 'infrared receiver',
        },
        {
          name: 'helpcommunication',
          label: l => l.needspeakinghelp,
          value: 'speaking help',
        },
        {
          name: 'helpcommunication',
          label: l => l.lipspeaker,
          hint: l => l.lipspeakerhint,
          value: 'lip speaker',
        },
        {
          name: 'helpcommunication',
          label: l => l.signlanguage,
          value: 'sign language interpreter',
        },
        {
          name: 'helpcommunication',
          label: l => l.speechreporter,
          value: 'speech to text reporter',
        },
        {
          name: 'helpcommunication',
          label: l => l.extratime,
          value: 'extra time to think and explain myself',
        },
        {
          name: 'helpcommunication',
          label: l => l.courtvisit,
          value: 'vist to court before hearing',
        },
        {
          name: 'helpcommunication',
          label: l => l.courthearing,
          value: 'court hearing',
        },
        {
          name: 'helpcommunication',
          label: l => l.intermediary,
          hint: l => l.intermediaryhint,
          value: 'intermediary',
        },
        {
          name: 'helpcommunication',
          label: l => l.other,
          value: 'Other',
          subFields: {
            describeOtherNeed: {
              type: 'textarea',
              label: 'Describe what you need',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: 'or',
        },
        {
          name: 'helpcommunication',
          label: l => l.nosupport,
          value: 'no need of support',
          behaviour: 'exclusive',
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
