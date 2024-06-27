import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Have you attended a MIAM?',
  content: 'The MIAM must be about the same issue that is being dealt with in this application.',
  yes: 'Yes',
  no: 'No',
  errors: {
    miam_attendance: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting(MIAM).',
    },
  },
};

const cy = {
  title: 'Ydych chi wedi mynychu MIAM?',
  content: 'Rhaid i’r MIAM fod mewn perthynas â’r un mater sy’n cael ei drin yn y cais hwn.',
  yes: 'Do',
  no: 'Naddo',
  errors: {
    miam_attendance: {
      required: 'Dewiswch ‘Do’ os ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM).',
    },
  },
};

describe('maim > attendance > content', () => {
  const commonContent = { language: 'en' } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain maim_attendance field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const maim_attendance = fields.miam_attendance as FormOptions;
    expect(maim_attendance.type).toBe('radios');
    expect(maim_attendance.classes).toBe('govuk-radios');
    expect((maim_attendance.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yes);
    expect((maim_attendance.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);
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
