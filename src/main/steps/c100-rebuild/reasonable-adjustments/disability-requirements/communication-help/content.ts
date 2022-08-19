import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help communicating and understanding',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  hearingLoop: 'Hearing loop (hearing enhancement system)',
  infraredReceiver: 'Infrared receiver (hearing enhancement system)',
  needToBeClosedWithSpeaker: 'Need to be close to who is speaking',
  lipSpeaker: 'Lip speaker',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read',
  signLanguageInterpreter: 'Sign Language interpreter',
  speechToTextReporter: 'Speech to text reporter (palantypist)',
  needExtraTime: 'Extra time to think and explain myself',
  visitCourtBeforeHearing: 'Visit to court before the hearing',
  explanationOfCourt: "Explanation of the court and who's in the room at the hearing",
  intermediary: 'Intermediary',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing',
  other: 'Other - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    communicationHelp: {
      required: 'Select what help you need with communicating and understanding',
    },
    signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need',
    },
    otherDetails: {
      required: 'Describe what you need to help with communicating and understanding',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help communicating and understanding - welsh',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  hearingLoop: 'Hearing loop (hearing enhancement system) - welsh',
  infraredReceiver: 'Infrared receiver (hearing enhancement system) - welsh',
  needToBeClosedWithSpeaker: 'Need to be close to who is speaking - welsh',
  lipSpeaker: 'Lip speaker - welsh',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read - welsh',
  signLanguageInterpreter: 'Sign Language interpreter - welsh',
  speechToTextReporter: 'Speech to text reporter (palantypist) - welsh',
  needExtraTime: 'Extra time to think and explain myself - welsh',
  visitCourtBeforeHearing: 'Visit to court before the hearing - welsh',
  explanationOfCourt: "Explanation of the court and who's in the room at the hearing - welsh",
  intermediary: 'Intermediary - welsh',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing - welsh',
  other: 'Other - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    communicationHelp: {
      required: 'Select what help you need with communicating and understanding - welsh',
    },
    signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need - welsh',
    },
    otherDetails: {
      required: 'Describe what you need to help with communicating and understanding - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    communicationHelp: {
      id: 'communicationHelp',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'communicationHelp',
          label: l => l.hearingLoop,
          value: 'hearingLoop',
        },
        {
          name: 'communicationHelp',
          label: l => l.infraredReceiver,
          value: 'infraredReceiver',
        },
        {
          name: 'communicationHelp',
          label: l => l.needToBeClosedWithSpeaker,
          value: 'needToBeClosedWithSpeaker',
        },
        {
          name: 'communicationHelp',
          label: l => l.lipSpeaker,
          value: 'lipSpeaker',
          hint: l => l.lipSpeakerHint,
        },
        {
          name: 'communicationHelp',
          label: l => l.signLanguageInterpreter,
          value: 'signLanguageInterpreter',
          subFields: {
            signLanguageInterpreterDetails: {
              type: 'textarea',
              label: l => l.describeWhatNeeded,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'communicationHelp',
          label: l => l.speechToTextReporter,
          value: 'speechToTextReporter',
        },
        {
          name: 'communicationHelp',
          label: l => l.needExtraTime,
          value: 'needExtraTime',
        },
        {
          name: 'communicationHelp',
          label: l => l.visitCourtBeforeHearing,
          value: 'visitCourtBeforeHearing',
        },
        {
          name: 'communicationHelp',
          label: l => l.explanationOfCourt,
          value: 'explanationOfCourt',
        },
        {
          name: 'communicationHelp',
          label: l => l.intermediary,
          value: 'intermediary',
          hint: l => l.intermediaryHint,
        },
        {
          name: 'communicationHelp',
          label: l => l.other,
          value: 'other',
          subFields: {
            otherDetails: {
              type: 'textarea',
              label: l => l.describeWhatNeeded,
              labelSize: null,
              attributes: {
                rows: 2,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: 'or',
        },
        {
          name: 'communicationHelp',
          label: l => l.noSupportRequired,
          value: 'none',
          behaviour: 'exclusive',
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
