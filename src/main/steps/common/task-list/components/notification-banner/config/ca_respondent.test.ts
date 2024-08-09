import { CA_RESPONDENT_CONFIG } from './ca_respondent';

describe('ca_respondent', () => {
  test('should have correct notification ids', () => {
    const ca_respondentNotifications = CA_RESPONDENT_CONFIG();
    expect(ca_respondentNotifications).toHaveLength(3);
    expect(ca_respondentNotifications[0].id).toBe('applicationServedByCourtToRespondent');
    expect(ca_respondentNotifications[1].id).toBe('submitFM5');
    expect(ca_respondentNotifications[2].id).toBe('orderNonPersonalService');
  });
});
