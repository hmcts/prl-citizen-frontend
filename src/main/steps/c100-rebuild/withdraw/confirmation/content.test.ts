import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  successMessage: 'Your application has been submitted',
  label: 'Case number',
  subContent:
    'The court will consider your request to withdraw the application, and will let you know if it is granted.',
  secondaryContent:
    'Your child arrangements application will not be issued to the other parties, while the court is considering your request.',
  secondaryBtnLabel: 'Return to your dashboard',
};

const cy = {
  successMessage: 'Your application has been submitted -welsh',
  label: 'Case number -welsh',
  subContent:
    'The court will consider your request to withdraw the application, and will let you know if it is granted. -welsh',
  secondaryContent:
    'Your child arrangements application will not be issued to the other parties, while the court is considering your request. -welsh',
  secondaryBtnLabel: 'Return to your dashboard',
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
});
