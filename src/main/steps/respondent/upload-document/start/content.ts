import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  pagetitle: '',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
    },
  },
};

const cy: typeof en = {
  section: ' ',
  title: 'Has the court asked for this document?',
  one: 'Yes',
  pagetitle: '',
  two: 'No',
  line1:
    'The court order will tell you which documents you need to submit. If you upload a document that has not been requested by the court, the court may decide not to consider it.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  errors: {
    start: {
      required: 'Please select one of the options before proceeding further',
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
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
