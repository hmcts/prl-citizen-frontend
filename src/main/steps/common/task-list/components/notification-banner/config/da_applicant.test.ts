import { DA_APPLICANT_CONFIG } from './da_applicant';

describe('da_applicant', () => {
  test('should have correct notification ids', () => {
    const da_applicantNotifications = DA_APPLICANT_CONFIG();

    expect(da_applicantNotifications).toHaveLength(5);
    expect(da_applicantNotifications[0].id).toBe('applicantToPersonallyServeDARespondent');
    expect(da_applicantNotifications[1].id).toBe('applicationServedByCourtAdminBailiffToDARespondent');
    expect(da_applicantNotifications[2].id).toBe('orderNonPersonalService');
    expect(da_applicantNotifications[3].id).toBe('orderPersonalService');
    expect(da_applicantNotifications[4].id).toBe('orderSOSPersonalServiceByCourtAdminBailiffToDARespondent');
  });
});
