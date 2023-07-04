import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need something to feel comfortable during a court hearing',
  courtcommunication: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  appropriatelighting: 'Appropriate lighting',
  lightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
    lightingProvideDetails: {
      required: 'Please describe lighting detail',
    },
    otherProvideDetails: {
      required: 'Please describe your need in details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  appropriatelighting: 'Goleuadau priodol',
  lightingDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  break: 'Seibiannau rheolaidd',
  space: 'Lle i allu codi a symud o gwmpas',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    courtComfort: {
      required: "Dewiswch beth sydd angen arnoch i deimlo'n gyfforddus yn ystod y gwrandawiad llys",
    },
    lightingProvideDetails: {
      required: 'Disgrifiwch fanylion y goleuadau',
    },
    otherProvideDetails: {
      required: 'Disgrifiwch eich anghenion yn fanwl',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtComfort: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'courtComfort',
          label: l => l.appropriatelighting,
          value: 'appropriatelighting',
          subFields: {
            lightingProvideDetails: {
              type: 'text',
              label: l => l.lightingDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'courtComfort',
          label: l => l.break,
          value: 'breaks',
        },
        {
          name: 'courtComfort',
          label: l => l.space,
          value: 'space',
        },
        {
          name: 'courtComfort',
          label: l => l.other,
          value: 'other',
          subFields: {
            otherProvideDetails: {
              type: 'textarea',
              attributes: {
                rows: 2,
              },
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
          name: 'courtComfort',
          label: l => l.nosupport,
          value: 'nosupport',
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
