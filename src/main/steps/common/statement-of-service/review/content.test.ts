/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, cy as commonContentCy, en as commonContentEn } from '../../common.content';
import { languages as uploadSOSLang } from '../upload/content';
import { languages as whoWasServedLang } from '../who-was-served/content';

import { generateContent } from './content';

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

describe('statement-of-service > review > content', () => {
  const commonContent = { language: 'en', userCase: {} } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('form should contain correct fields', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const sos_reviewConsentField = fields.sos_reviewConsent as FormOptions;

    expect(sos_reviewConsentField.type).toBe('checkboxes');
    expect(sos_reviewConsentField.validator).toBe(atLeastOneFieldIsChecked);
    expect((sos_reviewConsentField.values[0].label as Function)(generatedContent)).toBe(en.consentLabel);
    expect(sos_reviewConsentField.values[0].value).toBe('true');
  });

  test('should contain onlyContinue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form?.onlyContinue?.text as Function)(generatedContent)).toBe(en.submit);
  });
});
