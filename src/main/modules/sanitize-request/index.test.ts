import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { RequestSanitizer } from '.';

describe('sanitize request > index', () => {
  describe('sanitizeRequestBody', () => {
    test('should sanitize request body', () => {
      const req = mockRequest({ body: { too_shortStatement: 'test<img src""> ☕️' } });
      RequestSanitizer.sanitizeRequestBody(req);
      expect(req.body).toEqual({ too_shortStatement: 'test' });
    });

    test('should sanitize request body for arrays', () => {
      const req = mockRequest({
        body: { courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder<img src""> ☕️'] },
      });
      RequestSanitizer.sanitizeRequestBody(req);
      expect(req.body).toEqual({ courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder'] });
    });
  });
});
