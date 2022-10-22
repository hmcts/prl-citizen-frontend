import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  title: 'Contact your legal representative',
  paragraph: 'If you have a legal representative and want them to complete the application for you:',
  closeApplication: 'Close the application',
  bulletPoints: [
    'get in touch with your legal representative',
    'ask them what information they need from you to complete the application',
    'ask them to explain the next steps',
  ],
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in.',
    iconFallbackText: 'Warning',
  },
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  title: 'Contact your legal representative - welsh',
  paragraph: 'If you have a legal representative and want them to complete the application for you: - welsh',
  closeApplication: 'Close the application - welsh',
  bulletPoints: [
    'get in touch with your legal representative - welsh',
    'ask them what information they need from you to complete the application - welsh',
    'ask them to explain the next steps - welsh',
  ],
  warningText: {
    text: 'Do not complete the application yourself if you plan to have a legal representative fill it in. - welsh',
    iconFallbackText: 'Warning - welsh',
  },
};

describe('c100-rebuild/contact-representative page content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent | undefined;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test("should contain 'Close the application' button", () => {
    expect((form?.submit?.text as LanguageLookup)(generatedContent as Record<string, never>)).toBe(
      'Close the application'
    );
  });

  test('should contain Go back button', () => {
    expect(
      (form?.goBack?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Go back');
  });
});
