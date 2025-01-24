import { getDAConfig } from './da_applicant_respondent';

describe('da_applicant and da_respondent', () => {
  test('should have correct notification ids', () => {
    const daConfig = getDAConfig();
    expect(daConfig).toHaveLength(4);
    expect(daConfig[0].id).toBe('caseOpened');
    expect(daConfig[1].id).toBe('hearingAndCourtOrders');
    expect(daConfig[2].id).toBe('finalOrder');
    expect(daConfig[3].id).toBe('caseClosed');
  });
});
