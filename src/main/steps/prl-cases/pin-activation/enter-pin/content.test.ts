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
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 digits',
      notNumeric: 'Case code must be numeric',
      invalidCaseCode: 'Enter your case code',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case.',
      invalidAccessCode: 'Enter your access code',
    },
  },
};

const cy = {
  title: 'Access your case - welsh',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court. -welsh',
  caseNumberLabel: 'Enter your case number -welsh ',
  caseNumberHintText: 'This is a 16-digit number -welsh',
  accessCodeLabel: 'Enter your access code -welsh',
  accessCodeHintText: 'This has 8 characters -welsh',
  saveAndContinue: 'Cadw a pharhau',
  errors: {
    caseCode: {
      required: 'Enter your case code -welsh',
      invalid: 'The case code must be made up of 16 digits -welsh',
      notNumeric: 'Case code must be numeric -welsh',
      invalidCaseCode: 'Enter your case code -welsh',
    },
    accessCode: {
      required: 'Enter your access code -welsh',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric -welsh',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case. -welsh',
      invalidAccessCode: 'Enter your access code -welsh',
    },
  },
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
