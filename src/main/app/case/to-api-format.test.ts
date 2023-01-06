const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { Case, FieldPrefix } from './case';
import { YesOrNo } from './definition';
import { OrNull, toApiDate, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    citizenUserEmailAddress: 'abc@gmail.com',
    citizenUserFirstNames: 'MOCK_applicant1FirstNames',
    citizenUserFullName: 'MOCK_applicant1FullName',
    citizenUserLastNames: 'MOCK_applicant1LastNames',
    applicant1Occupation: 'MOCK_applicant1Occupation',
    citizenUserPhoneNumber: '1234567890',
    citizenUserPlaceOfBirth: 'MOCK_applicant1PlaceOfBirth',
    caseCode: 'MOCK_caseCode',
    claimNumber: 'MOCK_claimNumber',
    respondentFirstName: 'MOCK_respondentFirstName',
    respondentLastName: 'MOCK_respondentLastName',
    serviceType: 'MOCK_serviceType',
    applicant1ContactDetailsConsent: YesOrNo.YES,
    applicant1HasOtherNames: YesOrNo.YES,
    citizenRole: FieldPrefix.APPLICANT,
  };

  test('convert date to proper format - toApiDate', async () => {
    const expected = '2021-01-01';
    const apiFormat = toApiDate({ day: '1', month: '1', year: '2021' });
    expect(apiFormat).toBe(expected);
  });

  test('convert date to proper format - toApiDate with invalid values', async () => {
    const expected = '';
    const apiFormat = toApiDate({ day: '', month: '', year: '' });
    expect(apiFormat).toBe(expected);
  });

  test('should convert results from citizen-web to CCD api format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);
    expect(apiFormat).toStrictEqual({
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
      citizenRole: 'applicant',
      claimNumber: 'MOCK_claimNumber',
      respondentFirstName: 'MOCK_respondentFirstName',
      respondentLastName: 'MOCK_respondentLastName',
      serviceType: 'MOCK_serviceType',
    });
  });
});
