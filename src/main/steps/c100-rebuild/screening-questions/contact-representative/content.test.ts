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
  serviceName: 'Trefniadau plant',
  title: "Cysylltwch â'ch cynrychiolydd cyfreithiol",
  paragraph: " Os oes gennych chi gynrychiolydd cyfreithiol a bod arnoch eisiau iddynt gwblhau'r cais ar eich rhan:",
  closeApplication: "Cau'r cais",
  bulletPoints: [
    "Cysylltu â'ch cynrychiolydd cyfreithiol",
    "Gofynnwch iddynt pa wybodaeth sydd ei hangen arnynt i gwblhau'r cais",
    "Gofynnwch iddynt egluro'r camau nesaf",
  ],
  warningText: {
    text: "Cau'r cais",
    iconFallbackText: 'Rhybudd',
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
