import { DA_RESPONDENT } from './da_respondent';

describe('da_respondent', () => {
  test('should have correct notification ids', () => {
    expect(DA_RESPONDENT).toHaveLength(3);
    expect(DA_RESPONDENT[0].id).toBe('newOrder');
    expect(DA_RESPONDENT[1].id).toBe('finalOrder');
    expect(DA_RESPONDENT[2].id).toBe('daRespondentBanner');
  });
});
