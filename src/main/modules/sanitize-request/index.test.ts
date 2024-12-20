import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { SanitizeRequest } from '.';

describe('sanitize request > index', () => {
  describe('sanitizeRequestBody', () => {
    test('should sanitize request body', () => {
      const req = mockRequest({ body: { too_shortStatement: 'test<img src""> ☕️' } });
      new SanitizeRequest().sanitizeRequestBody(req);
      expect(req.body).toEqual({ too_shortStatement: 'test' });
    });

    test('should sanitize request body for arrays', () => {
      const req = mockRequest({
        body: { courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder<img src""> ☕️'] },
      });
      new SanitizeRequest().sanitizeRequestBody(req);
      expect(req.body).toEqual({ courtProceedingsOrders: ['childArrangementOrder', 'supervisionOrder'] });
    });
  });
});
