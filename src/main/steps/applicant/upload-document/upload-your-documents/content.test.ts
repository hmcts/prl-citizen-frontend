import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
};

const cy: typeof en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Provide the documents');
    expect(generatedContent.section).toEqual('Provide the document');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadFiles).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
