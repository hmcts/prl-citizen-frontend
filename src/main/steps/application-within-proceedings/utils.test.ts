import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../app/case/CosApiClient';
import { CaseWithId } from '../../app/case/case';
import {
  AWPApplicationReason,
  AWPApplicationType,
  AWPFeeDetailsRequest,
  CaseData,
  CaseType,
  FeeDetailsResponse,
  PartyType,
  YesOrNo,
} from '../../app/case/definition';
import { AppSession, UserDetails } from '../../app/controller/AppRequest';

import {
  fetchAndSaveFeeCodeDetails,
  getApplicationDetails,
  isValidApplicationReason,
  processAWPApplication,
  resetAWPApplicationData,
} from './utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const createAWPApplicationMock = jest.spyOn(CosApiClient.prototype, 'createAWPApplication');

describe('AWP utils', () => {
  let req;
  let awpRequest;

  beforeEach(() => {
    req = mockRequest({
      params: {
        partyType: 'applicant',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          id: '1234',
          caseTypeOfApplication: 'FL401',
          caseInvites: [
            {
              value: {
                partyId: '123',
                invitedUserId: '1234',
                isApplicant: YesOrNo.YES,
              },
            },
          ],
          awpFeeDetails: {
            feeAmount: 167,
            feeAmountText: '167',
            feeType: 'MOCK_TYPE',
          },
          applicantsFL401: {
            email: 'string',
            gender: 'string',
            address: {
              AddressLine1: 'string',
              AddressLine2: 'string',
              PostTown: 'string',
              County: 'string',
              PostCode: 'string',
            },
            dxNumber: 'string',
            landline: 'string',
            lastName: 'string',
            firstName: 'string',
            dateOfBirth: 'string',
            otherGender: 'string',
            phoneNumber: 'string',
            placeOfBirth: 'string',
            previousName: 'string',
            solicitorOrg: {
              OrganisationID: 'string',
              OrganisationName: 'string',
            },
            sendSignUpLink: 'string',
            solicitorEmail: 'string',
            isAddressUnknown: 'string',
            solicitorAddress: {
              County: '',
              Country: '',
              PostCode: '',
              PostTown: '',
              AddressLine1: '',
              AddressLine2: '',
              AddressLine3: '',
            },
            isDateOfBirthKnown: 'string',
            solicitorReference: 'string',
            solicitorTelephone: 'string',
            isPlaceOfBirthKnown: 'string',
            isDateOfBirthUnknown: 'string',
            isAddressConfidential: 'string',
            isCurrentAddressKnown: 'string',
            relationshipToChildren: 'string',
            representativeLastName: 'string',
            representativeFirstName: 'string',
            canYouProvidePhoneNumber: 'string',
            canYouProvideEmailAddress: 'string',
            isAtAddressLessThan5Years: 'string',
            isPhoneNumberConfidential: 'string',
            isEmailAddressConfidential: 'string',
            respondentLivedWithApplicant: 'string',
            doTheyHaveLegalRepresentation: 'string',
            addressLivedLessThan5YearsDetails: 'string',
            otherPersonRelationshipToChildren: [],
            isAtAddressLessThan5YearsWithDontKnow: 'string',
            response: {},
            partyId: '123',
            user: {
              email: 'string',
              idamId: '1234',
            },
          },
        },
        user: {
          id: '1234',
        },
      },
    });

    awpRequest = mockRequest({
      session: {
        applicationSettings: {
          awpSelectedApplicationDetails: {
            language: 'en',
            applicationType: 'C3',
            applicationReason: 'order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
          },
        },
        userCase: {
          ...req.session.userCase,
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
        paymentError: {},
      },
    });

    jest.clearAllMocks();
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
    ).toStrictEqual({
      applicationType: 'N161',
      applicationReason: 'appeal-a-order-or-ask-permission-to-appeal',
      reasonText: 'Appeal a court order or ask for permission to appeal',
      applicationFee: '167',
      applicationFeeAmount: 167,
      applicationFormUrl:
        'https://www.gov.uk/government/publications/form-n161-appellants-notice-all-appeals-except-small-claims-track-appeals-and-appeals-to-the-family-division-of-the-high-court',
    });
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
    resetAWPApplicationData(awpRequest);
    expect(awpRequest.session.applicationSettings).toStrictEqual({});
    delete req.session.userCase.awpFeeDetails;
    expect(awpRequest.session.userCase).toStrictEqual(req.session.userCase);
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

  describe('saveAWPApplication', () => {
    const res = mockResponse();
    const userDetails: UserDetails = {
      accessToken: '123',
      email: 'billy@bob.com',
      givenName: 'billy',
      familyName: 'bob',
      id: '1234',
    };

    test('should create application and redirect if hwf reference exists', async () => {
      awpRequest = {
        ...awpRequest,
        params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
        session: {
          ...awpRequest.session,
          user: userDetails,
          userCase: {
            ...awpRequest.session.userCase,
            paymentData: {
              paymentReference: 'MOCK_REFERENCE',
              paymentDate: 'MOCK_DATE',
              externalReference: 'MOCK_REFERENCE',
              nextActionUrl: 'MOCK_URL',
              paymentStatus: 'Success',
              paymentServiceRequestReference: 'MOCK_REFERENCE',
            },
          },
        },
      };
      const response = {
        id: '200',
        state: 'SUCCESS',
        data: [
          {
            caseData: { id: '123445566' },
            stateName: 'Draft',
          },
        ],
      };
      createAWPApplicationMock.mockResolvedValueOnce(response as unknown as Promise<CaseWithId>);
      await processAWPApplication(awpRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(
        '/applicant/application-within-proceedings/C2/request-more-time/application-submitted'
      );
      expect(awpRequest.session.paymentError.hasError).toBe(false);
      expect(awpRequest.session.save).toHaveBeenCalled();
      expect(awpRequest.session.userCase.paymentData).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationType).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationReason).toBe(undefined);
    });

    test('should catch error with create awp application and redirect when hwf reference exists', async () => {
      awpRequest = {
        ...awpRequest,
        params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
        session: {
          ...awpRequest.session,
          user: userDetails,
          userCase: {
            ...awpRequest.session.userCase,
            paymentData: {
              paymentReference: 'MOCK_REFERENCE',
              paymentDate: 'MOCK_DATE',
              externalReference: 'MOCK_REFERENCE',
              nextActionUrl: 'MOCK_URL',
              paymentStatus: 'Success',
              paymentServiceRequestReference: 'MOCK_REFERENCE',
            },
          },
        },
      };
      createAWPApplicationMock.mockRejectedValueOnce({ status: '500' });
      await processAWPApplication(awpRequest, res);

      expect(awpRequest.session.paymentError.hasError).toBe(true);
      expect(awpRequest.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(
        '/applicant/application-within-proceedings/C2/request-more-time/checkanswers'
      );
      expect(awpRequest.session.userCase.paymentData).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationType).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationReason).toBe(undefined);
    });

    test('should create application and redirect if hwf reference does not exist', async () => {
      awpRequest = {
        ...awpRequest,
        params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
        session: {
          ...awpRequest.session,
          user: userDetails,
          userCase: {
            ...awpRequest.session.userCase,
            paymentData: {
              paymentReference: 'MOCK_REFERENCE',
              paymentDate: 'MOCK_DATE',
              externalReference: 'MOCK_REFERENCE',
              nextActionUrl: 'MOCK_URL',
              paymentStatus: 'Success',
              paymentServiceRequestReference: 'MOCK_REFERENCE',
            },
          },
        },
      };
      delete awpRequest.session.userCase.awp_hwf_referenceNumber;
      const response = {
        id: '200',
        state: 'SUCCESS',
        data: [
          {
            caseData: { id: '123445566' },
            stateName: 'Draft',
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: { status: 'Success' } });
      mockedAxios.post.mockResolvedValue(response as unknown as Promise<CaseWithId>);

      await processAWPApplication(awpRequest, res);

      expect(res.redirect).toHaveBeenCalledWith(
        '/applicant/application-within-proceedings/C2/request-more-time/application-submitted'
      );
      expect(awpRequest.session.paymentError.hasError).toBe(false);
      expect(awpRequest.session.save).toHaveBeenCalled();
      expect(awpRequest.session.userCase.paymentData).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationType).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationReason).toBe(undefined);
    });

    test('should catch rejected promise from payment status and redirect', async () => {
      awpRequest = {
        ...awpRequest,
        params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
        session: {
          ...awpRequest.session,
          user: userDetails,
          userCase: {
            ...awpRequest.session.userCase,
            paymentData: {
              paymentReference: 'MOCK_REFERENCE',
              paymentDate: 'MOCK_DATE',
              externalReference: 'MOCK_REFERENCE',
              nextActionUrl: 'MOCK_URL',
              paymentStatus: 'Success',
              paymentServiceRequestReference: 'MOCK_REFERENCE',
            },
          },
        },
      };
      delete awpRequest.session.userCase.awp_hwf_referenceNumber;

      mockedAxios.get.mockResolvedValueOnce({ data: { status: 'reject' } });

      await processAWPApplication(awpRequest, res);

      expect(awpRequest.session.paymentError.hasError).toBe(true);
      expect(awpRequest.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(
        '/applicant/application-within-proceedings/C2/request-more-time/checkanswers'
      );
      expect(awpRequest.session.userCase.paymentData).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationType).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationReason).toBe(undefined);
    });

    test('should catch error with payment status and redirect', async () => {
      awpRequest = {
        ...awpRequest,
        params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
        session: {
          ...awpRequest.session,
          user: {
            id: userDetails,
          },
          userCase: {
            ...awpRequest.session.userCase,
            paymentData: undefined,
          },
        },
      };

      await processAWPApplication(awpRequest, res);

      expect(awpRequest.session.paymentError.hasError).toBe(true);
      expect(awpRequest.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(
        '/applicant/application-within-proceedings/C2/request-more-time/checkanswers'
      );
      expect(awpRequest.session.userCase.paymentData).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationType).toBe(undefined);
      expect(awpRequest.session.userCase.awp_applicationReason).toBe(undefined);
    });
  });
});
