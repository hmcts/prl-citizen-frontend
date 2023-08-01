import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { DocCategory, DocType } from '../../../../app/case/definition';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

//const docsEmail = 'test';

const en = {
  section: 'How your documents will be shared',
  status: 'Your documents have been uploaded',
  continue: 'Continue',
  remove: 'Remove',
  sucess: 'Success',
  documentDetails: 'Your documents for ',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  status: 'Mae eich dogfennau wedi’u llwytho',
  continue: 'Parhau',
  remove: 'Dileu',
  sucess: 'Llwyddiant',
  documentDetails: 'Eich dogfennau ar gyfer',
  uploadAgain: 'Llwytho dogfen arall',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
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
    expect(generatedContent.status).toEqual('Your documents have been uploaded');
    expect(generatedContent.section).toEqual('How your documents will be shared');
    expect(generatedContent.uploadAgain).toEqual('Upload another document');
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.sucess).toEqual('Success');
    expect(generatedContent.documentDetails).toEqual('Your documents for ');
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
