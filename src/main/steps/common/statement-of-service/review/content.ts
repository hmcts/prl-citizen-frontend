import { CaseWithId } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { cy as commonContentCy, en as commonContentEn } from '../../common.content';
import { languages as uploadSOSLang } from '../upload/content';
import { prepareSummaryList } from '../utils';
import { languages as whoWasServedLang } from '../who-was-served/content';

const en = {
  ...commonContentEn,
  title: 'Check your answers',
  whoWasServedLabel: whoWasServedLang.en.whoWasServedLabel,
  servedDateLabel: whoWasServedLang.en.servedDateLabel,
  filesUploadedLabel: uploadSOSLang.en.filesUploadedLabel,
  statementOfTruthHeading: 'Statement of truth',
  caseNumber: 'Case number',
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
  ...commonContentCy,
  title: 'Gwiriwch eich atebion',
  whoWasServedLabel: whoWasServedLang.cy.whoWasServedLabel,
  servedDateLabel: whoWasServedLang.cy.servedDateLabel,
  filesUploadedLabel: uploadSOSLang.cy.filesUploadedLabel,
  statementOfTruthHeading: 'Datganiad gwirionedd',
  caseNumber: 'Rhif yr achos',
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
          label: l => l.consentLabel,
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
  const summaryListRows = prepareSummaryList(
    translations,
    content?.additionalData?.req.params?.context,
    content.userCase as Partial<CaseWithId>
  );

  if (!summaryListRows.length) {
    form.onlyContinue!.disabled = true;
  }

  return {
    ...translations,
    form,
    summaryListRows,
  };
};
