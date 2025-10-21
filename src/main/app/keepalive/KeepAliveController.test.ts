import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { SIGN_OUT_URL } from '../../steps/urls';

import { KeepAliveController } from './KeepAliveController';

describe('KeepAliveController', () => {
  let req;
  let res;
  const keepAliveController = new KeepAliveController();
  let consoleErrorSpy;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    res = mockResponse();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('should redirect to login if user object is missing', async () => {
    req = mockRequest({ session: { user: undefined } });
    await keepAliveController.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith(SIGN_OUT_URL);
  });

  test('should reset cookie expiry', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(req.session.cookie.expires).toEqual(new Date('2021-01-01T00:03:00.000Z'));
  });

  test('should reset cookie maxAge', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(req.session.cookie.maxAge).toEqual(180000);
  });

  test('should end the response', async () => {
    req = mockRequest({ session: { cookie: {} } });
    await keepAliveController.get(req, res);
    expect(res.end).toHaveBeenCalled();
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          cookie: {},
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });

      await expect(keepAliveController.get(req, res)).rejects.toBe('MOCK_ERROR');
    });
  });
});
