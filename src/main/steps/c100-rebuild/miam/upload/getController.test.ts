import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';

import MiamDocumentUpload from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const MIAM_CERTIFICATE = {
  miam_certificate: {
    id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
    url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
    filename: 'applicantname__miam_certificate__05102022.rtf',
    binaryUrl:
      'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
  },
};

describe('DocumentUpload Get Controller', () => {
  test('should render the page', async () => {
    const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    const res = mockResponse();
    req.session.lang = language;
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = MIAM_CERTIFICATE;
    await controller.get(req, res);

    expect(res.redirect).not.toBeCalledWith('error');
  });

  test('should remove document when removedId is passed', async () => {
    const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'en';
    const req = mockRequest({});
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    req.session.userCase = MIAM_CERTIFICATE;
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

    expect(res.redirect).not.toBeCalledWith('error');
  });

  describe('DocumentUpload Get Controller', () => {
    test('should render the page', async () => {
      const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      const res = mockResponse();
      req.session.lang = language;
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = MIAM_CERTIFICATE;
      await controller.get(req, res);

      expect(res.redirect).not.toBeCalledWith('error');
    });

    test('should remove document when removedId is passed', async () => {
      const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = MIAM_CERTIFICATE;
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

      expect(res.redirect).not.toBeCalledWith('error');
    });

    test('should through error when document ID is not proper', async () => {
      const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = MIAM_CERTIFICATE;
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

      expect(res.redirect).toBeCalledWith('/c100-rebuild/miam/documentUpload');
    });
  });
});
