import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  pageTitle: 'Document submitted',
  bannerHeading: 'Important',
  bannerTitle: 'Serve the documents',
  status: 'Your documents have been uploaded',
  paragraphs: [
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case.",
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email.",
  ],
  pageCaption: 'If you have requested this document to be restricted',
  pageContent:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Document submitted -welsh',
  bannerHeading: 'Important -welsh',
  bannerTitle: 'Serve the documents -welsh',
  status: 'Your documents have been uploaded -welsh',
  paragraphs: [
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case. -welsh",
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email. -welsh",
  ],
  pageCaption: 'If you have requested this document to be restricted -welsh',
  pageContent:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next. -welsh',
  continue: 'Close and return to case overview -welsh',
  uploadAgain: 'Llwytho dogfen arall',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.status).toEqual('Your documents have been uploaded');
    expect(generatedContent.bannerHeading).toEqual('Important');
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
