import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
//import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { form, generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Applications made in these proceedings',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Ceisiadau a wnaed yn yr achos hwn',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
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
    expect(generatedContent.title).toEqual('Applications made in these proceedings');
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
    };
    expect(generateContent(commonContent)).toStrictEqual({
      caseNumber: 'Case number',
      continue: 'Go back',
      orders: [
        {
          createdDate: 'string',
          fileName: 'string',
          href: '/yourdocuments/alldocuments/applicationmade/123',
        },
      ],
      section: 'All documents',
      title: 'Applications made in these proceedings',
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
