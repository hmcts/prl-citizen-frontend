import { CA_RESPONDENT } from './ca_respondent';

describe('ca_respondent', () => {
  test('should have correct notification ids', () => {
    expect(CA_RESPONDENT).toHaveLength(5);
    expect(CA_RESPONDENT[0].id).toBe('applicationSubmitted');
    expect(CA_RESPONDENT[1].id).toBe('cafcassSafetyChecks');
    expect(CA_RESPONDENT[2].id).toBe('responseSubmitted');
    expect(CA_RESPONDENT[3].id).toBe('hearingAndCourtOrders');
    expect(CA_RESPONDENT[4].id).toBe('caseClosed');
  });
});
