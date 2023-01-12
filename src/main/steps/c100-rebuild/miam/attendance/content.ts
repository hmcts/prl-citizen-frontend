/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  paragraph1: 'The MIAM must be about the same issue that is being dealt with in this application.',
  one: 'Yes',
  two: 'No',
  errors: {
    miam_attendance: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting(MIAM)',
    },
  },
});

export const cy = () => ({
  title: 'A ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)?',
  paragraph1: 'Rhaid i’r MIAM fod mewn perthynas â’r un mater sy’n cael ei drafod yn y cais hwn.',
  one: 'Do',
  two: 'Naddo',
  errors: {
    miam_attendance: {
      required: 'Dewiswch do os ydych wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_attendance: {
      type: 'radios',
      classes: 'govuk-radios',
      // label: l => l.label,
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
