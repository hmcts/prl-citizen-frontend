import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Your court hearings',
  goBack: 'Go back',
  caseNumber: 'Case number',
  yourPreviousHearings: 'Your previous hearings',
  hearing: 'Hearing',
  hearingDate: 'Date',
  hearingTime: 'Time',
  typeOfHearing: 'Type of hearing',
  courtName: 'Court name',
  courtAddress: 'Court address',
  hearingOutcome: 'Hearing outcome',
  usefulDocumentsMap: 'Useful documents (Map)',
};

const cyContent: typeof enContent = {
  section: 'Eich gwrandawiadau llys',
  goBack: 'Mynd yn ôl',
  caseNumber: 'Rhif yr achos',
  yourPreviousHearings: 'Eich gwrandawiadau blaenorol',
  hearing: 'Clyw',
  hearingDate: 'Dyddiad',
  hearingTime: 'Amser',
  typeOfHearing: 'Math o wrandawiad',
  courtName: 'Enw llys',
  courtAddress: 'Cyfeiriad y llys',
  hearingOutcome: 'Canlyniad y gwrandawiad',
  usefulDocumentsMap: 'Dogfennau defnyddiol (Map)',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home yourhearings hearings content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Your court hearings');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain go back button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Go back');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
