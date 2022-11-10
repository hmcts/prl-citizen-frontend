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
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    op_courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
});

const cy = () => ({
  headingTitle: "Ydych chi neu’r plant erioed wedi bod ynghlwm ag achos llys?",
  childrenInvolvedCourtCase: "Ydy’r plant wedi bod ynghlwm ag achos llys?",
  courtOrderProtection: "A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?",
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case - welsh',
    },
    op_courtOrderProtection: {
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
    op_childrenInvolvedCourtCase: {
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
    op_courtOrderProtection: {
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
