import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';

const en = {
  section: ' ',
  label: 'Has the court asked for this document?',
  one: 'Yes',
  two: 'No',
  content:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  label: 'A yw’r llys wedi gofyn am y ddogfen hon?',
  one: 'Do',
  two: 'Naddo',
  content:
    'Bydd y gorchymyn llys yn dweud wrthych pa ddogfennau y mae angen i chi eu cyflwyno. Os byddwch yn cyflwyno dogfen nad yw’r llys wedi gofyn amdani, mae’n bosib y bydd y llys yn penderfynu peidio â’i hystyried.',
  continue: 'Parhau',
  errors: {
    start: {
      required: 'Dewiswch un o’r opsiynau cyn parhau ymhellach',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    start: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      validator: isFieldFilledIn,
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
    },
  },

  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form,
    caption,
    title,
  };
};
