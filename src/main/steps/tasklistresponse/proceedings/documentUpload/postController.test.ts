import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as steps from '../../../../steps';

import UploadDocumentController from './postController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Document upload controller', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect back to the current page when document already exists', async () => {
    const errors = [{ errorType: 'multipleFiles', propertyName: 'document' }];
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
        orderType: 'otherOrder',
        orderId: '1',
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          otherProceedings: {
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
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.params).toEqual({
      orderId: '1',
      orderType: 'otherOrder',
    });

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/1/documentUpload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should redirect back to the next page when document already exists while clicking onlyContinue', async () => {
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
        orderType: 'otherOrder',
        orderId: '1',
      },
      body: {
        onlyContinue: true,
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          otherProceedings: {
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
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.params).toEqual({
      orderType: 'otherOrder',
      orderId: '1',
    });

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  test('Should upload document and redirect back to current page', async () => {
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

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      session: {
        userCase: {
          otherProceedings: {
            order: {
              otherOrders: [
                {
                  orderDetail: 'OtherOrder1',
                  orderCopy: 'Yes',
                  orderDocument: {
                    id: '',
                    url: '',
                    filename: '',
                    binaryUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    });
    req.files = { documents: { name: 'test.docx', data: '', mimetype: 'text' } };
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/1/documentUpload');
  });

  test('Should upload document for second order and redirect back to current page', async () => {
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

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '2',
      },
      session: {
        userCase: {
          otherProceedings: {
            order: {
              otherOrders: [
                {
                  orderDetail: 'OtherOrder2',
                  orderCopy: 'Yes',
                  orderDocument: {
                    id: '',
                    url: '',
                    filename: '',
                    binaryUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    });
    req.files = { documents: { name: 'test.docx', data: '', mimetype: 'text' } };

    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/2/documentUpload');
  });

  test('Should upload document for first order and redirect back to current page', async () => {
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

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      session: {
        userCase: {
          otherProceedings: {
            order: {
              otherOrders: [
                {
                  orderDetail: 'OtherOrder1',
                  orderCopy: 'Yes',
                  orderDocument: {
                    id: '',
                    url: '',
                    filename: '',
                    binaryUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    });
    req.files = { documents: { name: 'test.docx', data: '', mimetype: 'text' } };
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/1/documentUpload');
  });

  test('Should throw error if invalid file format for document', async () => {
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

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      session: {
        userCase: {
          otherProceedings: {
            order: {
              otherOrders: [
                {
                  orderDetail: 'OtherOrder1',
                  orderCopy: 'Yes',
                  orderDocument: {
                    id: '',
                    url: '',
                    filename: '',
                    binaryUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    });
    req.files = { documents: { name: 'test.rtf', data: '', mimetype: 'text' } };
    const errors = [{ errorType: 'fileFormat', propertyName: 'document' }];
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/1/documentUpload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if invalid file size for document', async () => {
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

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/upload-citizen-document':
          return Promise.resolve({
            data: {
              status: 'Success',
              document: {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                document_binary_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
              },
            },
          });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      session: {
        userCase: {
          otherProceedings: {
            order: {
              otherOrders: [
                {
                  orderDetail: 'OtherOrder1',
                  orderCopy: 'Yes',
                  orderDocument: {
                    id: '',
                    url: '',
                    filename: '',
                    binaryUrl: '',
                  },
                },
              ],
            },
          },
        },
      },
    });
    req.files = { documents: { name: 'test.docx', size: '812300', data: '', mimetype: 'text' } };
    const errors = [{ errorType: 'fileSize', propertyName: 'document' }];
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/proceedings/otherOrder/1/documentUpload');
    expect(req.session.errors).toEqual(errors);
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
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

      mockedAxios.post.mockImplementation(url => {
        switch (url) {
          case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
            return Promise.resolve({ data: 'Test S2S Token' });
          case '/upload-citizen-document':
            return Promise.resolve({
              data: {
                status: 'Success',
                document: {
                  document_url:
                    'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                  document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                  document_binary_url:
                    'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
                },
              },
            });
          default:
            return Promise.reject(new Error('not found'));
        }
      });

      const req = mockRequest({
        params: {
          orderType: 'otherOrder',
          orderId: '1',
        },
        session: {
          save: undefined,
          userCase: {
            otherProceedings: {
              order: {
                otherOrders: [
                  {
                    orderDetail: 'OtherOrder1',
                    orderCopy: 'Yes',
                    orderDocument: {
                      id: '',
                      url: '',
                      filename: '',
                      binaryUrl: '',
                    },
                  },
                ],
              },
            },
          },
        },
      });
      req.files = { documents: { name: 'test.docx', data: '', mimetype: 'text' } };
      const res = mockResponse();

      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });

    test('should throw an error if document already exists', async () => {
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

      mockedAxios.post.mockImplementation(url => {
        switch (url) {
          case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
            return Promise.resolve({ data: 'Test S2S Token' });
          case '/upload-citizen-document':
            return Promise.resolve({
              data: {
                status: 'Success',
                document: {
                  document_url:
                    'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                  document_filename: 'applicant_emergency_protection_order10_12092022.rtf',
                  document_binary_url:
                    'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
                },
              },
            });
          default:
            return Promise.reject(new Error('not found'));
        }
      });

      const req = mockRequest({
        params: {
          orderType: 'otherOrder',
          orderId: '1',
        },
        session: {
          save: jest.fn(done => done('MOCK_ERROR')),
          userCase: {
            otherProceedings: {
              order: {
                otherOrders: [
                  {
                    orderDetail: 'OtherOrder1',
                    orderCopy: 'Yes',
                    orderDocument: {
                      id: '1',
                      url: '',
                      filename: '',
                      binaryUrl: '',
                    },
                  },
                ],
              },
            },
          },
        },
      });
      req.files = { documents: { name: 'test.docx', data: '', mimetype: 'text' } };
      const res = mockResponse();

      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });

    test('should throw an error after upload document error', async () => {
      const controller = new UploadDocumentController({});
      const res = mockResponse();
      const req = mockRequest({
        params: {
          orderType: 'otherOrder',
          orderId: '1',
        },
        files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
        session: {
          user: { email: 'test@example.com' },
          userCase: {
            otherProceedings: {
              order: {
                otherOrders: [
                  {
                    orderDetail: 'OtherOrder1',
                    orderCopy: 'Yes',
                    orderDocument: {
                      id: '',
                      url: '',
                      filename: '',
                      binaryUrl: '',
                    },
                  },
                ],
              },
            },
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
