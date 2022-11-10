import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  title: 'Do you have valid reasons for not attending a MIAM?',
  paragraph1: 'You must attend a MIAM before making an application unless you have valid reasons not to attend.',
  applyForVrLink:
    'If you\'re unsure, you can check the <a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>.',
  paragraph2:
    "If you're claiming that you have valid reasons not to attend a MIAM, the court will need more information from you.",
  one: 'Yes',
  two: 'No',
};

const cy = {
  serviceName: 'Child Arrangements',
  title: 'A oes gennych chi resymau dilys dros beidio â mynychu MIAM?',
  paragraph1:
    "Rhaid i chi fynychu MIAM cyn gwneud cais oni bai bod gennych resymau dilys dros beidio â mynychu.",
  applyForVrLink:
    'If you\'re unsure, you can check the <a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>. - Welsh',
  paragraph2:
    "Os ydych chi’n honni bod gennych resymau dilys dros beidio â mynychu MIAM, bydd y llys angen mwy o wybodaeth gennych",
  one: 'Oes',
  two: 'Nac oes',
};

describe('applicant personal details > applying-with > content', () => {
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
    const applyingWithField = fields.miam_validReason as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
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
