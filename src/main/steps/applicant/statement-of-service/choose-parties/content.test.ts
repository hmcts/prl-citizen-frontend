import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { cy, en, generateContent, getFormFields, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
let partyDetails;
describe('sos choose-parties content', () => {
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
        errors: [],
      },
    },
  };
  partyDetails = [
    {
      id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      value: {
        firstName: 'testuser',
        lastName: 'Citizen',
        email: 'abc@example.net',
        dateOfBirth: '03-20-2023',
        phoneNumber: '7755664466',
        placeOfBirth: 'BPP',
        previousName: 'test',
        isAtAddressLessThan5Years: 'No',
        addressLivedLessThan5YearsDetails: 'Hello',
        address: {
          AddressLine1: 'string',
          AddressLine2: 'string',
          AddressLine3: 'string',
          PostTown: 'string',
          County: 'string',
          PostCode: 'string',
          Country: 'string',
        },
        user: {
          idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          email: 'test@example.net',
        },
        response: {
          legalRepresentation: 'No',
        },
      },
    },
  ];
  commonContent.userCase = {
    applicants: partyDetails,
    respondents: partyDetails,
    sos_partiesServedDate: new Date(),
    sos_partiesServed: ['', '', ''],
  };
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.caption).toEqual('Case number ');
    expect(generatedContent.title).toEqual('Add a statement of service');
    expect(generatedContent.whowasserved).toEqual('Who was served?');
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.add).toEqual('Submit');
    expect(generatedContent.uploadFiles).toEqual('Your documents');
    expect(generatedContent.remove).toEqual('Remove');
    expect(generatedContent.uplodFileHintText).toEqual(
      'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue checkboxes', () => {
    const sos_partiesServed = fields.sos_partiesServed;
    expect(sos_partiesServed.type).toBe('checkboxes');
    expect(sos_partiesServed.validator).toBe(atLeastOneFieldIsChecked);

    const sos_partiesServedDate = fields.sos_partiesServedDate;
    expect(sos_partiesServedDate.type).toBe('date');
    expect((sos_partiesServedDate.label as Function)(generatedContent)).toBe(en.servedDate);
  });

  test('should return form fields', () => {
    expect(getFormFields(commonContent.userCase!).fields['soa_PartiesServed']).toBeDefined;
    expect(getFormFields(commonContent.userCase!).fields['soa_PartiesServedDate']).toBeDefined;
  });

  test('should generate form fields', () => {
    const formFields = generateFormFields(commonContent.userCase!);
    expect(formFields.fields['sos_partiesServed']).toBeDefined;
    expect(formFields.fields['sos_partiesServedDate'].values).toHaveLength(3);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
