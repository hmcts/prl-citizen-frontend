import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  section: 'Document submitted',
  title: 'Important',
  text: 'Serve the documents',
  status: 'Your documents have been uploaded',
  para1:
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case.",
  para2:
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email.",
  restrictedHeading: 'If you have requested this document to be restricted',
  restrictedBody:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  section: 'Document submitted -welsh',
  title: 'Important -welsh',
  text: 'Serve the documents -welsh',
  status: 'Your documents have been uploaded -welsh',
  para1:
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case. -welsh",
  para2:
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email. -welsh",
  restrictedHeading: 'If you have requested this document to be restricted -welsh',
  restrictedBody:
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
    expect(generatedContent.title).toEqual('Important');
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
