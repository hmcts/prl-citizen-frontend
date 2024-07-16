import { DA_RESPONDENT_CONFIG } from './da_respondent';

describe('da_respondent', () => {
  test('should have correct notification ids', () => {
    const da_respondentNotifications = DA_RESPONDENT_CONFIG();

    expect(da_respondentNotifications).toHaveLength(2);
    expect(da_respondentNotifications[0].id).toBe('daRespondentBanner');
    expect(da_respondentNotifications[1].id).toBe('orderPersonalService');
  });
});
