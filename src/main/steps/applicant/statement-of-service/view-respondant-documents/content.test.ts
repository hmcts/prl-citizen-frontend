import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { cy, en, generateContent } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  commonContent.additionalData = {
    req: {
      query: {
        parentDocType: 'parent',
        docType: 'doc',
      },
      params: {
        context: 'order',
      },
      session: {
        userCase: {
          personalServiceUnServedRespondentPack: {
            packDocument: [
              {
                id: '',
                value: {
                  documentId: '123',
                  document_url: 'http://localhost:2001/abcd-efgh-ijkl-mnop',
                },
              },
            ],
          },
        },
      },
    },
  };
  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.data[0].documentId).toEqual('abcd-efgh-ijkl-mnop');
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
