import { CA_APPLICANT } from './ca_applicant';

describe('ca_applicant', () => {
  test('should have correct notification ids', () => {
    expect(CA_APPLICANT).toHaveLength(10);
    expect(CA_APPLICANT[0].id).toBe('applicationNotStarted');
    expect(CA_APPLICANT[1].id).toBe('applicationInProgress');
    expect(CA_APPLICANT[2].id).toBe('applicationSubmitted');
    expect(CA_APPLICANT[3].id).toBe('applicationWithdrawn');
    expect(CA_APPLICANT[4].id).toBe('withdrawalRequestRejected');
    expect(CA_APPLICANT[5].id).toBe('applicationSentToLocalCourt');
    expect(CA_APPLICANT[6].id).toBe('applicationSentToGateKeeping');
    expect(CA_APPLICANT[7].id).toBe('applicationServedAndLinked');
    expect(CA_APPLICANT[8].id).toBe('applicationClosed');
    expect(CA_APPLICANT[9].id).toBe('newOrder');
  });
});
