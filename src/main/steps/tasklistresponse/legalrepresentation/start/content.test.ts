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
  title: 'Will you be using a legal representative to respond to the application?',
  insetText:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application',
    },
  },
};

const cyContent = {
  title: 'Will you be using a legal representative to respond to the application?',
  insetText:
    "You can respond to the applicant's request yourself and then redirect your case to your legal representative for the remainder of the proceedings.",
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    legalRepresentation: {
      required: 'Select yes if you are using a legal representative to respond to the application',
    },
  },
};

describe('consent to the application', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });
});
