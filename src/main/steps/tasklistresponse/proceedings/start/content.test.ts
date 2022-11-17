import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Current or previous proceedings',
  title: 'Have you or the children ever been involved in court proceedings?',
  courtCase: 'Have the children been involved in a court case?',
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    proceedingsStart: {
      required: 'Please choose an option for court proceedings',
    },
    proceedingsStartOrder: {
      required: 'Please choose an option for court order',
    },
  },
};

const cyContent = {
  section: 'Current or previous proceedings',
  title: 'Have you or the children ever been involved in court proceedings?',
  courtCase: 'Have the children been involved in a court case?',
  courtCaseYes: 'Yes',
  courtCaseNo: 'No',
  courtCaseDontKnow: "I don't know",
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and continue',
  errors: {
    proceedingsStart: {
      required: 'Please select an answer',
    },
    proceedingsStartOrder: {
      required: 'Please select an answer',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent/proceedings content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Have you or the children ever been involved in court proceedings?');
    expect(generatedContent.section).toEqual('Current or previous proceedings');
    expect(generatedContent.courtCase).toEqual('Have the children been involved in a court case?');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const proceedingsStart = fields.proceedingsStart as FormOptions;
    expect(proceedingsStart.type).toBe('radios');
    expect(proceedingsStart.classes).toBe('govuk-radios');
  });

  test('should onlyContinue continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
