import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { form, generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Your witness statements',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Eich datganiadau tyst',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  const formContent = form as FormContent;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Your witness statements');
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent.caseNumber).toEqual('Case number');
    expect(generatedContent.continue).toEqual('Go back');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should generate content with orders', () => {
    commonContent.userCase! = {
      ...commonContent.userCase,
      citizenUploadedDocumentList: [
        {
          id: 'string',
          value: {
            parentDocumentType: 'string',
            documentType: 'Your witness statements',
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
            documentRequestedByCourt: 'Yes' as YesOrNo,
          },
        },
      ],
    };
    expect(generateContent(commonContent)).toStrictEqual({
      caseNumber: 'Case number',
      continue: 'Go back',
      orders: [
        {
          createdDate: 'string',
          fileName: 'string',
          href: '/yourdocuments/alldocuments/downloadCitizenDocument/123',
        },
      ],
      section: 'All documents',
      title: 'Your witness statements',
    });
  });

  test('should contain caseNumber field', () => {
    fields = formContent.fields as FormFields;
    const caseNumberField = fields({ caseCode: '1234' }).caseNumber as FormOptions;
    expect(caseNumberField.type).toBe('hidden');
    expect((caseNumberField.label as Function)(generatedContent)).toBe(enContent.caseNumber + '1234');
  });

  test('should contain submit button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe(enContent.continue);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
