/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
  communicationHelpOther: 'Other',
  noSupportRequired: 'No, I do not need any support at this time',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_communicationHelp: {
      required: 'Select what help you need with communicating and understanding',
    },
    ra_signLanguageInterpreter_subfield: {
      required: 'Describe which Sign Language interpreter you need',
    },
    ra_communicationHelpOther_subfield: {
      required: 'Describe what you need to help with communicating and understanding',
    },
  },
});

export const cy = () => ({
  serviceName: 'Trefniadau plant',
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
    'Rhywun i’ch helpu os oes gennych anghenion cyfathreby drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  communicationHelpOther: 'Arall',
  noSupportRequired: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_communicationHelp: {
      required: 'Dewiswch pa help sydd ei angen arnoch gyda chyfathrebu a deall pethau',
    },
    ra_signLanguageInterpreter_subfield: {
      required: 'Disgrifiwch pa gyfieithydd Iaith Arwyddion sydd ei angen arnoch',
    },
    ra_communicationHelpOther_subfield: {
      required: 'Disgrifiwch yr hyn sydd ei angen arnoch i helpu gyda chyfathrebu a deall pethau',
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
            ra_signLanguageInterpreter_subfield: {
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
          label: l => l.communicationHelpOther,
          value: 'communicationHelpOther',
          subFields: {
            ra_communicationHelpOther_subfield: {
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
          divider: l => l.divider,
        },
        {
          name: 'ra_communicationHelp',
          label: l => l.noSupportRequired,
          value: 'noSupportRequired',
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
