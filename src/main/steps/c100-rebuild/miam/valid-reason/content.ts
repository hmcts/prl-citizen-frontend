/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
  title: 'A oes gennych chi resymau dilys dros beidio â mynychu MIAM?',
  paragraph1: 'Rhaid i chi fynychu MIAM cyn gwneud cais oni bai bod gennych resymau dilys dros beidio â mynychu.',
  applyForVrLink:
    'Os ydych yn ansicr, gallwch <a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">wirio’r rhestr o resymau dilys</a>.',
  paragraph2:
    'Os ydych chi’n honni bod gennych resymau dilys dros beidio â mynychu MIAM, bydd y llys angen mwy o wybodaeth gennych',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    miam_validReason: {
      required: 'Dewiswch oes os oes gennych resymau dilys dros beidio â mynychu MIAM',
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
