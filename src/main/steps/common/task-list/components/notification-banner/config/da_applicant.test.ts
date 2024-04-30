import { DA_APPLICANT } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    expect(DA_APPLICANT).toHaveLength(2);
    expect(DA_APPLICANT[0].id).toBe('newOrder');
    expect(DA_APPLICANT[1].id).toBe('finalOrder');
  });
});
