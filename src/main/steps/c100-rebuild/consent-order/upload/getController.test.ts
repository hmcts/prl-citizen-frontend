import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';

import ConsentOrderDocumentUpload from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const CO_CERTIFICATE = {
  co_certificate: {
    id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
    url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
    filename: 'applicantname_consent_order_draft_05102022.rtf',
    binaryUrl:
      'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
  },
};

describe('DocumentUpload Get Controller', () => {
  test('should render the page', async () => {
    const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = CO_CERTIFICATE;
    await controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalledWith('error');
  });

  test('should remove document when removedId is passed', async () => {
    const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = CO_CERTIFICATE;
    const QUERY = {
      removeId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
    };
    req.query = QUERY;

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

  describe('DocumentUpload Get Controller', () => {
    test('should render the page', async () => {
      const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      const res = mockResponse();
      req.session.lang = language;
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = CO_CERTIFICATE;
      await controller.get(req, res);

      expect(res.redirect).not.toHaveBeenCalledWith('error');
    });

    test('should remove document when removedId is passed', async () => {
      const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = CO_CERTIFICATE;
      const QUERY = {
        removeId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
      };
      req.query = QUERY;

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

    test("Doesn't call render if an error page has already been rendered upstream", async () => {
      const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);

      const req = mockRequest();
      const res = mockResponse();
      res.locals.isError = true;
      await controller.get(req, res);

      expect(res.render).not.toHaveBeenCalled();
    });

    test("Doesn't call render if headers have already been sent already upstream", async () => {
      const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);

      const req = mockRequest();
      const res = mockResponse();
      res.headersSent = true;
      await controller.get(req, res);

      expect(res.render).not.toHaveBeenCalled();
    });

    test('should throw error when document ID is not proper', async () => {
      const controller = new ConsentOrderDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = CO_CERTIFICATE;
      const QUERY = {
        removeId: 'c9f56483-6e2d-43ce-9de8-72661755b65t',
      };
      req.query = QUERY;

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

      expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/consent-order/upload');
    });
  });
});
