import { CA_APPLICANT } from './ca_applicant';

describe('ca_applicant', () => {
  test('should have correct notification ids', () => {
    expect(CA_APPLICANT).toHaveLength(14);
    expect(CA_APPLICANT[0].id).toBe('newDocument');
    expect(CA_APPLICANT[1].id).toBe('applicationNotStarted');
    expect(CA_APPLICANT[2].id).toBe('applicationInProgress');
    expect(CA_APPLICANT[3].id).toBe('applicationSubmitted');
    expect(CA_APPLICANT[4].id).toBe('applicationWithdrawn');
    expect(CA_APPLICANT[5].id).toBe('withdrawalRequestRejected');
    expect(CA_APPLICANT[6].id).toBe('applicationSentToLocalCourt');
    expect(CA_APPLICANT[7].id).toBe('applicationSentToGateKeeping');
    expect(CA_APPLICANT[8].id).toBe('applicationServedAndLinked');
    expect(CA_APPLICANT[9].id).toBe('applicationClosed');
    expect(CA_APPLICANT[10].id).toBe('newOrder');
    expect(CA_APPLICANT[11].id).toBe('giveRespondentTheirDocuments');
    expect(CA_APPLICANT[12].id).toBe('caPersonalService');
    expect(CA_APPLICANT[13].id).toBe('soaServedBannerCa');
  });
});
