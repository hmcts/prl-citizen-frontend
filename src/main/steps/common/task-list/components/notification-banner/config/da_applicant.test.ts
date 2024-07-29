import { DA_APPLICANT_CONFIG } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    const da_applicantNotifications = DA_APPLICANT_CONFIG();

    expect(da_applicantNotifications).toHaveLength(1);
    expect(da_applicantNotifications[0].id).toBe('orderNonPersonalService');
  });
});
