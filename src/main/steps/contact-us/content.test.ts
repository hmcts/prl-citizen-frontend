import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

const en = {
  title: 'Adoption',
  email: 'Email',
  emailAddress:
    'Email us at <a href="mailto:privatelawproject@justice.gov.uk" class="govuk-link">privatelawproject@justice.gov.uk.</a>',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  email: 'E-bost',
  emailAddress:
    'Anfonwch neges e-bost i <a href="mailto:privatelawproject@justice.gov.uk" class="govuk-link">privatelawproject@justice.gov.uk.</a>',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('contact-us > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    // userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
