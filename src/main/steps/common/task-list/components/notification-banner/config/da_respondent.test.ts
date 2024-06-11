import { DA_RESPONDENT_CONFIG } from './da_respondent';

describe('da_respondent', () => {
  test('should have correct notification ids', () => {
    const da_respondentNotifications = DA_RESPONDENT_CONFIG();

    expect(da_respondentNotifications).toHaveLength(3);
    expect(da_respondentNotifications[0].id).toBe('newOrder');
    expect(da_respondentNotifications[1].id).toBe('finalOrder');
    expect(da_respondentNotifications[2].id).toBe('daRespondentBanner');
  });
});
