import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../app/case/definition';

import { routeGuard } from './routeGuard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('AWP CYA RouteGuard', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_hasSupportingDocuments: YesOrNo.NO,
          awp_supportingDocuments: [
            {
              id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
              url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              filename: 'file_example_TIFF.tiff',
              binaryUrl:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
            },
          ],
          awp_need_hwf: YesOrNo.NO,
          awp_have_hwfReference: YesOrNo.NO,
          awp_hwf_referenceNumber: 'abcd',
        },
      },
    });
  });

  test('should remove hwfreference and reference Number', async () => {
    //req.session.userCase.awp_need_hwf === YesOrNo.NO
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.awp_have_hwfReference).toBe(undefined);
    expect(req.session.userCase.awp_hwf_referenceNumber).toBe(undefined);
  });
  test('should remove support Document', async () => {
    //req.session.userCase.awp_need_hwf === YesOrNo.NO
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.awp_supportingDocuments).toBe(undefined);
  });

  test('should remove  reference Number', async () => {
    const req1 = mockRequest({
      params: {
        applicationType: 'C2',
        applicationReason: 'delay-or-cancel-hearing-date',
      },
      session: {
        userCase: {
          awp_need_hwf: YesOrNo.YES,
          awp_have_hwfReference: YesOrNo.NO,
          awp_hwf_referenceNumber: 'abcd',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req1, res, next);
    expect(req1.session.userCase.awp_hwf_referenceNumber).toBe(undefined);
  });
});
