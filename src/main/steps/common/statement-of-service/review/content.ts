import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { languages as uploadSOSLang } from '../upload/content';
import { prepareSummaryList } from '../utils';

const en = {
  title: 'Check your answers',
  whoWasServedLabel: uploadSOSLang.en.whoWasServedLabel,
  servedDateLabel: uploadSOSLang.en.servedDateLabel,
  filesUploadedLabel: uploadSOSLang.en.filesUploadedLabel,
  statementOfTruthHeading: 'Statement of truth',
  confirmation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  consentLabel: 'I believe that the facts stated in this application are true',
  submit: 'Submit',
  errors: {
    sos_reviewConsent: {
      required: 'Select if you believe the facts stated in this application are true',
    },
  },
};

const cy: typeof en = {
  title: 'Gwiriwch eich atebion',
  whoWasServedLabel: uploadSOSLang.cy.whoWasServedLabel,
  servedDateLabel: uploadSOSLang.cy.servedDateLabel,
  filesUploadedLabel: uploadSOSLang.cy.filesUploadedLabel,
  statementOfTruthHeading: 'Datganiad gwirionedd',
  confirmation:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  consentLabel: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  submit: 'Cyflwyno',
  errors: {
    sos_reviewConsent: {
      required: 'Dewiswch os ydych yn credu fod y ffeithiau a nodir yn y cais hwn yn wir',
    },
  },
};

export const form: FormContent = {
  fields: {
    sos_reviewConsent: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'sos_reviewConsent',
          label: l => l.consent,
          value: 'true',
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
    summaryListRows: prepareSummaryList(translations, content?.additionalData?.req.params?.context, content.userCase),
  };
};
