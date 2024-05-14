import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Do you have valid reason for not attending a MIAM?',
  content:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">Check the list of valid reasons for not attending a MIAM (opens in a new tab)</a> if you’re not sure.',
  yes: 'Yes',
  no: 'No',
  errors: {
    miam_validReason: {
      required: 'Select yes if you have a valid reason for not attending a MIAM',
    },
  },
};

const cy = {
  title: 'A oes gennych chi reswm dilys dros beidio â mynychu MIAM?',
  content:
    '<a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">Gwiriwch y rhestr o resymau dilys dros beidio â mynychu MIAM (yn agor mewn tab newydd)</a> os nad ydych yn siŵr.',
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    miam_validReason: {
      required: 'Dewiswch ‘Oes’ os oes gennych chi resymau dilys dros beidio â mynychu MIAM',
    },
  },
};

describe('maim > valid-reason > content', () => {
  const commonContent = { language: 'en' } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain miam_validReason field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const miam_validReason = fields.miam_validReason as FormOptions;
    expect(miam_validReason.type).toBe('radios');
    expect(miam_validReason.classes).toBe('govuk-radios');
    expect((miam_validReason.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yes);
    expect((miam_validReason.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
