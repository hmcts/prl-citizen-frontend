import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Tenancy and mortgage',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Tenantiaeth a morgais',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    userIdamId: '123',
    byApplicant: 'Yes',
    name: 'string',
    userCase: {
      citizenUploadedDocumentList: [
        {
          id: 'string',
          value: {
            parentDocumentType: 'string',
            documentType: 'Tenancy and mortgage agreements',
            partyName: 'string',
            isApplicant: 'Yes',
            uploadedBy: '123',
            dateCreated: 'string',
            documentDetails: {
              documentName: 'string',
              documentUploadedDate: 'string',
            },
            citizenDocument: {
              document_url: 'string/123',
              document_filename: 'string',
              document_binary_url: 'string',
            },
            documentRequestedByCourt: 'Yes',
          },
        },
      ],
    },
    additionalData: {
      req: {
        session: {
          applicationSettings: {
            docToView: {
              docType: 'tenancyandmortgageavailability',
              uploadedBy: 'respondent',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
  const commonContent2 = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          applicationSettings: {
            docToView: {
              docType: 'tenancyandmortgageavailability',
              uploadedBy: 'respondent',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent, generatedContent2;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generatedContent2 = generateContent(commonContent2);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Tenancy and mortgage');
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent2.section).toEqual('All documents');
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
