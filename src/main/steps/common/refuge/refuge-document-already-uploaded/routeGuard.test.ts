import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('C8 Refuge > C8 already uploaded > routeGuard', () => {
  test('Should delete the reUploadRefugeDocument value when page is loaded', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          reUploadRefugeDocument: 'Yes',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.reUploadRefugeDocument).toBe(undefined);
  });

  test('Should call next when reUploadRefugeDocument is not present', async () => {
    const req = mockRequest({
      session: {
        userCase: {},
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
