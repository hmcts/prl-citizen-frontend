import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseDate } from '../../../../app/case/case';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import {
  Validator,
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  isDateInputInvalid,
  isFutureDate,
} from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { cy, en, generateContent, getFormFields } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
let partyDetails;
describe('sos choose-parties content', () => {
  partyDetails = [
    {
      id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      value: {
        firstName: 'testuser',
        lastName: 'Citizen',
        email: 'abc@example.net',
        sos_partiesServedDate: '03-20-2023',
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
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      applicants: partyDetails,
      respondents: partyDetails,
      sos_partiesServedDate: {
        year: '1987',
        month: '12',
        day: '12',
      },
      sos_partiesServed: ['', '', ''],
    },
    additionalData: {
      req: {
        query: {
          parentDocType: 'parent',
          docType: 'doc',
        },
        params: {
          context: 'order',
        },
        session: {
          errors: [
            {
              errorType: 'deleteError',
              propertyName: 'uploadDocumentFileUpload',
            },
          ],
        },
      },
    },
  } as unknown as CommonContent;

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

  test('should generate correct form fields for sos parties served date', () => {
    const { sos_partiesServed, sos_partiesServedDate } = fields as Record<string, FormFields>;

    expect(sos_partiesServed).toBeDefined;
    expect((form.onlyContinue.text as LanguageLookup)(generatedContent)).toBe(undefined);
    expect((sos_partiesServed.label as Function)(generatedContent)).toBe(en.whowasserved);
    expect(sos_partiesServedDate.values).toHaveLength(3);
    expect(sos_partiesServedDate.type).toBe('date');
    expect(sos_partiesServedDate.classes).toBe('govuk-date-input');
    expect((sos_partiesServedDate.hint as Function)(generatedContent)).toBe(en.servedDateHint);
    expect((sos_partiesServedDate.label as Function)(generatedContent)).toBe(en.servedDate);
    expect((sos_partiesServedDate.parser as Function)(sos_partiesServedDate).day).toBeDefined;

    expect(
      (sos_partiesServedDate.values[0].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Day');
    expect(sos_partiesServedDate.values[0].value).toBe('12');
    expect(sos_partiesServedDate.values[0].classes).toBe('govuk-input--width-2');
    expect(sos_partiesServedDate.values[0].attributes).toStrictEqual({
      inputMode: 'numeric',
      maxLength: 2,
      pattern: '[0-9]*',
    });
    expect(
      (sos_partiesServedDate.values[1].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Month');
    expect(sos_partiesServedDate.values[1].value).toBe('12');
    expect(sos_partiesServedDate.values[1].classes).toBe('govuk-input--width-2');
    expect(sos_partiesServedDate.values[1].attributes).toStrictEqual({
      inputMode: 'numeric',
      maxLength: 2,
      pattern: '[0-9]*',
    });
    expect(
      (sos_partiesServedDate.values[2].label as Function)({
        ...generatedContent,
        dateFormat: {
          day: 'Day',
          month: 'Month',
          year: 'Year',
        },
      })
    ).toBe('Year');
    expect(sos_partiesServedDate.values[2].value).toBe('1987');
    expect(sos_partiesServedDate.values[2].classes).toBe('govuk-input--width-4');
    expect(sos_partiesServedDate.values[2].attributes).toStrictEqual({
      inputMode: 'numeric',
      maxLength: 4,
      pattern: '[0-9]*',
    });
    (sos_partiesServedDate.validator as Validator)(
      commonContent.userCase!.sos_partiesServedDate as unknown as CaseDate
    );
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isDateInputInvalid).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
    expect(isFutureDate).toHaveBeenCalledWith({
      day: '12',
      month: '12',
      year: '1987',
    });
  });
});
/* eslint-enable @typescript-eslint/ban-types */
