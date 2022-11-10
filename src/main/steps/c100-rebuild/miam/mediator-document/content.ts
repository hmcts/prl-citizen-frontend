import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  title: 'Do you have a document signed by the mediator?  ',
  docSigned:
    'The mediator should give you a signed document to confirm you attended a MIAM, or do not need to attend. If you do not have a document, you should ask the mediator for one.',
  one: 'Yes',
  two: 'No',
  errors: {
    miam_haveDocSigned: {
      required: 'Select yes if you have a document signed by the mediator',
    },
  },
});

const cy = () => ({
  title: "A oes gennych chi ddogfen wedi’i llofnodi gan y cyfryngwr?",
  docSigned:
    "Dylai’r cyfryngwr roi dogfen wedi’i llofnodi i chi i gadarnhau eich bod wedi mynychu MIAM, neu i gadarnhau nad oes angen i chi fynychu. Os nad oes gennych ddogfen, dylech ofyn i'r cyfryngwr am un.",
  one: "Oes",
  two: "Nac oes",
  errors: {
    miam_haveDocSigned: {
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
    miam_haveDocSigned: {
      type: 'radios',
      classes: 'govuk-radios',
      hint: l => l.docSigned,
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
