import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the hearing',
  courthearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
    },
    describeSignLanguageDetails: {
      required: 'Please describe sign language details',
    },
  },
};

const cy: typeof en = {
  section: 'Reasonable adjustments',
  title: 'I need help communicating and understanding',
  courtcommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  hearingloop: 'Hearing loop (hearing enhancement system)',
  infraredreceiver: 'Infrared receiver (hearing enhancement system)',
  needspeakinghelp: 'Need to be close to who is speaking',
  lipspeaker: 'Lip speaker',
  lipspeakerhint: 'hearing person who has been trained to be easily lip read',
  signlanguage: 'Sign Language interpreter',
  signLanguageDetails: 'Describe what you need',
  speechreporter: 'Speech to text reporter (palantypist)',
  extratime: 'Extra time to think and explain myself',
  courtvisit: 'Visit to court before the hearing',
  courthearing: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryhint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
    },
    describeSignLanguageDetails: {
      required: 'Please describe sign language details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    helpCommunication: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'helpCommunication',
          label: l => l.hearingloop,
          value: 'hearing loop',
        },
        {
          name: 'helpCommunication',
          label: l => l.infraredreceiver,
          value: 'infrared receiver',
        },
        {
          name: 'helpCommunication',
          label: l => l.needspeakinghelp,
          value: 'speaking help',
        },
        {
          name: 'helpCommunication',
          label: l => l.lipspeaker,
          hint: l => l.lipspeakerhint,
          value: 'lip speaker',
        },
        {
          name: 'helpCommunication',
          label: l => l.signlanguage,
          value: 'sign language interpreter',
          subFields: {
            describeSignLanguageDetails: {
              type: 'textarea',
              attributes: {
                rows: 1,
              },
              label: l => l.signLanguageDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'helpCommunication',
          label: l => l.speechreporter,
          value: 'speech to text reporter',
        },
        {
          name: 'helpCommunication',
          label: l => l.extratime,
          value: 'extra time to think and explain myself',
        },
        {
          name: 'helpCommunication',
          label: l => l.courtvisit,
          value: 'vist to court before hearing',
        },
        {
          name: 'helpCommunication',
          label: l => l.courthearing,
          value: 'court hearing',
        },
        {
          name: 'helpCommunication',
          label: l => l.intermediary,
          hint: l => l.intermediaryhint,
          value: 'intermediary',
        },
        {
          name: 'helpCommunication',
          label: l => l.other,
          value: 'Other',
          subFields: {
            describeOtherNeed: {
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
          name: 'helpCommunication',
          label: l => l.nosupport,
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
