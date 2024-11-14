import axios from 'axios';

// import { checkYourAnswerFlow1 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-1-mock';
// import { checkYourAnswerFlow2 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-2-mock';
// import { checkYourAnswerFlow3 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-3-mock';
// import { checkYourAnswerFlow4 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-4-mock';
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

  // test('Should update the before loading Check your answers screen', async () => {
  //   req.session.userCase.caseId = '1111';
  //   await controller.get(req, res);

  //   expect(req.session.userCase.caseId).toEqual('1111');
  // });

  // test('should wait for 1 second before loading Check your answers screen', async () => {
  //   req.session.userCase.caseId = '1111';
  //   req.session.save = () => true;
  //   await controller.get(req, res);
  //   const callback = jest.fn();
  //   expect(callback).not.toHaveBeenCalled();
  //   jest.runAllTimers();

  //   expect(req.session.userCase.caseId).toEqual('1111');
  //   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  //   expect(req.session.paymentError).toStrictEqual({ hasError: false, errorContext: null });
  // });

  // test('checkYourAnswerFlow1', async () => {
  //   const reqs = checkYourAnswerFlow1;
  //   await controller.get(reqs, res);
  //   expect(reqs.session.userCase).toEqual(checkYourAnswerFlow1.session.userCase);

  //   expect(reqs.originalUrl).toEqual('/request');
  // });

  // test('checkYourAnswerFlow2', async () => {
  //   const reqs = checkYourAnswerFlow2;

  //   await controller.get(reqs, res);
  //   expect(reqs.session.userCase).toEqual(checkYourAnswerFlow2.session.userCase);
  //   expect(reqs.originalUrl).toEqual('/request');
  // });

  // test('checkYourAnswerFlow3 Should update the before loading Check your answers screen', async () => {
  //   const reqs = checkYourAnswerFlow3;
  //   await controller.get(reqs, res);
  //   expect(reqs.session.userCase).toEqual(checkYourAnswerFlow3.session.userCase);
  //   expect(reqs.originalUrl).toEqual('/request');
  // });

  // test('checkYourAnswerFlow4 Should update the before loading Check your answers screen', async () => {
  //   const reqs = checkYourAnswerFlow4;
  //   await controller.get(reqs, res);
  //   expect(reqs.session.userCase).toEqual(checkYourAnswerFlow4.session.userCase);
  //   expect(reqs.originalUrl).toEqual('/request');
  // });

  // test('should catch errors and set payment error', async () => {
  //   req.locals.C100Api.updateCase.mockImplementation(() => {
  //     throw new Error();
  //   });
  //   await controller.get(req, res);
  //   expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'defaultPaymentError' });
  // });

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
});
