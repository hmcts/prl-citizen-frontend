import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('miam > mediator-document > routeGuard', () => {
  test('should delete miam certificate if have document signed is no', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    req.body = {
      miam_haveDocSigned: 'No',
    };
    req.session.userCase = {
      miam_certificate: {
        id: '1234',
        url: 'MOCK_URL',
        filename: 'MOCK_FILENAME',
        binaryUrl: 'MOCK_BINARY_URL',
      },
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({});
    expect(next).toHaveBeenCalled();
  });
});
