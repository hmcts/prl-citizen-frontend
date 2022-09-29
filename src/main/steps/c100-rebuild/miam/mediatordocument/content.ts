import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do you have a document signed by the mediator?',
  paragraph: `The mediator should give you a signed document
      to confirm you attended a MIAM, or do not need to attend.
      If you do not have a document, you should ask the mediator for one.`,
  yesMediatorDocument: 'Yes',
  noMediatorDocument: 'No',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM?',
    },
  },
});

const cy = () => ({
  title: 'Do you have a document signed by the mediator? - welsh',
  paragraph: `The mediator should give you a signed document
      to confirm you attended a MIAM, or do not need to attend.
      If you do not have a document, you should ask the mediator for one.- welsh`,
  yesMediatorDocument: 'Yes- welsh',
  noMediatorDocument: 'No- welsh',
  errors: {
    miam_mediatorDocument: {
      required: 'Select yes if a mediator has confirmed that you do not need to attend a MIAM? - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_mediatorDocument: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.yesMediatorDocument,
          value: YesOrNo.YES,
        },
        {
          label: l => l.noMediatorDocument,
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
