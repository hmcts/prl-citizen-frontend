import { DA_APPLICANT } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    expect(DA_APPLICANT).toHaveLength(3);
    expect(DA_APPLICANT[0].id).toBe('newDocument');
    expect(DA_APPLICANT[1].id).toBe('newOrder');
    expect(DA_APPLICANT[2].id).toBe('finalOrder');
  });
});
