import { CA_APPLICANT } from './ca_applicant';

describe('ca_applicant', () => {
  test('should have correct notification ids', () => {
    expect(CA_APPLICANT).toHaveLength(5);
    expect(CA_APPLICANT[0].id).toBe('applicationSubmitted');
    expect(CA_APPLICANT[1].id).toBe('cafcassSafetyChecks');
    expect(CA_APPLICANT[2].id).toBe('responseSubmitted');
    expect(CA_APPLICANT[3].id).toBe('hearingAndCourtOrders');
    expect(CA_APPLICANT[4].id).toBe('caseClosed');
  });
});
