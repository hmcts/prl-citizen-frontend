import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  headingTitle: 'Have you or the children ever been involved in court proceedings?',
  childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  one: 'Yes',
  two: 'No',
  errors: {
    childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
});

const cy = () => ({
  headingTitle: 'Have you or the children ever been involved in court proceedings? - welsh',
  childrenInvolvedCourtCase: 'Have the children been involved in a court case? - welsh',
  courtOrderProtection: 'Have you had a court order made for your protection? - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case - welsh',
    },
    courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    childrenInvolvedCourtCase: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childrenInvolvedCourtCase,
      labelSize: 'm',
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
    courtOrderProtection: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.courtOrderProtection,
      labelSize: 'm',
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
