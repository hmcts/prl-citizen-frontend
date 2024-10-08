import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Have you or the children ever been involved in court proceedings?',
  courtCase: 'Have the children been involved in a court case?',
  courtOrder: 'Have you had a court order made for your protection?',
  courtOrderYes: 'Yes',
  courtOrderNo: 'No',
  errors: {
    proceedingsStart: {
      required: 'Select yes if the children have been involved in a previous court case',
    },
    proceedingsStartOrder: {
      required: 'Select yes if you have had a court order made for your protection',
    },
  },
};

const cy = {
  title: "Ydych chi neu'r plant erioed wedi bod yn rhan o achosion llys?",
  courtCase: "Ydy'r plant wedi bod yn rhan o achos llys?",
  courtOrder: 'A oes gorchymyn llys wedi ei wneud ar eich cyfer i’ch amddiffyn?',
  courtCaseYes: 'Do',
  courtCaseNo: 'Naddo',
  courtCaseDontKnow: 'Nid wyf yn gwybod',
  courtOrderYes: 'Oes',
  courtOrderNo: 'Nac oes',
  summaryText: 'Cysylltiadau am gymorth',
  onlyContinue: 'Parhau',
  errors: {
    proceedingsStart: {
      required: "Dewiswch do os yw'r plant wedi bod yn rhan o achos llys yn flaenorol",
    },
    proceedingsStartOrder: {
      required: 'Dewiswch oes os oes gorchymyn llys wedi ei wneud ar eich cyfer er mwyn eich diogelu chi',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > international elements > start', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const proceedingsStartField = fields.proceedingsStart as FormOptions;
    expect(proceedingsStartField.type).toBe('radios');
    expect(proceedingsStartField.classes).toBe('govuk-radios');
    expect((proceedingsStartField.label as LanguageLookup)(generatedContent)).toBe(en.courtCase);
    expect((proceedingsStartField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderYes);
    expect((proceedingsStartField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderNo);

    const proceedingsStartOrderField = fields.proceedingsStartOrder as FormOptions;
    expect(proceedingsStartOrderField.type).toBe('radios');
    expect(proceedingsStartOrderField.classes).toBe('govuk-radios');
    expect((proceedingsStartOrderField.label as LanguageLookup)(generatedContent)).toBe(en.courtOrder);
    expect((proceedingsStartOrderField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderYes);
    expect((proceedingsStartOrderField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderNo);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
