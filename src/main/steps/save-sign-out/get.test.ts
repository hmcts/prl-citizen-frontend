import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { SaveSignOutGetController } from './get';

describe('SaveSignOutGetController', () => {
  const controller = new SaveSignOutGetController();
  let req = mockRequest({ session: { user: { email: 'test@example.com',id: '123456' } } });
  const res = mockResponse();

  it('saves and signs out', async () => {
    await controller.get(req, res);
    expect(req.session.destroy).toHaveBeenCalled();
  });

  describe('when there is an error in destroying session', () => {
    test('Should throw an error', async () => {
      req = mockRequest({
        session: {
          user: { email: 'test@example.com', id: '123456' },
          destroy: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
