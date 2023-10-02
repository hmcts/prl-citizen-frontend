import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { form, generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Orders from the court',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Gorchmynion gan y llys',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const userCase = {
    ...mockUserCase,
    orderCollection: [
      {
        id: 'e5b89eae-d6e1-4e15-a672-22a032617ff2',
        value: {
          dateCreated: '2022-07-18T11:04:34.483637',
          orderType: 'Special guardianship order (C43A)',
          orderDocument: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4',
            document_binary_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4/binary',
            document_filename: 'Special_Guardianship_Order_C43A.pdf',
          },
          orderDocumentWelsh: {
            document_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4',
            document_binary_url:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/f696d5ce-737f-47c3-9a93-d4662d1f82c4/binary',
            document_filename: 'Special_Guardianship_Order_C43A.pdf',
          },
          otherDetails: {
            createdBy: 'qaz',
            orderCreatedDate: '18 July 2022',
            orderMadeDate: '11 November 2019',
            orderRecipients: 'Test Solicitor\n\n',
          },
        },
      },
    ],
  };
  const commonContent = { language: 'en', userCase } as CommonContent;
  let generatedContent;
  const formContent = form as FormContent;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Orders from the court');
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

  test('should contain submit button', () => {
    expect(form?.submit?.classes).toBe('govuk-button--secondary');
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });

  test('should contain caseNumber field', () => {
    fields = formContent.fields as FormFields;
    const caseNumberField = fields({ caseCode: '1234' }).caseNumber as FormOptions;
    expect(caseNumberField.type).toBe('hidden');
    expect((caseNumberField.label as Function)(generatedContent)).toBe(enContent.caseNumber + '1234');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
