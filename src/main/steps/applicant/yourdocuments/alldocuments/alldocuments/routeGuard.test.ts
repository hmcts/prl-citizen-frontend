import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('view documents RouteGuard', () => {
  test('Should delete all the docToView when loading view document list screen', async () => {
    const req = mockRequest({
      session: {
        applicationSettings: {
          docToView: {
            docType: 'positionstatements',
            uploadedBy: 'applicant',
          },
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(req.session.userCase).not.toContain('docToView');
    expect(next).toHaveBeenCalled();
  });

  test('Should load the page without deleting docToView if docToView not present', async () => {
    const req = mockRequest({
      session: {},
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
