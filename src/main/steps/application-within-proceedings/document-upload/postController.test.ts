import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as steps from '../../../steps';

import UploadDocumentController from './postController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Document upload controller', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should validate file, upload it and redirect', async () => {
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
    const controller = new UploadDocumentController(mockForm.fields);

    const req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_uploadedApplicationForms: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF_1MB.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
        },
      },
    });
    req.files = {
      awp_application_form: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
    };
    const res = mockResponse();

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'file_example_TIFF_1MB.tiff',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );
  });

  test('Should validate, upload and redirect when awp_uploadedApplicationForms is undefined', async () => {
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
    const controller = new UploadDocumentController(mockForm.fields);

    const req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
    });
    req.files = {
      awp_application_form: { name: 'file_example_TIFF_1MB.tiff', data: '', mimetype: 'text' },
    };
    const res = mockResponse();

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'file_example_TIFF_1MB.tiff',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );
    expect(req.session.userCase.awp_uploadedApplicationForms).toEqual([
      {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        filename: 'file_example_TIFF_1MB.tiff',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
      },
    ]);
  });

  test('Should throw error if files undefined', async () => {
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
    const errors = [{ errorType: 'required', propertyName: 'awpUploadApplicationForm' }];
    const controller = new UploadDocumentController(mockForm.fields);

    const req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_uploadedApplicationForms: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF_1MB.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if invalid file format', async () => {
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
    const errors = [{ errorType: 'fileFormat', propertyName: 'awpUploadApplicationForm' }];
    const controller = new UploadDocumentController(mockForm.fields);

    const req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_uploadedApplicationForms: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF_1MB.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
        },
      },
    });
    req.files = { awp_application_form: { name: 'test.spf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();

    await controller.post(req, res);

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if invalid file size', async () => {
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
    const errors = [{ errorType: 'fileSize', propertyName: 'awpUploadApplicationForm' }];
    const controller = new UploadDocumentController(mockForm.fields);

    const req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_uploadedApplicationForms: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
        },
      },
    });
    req.files = {
      awp_application_form: { name: 'file_example_TIFF.tiff', size: '999999999', data: '', mimetype: 'text' },
    };
    const res = mockResponse();

    await controller.post(req, res);

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/request');
    expect(req.session.errors).toEqual(errors);
  });

  test('should redirect to correct page when continue pressed and file uploaded', async () => {
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

    const req = mockRequest({
      body: {
        onlyContinue: 'true',
      },
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_uploadedApplicationForms: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
        },
      },
    });

    const controller = new UploadDocumentController(mockForm.fields);
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const controller = new UploadDocumentController({});
      const res = mockResponse();
      const req = mockRequest({
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
        session: {
          user: { email: 'test@example.com' },
          userCase: {
            awp_uploadedApplicationForms: [
              {
                id: '',
                url: '',
                filename: '',
                binaryUrl: '',
              },
            ],
          },
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });

      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
