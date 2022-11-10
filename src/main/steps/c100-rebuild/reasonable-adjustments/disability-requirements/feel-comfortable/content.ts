import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need something to feel comfortable during a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  appropriateLighting: 'Appropriate lighting',
  appropriateLightingSubField: 'Describe what you need',
  regularBreaks: 'Regular breaks',
  spaceUpAndMoveAround: 'Space to be able to get up and move around',
  feelComportableOther: 'Other',
  feelComportableOtherSubField: 'Describe what you need',
  feelComportableNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_appropriateLightingSubField: {
      required: 'Describe the appropriate lighting you need',
    },
    ra_feelComportableOtherSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  line1: 'Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  appropriateLighting: 'Golau priodol',
  appropriateLightingSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  regularBreaks: 'Seibiannau rheolaidd',
  spaceUpAndMoveAround: 'Lle i allu codi a symud o gwmpas',
  feelComportableOther: 'Arall',
  feelComportableOtherSubField: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  feelComportableNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_appropriateLightingSubField: {
      required: 'Describe the appropriate lighting you need - welsh',
    },
    feelComportableSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing - welsh',
    },
    ra_feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_feelComportable: {
      id: 'ra_feelComportable',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_feelComportable',
          label: l => l.appropriateLighting,
          value: 'appropriateLighting',
          subFields: {
            ra_appropriateLightingSubField: {
              type: 'textarea',
              label: l => l.appropriateLightingSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'ra_feelComportable',
          label: l => l.regularBreaks,
          value: 'regularBreaks',
        },
        {
          name: 'ra_feelComportable',
          label: l => l.spaceUpAndMoveAround,
          value: 'spaceUpAndMoveAround',
        },
        {
          name: 'ra_feelComportable',
          label: l => l.feelComportableOther,
          value: 'feelComportableOther',
          subFields: {
            ra_feelComportableOtherSubField: {
              type: 'textarea',
              label: l => l.feelComportableOtherSubField,
              labelSize: null,
              attributes: {
                rows: 1,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: 'or',
        },
        {
          name: 'ra_feelComportable',
          label: l => l.feelComportableNoOption,
          value: 'feelComportableNoOption',
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
