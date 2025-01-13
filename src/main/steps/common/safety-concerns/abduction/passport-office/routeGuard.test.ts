import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('common > abduction > passport office > route guard', () => {
  test('should delete passport data when passport office is no', async () => {
    const req = mockRequest({
      body: {
        c1A_passportOffice: 'No',
      },
      session: {
        userCase: {
          c1A_childrenMoreThanOnePassport: 'Yes',
          c1A_possessionChildrenPassport: 'Yes',
          c1A_abductionPassportOfficeNotified: 'Yes',
          c1A_provideOtherDetails: 'test',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({});
  });
});
