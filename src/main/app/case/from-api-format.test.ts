import { CaseData, ThePrayer } from './definition';
import { checkboxConverter, fromApiDate, fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | ThePrayer[] | null>> = {
    applicant1ContactDetailsConsent: 'Yes',
    citizenUserEmailAddress: 'abc@gmail.com',
    citizenUserFirstNames: 'MOCK_applicant1FirstNames',
    citizenUserFullName: 'MOCK_applicant1FullName',
    applicant1HasOtherNames: 'Yes',
    citizenUserLastNames: 'MOCK_applicant1LastNames',
    applicant1Occupation: 'MOCK_applicant1Occupation',
    citizenUserPhoneNumber: '1234567890',
    citizenUserPlaceOfBirth: 'MOCK_applicant1PlaceOfBirth',
    caseCode: 'MOCK_caseCode',
    citizenRole: 'MOCK_applicant',
    claimNumber: 'MOCK_claimNumber',
    respondentFirstName: 'MOCK_respondentFirstName',
    respondentLastName: 'MOCK_respondentLastName',
    serviceType: 'MOCK_serviceType',
  };

  test('should convert results from api to prl citizen format', async () => {
    const privateLawFormat = fromApiFormat({
      applicant1ContactDetailsConsent: 'Yes',
      citizenUserEmailAddress: 'abc@gmail.com',
      citizenUserFirstNames: 'MOCK_applicant1FirstNames',
      citizenUserFullName: 'MOCK_applicant1FullName',
      applicant1HasOtherNames: 'Yes',
      citizenUserLastNames: 'MOCK_applicant1LastNames',
      applicant1Occupation: 'MOCK_applicant1Occupation',
      citizenUserPhoneNumber: '1234567890',
      citizenUserPlaceOfBirth: 'MOCK_applicant1PlaceOfBirth',
      caseCode: 'MOCK_caseCode',
      citizenRole: 'MOCK_applicant',
      claimNumber: 'MOCK_claimNumber',
      respondentFirstName: 'MOCK_respondentFirstName',
      respondentLastName: 'MOCK_respondentLastName',
      serviceType: 'MOCK_serviceType',
    } as unknown as CaseData);
    expect(privateLawFormat).toStrictEqual(results);
  });
  test('fromApiDate', async () => {
    const emptyDate = fromApiDate('');
    const date = fromApiDate('2023-12-20');
    expect(emptyDate).toStrictEqual({ year: '', month: '', day: '' });
    expect(date).toStrictEqual({ year: '2023', month: '12', day: '20' });
  });
  test('checkboxConverter', async () => {
    const emptyDate = checkboxConverter('');
    const date = checkboxConverter('Yes');
    expect(emptyDate).toStrictEqual(undefined);
    expect(date).toStrictEqual('checked');
  });
});
