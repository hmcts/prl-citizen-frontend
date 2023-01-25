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
  appropriateLightingDetails: 'Describe what you need',
  break: 'Regular breaks',
  space: 'Space to be able to get up and move around',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any support at this time',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    otherProvideDetails: {
      required: 'Please describe your need in detail',
    },
    lightingProvideDetails: {
      required: 'Please describe appropriate lighting in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  summaryText: 'Contacts for help',
  appropriatelighting: 'Goleuadau priodol',
  appropriateLightingDetails: 'Describe what you need',
  break: 'Seibiannau rheolaidd',
  space: 'Lle i allu codi a symud o gwmpas',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    courtComfort: {
      required: 'Select what help you need to feel comfortable during a court hearing',
    },
    otherProvideDetails: {
      required: 'Please describe your need in detail',
    },
    lightingProvideDetails: {
      required: 'Please describe appropriate lighting in detail',
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
          value: 'appropriate lighting',
          subFields: {
            lightingProvideDetails: {
              type: 'textarea',
              attributes: {
                rows: 1,
              },
              label: l => l.appropriateLightingDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        {
          name: 'courtComfort',
          label: l => l.break,
          value: 'Regular breaks',
        },
        {
          name: 'courtComfort',
          label: l => l.space,
          value: 'space to move around',
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
          divider: true,
        },
        {
          name: 'courtComfort',
          label: l => l.nosupport,
          value: 'no need of support',
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
