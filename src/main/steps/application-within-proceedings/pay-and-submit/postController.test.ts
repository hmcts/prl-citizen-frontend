import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { AWPApplicationType, PartyType } from '../../../app/case/definition';

import AWPPayAndSubmitPostController from './postController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWPPayAndSubmitPostController controller', () => {
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
  const controller = new AWPPayAndSubmitPostController(mockForm.fields);
  let awpRequest;
  let paymentResponse;
  let paymentData;

  beforeEach(() => {
    awpRequest = mockRequest({
      params: { applicationType: 'C2', applicationReason: 'request-more-time' },
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
      next_url: '/application-within-proceedings/C2/request-more-time/application-submitted',
      status: 'Success',
      serviceRequestReference: 'MOCK_REFERENCE',
    };

    paymentData = {
      caseId: '1234',
      returnUrl: 'MOCK_URL',
      applicantCaseName: 'MOCK_CASE_NAME',
      feeType: 'MOCK_FEE_TYPE',
      awpType: 'C2' as AWPApplicationType,
      partyType: 'applicant' as PartyType,
    };
    jest.clearAllMocks();
  });

  test('should initiate payment and process awp application when no redirect url', async () => {
    mockedAxios.post.mockResolvedValue({
      data: paymentResponse,
    });

    paymentData = { ...paymentData, hwfRefNumber: 'MOCK_REF_NUMBER' };

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.userCase.paymentData).toStrictEqual({
      paymentReference: 'MOCK_REFERENCE',
      paymentDate: 'MOCK_DATE',
      externalReference: 'MOCK_REFERENCE',
      nextActionUrl: '/application-within-proceedings/C2/request-more-time/application-submitted',
      paymentStatus: 'Success',
      paymentServiceRequestReference: 'MOCK_REFERENCE',
    });
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
      nextActionUrl: '/application-within-proceedings/C2/request-more-time/application-submitted',
      paymentServiceRequestReference: undefined,
      paymentStatus: 'Success',
    });
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      '/application-within-proceedings/C2/request-more-time/application-submitted'
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

    expect(awpRequest.session.userCase.paymentData).toStrictEqual(undefined);
    expect(awpRequest.session.paymentError.hasError).toStrictEqual(true);
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/application-within-proceedings/C2/request-more-time/checkanswers');
  });

  test('other errors should be caught', async () => {
    delete awpRequest.session.userCase.awpFeeDetails;

    const res = mockResponse();
    await controller.post(awpRequest, res);

    expect(awpRequest.session.userCase.paymentData).toStrictEqual(undefined);
    expect(awpRequest.session.paymentError.hasError).toStrictEqual(true);
    expect(awpRequest.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/application-within-proceedings/C2/request-more-time/checkanswers');
  });
});
