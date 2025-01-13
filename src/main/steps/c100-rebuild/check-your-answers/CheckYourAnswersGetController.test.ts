import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../app/case/case';

import CheckYourAnswersGetController from './CheckYourAnswersGetController';

jest.mock('axios');
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const req = mockRequest();
const res = mockResponse();

const updateCaserMock = jest.spyOn(CaseApi.prototype, 'saveC100DraftApplication');

describe('DocumentUpload Get Controller', () => {
  const controller = new CheckYourAnswersGetController('page', () => ({}), FieldPrefix.APPLICANT);
  beforeEach(() => {
    jest.clearAllMocks;
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('should clear hwf reference number if need help with fees is no', async () => {
    req.session.userCase = {
      ...req.session.userCase,
      hwf_needHelpWithFees: 'No',
      helpWithFeesReferenceNumber: 'HWF-1234',
    };
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    req.session.save = jest.fn();
    updateCaserMock.mockResolvedValueOnce(req.session.userCase);

    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase.helpWithFeesReferenceNumber).toBeUndefined();
  });

  test('should save errors when refuge is yes but documents not present', async () => {
    req.session.userCase = {
      ...req.session.userCase,
      appl_allApplicants: [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          applicantFirstName: 'Test',
          applicantLastName: 'Applicant',
          liveInRefuge: 'Yes',
        },
      ],
      oprs_otherPersons: [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          firstName: 'Test',
          lastName: 'Other',
          liveInRefuge: 'Yes',
        },
      ],
    };
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should catch errors and set payment error for successful payment', async () => {
    req.session.userCase.paymentSuccessDetails = {
      amount: 'MOCK_AMOUNT',
      reference: 'REFERENCE',
      ccd_case_number: '0123456789',
      case_reference: '0123456789',
      channel: 'CHANNEL',
      method: 'METHOD',
      status: 'success',
      external_reference: 'EXTERNAL_REFERENCE',
      payment_group_reference: 'PAYMENT_GROUP_REFERENCE',
    };
    req.session.paymentError = { hasError: false, errorContext: null };
    req.locals.C100Api.saveC100DraftApplication.mockImplementation(() => {
      throw new Error();
    });

    await controller.get(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'applicationNotSubmitted' });
  });

  test('should catch errors and set payment error for unsuccessful payment', async () => {
    req.session.userCase.paymentSuccessDetails = {
      amount: 'MOCK_AMOUNT',
      reference: 'REFERENCE',
      ccd_case_number: '0123456789',
      case_reference: '0123456789',
      channel: 'CHANNEL',
      method: 'METHOD',
      status: 'failure',
      external_reference: 'EXTERNAL_REFERENCE',
      payment_group_reference: 'PAYMENT_GROUP_REFERENCE',
    };
    req.session.paymentError = { hasError: false, errorContext: null };
    req.locals.C100Api.saveC100DraftApplication.mockImplementation(() => {
      throw new Error();
    });

    await controller.get(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'defaultPaymentError' });
    expect(req.session.save).toHaveBeenCalled();
  });
});
