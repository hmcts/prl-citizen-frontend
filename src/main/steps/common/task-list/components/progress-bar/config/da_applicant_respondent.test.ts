import { DA_APPLICANT_RESPONDENT } from './da_applicant_respondent';

describe('da_applicant and da_respondent', () => {
  test('should have correct notification ids', () => {
    expect(DA_APPLICANT_RESPONDENT).toHaveLength(4);
    expect(DA_APPLICANT_RESPONDENT[0].id).toBe('caseOpened');
    expect(DA_APPLICANT_RESPONDENT[1].id).toBe('hearingAndCourtOrders');
    expect(DA_APPLICANT_RESPONDENT[2].id).toBe('finalOrder');
    expect(DA_APPLICANT_RESPONDENT[3].id).toBe('caseClosed');
  });
});
