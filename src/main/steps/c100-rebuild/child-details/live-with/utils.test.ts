import { CaseWithId } from '../../../../app/case/case';

import { getAddresses, getPeople } from './utils';

describe('c100-rebuild > live-with > utils', () => {
  const userCase = {
    appl_allApplicants: [
      {
        id: '7483640e-0817-4ddc-b709-6723f79256781',
        applicantFirstName: 'Applicant1-firstName',
        applicantLastName: 'Applicant1-lastName',
        applicantAddress1: 'applicantAddress1',
        applicantAddress2: 'applicantAddress2',
        applicantAddressCounty: 'applicantAddressCounty',
        applicantAddressPostcode: 'applicantAddressPostcode',
        applicantAddressTown: 'applicantAddressTown',
      },
    ],
    resp_Respondents: [
      {
        id: '7483640e-0817-4ddc-b709-6723f79456782',
        firstName: 'Respondent1-firstName',
        lastName: 'Respondent1-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
      {
        id: '7483640e-0817-4ddc-b709-6723f73456783',
        firstName: 'Respondent2-firstName',
        lastName: 'Respondent2-lastName',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          County: '',
          PostCode: '',
          PostTown: '',
          Country: '',
        },
      },
    ],
    oprs_otherPersons: [
      {
        id: '7483640e-0817-4ddc-b709-6723f7945678',
        firstName: 'otherPerson-firstName',
        lastName: 'otherPerson-lastName',
        address: {
          AddressLine1: 'AddressLine1',
          AddressLine2: 'AddressLine2',
          County: 'County',
          PostCode: 'PostCode',
          PostTown: 'PostTown',
          Country: 'Country',
        },
      },
    ],
  } as unknown as Partial<CaseWithId>;

  describe('getPeople', () => {
    test('should return correct list of people', () => {
      expect(getPeople(userCase)).toStrictEqual([
        {
          firstName: 'Applicant1-firstName',
          id: '7483640e-0817-4ddc-b709-6723f79256781',
          lastName: 'Applicant1-lastName',
          partyType: 'applicant',
        },
        {
          firstName: 'Respondent1-firstName',
          id: '7483640e-0817-4ddc-b709-6723f79456782',
          lastName: 'Respondent1-lastName',
          partyType: 'respondent',
        },
        {
          firstName: 'Respondent2-firstName',
          id: '7483640e-0817-4ddc-b709-6723f73456783',
          lastName: 'Respondent2-lastName',
          partyType: 'respondent',
        },
        {
          firstName: 'otherPerson-firstName',
          id: '7483640e-0817-4ddc-b709-6723f7945678',
          lastName: 'otherPerson-lastName',
          partyType: 'otherPerson',
        },
      ]);
    });

    test('should return empty array when no people are present', () => {
      expect(getPeople({})).toStrictEqual([]);
    });
  });

  describe('getAddresses', () => {
    test('should get correct addresses', () => {
      expect(getAddresses(userCase)).toStrictEqual([
        {
          personId: '7483640e-0817-4ddc-b709-6723f79256781',
          address:
            'applicantAddress1, applicantAddress2, applicantAddressCounty, applicantAddressPostcode, applicantAddressTown',
        },
        {
          personId: '7483640e-0817-4ddc-b709-6723f79456782',
          address: 'AddressLine1, AddressLine2, County, PostCode, PostTown, Country',
        },
        {
          personId: '7483640e-0817-4ddc-b709-6723f73456783',
          address: '',
        },
        {
          personId: '7483640e-0817-4ddc-b709-6723f7945678',
          address: 'AddressLine1, AddressLine2, County, PostCode, PostTown, Country',
        },
      ]);
    });

    test('should return empty array when no people are present', () => {
      expect(getAddresses({})).toStrictEqual([]);
    });
  });
});
