import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    signLanguageDetails: {
      required: 'Please describe sign language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  courtcommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  hearingloop: 'Dolen sain (system gwella clyw)',
  infraredreceiver: 'Derbynnydd isgoch (system gwella clyw)',
  needspeakinghelp: "Angen bod yn agos at bwy bynnag sy'n siarad",
  lipspeaker: 'Siaradwr gwefusau',
  lipspeakerhint: 'clywed rhywun sydd wedi cael ei hyfforddi i allu darllen gwefusau yn rhwydd',
  signlanguage: 'Cyfieithydd iaith arwyddion',
  signLanguageDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  speechreporter: 'Cofnodwr iaith lafar i destun (palanteipydd)',
  extratime: 'Amser ychwanegol i feddwl ac egluro fy hun',
  courtvisit: "Ymweld â'r llys cyn y gwrandawiad",
  courthearing: 'Esboniad o osodiad y llys a phwy fydd yn yr ystafell wrandawiadau',
  intermediary: 'Cyfryngwr',
  intermediaryhint:
    'rhywun i’ch helpu os oes gennych anghenion cyfathrebu drwy ddarparu cymorth proffesiynol i gymryd rhan mewn gwrandawiad',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    helpCommunication: {
      required: 'Select what help you need in communicating and understanding',
    },
    describeOtherNeed: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    signLanguageDetails: {
      required: 'Please describe sign language details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
          value: 'hearingloop',
        },
        {
          name: 'helpCommunication',
          label: l => l.infraredreceiver,
          value: 'infraredreceiver',
        },
        {
          name: 'helpCommunication',
          label: l => l.needspeakinghelp,
          value: 'needspeakinghelp',
        },
        {
          name: 'helpCommunication',
          label: l => l.lipspeaker,
          hint: l => l.lipspeakerhint,
          value: 'lipspeaker',
        },
        {
          name: 'helpCommunication',
          label: l => l.signlanguage,
          value: 'signlanguage',
          subFields: {
            signLanguageDetails: {
              type: 'textarea',
              attributes: {
                rows: 1,
              },
              label: l => l.signLanguageDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'helpCommunication',
          label: l => l.speechreporter,
          value: 'speechreporter',
        },
        {
          name: 'helpCommunication',
          label: l => l.extratime,
          value: 'extratime',
        },
        {
          name: 'helpCommunication',
          label: l => l.courtvisit,
          value: 'courtvisit',
        },
        {
          name: 'helpCommunication',
          label: l => l.courthearing,
          value: 'courthearing',
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
          value: 'other',
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
          divider: l => l.divider,
        },
        {
          name: 'helpCommunication',
          label: l => l.nosupport,
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
