import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  title: 'Do you have a written agreement with the other people in the case, that you want the court to review?',
  writtenAgreementDetails:
    'A written agreement between the parties that is made legally binding by the court is called a consent order.',
  approvalDetails: 'If you have a draft consent order, the court will review it and may give approval.',
  one: 'Yes',
  two: 'No',
  infoDetail: 'You will be asked to upload the draft consent order later in the application.',
  errors: {
    sq_writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review',
    },
  },
});

const cy = () => ({
  title:
    'Do you have a written agreement with the other people in the case, that you want the court to review? - welsh',
  writtenAgreementDetails:
    'A written agreement between the parties that is made legally binding by the court is called a consent order. - welsh',
  approvalDetails: 'If you have a draft consent order, the court will review it and may give approval. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  infoDetail: 'You will be asked to upload the draft consent order later in the application. - welsh',
  errors: {
    sq_writtenAgreement: {
      required:
        'Select yes if you have a written agreement with the other people in the case, that you want the court to review - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_writtenAgreement: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            infoText: {
              type: 'textAndHtml',
              textAndHtml: l => l.infoDetail,
            },
          },
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
