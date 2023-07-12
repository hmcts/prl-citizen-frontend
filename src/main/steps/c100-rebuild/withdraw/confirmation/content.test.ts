import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  successMessage: 'Application withdrawn',
  subContent: 'Your application has been withdrawn.',
  secondaryContent: 'If you want to take further action, you will need to start a new application.',
  secondaryBtnLabel: 'Close and return to case overview',
  whatHappensNext: 'What happens next',
  childArrangementContent: 'Your child arrangements application will not be issued to the other parties.',
};

const cy = {
  successMessage: 'Application withdrawn -welsh',
  subContent: 'Your application has been withdrawn. -welsh',
  secondaryContent: 'If you want to take further action, you will need to start a new application. -welsh',
  secondaryBtnLabel: 'Cau a dychwelyd i drosolwg o’r achos',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  childArrangementContent: 'Ni fydd eich cais trefniadau plant yn cael ei gyhoeddi i’r partïon eraill',
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
