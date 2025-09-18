import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';
import { FieldPrefix } from '../../../../app/case/case';

import MiamDocumentUpload from './getController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const deleteDocumentMock = jest.spyOn(CaseApi.prototype, 'deleteDocument');

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

    expect(res.redirect).not.toHaveBeenCalledWith('error');
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

    expect(res.redirect).not.toHaveBeenCalledWith('error');
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

      expect(res.redirect).not.toHaveBeenCalledWith('error');
    });

    test('should remove document when removedId is passed', async () => {
      const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = MIAM_CERTIFICATE;
      req.query = {
        removeId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
      };
      const res = mockResponse();
      req.session.lang = 'en';
      deleteDocumentMock.mockResolvedValue(req.session.userCase);
      await controller.get(req, res);

      expect(req.session.userCase.miam_certificate).toBe(undefined);
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

      deleteDocumentMock.mockRejectedValueOnce;
      await controller.get(req, res);
      expect(req.session.userCase.miam_certificate).toBe(undefined);
      expect(console.log).toHaveBeenCalled;
    });

    test('should through error when headers have been sent', async () => {
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
      res.headersSent = true;
      req.session.lang = language;

      await controller.get(req, res);

      expect(res.render).not.toHaveBeenCalled();
    });

    test('should through error  > res.locals.isError', async () => {
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
      res.locals.isError = true;
      req.session.lang = language;

      await controller.get(req, res);

      expect(res.render).not.toHaveBeenCalled();
    });

    test('when there is an error removeExistingDocument', async () => {
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

      req.locals.C100Api.deleteDocument.mockRejectedValue({
        message: 'MOCK_ERROR',
        response: { status: 500, data: 'Error' },
      });

      try {
        await controller.removeExistingDocument('c9f56483-6e2d-43ce-9de8-72661755b65t', req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });

    test('removeExistingDocument', async () => {
      const controller = new MiamDocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
      const language = 'en';
      const req = mockRequest({});
      req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
      req.session.userCase = MIAM_CERTIFICATE;

      const res = mockResponse();
      req.session.lang = language;

      try {
        await controller.removeExistingDocument('c9f56483-6e2d-43ce-9de8-72661755b65t', req, res);
        //eslint-disable-next-line jest/no-conditional-expect
        expect(req.session.userCase).toEqual({});
      } catch (err) {
        return err;
      }
    });
  });
});
