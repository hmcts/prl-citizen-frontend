import { CA_RESPONDENT_CONFIG } from './ca_respondent';

describe('ca_respondent', () => {
  test('should have correct notification ids', () => {
    expect(CA_RESPONDENT_CONFIG).toHaveLength(4);
    expect(CA_RESPONDENT_CONFIG[0].id).toBe('newOrder');
    expect(CA_RESPONDENT_CONFIG[1].id).toBe('finalOrder');
    expect(CA_RESPONDENT_CONFIG[2].id).toBe('applicationServedByCourtToRespondent');
  });
});
