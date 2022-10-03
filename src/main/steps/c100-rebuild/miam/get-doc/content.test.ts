import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'You need to get a document from the mediator',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend.',
  lines: [
    'You will need to upload this document to the application.',
    'When you have a document from the mediator, come back to this screen to proceed with your application.',
  ],
  btnText: 'Save and come back later',
  btnLinkText: 'Go back',
};

const cy = {
  title: 'You need to get a document from the mediator - welsh',
  paragraph:
    'Ask the mediator to give you a signed document that confirms you attended a MIAM, or did not need to attend. - welsh',
  lines: [
    'You will need to upload this document to the application. - welsh',
    'When you have a document from the mediator, come back to this screen to proceed with your application. - welsh',
  ],
  btnText: 'Save and come back later - welsh',
  btnLinkText: 'Go back - welsh',
};

describe('miam -> get document from a mediator', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
