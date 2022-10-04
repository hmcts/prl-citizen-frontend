import { CaseData, ThePrayer } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | ThePrayer[] | null>> = {
    applicant1Address1: 'MOCK_applicant1Address1',
    applicant1Address2: 'MOCK_applicant1Address2',
    applicant1AddressTown: 'MOCK_applicant1AddressTown',
    applicant1ContactDetailsConsent: 'Yes',
    applicant1EmailAddress: 'abc@gmail.com',
    applicant1FirstNames: 'MOCK_applicant1FirstNames',
    applicant1FullName: 'MOCK_applicant1FullName',
    applicant1HasOtherNames: 'Yes',
    applicant1LastNames: 'MOCK_applicant1LastNames',
    applicant1Occupation: 'MOCK_applicant1Occupation',
    applicant1PhoneNumber: '1234567890',
    applicant1PlaceOfBirth: 'MOCK_applicant1PlaceOfBirth',
    caseCode: 'MOCK_caseCode',
    citizenRole: 'MOCK_applicant',
    claimNumber: 'MOCK_claimNumber',
    respondentFirstName: 'MOCK_respondentFirstName',
    respondentLastName: 'MOCK_respondentLastName',
    serviceType: 'MOCK_serviceType',
  };

  test('should convert results from api to prl citizen format', async () => {
    const privateLawFormat = fromApiFormat({
      applicant1Address1: 'MOCK_applicant1Address1',
      applicant1Address2: 'MOCK_applicant1Address2',
      applicant1AddressTown: 'MOCK_applicant1AddressTown',
      applicant1ContactDetailsConsent: 'Yes',
      applicant1EmailAddress: 'abc@gmail.com',
      applicant1FirstNames: 'MOCK_applicant1FirstNames',
      applicant1FullName: 'MOCK_applicant1FullName',
      applicant1HasOtherNames: 'Yes',
      applicant1LastNames: 'MOCK_applicant1LastNames',
      applicant1Occupation: 'MOCK_applicant1Occupation',
      applicant1PhoneNumber: '1234567890',
      applicant1PlaceOfBirth: 'MOCK_applicant1PlaceOfBirth',
      caseCode: 'MOCK_caseCode',
      citizenRole: 'MOCK_applicant',
      claimNumber: 'MOCK_claimNumber',
      respondentFirstName: 'MOCK_respondentFirstName',
      respondentLastName: 'MOCK_respondentLastName',
      serviceType: 'MOCK_serviceType',
    } as unknown as CaseData);
    expect(privateLawFormat).toStrictEqual(results);
  });
});
