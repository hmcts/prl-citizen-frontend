import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { SIGN_OUT_URL } from '../../steps/urls';

import { KeepAliveController } from './KeepAliveController';

describe('KeepAliveController', () => {
  let req;
  let res;
  const keepAliveController = new KeepAliveController();

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    res = mockResponse();
  });

  test('should redirect to login if user object is missing', async () => {
    req = mockRequest({ session: { user: undefined } });
    await keepAliveController.get(req, res);
    expect(res.redirect).toBeCalledWith(SIGN_OUT_URL);
  });

  test('should reset cookie expiry', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(req.session.cookie.expires).toEqual(new Date('2021-01-01T00:21:00.000Z'));
  });

  test('should reset cookie maxAge', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(req.session.cookie.maxAge).toEqual(1260000);
  });

  test('should end the response', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(res.end).toBeCalled();
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          cookie: {},
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await keepAliveController.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
