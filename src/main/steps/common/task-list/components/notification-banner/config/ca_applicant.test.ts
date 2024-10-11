import { CaseWithId } from '../../../../../../app/case/case';
import { PartyDetails } from '../../../../../../app/case/definition';

import { CA_APPLICANT_CONFIG } from './ca_applicant';

describe('ca_applicant', () => {
  test('should have correct notification ids', () => {
    const ca_applicantNotifications = CA_APPLICANT_CONFIG({
      respondents: [
        {
          id: '1',
          value: {} as PartyDetails,
        },
      ],
    } as CaseWithId);

    expect(ca_applicantNotifications).toHaveLength(15);
    expect(ca_applicantNotifications[0].id).toBe('applicationNotStarted');
    expect(ca_applicantNotifications[1].id).toBe('applicationInProgress');
    expect(ca_applicantNotifications[2].id).toBe('applicationSubmitted');
    expect(ca_applicantNotifications[3].id).toBe('applicationWithdrawn');
    expect(ca_applicantNotifications[4].id).toBe('applicationServedByCourtPersonalNonPersonalService');
    expect(ca_applicantNotifications[5].id).toBe('viewResponseToApplication');
    expect(ca_applicantNotifications[6].id).toBe('viewRespondentAOH');
    expect(ca_applicantNotifications[7].id).toBe('viewRespondentResponseAOH');
    expect(ca_applicantNotifications[8].id).toBe('applicantToPersonallyServeRespondent');
    expect(ca_applicantNotifications[9].id).toBe('applicationServedBySolictorBailiffToRespondent');
    expect(ca_applicantNotifications[10].id).toBe('applicationIssuedByCourtPersonalService');
    expect(ca_applicantNotifications[11].id).toBe('submitFM5');
    expect(ca_applicantNotifications[12].id).toBe('orderSOSPersonalServiceByCourtAdminBailiff');
    expect(ca_applicantNotifications[13].id).toBe('orderNonPersonalService');
    expect(ca_applicantNotifications[14].id).toBe('orderPersonalService');
  });
});
