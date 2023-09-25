import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { PaymentHandler, PaymentValidationHandler } from './paymentController';
import { CaseApi as C100Api } from '../../app/case/C100CaseApi';

const mockToken = 'authToken';

const dummyCaseID = '2122323';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const updateCaserMock = jest.spyOn(C100Api.prototype, 'updateCase');

const req = mockRequest({});
req.session.user.accessToken = mockToken;
req.session.userCase.caseId = dummyCaseID;
req.protocol = 'http';
req.host = 'localhost:3001';

const res = mockResponse({});

describe('PaymentHandler', () => {
  test('Should render the page', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference:"a",
        date_created:"b",
        external_reference:"c",
        next_url:"d",
        status:"Success",
        serviceRequestReference:"e"
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case of HWF', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    req.session.userCase.helpWithFeesReferenceNumber="12345"
    const paymentDetailsRequestBody = {
      payment_reference:"a",
        date_created:"b",
        external_reference:"c",
        next_url:"d",
        status:"Success",
        serviceRequestReference:"e"
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(2);
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case next url', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference:"",
        date_created:"",
        external_reference:"",
        next_url:"d",
        status:"",
        serviceRequestReference:""
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(3);
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  test('Should render the page in case error', async () => {
    updateCaserMock.mockResolvedValue(req.session.userCase);
    const paymentDetailsRequestBody = {
      payment_reference:"",
        date_created:"",
        external_reference:"",
        next_url:"",
        status:"",
        serviceRequestReference:""
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    await PaymentHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(4);
    expect(res.send.mock.calls).toHaveLength(0);
    expect(req.host).toBe('localhost:3001');
    expect(updateCaserMock).toHaveBeenCalled;
  });
  
});

describe('PaymentValidationHandler', () => {
  
 
  const paymentDetails = {
    payment_reference: 'RF32-123',
    date_created: '9-10-2022',
    external_reference: 'N/A',
    next_url: 'http://localhost:3001/payment/reciever/callback/RC-12/Success',
    status: 'Success',
  };
  req.session.userCase.paymentDetails = paymentDetails;
  test('expecting PaymentValidationHandler Controller', async () => {
    req.params.status = 'Success';
    req.params.paymentId = 'DUMMY_X100';
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
      },
    });
    await PaymentValidationHandler(req, res);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(res.render).toHaveBeenCalledTimes(0);
    expect(res.redirect).toHaveBeenCalledTimes(5);
    expect(res.send.mock.calls).toHaveLength(0);
  });
  test('expecting res 500', async () => {
    delete req.params.status
    delete req.params.paymentId
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetails,
      },
    });
  const result= await PaymentValidationHandler(req, res)
  expect(result).toBe(undefined);
  });
});
