import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('C7 Response > summary > routeGuard', () => {
  test('Should add refuge document error if refuge is yes and document not present', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          isCitizenLivingInRefuge: 'Yes',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([{ propertyName: 'refugeDocumentText', errorType: 'required' }]);
  });

  test('Should call next when refuge is yes and document is present', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          isCitizenLivingInRefuge: 'Yes',
          refugeDocument: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Should call next when refuge is no', async () => {
    const req = mockRequest({
      session: {
        userCase: { isCitizenLivingInRefuge: 'No' },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
