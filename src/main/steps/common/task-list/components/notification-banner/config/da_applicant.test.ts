import { DA_APPLICANT_CONFIG } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    const da_applicantNotifications = DA_APPLICANT_CONFIG();

    expect(da_applicantNotifications).toHaveLength(3);
    expect(da_applicantNotifications[0].id).toBe('newOrder');
    expect(da_applicantNotifications[1].id).toBe('finalOrder');
    expect(da_applicantNotifications[2].id).toBe('dn5');
  });
});
