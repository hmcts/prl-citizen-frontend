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
  medheading: 'Transfer your case to your legal representative',
  line3: 'Once you have submitted your response, you have the option to pass your case over to a legal representative.',
  line4:
    "You will need to provide them with your Case number. Once the case is transferred, you won't be able to edit your response.",
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  respond:
    'Do not respond to the application yourself, if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cyContent = {
  title: 'Cwblhau eich ymateb',
  line1: 'Cwblhau eich ymateb i gais yr ymgeisydd am drefniadau plant.',
  line2: "Ar ôl i chi  gwblhau'r holl brif adrannau, byddwch yn gallu adolygu a chyflwyno eich atebion.",
  medheading: "Trosglwyddo eich achos i'ch cynrychiolydd cyfreithiol",
  line3:
    'Ar ôl i chi gyflwyno eich ymateb, mae gennych yr opsiwn i basio eich achos drosodd i gynrychiolydd cyfreithiol.',
  line4:
    'Bydd angen i chi ddarparu eich rhif achos iddo. Unwaith y bydd yr achos yn cael ei drosglwyddo, ni fyddwch yn gallu golygu eich ymateb.',
  listItem: 'Rhif eich achos yw:',
  warning: 'Warning - welsh',
  respond:
    "Peidiwch ag ymateb i'r cais hwn eich hun os ydych yn bwriadu cael cynrychiolydd cyfreithiol i gwblhau'r ymateb.",
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
