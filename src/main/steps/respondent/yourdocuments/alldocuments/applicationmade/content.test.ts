import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Applications made in these proceedings',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Applications made in these proceedings (welsh)',
  caseNumber: 'Rhif yr achos',
  continue: 'Go back (welsh)',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  const commonContent2 = {
    language: 'en',
    userCase: {
      existingProceedings: [
        {
          id: 'string',
          value: {
            previousOrOngoingProceedings: 'string',
            caseNumber: 'string',
            dateStarted: 'string',
            dateEnded: 'string',
            typeOfOrder: ['1', '2'],
            otherTypeOfOrder: 'string',
            nameOfJudge: 'string',
            nameOfCourt: 'string',
            nameOfChildrenInvolved: 'string',
            nameOfGuardian: 'string',
            nameAndOffice: 'string',
            uploadRelevantOrder: {
              document_url: 'string/123',
              document_filename: 'string',
              document_binary_url: 'string',
            },
          },
        },
      ],
    },
  } as CommonContent;
  let generatedContent, generateContent2;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generateContent2 = generateContent(commonContent2);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Applications made in these proceedings');
    expect(generatedContent.section).toEqual('All documents');
    expect(generateContent2.section).toEqual('All documents');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
/* eslint-enable @typescript-eslint/ban-types */
