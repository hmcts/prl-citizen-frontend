/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  title: 'Do you have valid reason for not attending a MIAM?',
  content:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">Check the list of valid reasons for not attending a MIAM (opens in a new tab)</a> if you’re not sure.',
  yes: 'Yes',
  no: 'No',
  errors: {
    miam_validReason: {
      required: 'Select yes if you have a valid reason for not attending a MIAM',
    },
  },
};

export const cy = {
  title: 'A oes gennych chi reswm dilys dros beidio â mynychu MIAM?',
  content:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">Gwiriwch y rhestr o resymau dilys dros beidio â mynychu MIAM (yn agor mewn tab newydd)</a> os nad ydych yn siŵr.',
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    miam_validReason: {
      required: 'Dewiswch ‘Oes’ os oes gennych chi resymau dilys dros beidio â mynychu MIAM',
    },
  },
};

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
