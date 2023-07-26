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
  title: 'Complete your response',
  line1: "Complete your response to the applicant's request for child arrangements.",
  line2: 'Once you have completed all of the main sections, you will be able to review and submit your answers.',
  listItem: 'Your Case number is: ',
  continue: 'Continue',
};

const cyContent = {
  title: 'Cwblhau eich ymateb',
  line1: 'Cwblhau eich ymateb i gais yr ymgeisydd am drefniadau plant.',
  line2: "Ar ôl i chi  gwblhau'r holl brif adrannau, byddwch yn gallu adolygu a chyflwyno eich atebion.",
  listItem: 'Rhif eich achos yw:',
  continue: 'Parhau',
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
