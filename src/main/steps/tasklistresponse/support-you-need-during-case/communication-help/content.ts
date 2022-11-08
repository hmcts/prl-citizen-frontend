import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the hearing',
  courtHearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Select what help you need in communicating and understanding',
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
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needSpeakingHelp: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Speech to text reporter (palantypist)',
  extraTime: 'Extra time to think and explain myself',
  courtVisit: 'Visit to court before the hearing',
  courtHearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    respondentHelpCommunication: {
      required: 'Select what help you need in communicating and understanding',
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
              validator: value => isFieldFilledIn(value),
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
              validator: value => isFieldFilledIn(value),
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
