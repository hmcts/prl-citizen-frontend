import { DA_RESPONDENT } from './da_respondent';

describe('da_respondent', () => {
  test('should have correct notification ids', () => {
    expect(DA_RESPONDENT).toHaveLength(4);
    expect(DA_RESPONDENT[0].id).toBe('newDocument');
    expect(DA_RESPONDENT[1].id).toBe('newOrder');
    expect(DA_RESPONDENT[2].id).toBe('finalOrder');
    expect(DA_RESPONDENT[3].id).toBe('daRespondentBanner');
  });
});
