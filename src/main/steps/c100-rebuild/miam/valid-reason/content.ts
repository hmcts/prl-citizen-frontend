/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  title: 'Do you have valid reasons for not attending a MIAM?',
  paragraph1: 'You must attend a MIAM before making an application unless you have valid reasons not to attend.',
  applyForVrLink:
    'If you\'re unsure, you can check the <a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>.',
  paragraph2:
    "If you're claiming that you have valid reasons not to attend a MIAM, the court will need more information from you.",
  one: 'Yes',
  two: 'No',
  errors: {
    miam_validReason: {
      required: 'Select yes if you have valid reasons for not attending a MIAM',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child Arrangements',
  title: 'Do you have valid reasons for not attending a MIAM? - Welsh',
  paragraph1:
    'You must attend a MIAM before making an application unless you have valid reasons not to attend. - Welsh',
  applyForVrLink:
    'If you\'re unsure, you can check the <a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>. - Welsh',
  paragraph2:
    "If you're claiming that you have valid reasons not to attend a MIAM, the court will need more information from you. - Welsh",
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    miam_validReason: {
      required: 'Select yes if you have valid reasons for not attending a MIAM - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_validReason: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
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
