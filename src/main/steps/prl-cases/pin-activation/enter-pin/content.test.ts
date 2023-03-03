import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Access your case',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court.',
  caseNumberLabel: 'Enter your case number',
  caseNumberHintText: 'This is a 16-digit number',
  accessCodeLabel: 'Enter your access code',
  accessCodeHintText: 'This has 8 characters',
  saveAndContinue: 'Save and continue',
};

const cy = {
  title: 'Access your case - welsh',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court. -welsh',
  caseNumberLabel: 'Enter your case number -welsh ',
  caseNumberHintText: 'This is a 16-digit number -welsh',
  accessCodeLabel: 'Enter your access code -welsh',
  accessCodeHintText: 'This has 8 characters -welsh',
  saveAndContinue: 'Save and continue -welsh',
};

describe('Enter pin content', () => {
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
