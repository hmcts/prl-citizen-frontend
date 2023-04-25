import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  title: 'Your documents have been uploaded',
  uploadAgain: 'Upload another document',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
};

const cy: typeof en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  title: 'Your documents have been uploaded',
  uploadAgain: 'Upload another document (welsh)',
  continue: 'Parhau',
  remove: 'Dileu',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
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
    expect(generatedContent.title).toEqual('Your documents have been uploaded');
    expect(generatedContent.uploadAgain).toEqual('Upload another document');
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.sucess).toEqual('Success');
    expect(generatedContent.documentDetails).toEqual('Your documents for ');
    expect(generatedContent.section).toEqual('How your documents will be shared');
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
