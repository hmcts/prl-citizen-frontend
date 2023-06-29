import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Safety requirements',
  title: 'Do you or the children need special safety arrangements at court?',
  courtcommunication:
    'Not every court has the facilities listed here, and some need to be agreed by a judge, for example the use of protective screens.The court will contact you to discuss safety arrangements before your hearing.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingroom: 'Separate waiting room',
  separateexitentry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screenshint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Video links',
  videolinkshint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    safetyArrangements: {
      required: 'Please select an answer',
    },
    safetyArrangementsDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Gofynion diogelwch',
  title: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
  courtcommunication:
    'Nid oes gan bob llys y cyfleusterau a restrir yma, ac mae’n rhaid i farnwr gytuno i rai, er enghraifft defnyddio sgriniau. Bydd y llys yn cysylltu â chi i drafod y trefniadau diogelwch cyn eich gwrandawiad.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  waitingroom: 'Ystafell aros ar wahân',
  separateexitentry: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screens: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screenshint: 'Mae angen i farnwr gymeradwyo hyn',
  toilet: 'Toiledau ar wahân',
  advancedview: 'Advanced viewing of the court',
  videolinks: 'Cyswllt fideo',
  videolinkshint: 'Mae angen i farnwr gymeradwyo hyn',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    safetyArrangements: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    safetyArrangementsDetails: {
      required: 'Disgrifiwch eich anghenion yn fanwl',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
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
    safetyArrangements: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'safetyArrangements',
          label: l => l.waitingroom,
          value: 'waitingroom',
        },
        {
          name: 'safetyArrangements',
          label: l => l.separateexitentry,
          value: 'separateexitentry',
        },
        {
          name: 'safetyArrangements',
          label: l => l.screens,
          hint: l => l.screenshint,
          value: 'screens',
        },
        {
          name: 'safetyArrangements',
          label: l => l.toilet,
          value: 'separatetoilets',
        },
        {
          name: 'safetyArrangements',
          label: l => l.advancedview,
          value: 'advancedview',
        },
        {
          name: 'safetyArrangements',
          label: l => l.videolinks,
          hint: l => l.videolinkshint,
          value: 'videolinks',
        },
        {
          name: 'safetyArrangements',
          label: l => l.other,
          value: 'other',
          subFields: {
            safetyArrangementsDetails: {
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
          name: 'safetyArrangements',
          label: l => l.nosupport,
          value: 'noSafetyrequirements',
          exclusive: true,
        },
      ],
      validator: atLeastOneFieldIsChecked,
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
