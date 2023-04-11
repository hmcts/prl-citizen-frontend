import languageAssertions from './../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from './../../../common/common.content';
import { generateContent } from './content';

jest.mock('./../../../../app/form/validation');

const en = {
  caption: 'Reasonable adjustments',
  title: 'Let the court know if your support needs have changed',
  paragraph:
    'If your support needs have changed, you will need to get in touch with the court that is handling your case.',
  bulletHeading: 'You must:',
  bulletPoints: [
    'use GOV.UK to find <a  target="_blank" href="https://www.gov.uk/find-court-tribunal">contact details for the court</a>.',
    'contact the court by phone or email',
    'provide your name and case number',
    'explain to the court how your support needs have changed',
  ],
  paragraphs: [
    'If you are not sure which court is handling your case, see <a  target="_blank" href="/applicant/yourhearings/hearings">your court hearings</a>.',
    'The court will make arrangements and will be in touch with any further steps.',
  ],
};

const cy = {
  caption: 'Reasonable adjustments -welsh',
  title: 'Let the court know if your support needs have changed -welsh',
  paragraph:
    'If your support needs have changed, you will need to get in touch with the court that is handling your case. -welsh',
  bulletHeading: 'You must: -welsh',
  bulletPoints: [
    'use GOV.UK to find <a  target="_blank" href="https://www.gov.uk/find-court-tribunal">contact details for the court</a>. -welsh',
    'contact the court by phone or email -welsh',
    'provide your name and case number -welsh',
    'explain to the court how your support needs have changed -welsh',
  ],
  paragraphs: [
    'If you are not sure which court is handling your case, see <a  target="_blank" href="/applicant/yourhearings/hearings">your court hearings</a>. -welsh',
    'The court will make arrangements and will be in touch with any further steps. -welsh',
  ],
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern > abduction > child-location', () => {
  const commonContent = { language: 'en' } as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
