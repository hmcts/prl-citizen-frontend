import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { applyParms } from '../../../common/url-parser';
import { C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD } from '../../../urls';

import EmergencyDocumentUpload from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const ORDER_DETAILS = {
  op_otherProceedings: {
    order: {
      otherOrders: [
        {
          orderDetail: 'OtherOrder1',
          orderDocument: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'applicant_emergency_protection_order10_12092022.rtf',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        },
      ],
    },
  },
};

describe('DocumentUpload Get Controller', () => {
  test('should render the page', async () => {
    const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = ORDER_DETAILS;
    req.params = {
      orderType: 'otherOrder',
      orderId: '1',
    };
    req.originalUrl = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'otherOrder', orderId: '1' });

    await controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith('error');
  });

  test('If headers have already been sent', async () => {
    const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    res.headersSent = true;
    req.session.lang = language;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = ORDER_DETAILS;
    req.params = {
      orderType: 'otherOrder',
      orderId: '1',
    };

    await controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith('error');
  });

  test('should remove document when removedId is passed', async () => {
    const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = ORDER_DETAILS;
    req.params = {
      orderType: 'otherOrder',
      orderId: '1',
      removeId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
    };

    const res = mockResponse();
    req.session.lang = language;

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/c9f56483-6e2d-43ce-9de8-72661755b87c/delete':
          return Promise.resolve();
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    await controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith('error');
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const res = mockResponse();
      const req = mockRequest({
        session: {
          user: { email: 'test@example.com' },

          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).not.toBe('MOCK_ERROR');
      }
    });
  });

  describe('DocumentUpload Get Controller > removeExistingDocument > error', () => {
    test('should render the page', async () => {
      const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const req = mockRequest({
        session: {
          user: { email: 'test@example.com' },

          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      const res = mockResponse();

      await controller.removeDocument(req, res);

      expect(res.redirect).not.toHaveBeenCalledWith('error');
    });

    test('req.session.errors > !Empty', async () => {
      const controller = new EmergencyDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      const res = mockResponse();
      req.session.lang = language;
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = ORDER_DETAILS;
      req.session.errors = ['MOCK_ERRORS'];
      req.params = {
        orderType: 'otherOrder',
        orderId: '1',
      };
      req.originalUrl = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'otherOrder', orderId: '1' });

      await controller.get(req, res);

      expect(res.redirect).not.toHaveBeenCalledWith('error');
    });
  });
});
