import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  headingTitle: 'Have you or the children ever been involved in court proceedings?',
  childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  one: 'Yes',
  two: 'No',
  one1: 'Yes',
  two1: 'No',
  errors: {
    op_childrenInvolvedCourtCase: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    op_courtOrderProtection: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  headingTitle: 'Ydych chi neu’r plant erioed wedi bod ynghlwm ag achos llys?',
  childrenInvolvedCourtCase: 'Ydy’r plant wedi bod ynghlwm ag achos llys?',
  courtOrderProtection: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi?',
  one: 'Do',
  two: 'Naddo',
  one1: 'Oes',
  two1: 'Nac oes',
  errors: {
    op_childrenInvolvedCourtCase: {
      required: "Dewiswch do os yw'r plant wedi bod yn rhan o achos llys yn flaenorol",
    },
    op_courtOrderProtection: {
      required: "Dewiswch do os yw'r plant wedi bod yn rhan o achos llys yn flaenorol",
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
          label: l => l.one1,
          value: YesOrNo.YES,
        },

        {
          label: l => l.two1,
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
