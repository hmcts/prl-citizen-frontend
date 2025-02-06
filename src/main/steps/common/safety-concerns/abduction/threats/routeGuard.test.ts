import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('common > abduction > threates > route guard', () => {
  test('should delete data for previous abductions when abducted before is no', async () => {
    const req = mockRequest({
      body: {
        c1A_childAbductedBefore: 'No',
      },
      session: {
        userCase: {
          c1A_previousAbductionsShortDesc: 'test',
          c1A_policeOrInvestigatorInvolved: 'Yes',
          c1A_policeOrInvestigatorOtherDetails: 'test',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({});
  });
});
