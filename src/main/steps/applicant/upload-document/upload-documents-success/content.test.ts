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
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Document submitted - welsh',
  bannerHeading: 'Important - welsh',
  bannerTitle: 'You must serve the documents - welsh',
  paragraphs: [
    'You can do this by sending them to the party’s legal representative if they have one, or by posting or emailing them directly to the party. - welsh',
  ],
  whatHappensNext: 'What happens next - welsh',
  courtWillMakeDecisions: 'The court will make a decision on whether to restrict access to this document. - welsh',
  continue: 'Close and return to case overview - welsh',
  uploadAgain: 'Llwytho dogfen arall',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant -> upload-document -> upload-document-success', () => {
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
