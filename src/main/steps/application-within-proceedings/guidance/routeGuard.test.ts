import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWP RouteGuard', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
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

  test('Should render the page when the guard validation passes', async () => {
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should render the page if awpApplicationDetails already exists', async () => {
    req.session.applicationSettings = {
      awpApplicationDetails: {
        language: 'en',
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
    };
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should not render the page when the guard validation fails', async () => {
    req.params.applicationType = 'C3';
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
    expect(next).not.toHaveBeenCalled();
  });

  test('should remove document when removedId is passed', async () => {
    req = {
      ...req,
      session: {
        ...req.session,
        userCase: {
          ...req.session.userCase,
          awp_uploadedApplicationForms: [
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
        documents: { name: 'test.rtf', data: '', mimetype: 'text' },
      },
      query: {
        removeId: '544ff7c4-5e3e-4f61-9d47-423321208d77',
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
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.additionalData?.req.session.userCase.awp_uploadedApplicationForms).toEqual(undefined);
  });
});
