/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  title: 'Have you attended a MIAM?',
  content: 'The MIAM must be about the same issue that is being dealt with in this application.',
  yes: 'Yes',
  no: 'No',
  errors: {
    miam_attendance: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting(MIAM).',
    },
  },
};

export const cy = {
  title: 'Ydych chi wedi mynychu MIAM?',
  content: 'Rhaid i’r MIAM fod mewn perthynas â’r un mater sy’n cael ei drin yn y cais hwn.',
  yes: 'Do',
  no: 'Naddo',
  errors: {
    miam_attendance: {
      required: 'Dewiswch ‘Do’ os ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM).',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_attendance: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      labelSize: 'm',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
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
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
