import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { AWPApplicationReason, AWPApplicationType, CaseType, PartyType } from '../../app/case/definition';

import { getApplicationDetails } from './utils';

describe('AWP utils', () => {
  const req = mockRequest({
    params: {
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
    },
    session: {
      userCase: {
        id: '1234',
        caseTypeOfApplication: 'FL401',
        caseInvites: [],
        respondents: '',
        respondentsFL401: '',
      },
      user: {
        id: '1234',
      },
    },
  });

  test('Should return correct details for C100 applicant', async () => {
    expect(
      getApplicationDetails(
        req.params.applicationType,
        req.params.applicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        undefined
      )
    ).toStrictEqual({
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
      reasonText: 'Ask to delay or cancel a hearing date',
      applicationFee: '£167',
    });
  });

  test('Should not return details for wrong case type', async () => {
    expect(
      getApplicationDetails(
        'FL403' as AWPApplicationType,
        'change-extend-or-cancel-non-molestation-order-or-occupation-order' as AWPApplicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        undefined
      )
    ).toBe(undefined);
  });

  test('Should not return details for wrong applicant', async () => {
    expect(
      getApplicationDetails(
        'N161' as AWPApplicationType,
        'appeal-a-order-or-ask-permission-to-appeal' as AWPApplicationReason,
        CaseType.FL401,
        PartyType.RESPONDENT,
        'en',
        undefined
      )
    ).toBe(undefined);
  });

  test('Should return appSettings details if correct values present', async () => {
    const appSettings = {
      awpSelectedApplicationDetails: {
        language: 'en',
        applicationType: 'C3',
        applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
      },
    };
    expect(
      getApplicationDetails(
        'C3' as AWPApplicationType,
        'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child' as AWPApplicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        appSettings
      )
    ).toStrictEqual({
      language: 'en',
      applicationType: 'C3',
      applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
    });
  });

  test('Should not return appSettings details if wrong values present', async () => {
    const appSettings = {
      awpSelectedApplicationDetails: {
        language: 'en',
        applicationType: 'C3',
        applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
      },
    };
    expect(
      getApplicationDetails(
        req.params.applicationType,
        req.params.applicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        appSettings
      )
    ).toStrictEqual({
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
      reasonText: 'Ask to delay or cancel a hearing date',
      applicationFee: '£167',
    });
  });
});
