import { getCAApplicantConfig } from './ca_applicant';

describe('ca_applicant', () => {
  test('should have correct notification ids', () => {
    const caApplicantConfig = getCAApplicantConfig();
    expect(caApplicantConfig).toHaveLength(5);
    expect(caApplicantConfig[0].id).toBe('applicationSubmitted');
    expect(caApplicantConfig[1].id).toBe('cafcassSafetyChecks');
    expect(caApplicantConfig[2].id).toBe('responseSubmitted');
    expect(caApplicantConfig[3].id).toBe('hearingAndCourtOrders');
    expect(caApplicantConfig[4].id).toBe('caseClosed');
  });
});
