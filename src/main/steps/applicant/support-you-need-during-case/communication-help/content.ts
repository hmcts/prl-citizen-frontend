import { HelpCommunicationEnum } from '../../../../app/case/definition';
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
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Please select an answer',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
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
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Please select an answer',
    },
    describeOtherNeed: {
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
          value: HelpCommunicationEnum.hearingloop,
        },
        {
          name: 'helpCommunication',
          label: l => l.infraredreceiver,
          value: HelpCommunicationEnum.infraredreceiver,
        },
        {
          name: 'helpCommunication',
          label: l => l.needspeakinghelp,
          value: HelpCommunicationEnum.needspeakinghelp,
        },
        {
          name: 'helpCommunication',
          label: l => l.lipspeaker,
          hint: l => l.lipspeakerhint,
          value: HelpCommunicationEnum.lipspeaker,
        },
        {
          name: 'helpCommunication',
          label: l => l.signlanguage,
          value: HelpCommunicationEnum.signlanguage,
        },
        {
          name: 'helpCommunication',
          label: l => l.speechreporter,
          value: HelpCommunicationEnum.speechreporter,
        },
        {
          name: 'helpCommunication',
          label: l => l.extratime,
          value: HelpCommunicationEnum.extratime,
        },
        {
          name: 'helpCommunication',
          label: l => l.courtvisit,
          value: HelpCommunicationEnum.courtvisit,
        },
        {
          name: 'helpCommunication',
          label: l => l.courthearing,
          value: HelpCommunicationEnum.courthearing,
        },
        {
          name: 'helpCommunication',
          label: l => l.intermediary,
          hint: l => l.intermediaryhint,
          value: HelpCommunicationEnum.intermediary,
        },
        {
          name: 'helpCommunication',
          label: l => l.other,
          value: HelpCommunicationEnum.other,
          subFields: {
            describeOtherNeed: {
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
          name: 'helpCommunication',
          label: l => l.nosupport,
          value: HelpCommunicationEnum.nosupport,
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
