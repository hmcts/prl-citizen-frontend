import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  section: 'How your documents will be shared',
  title: 'Your document has been uploaded successfully',
  status: 'Your documents have been uploaded',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
};

const cy: typeof en = {
  section: 'How your documents will be shared - welsh',
  title: 'Your document has been uploaded successfully - welsh',
  status: 'Your documents have been uploaded - welsh',
  continue: 'Continue - welsh',
  remove: 'Remove - welsh',
  sucess: 'Success - welsh',
  documentDetails: 'Your documents for  - welsh',
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
    //expect(generatedContent.email).toEqual('test');
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
