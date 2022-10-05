import { CommonContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
} as CommonContent;

const enContent = {
  title: 'Transfer your case to your legal representative',
  line1: 'To transfer your case to your legal representative, provide them with your Case number.',
  line2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court.",
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  line3:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cyContent = {
  title: 'Transfer your case to your legal representative - welsh',
  line1: 'To transfer your case to your legal representative, provide them with your Case number. - welsh',
  line2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court. - welsh",
  listItem: 'Your Case number is:  - welsh',
  warning: 'Warning - welsh',
  line3:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response. - welsh',
  continue: 'Continue',
};

describe('consent to the application', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.continue).toEqual(enContent.continue);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.continue).toEqual(cyContent.continue);
  });
});
