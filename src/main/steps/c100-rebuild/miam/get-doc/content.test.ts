import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'You need to get a document from the mediator',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend.',
  lines: [
    'You will need to upload this document to the application.',
    'When you have a document from the mediator, come back to this screen to proceed with your application.',
  ],
};

const cy = {
  title: 'You need to get a document from the mediator - welsh',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend. - welsh',
  lines: [
    'You will need to upload this document to the application. - welsh',
    'When you have a document from the mediator, come back to this screen to proceed with your application. - welsh',
  ],
};

describe('miam -> get document from a mediator', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Save and come back later button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should contain Go back button', () => {
    expect(
      (form?.goBack?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Go back');
  });
});
