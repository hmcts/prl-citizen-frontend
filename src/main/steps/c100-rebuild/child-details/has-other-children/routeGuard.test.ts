import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe('c100 > child-details > has other children > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean other children details and call next', async () => {
    req.body.ocd_hasOtherChildren = 'No';
    req.session.userCase = {
      ocd_otherChildren: [
        {
          id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
          firstName: 'a',
          lastName: 'b',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({ ocd_otherChildren: [] });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
