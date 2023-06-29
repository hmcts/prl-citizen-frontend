import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

import { miam_collapse_content_cy, miam_collapse_content_en } from './miam-details-content';

const en = {
  title: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  miamDetailsLabel: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
  miamSubFields: miam_collapse_content_en,
  onlyContinue: 'Continue',
  errors: {
    miamStart: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting (MIAM)',
    },
  },
};

const cy: typeof en = {
  title: 'A ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)?',
  one: 'Do',
  two: 'Naddo',
  three: 'Nid wyf yn gwybod',
  miamDetailsLabel: 'Beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)?',
  miamSubFields: miam_collapse_content_cy,
  onlyContinue: 'Parhau',
  errors: {
    miamStart: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting (MIAM)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miamDetails: {
      type: 'detailsHtml',
      label: l => l.miamDetailsLabel,
      detailsHtml: l => l.miamSubFields,
    },
    miamStart: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
