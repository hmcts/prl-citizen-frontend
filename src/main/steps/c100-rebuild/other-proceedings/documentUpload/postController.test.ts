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
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.params).toEqual({
      orderType: 'otherOrder',
      orderId: '1',
    });

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Error saving document when document already exists', async () => {
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
        },
        save: jest.fn(done => done('MOCK_ERROR')),
      },
    });
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(req.params).toEqual({
      orderType: 'otherOrder',
      orderId: '1',
    });
    expect(req.session.errors).toEqual([{ errorType: 'multipleFiles', propertyName: 'document' }]);
  });

  test('Should redirect back to the next page when document already exists while clicking save and continue', async () => {
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
        saveAndContinue: true,
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
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
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(req.params).toEqual({
      orderType: 'otherOrder',
      orderId: '1',
    });

    expect(res.redirect).toHaveBeenCalledWith('/citizen-home');
  });

  test('Should redirect to dashboard when document already exists while clicking save and come back later and original path starts with /c100-rebuild', async () => {
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
        saveAndComeLater: true,
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
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
        },
      },
    });
    const res = mockResponse();
    req.path = '/c100-rebuild/dummyUrl';

    await controller.post(req, res);

    expect(req.params).toEqual({
      orderType: 'otherOrder',
      orderId: '1',
    });

    expect(res.redirect).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/dashboard-v1');
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
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          op_otherProceedings: {
            order: {
              otherOrders: [],
            },
          },
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
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
      files: { documents: { name: 'test.rtf', size: '812300', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          op_otherProceedings: {
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
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/2/documentUpload');
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
      files: { documents: { name: 'test.png', size: '812300', data: '', mimetype: 'text' } },
      session: {
        userCase: {
          op_otherProceedings: {
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
    const res = mockResponse();

    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
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
            op_otherProceedings: {
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
        //eslint-disable-next-line jest/no-conditional-expect
        expect(req.session.errors).toEqual([{ errorType: 'required', propertyName: 'document' }]);
      }
    });
  });

  test('Should throw error if file is null', async () => {
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
    const errors = [{ errorType: 'required', propertyName: 'document' }];
    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      files: {},
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          op_otherProceedings: {
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
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBe('MOCK_ERROR');
    }

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
    expect(req.session.errors).toEqual(errors);
  });

  test('Should throw error if file is more than 20 MB', async () => {
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
    const errors = [{ errorType: 'fileSize', propertyName: 'document' }];
    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          op_otherProceedings: {
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
    req.files = { documents: { name: 'test.pdf', size: '8123000098098', data: '', mimetype: 'text' } };
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
      //eslint-disable-next-line jest/no-conditional-expect
      expect(req.session.errors).toEqual(errors);
    }
  });

  test('Should throw error if file is in invalid format', async () => {
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

    const errors = [{ errorType: 'fileFormat', propertyName: 'document' }];
    const controller = new UploadDocumentController(mockForm.fields);
    const req = mockRequest({
      params: {
        orderType: 'otherOrder',
        orderId: '1',
      },
      files: { documents: { name: 'test.rtf', data: '', mimetype: 'text' } },
      session: {
        user: { email: 'test@example.com' },
        userCase: {
          op_otherProceedings: {
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
    req.files = { documents: { name: 'test.spf', size: '812300', data: '', mimetype: 'text' } };
    const res = mockResponse();

    try {
      await controller.post(req, res);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/other-proceedings/otherOrder/1/documentUpload');
      //eslint-disable-next-line jest/no-conditional-expect
      expect(req.session.errors).toEqual(errors);
    }
  });
});
