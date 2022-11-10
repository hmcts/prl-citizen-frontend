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
  other: 'Other',
  noSupportRequired: 'No, I do not need any support at this time',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_communicationHelp: {
      required: 'Select what help you need with communicating and understanding',
    },
    ra_signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need',
    },
    ra_communicationHelpOtherDetails: {
      required: 'Describe what you need to help with communicating and understanding',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  line1:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  hearingLoop: 'Dolen sain (system gwella clyw)',
  infraredReceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needToBeClosedWithSpeaker: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipSpeaker: 'Darllen gwefusau',
  lipSpeakerHint: 'Clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signLanguageInterpreter: 'Dehonglydd iaith arwyddion',
  speechToTextReporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  needExtraTime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  visitCourtBeforeHearing: "Ymweld â'r llys cyn y gwrandawiad",
  explanationOfCourt: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryHint:
    'Rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  noSupportRequired: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    ra_communicationHelp: {
      required: 'Select what help you need with communicating and understanding - welsh',
    },
    ra_signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need - welsh',
    },
    ra_communicationHelpOtherDetails: {
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
    ra_communicationHelp: {
      id: 'ra_communicationHelp',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_communicationHelp',
          label: l => l.hearingLoop,
          value: 'hearingLoop',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.infraredReceiver,
          value: 'infraredReceiver',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.needToBeClosedWithSpeaker,
          value: 'needToBeClosedWithSpeaker',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.lipSpeaker,
          value: 'lipSpeaker',
          hint: l => l.lipSpeakerHint,
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.signLanguageInterpreter,
          value: 'signLanguageInterpreter',
          subFields: {
            ra_signLanguageInterpreterDetails: {
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
          name: 'ra_communicationHelp',
          label: l => l.speechToTextReporter,
          value: 'speechToTextReporter',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.needExtraTime,
          value: 'needExtraTime',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.visitCourtBeforeHearing,
          value: 'visitCourtBeforeHearing',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.explanationOfCourt,
          value: 'explanationOfCourt',
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.intermediary,
          value: 'intermediary',
          hint: l => l.intermediaryHint,
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.other,
          value: 'other',
          subFields: {
            ra_communicationHelpOtherDetails: {
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
          name: 'ra_communicationHelp',
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
