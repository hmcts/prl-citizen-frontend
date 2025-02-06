import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('miam > previous miam attendance or ncdr > routeGuard', () => {
  test('should delete miam previous attendance document if have previous signed document is no', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    req.body = {
      miam_haveDocSignedByMediatorForPrevAttendance: 'No',
    };
    req.session.userCase = {
      miam_previousAttendanceEvidenceDoc: {
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
