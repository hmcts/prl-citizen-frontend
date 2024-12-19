import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { SanitizeRequest } from '.';

describe('sanitize request > index', () => {
  describe('sanitizeRequestBody', () => {
    test('should sanitize request body', () => {
      const req = mockRequest({ body: { too_shortStatement: 'test<img src""> ☕️' } });
      const mockNext = jest.fn();
      new SanitizeRequest().sanitizeRequestBody(req, mockNext);
      expect(req.body).toEqual({ too_shortStatement: 'test' });
    });

    test('should sanitize request body for arrays', () => {
      const req = mockRequest({
        body: { courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder<img src""> ☕️'] },
      });
      const mockNext = jest.fn();
      new SanitizeRequest().sanitizeRequestBody(req, mockNext);
      expect(req.body).toEqual({ courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder'] });
    });
  });
});
