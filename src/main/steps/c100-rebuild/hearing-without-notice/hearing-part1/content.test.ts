import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Are you asking for a without notice hearing?',
  line1:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent, or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm).',
  one: 'Yes',
  two: 'No',
  errors: {
    hearingPart1: {
      required: "Select yes if you're asking for a without notice",
    },
  },
};

const cy = {
  title: 'Are you asking for a without notice hearing? - welsh',
  line1:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent, or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm). - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    hearingPart1: {
      required: "Select yes if you're asking for a without notice - welsh",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('hearing without notice hearing part1', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain hearingPart1 field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const hearingPart1Field = fields.hearingPart1 as FormOptions;
    expect(hearingPart1Field.type).toBe('radios');
    expect(hearingPart1Field.classes).toBe('govuk-radios');
    expect((hearingPart1Field.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((hearingPart1Field.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
