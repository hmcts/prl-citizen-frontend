import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Welcome to Citizen dashboard',
  paymentError: '',
  applicant: 'DA Applicant',
  respondent: 'CA DA Respondent',
  c100: 'C100 Application',
  pay: 'Pay Now ',
  errorTitle: 'There is a problem',
  paymentErrorText: 'The payment has been unsuccessful',
};

const cy = {
  title: 'Croeso i’r dangosfwrdd i ddinasyddion',
  paymentError: '',
  applicant: 'DA Applicant (welsh)',
  respondent: 'CA DA Respondent (welsh)',
  c100: 'C100 Application (welsh)',
  pay: 'Talu Nawr',
  errorTitle: 'Mae yna broblem',
  paymentErrorText: 'Mae’r taliad wedi bod yn aflwyddiannus',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('respondent/proceedings content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  const generatedContent = generateContent(commonContent);

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Welcome to Citizen dashboard');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
