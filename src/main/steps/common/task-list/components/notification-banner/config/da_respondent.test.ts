import { DA_RESPONDENT_CONFIG } from './da_respondent';

describe('da_respondent', () => {
  test('should have correct notification ids', () => {
    expect(DA_RESPONDENT_CONFIG).toHaveLength(3);
    expect(DA_RESPONDENT_CONFIG[0].id).toBe('newOrder');
    expect(DA_RESPONDENT_CONFIG[1].id).toBe('finalOrder');
    expect(DA_RESPONDENT_CONFIG[2].id).toBe('daRespondentBanner');
  });
});
