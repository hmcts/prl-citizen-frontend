import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'British Sign Language interpreter',
  signLanguageDetails: 'British Sign Language interpreter',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the court hearing',
  courtHearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Please select an answer',
    },
    respondentSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    respondentDescribeOtherNeed: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communication with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'British Sign Language interpreter',
  signLanguageDetails: 'British Sign Language interpreter',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the court hearing',
  courtHearing: 'Explanation of the court hearing room layout and who will be in the room',
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to act as a link and assist you in the hearing - a judge may allow this to help you understand and communicate better',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Save and continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Please select an answer',
    },
    respondentSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    respondentDescribeOtherNeed: {
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
    respondentHelpCommunication: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'respondentHelpCommunication',
          label: l => l.hearingLoop,
          value: 'hearing loop',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.infraredReceiver,
          value: 'infrared receiver',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.needSpeakingHelp,
          value: 'speaking help',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.lipSpeaker,
          hint: l => l.lipSpeakerHint,
          value: 'lip speaker',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.signLanguage,
          value: 'sign language interpreter',
          subFields: {
            respondentSignLanguageDetails: {
              type: 'textarea',
              label: l => l.signLanguageDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.speechReporter,
          value: 'speech to text reporter',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.extraTime,
          value: 'extra time to think and explain myself',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.courtVisit,
          value: 'vist to court before hearing',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.courtHearing,
          value: 'court hearing',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.intermediary,
          hint: l => l.intermediaryHint,
          value: 'intermediary',
        },
        {
          name: 'respondentHelpCommunication',
          label: l => l.other,
          value: 'Other',
          subFields: {
            respondentDescribeOtherNeed: {
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
          name: 'respondentHelpCommunication',
          label: l => l.noSupport,
          value: 'no need of support',
          exclusive: true,
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
