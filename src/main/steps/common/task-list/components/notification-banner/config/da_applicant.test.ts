import { DA_APPLICANT_CONFIG } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    expect(DA_APPLICANT_CONFIG).toHaveLength(2);
    expect(DA_APPLICANT_CONFIG[0].id).toBe('newOrder');
    expect(DA_APPLICANT_CONFIG[1].id).toBe('finalOrder');
  });
});
