import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeSignLanguageDetails: {
      required: 'Please provide sign language details',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  courtCommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  summaryText: 'Cysylltiadau am gymorth',
  hearingLoop: 'Dolen sain (system gwella clyw)',
  infraredReceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needSpeakingHelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipSpeaker: 'Siaradwr gwefusau',
  lipSpeakerHint: 'clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signLanguage: 'Cyfieithydd iaith arwyddion',
  signLanguageDetails: 'Describe what you need',
  speechReporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  extraTime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  courtVisit: "Ymweld â'r llys cyn y gwrandawiad",
  courtHearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryHint:
    'rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  noSupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeSignLanguageDetails: {
      required: 'Please provide sign language details',
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
          label: l => l.hearingLoop,
          value: 'hearingloop',
        },
        {
          name: 'helpCommunication',
          label: l => l.infraredReceiver,
          value: 'infraredreceiver',
        },
        {
          name: 'helpCommunication',
          label: l => l.needSpeakingHelp,
          value: 'needspeakinghelp',
        },
        {
          name: 'helpCommunication',
          label: l => l.lipSpeaker,
          hint: l => l.lipSpeakerHint,
          value: 'lipspeaker',
        },
        {
          name: 'helpCommunication',
          label: l => l.signLanguage,
          value: 'signlanguage',
          subFields: {
            describeSignLanguageDetails: {
              type: 'textarea',
              label: l => l.signLanguageDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'helpCommunication',
          label: l => l.speechReporter,
          value: 'speechreporter',
        },
        {
          name: 'helpCommunication',
          label: l => l.extraTime,
          value: 'extratime',
        },
        {
          name: 'helpCommunication',
          label: l => l.courtVisit,
          value: 'courtvisit',
        },
        {
          name: 'helpCommunication',
          label: l => l.courtHearing,
          value: 'courthearing',
        },
        {
          name: 'helpCommunication',
          label: l => l.intermediary,
          hint: l => l.intermediaryHint,
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
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: true,
        },
        {
          name: 'helpCommunication',
          label: l => l.noSupport,
          value: 'nosupport',
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
