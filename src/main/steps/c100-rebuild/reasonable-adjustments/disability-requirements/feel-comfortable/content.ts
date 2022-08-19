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
    appropriateLightingSubField: {
      required: 'Describe the appropriate lighting you need',
    },
    feelComportableOtherSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing',
    },
    feelComportable: {
      required: 'Select what you need to feel comfortable during a court hearing',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need something to feel comfortable during a court hearing - welsh',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  appropriateLighting: 'Appropriate lighting - welsh',
  appropriateLightingSubField: 'Describe what you need - welsh',
  regularBreaks: 'Regular breaks - welsh',
  spaceUpAndMoveAround: 'Space to be able to get up and move around - welsh',
  feelComportableOther: 'Other - welsh',
  feelComportableOtherSubField: 'Describe what you need - welsh',
  feelComportableNoOption: 'No, I do not need any support at this time - welsh',
  errors: {
    appropriateLightingSubField: {
      required: 'Describe the appropriate lighting you need - welsh',
    },
    feelComportableSubField: {
      required: 'Describe what you need to feel comfortable during a court hearing - welsh',
    },
    feelComportable: {
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
    feelComportable: {
      id: 'feelComportable',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'feelComportable',
          label: l => l.appropriateLighting,
          value: 'appropriateLighting',
          subFields: {
            appropriateLightingSubField: {
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
          name: 'feelComportable',
          label: l => l.regularBreaks,
          value: 'regularBreaks',
        },
        {
          name: 'feelComportable',
          label: l => l.spaceUpAndMoveAround,
          value: 'spaceUpAndMoveAround',
        },
        {
          name: 'feelComportable',
          label: l => l.feelComportableOther,
          value: 'feelComportableOther',
          subFields: {
            feelComportableOtherSubField: {
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
          name: 'feelComportable',
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
