import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWP supporting document upload RouteGuard', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
        removeId: '544ff7c4-5e3e-4f61-9d47-423321208d77',
      },
      session: {
        userCase: {
          id: '1234',
          caseTypeOfApplication: 'FL401',
          caseInvites: [],
          respondents: '',
          respondentsFL401: '',
        },
        user: {
          id: '1234',
        },
      },
    });
  });

  test('should remove document when removedId is passed', async () => {
    req = {
      ...req,
      session: {
        ...req.session,
        userCase: {
          ...req.session.userCase,
          supportingDocuments: [
            {
              id: '544ff7c4-5e3e-4f61-9d47-423321208d77',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77',
              filename: 'file_example_TIFF_1MB.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77/binary',
            },
          ],
        },
      },
      files: {
        awp_supporting_documents: { name: 'test.rtf', data: '', mimetype: 'text' },
      },
    };

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/544ff7c4-5e3e-4f61-9d47-423321208d77/delete':
          return Promise.resolve();
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.supportingDocuments).toEqual([]);
  });

  test('should catch error if problem with deleting document', async () => {
    req = {
      ...req,
      session: {
        ...req.session,
        userCase: {
          ...req.session.userCase,
          supportingDocuments: [
            {
              id: '544ff7c4-5e3e-4f61-9d47-423321208d77',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77',
              filename: 'file_example_TIFF_1MB.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77/binary',
            },
          ],
        },
        user: undefined,
      },
      files: {
        awp_supporting_documents: { name: 'test.rtf', data: '', mimetype: 'text' },
      },
    };

    mockedAxios.post.mockImplementation(url => {
      switch (url) {
        case 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease':
          return Promise.resolve({ data: 'Test S2S Token' });
        case '/544ff7c4-5e3e-4f61-9d47-423321208d77123/delete':
          return Promise.resolve();
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.supportingDocuments).toEqual([
      {
        id: '544ff7c4-5e3e-4f61-9d47-423321208d77',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77',
        filename: 'file_example_TIFF_1MB.tiff',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77/binary',
      },
    ]);
  });

  test('next should be called if no document to delete', async () => {
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('next should be called if removeId in params', async () => {
    req.params.removeId = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
