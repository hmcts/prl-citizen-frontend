import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  pageTitle: 'Document submitted',
  bannerHeading: 'Important',
  bannerTitle: 'You must serve the documents',
  paragraphs: [
    'You can do this by sending them to the party’s legal representative if they have one, or by posting or emailing them directly to the party.',
  ],
  whatHappensNext: 'What happens next',
  courtWillMakeDecisions: 'The court will make a decision on whether to restrict access to this document.',
  accessToCourtOnly: 'Access to the document will only be given to the court and judiciary.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Cyflwynwyd y ddogfen',
  bannerHeading: 'Pwysig',
  bannerTitle: "Rhaid i chi gyflwyno'r dogfennau",
  paragraphs: [
    'Gallwch wneud hyn drwy eu hanfon at gynrychiolydd cyfreithiol y parti os oes ganddynt un, neu drwy eu postio neu eu hanfon yn uniongyrchol at y parti.',
  ],
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  courtWillMakeDecisions: "Bydd y llys yn penderfynu a ddylid cyfyngu ar fynediad i'r ddogfen hon ai peidio",
  accessToCourtOnly: "Dim ond i'r llys a'r farnwriaeth y rhoddir mynediad i'r ddogfen",
  continue: 'Cau a dychwelyd i drosolwg o’r achos',
  uploadAgain: 'Llwytho dogfen arall',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('respondent -> upload-document -> upload-document-success', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          docCategory: DocCategory.WITNESS_STATEMENT,
          docType: DocType.YOUR_WITNESS_STATEMENTS,
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.uploadAgain).toEqual('Upload another document');
    expect(generatedContent.continue).toEqual('Close and return to case overview');
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
/* eslint-enable @typescript-eslint/ban-types */
