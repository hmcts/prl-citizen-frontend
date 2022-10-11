import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'Have the children been impacted by drug, alcohol or substance abuse?',
  line1: 'This could be abuse that is taking place now, or abuse that occurred in the past.',
  line2: 'For example, you think the children are impacted by living with someone who has a substance abuse problem.',
  one: 'Yes',
  two: 'No',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
  errors: {
    c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse',
    },
    c1A_otherConcernsDrugsDetails: {
      required: 'Describe the children have been impacted by drug, alcohol or substance abuse',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  title: 'Have the children been impacted by drug, alcohol or substance abuse? - welsh',
  line1: 'This could be abuse that is taking place now, or abuse that occurred in the past. - welsh',
  line2:
    'For example, you think the children are impacted by living with someone who has a substance abuse problem. -welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  description:
    'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing. - Welsh',
  errors: {
    c1A_otherConcernsDrugs: {
      required: 'Select yes if the children have been impacted by drug, alcohol or substance abuse - Welsh',
    },
    c1A_otherConcernsDrugsDetails: {
      required: 'Describe the children have been impacted by drug, alcohol or substance abuse - Welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_otherConcernsDrugs: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            c1A_otherConcernsDrugsDetails: {
              type: 'textarea',
              label: l => l.description,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },

        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
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
