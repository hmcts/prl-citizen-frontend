import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  caption: 'Case number',
  title: 'Case added to your account',
  content: 'The case can now be seen on your child arrangements and family injunction account.',
};

const cyContent = {
  caption: 'Rhif yr achos',
  title: 'Achos wedi’i ychwanegu i’ch cyfrif',
  content: 'Gallwch nawr weld yr achos yn eich cyfrif trefniadau plant a gwaharddeb teulu.',
};

describe('pin-activation > case-activated > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(form.onlyContinue.text(generatePageContent({ language: 'en' }))).toBe('Continue');
  });
});
