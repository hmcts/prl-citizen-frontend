import { getCARespondentConfig } from './ca_respondent';

describe('ca_respondent', () => {
  test('should have correct notification ids', () => {
    const caRespondentConfig = getCARespondentConfig();
    expect(caRespondentConfig).toHaveLength(5);
    expect(caRespondentConfig[0].id).toBe('applicationSubmitted');
    expect(caRespondentConfig[1].id).toBe('cafcassSafetyChecks');
    expect(caRespondentConfig[2].id).toBe('responseSubmitted');
    expect(caRespondentConfig[3].id).toBe('hearingAndCourtOrders');
    expect(caRespondentConfig[4].id).toBe('caseClosed');
  });
});
