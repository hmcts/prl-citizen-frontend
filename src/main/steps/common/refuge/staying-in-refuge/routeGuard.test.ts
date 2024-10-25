import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('C8 Refuge > staying in refuge > routeGuard', () => {
  test('Should set isCitizenLivingInRefuge for c100 applicant', async () => {
    const req = mockRequest({
      params: {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase: {
          appl_allApplicants: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              applicantFirstName: 'Test',
              applicantLastName: 'Test',
              liveInRefuge: 'Yes',
            },
          ],
        },
      },
    });
    req.originalUrl = '/c100-rebuild';
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.isCitizenLivingInRefuge).toBe('Yes');
  });

  test('Should set isCitizenLivingInRefuge for c100 other people', async () => {
    const req = mockRequest({
      params: {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase: {
          oprs_otherPersons: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              applicantFirstName: 'Test',
              applicantLastName: 'Test',
              liveInRefuge: 'Yes',
            },
          ],
        },
      },
    });
    req.originalUrl = '/c100-rebuild';
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.isCitizenLivingInRefuge).toBe('Yes');
  });

  test('Should call next when not c100', async () => {
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
