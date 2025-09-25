import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as awpUtils from '../utils';

import AWPCheckAnswersPostController from './postController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const processAWPSpy = jest.spyOn(awpUtils, 'processAWPApplication').mockImplementation(jest.fn());

describe('AWPCheckAnswersPostController controller', () => {
  const mockForm = {
    fields: {
      field: {
        type: 'file',
      },
    },
    submit: {
      text: l => l.continue,
    },
  };
  const controller = new AWPCheckAnswersPostController(mockForm.fields);
  let awpRequest;
  let paymentResponse;

  beforeEach(() => {
    awpRequest = mockRequest({
      params: { partyType: 'applicant', applicationType: 'C2', applicationReason: 'request-more-time' },
      session: {
        save: jest.fn(done => done()),
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

    paymentResponse = {
      payment_reference: 'MOCK_REFERENCE',
      date_created: 'MOCK_DATE',
      external_reference: 'MOCK_REFERENCE',
      next_url: '/applicant/application-within-proceedings/C2/request-more-time/application-submitted',
      status: 'Success',
      serviceRequestReference: 'MOCK_REFERENCE',
    };

    jest.clearAllMocks();
  });

  test('should initiate payment and process awp application when redirect url not used', async () => {
    mockedAxios.post.mockResolvedValue({
      data: paymentResponse,
    });

    const res = mockResponse();
    await controller.post(awpRequest, res);

    // the paymentData object is cleared aat the end of the AWP processing (handlePageRedirection in utils.ts:512)
    // so would need to intercept the 'processAWPApplication' call to check paymentData before that happens
    expect(processAWPSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        session: expect.objectContaining({
          userCase: expect.objectContaining({
            paymentData: {
              paymentReference: 'MOCK_REFERENCE',
              paymentDate: 'MOCK_DATE',
              externalReference: 'MOCK_REFERENCE',
              nextActionUrl: '/applicant/application-within-proceedings/C2/request-more-time/application-submitted',
              paymentStatus: 'Success',
              paymentServiceRequestReference: 'MOCK_REFERENCE',
            },
          }),
        }),
      }),
      expect.anything()
    );
    expect(awpRequest.session.save).toHaveBeenCalled();
  });

  test('should initiate payment and redirect when properly redirect url exists', async () => {
    mockedAxios.post.mockResolvedValue({
      data: paymentResponse,
    });
    delete paymentResponse.serviceRequestReference;

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.userCase.paymentData).toStrictEqual({
      paymentReference: 'MOCK_REFERENCE',
      paymentDate: 'MOCK_DATE',
      externalReference: 'MOCK_REFERENCE',
      nextActionUrl: '/applicant/application-within-proceedings/C2/request-more-time/application-submitted',
      paymentServiceRequestReference: undefined,
      paymentStatus: 'Success',
    });
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/applicant/application-within-proceedings/C2/request-more-time/application-submitted'
    );
  });

  test('should handle initiate payment error from lack of details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: paymentResponse,
    });
    delete paymentResponse.next_url;
    delete paymentResponse.serviceRequestReference;

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.paymentError.hasError).toStrictEqual(true);
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/applicant/application-within-proceedings/C2/request-more-time/checkanswers'
    );
  });

  test('other errors should be caught', async () => {
    processAWPSpy.mockRestore();
    delete awpRequest.session.userCase.awpFeeDetails;

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.paymentError.hasError).toStrictEqual(false);
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/applicant/application-within-proceedings/C2/request-more-time/application-submitted'
    );
  });

  test('should save and redirect if hwf details missing', async () => {
    delete awpRequest.session.userCase.awp_need_hwf;

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });
});
