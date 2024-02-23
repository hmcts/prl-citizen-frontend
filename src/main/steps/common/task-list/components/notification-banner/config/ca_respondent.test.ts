import { CA_RESPONDENT } from './ca_respondent';

describe('ca_respondent', () => {
  test('should have correct notification ids', () => {
    expect(CA_RESPONDENT).toHaveLength(3);
    expect(CA_RESPONDENT[0].id).toBe('newDocument');
    expect(CA_RESPONDENT[1].id).toBe('newOrder');
    expect(CA_RESPONDENT[2].id).toBe('finalOrder');
  });
});
