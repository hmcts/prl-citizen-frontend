import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import {
  AWPApplicationReason,
  AWPApplicationType,
  AWPFeeDetailsRequest,
  CaseData,
  CaseType,
  FeeDetailsResponse,
  PartyType,
} from '../../app/case/definition';
import { AppRequest, AppSession } from '../../app/controller/AppRequest';

import {
  fetchAndSaveFeeCodeDetails,
  getApplicationDetails,
  isValidApplicationReason,
  resetAWPApplicationData,
} from './utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWP utils', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
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
          awpFeeDetails: {
            feeAmount: 167,
            feeAmountText: '167',
            feeType: 'MOCK_TYPE',
          },
        },
        user: {
          id: '1234',
        },
      },
    });
  });

  test('Should return correct details for C100 applicant', async () => {
    expect(
      getApplicationDetails(
        req.params.applicationType,
        req.params.applicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        req.session as unknown as AppSession
      )
    ).toStrictEqual({
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
      reasonText: 'Ask to delay or cancel a hearing date',
      applicationFee: '167',
      applicationFeeAmount: 167,
      applicationFormUrl:
        'https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part',
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
        req.session as unknown as AppSession
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
        req.session as unknown as AppSession
      )
    ).toBe(undefined);
  });

  test('Should return appSettings details if correct values present', async () => {
    const session = {
      applicationSettings: {
        awpSelectedApplicationDetails: {
          language: 'en',
          applicationType: 'C3',
          applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
        },
      },
    } as unknown as AppSession;
    expect(
      getApplicationDetails(
        'C3' as AWPApplicationType,
        'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child' as AWPApplicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        session
      )
    ).toStrictEqual({
      language: 'en',
      applicationType: 'C3',
      applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
    });
  });

  test('Should not return appSettings details if wrong values present', async () => {
    const session = {
      ...req.session,
      applicationSettings: {
        awpSelectedApplicationDetails: {
          language: 'en',
          applicationType: 'C3',
          applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
        },
      },
    } as unknown as AppSession;
    expect(
      getApplicationDetails(
        req.params.applicationType,
        req.params.applicationReason,
        CaseType.C100,
        PartyType.APPLICANT,
        'en',
        session
      )
    ).toStrictEqual({
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
      reasonText: 'Ask to delay or cancel a hearing date',
      applicationFee: '167',
      applicationFeeAmount: 167,
      applicationFormUrl:
        'https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part',
    });
  });

  test('Should return true for valid values', async () => {
    expect(
      isValidApplicationReason(
        req.params.applicationType,
        req.params.applicationReason,
        CaseType.C100,
        PartyType.APPLICANT
      )
    ).toBe(true);
  });

  test('Should return false for invalid values', async () => {
    expect(
      isValidApplicationReason(AWPApplicationType.C1, req.params.applicationReason, CaseType.FL401, PartyType.APPLICANT)
    ).toBe(false);
  });

  test('should reset AWP app data', () => {
    const awpRequest = {
      session: {
        applicationSettings: {
          awpSelectedApplicationDetails: {
            language: 'en',
            applicationType: 'C3',
            applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
          },
        },
        userCase: {
          awpFeeDetails: {
            feeAmount: 167,
            feeAmountText: '167',
            feeType: 'MOCK_TYPE',
            errorRetrievingResponse: 'MOCK_ERROR',
          },
          awp_need_hwf: 'Yes',
          awp_have_hwfReference: 'Yes',
          awp_hwf_referenceNumber: 'MOCK_VALUE',
          awp_completedForm: 'Yes',
          awp_agreementForRequest: 'Yes',
          awp_informOtherParties: 'Yes',
          awp_reasonCantBeInformed: 'MOCK_VALUE',
          awp_uploadedApplicationForms: [
            {
              id: 'MOCK_ID',
              url: 'MOCK_URL',
              filename: 'MOCK_FILE_NAME',
              binaryUrl: 'MOCK_BINARY_URL',
            },
          ],
          awp_cancelDelayHearing: 'MOCK_VALUE',
          awp_isThereReasonForUrgentRequest: 'Yes',
          awp_urgentRequestReason: 'MOCK_VALUE',
          awp_hasSupportingDocuments: 'Yes',
          awp_supportingDocuments: [
            {
              id: 'MOCK_ID',
              url: 'MOCK_URL',
              filename: 'MOCK_FILE_NAME',
              binaryUrl: 'MOCK_BINARY_URL',
            },
          ],
        },
      },
    } as unknown as AppRequest;
    resetAWPApplicationData(awpRequest);
    expect(awpRequest.session.applicationSettings).toStrictEqual({});
    expect(awpRequest.session.userCase).toStrictEqual({});
  });

  test('should fetch and save fee details', async () => {
    const applicationDetails = {
      caseId: '1234567' as CaseData['id'],
      applicationType: 'C2' as AWPApplicationType,
      applicationReason: 'delay-or-cancel-hearing' as AWPApplicationReason,
      caseType: 'FL401' as CaseType,
      partyType: 'applicant' as PartyType,
    } as AWPFeeDetailsRequest;
    const feeDetails = {
      feeAmount: 167,
      feeAmountText: '167',
      feeType: 'MOCK_FEE_TYPE',
    };

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    await fetchAndSaveFeeCodeDetails(req, req.session.user, applicationDetails);
    expect(req.session.userCase.awpFeeDetails).toEqual({
      feeAmount: 167,
      feeAmountText: '£167',
      feeType: 'MOCK_FEE_TYPE',
    });
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should throw error if errorRetrievingResponse', async () => {
    const applicationDetails = {
      caseId: '1234567' as CaseData['id'],
      applicationType: 'C2' as AWPApplicationType,
      applicationReason: 'delay-or-cancel-hearing' as AWPApplicationReason,
      caseType: 'FL401' as CaseType,
      partyType: 'applicant' as PartyType,
    } as AWPFeeDetailsRequest;
    const feeDetails = {
      feeAmount: 167,
      feeAmountText: '167',
      feeType: 'MOCK_FEE_TYPE',
      errorRetrievingResponse: 'MOCK_ERROR_RESPONSE',
    };

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);

    let flag;
    try {
      await fetchAndSaveFeeCodeDetails(req, req.session.user, applicationDetails);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });

  test('should throw error if error with retrieving fee', async () => {
    const applicationDetails = {
      caseId: '1234567' as CaseData['id'],
      applicationType: 'C2' as AWPApplicationType,
      applicationReason: 'delay-or-cancel-hearing' as AWPApplicationReason,
      caseType: 'FL401' as CaseType,
      partyType: 'applicant' as PartyType,
    } as AWPFeeDetailsRequest;
    const feeDetails = {
      feeAmount: 167,
      feeAmountText: '167',
      feeType: 'MOCK_FEE_TYPE',
      errorRetrievingResponse: 'MOCK_ERROR_RESPONSE',
    };

    mockedAxios.post.mockReturnValueOnce({ data: feeDetails } as unknown as Promise<FeeDetailsResponse>);
    req.session.save = undefined;

    let flag;
    try {
      await fetchAndSaveFeeCodeDetails(req, req.session.user, applicationDetails);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });
});
