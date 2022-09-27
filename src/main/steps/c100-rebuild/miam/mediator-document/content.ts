import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  headingTitle: 'Do you have a document signed by the mediator?  ',
  docSigned:
    'The mediator should give you a signed document to confirm you attended a MIAM, or do not need to attend. If you do not have a document, you should ask the mediator for one.',
  one: 'Yes',
  two: 'No',
  errors: {
    haveDocSigned: {
      required: 'Select yes if you have a document signed by the mediator',
    },
  },
});

const cy = () => ({
  headingTitle: 'Do you have a document signed by the mediator? - welsh  ',
  docSigned:
    'The mediator should give you a signed document to confirm you attended a MIAM, or do not need to attend. If you do not have a document, you should ask the mediator for one. - Welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    haveDocSigned: {
      required: 'Select yes if you have a document signed by the mediator - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    haveDocSigned: {
      type: 'radios',
      classes: 'govuk-radios',
      hint: l => l.docSigned,
      label: l => l.label,
      section: l => l.section,
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
