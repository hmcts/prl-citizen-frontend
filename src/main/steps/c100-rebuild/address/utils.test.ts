import { C100Applicant, C100RebuildPartyDetails } from '../../../app/case/definition';

import { C100UrlPartyType } from './definitions';
import { getPartyData } from './utils';

describe('C100 address utils', () => {
  test('getPartyData should return correct details for applicant', () => {
    expect(
      getPartyData(
        {
          appl_allApplicants: [
            {
              id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
              applicantFirstName: 'firstName',
              applicantLastName: 'lastName',
            } as C100Applicant,
          ],
        },
        '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        'applicant' as C100UrlPartyType
      )
    ).toStrictEqual({
      partyData: {
        id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        applicantFirstName: 'firstName',
        applicantLastName: 'lastName',
      },
      firstName: 'firstName',
      lastName: 'lastName',
    });
  });

  test('getPartyData should return correct details for respondent', () => {
    expect(
      getPartyData(
        {
          resp_Respondents: [
            {
              id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
              firstName: 'firstName',
              lastName: 'lastName',
            } as C100RebuildPartyDetails,
          ],
        },
        '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        'respondent-details' as C100UrlPartyType
      )
    ).toStrictEqual({
      partyData: {
        id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        firstName: 'firstName',
        lastName: 'lastName',
      },
      firstName: 'firstName',
      lastName: 'lastName',
    });
  });

  test('getPartyData should return correct details for other-person', () => {
    expect(
      getPartyData(
        {
          oprs_otherPersons: [
            {
              id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
              firstName: 'firstName',
              lastName: 'lastName',
            } as C100RebuildPartyDetails,
          ],
        },
        '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        'other-person-details' as C100UrlPartyType
      )
    ).toStrictEqual({
      partyData: {
        id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        firstName: 'firstName',
        lastName: 'lastName',
      },
      firstName: 'firstName',
      lastName: 'lastName',
    });
  });
});
