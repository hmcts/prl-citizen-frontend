import { Application } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { LanguageToggle } from '.';

describe('i18n', () => {
  let req = mockRequest();
  const res = mockResponse();
  const mockNext = jest.fn();
  let mockApp;

  beforeEach(() => {
    mockApp = {
      use: jest.fn(callback => callback(req, res, mockNext)),
    } as unknown as Application;

    new LanguageToggle().enableFor(mockApp);
  });

  test('should call next', () => {
    expect(mockNext).toHaveBeenCalled();
  });

  describe('when method is GET and lng query param is present', () => {
    beforeEach(() => {
      req = mockRequest();
      req.method = 'GET';
      req.query.lng = 'en';
    });

    test('should call next', () => {
      new LanguageToggle().enableFor(mockApp);
      expect(req.session.lang).toBe('en');
    });
  });
});
