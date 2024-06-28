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

    expect(ca_applicantNotifications).toHaveLength(11);
    expect(ca_applicantNotifications[0].id).toBe('applicationNotStarted');
    expect(ca_applicantNotifications[1].id).toBe('applicationInProgress');
    expect(ca_applicantNotifications[2].id).toBe('applicationSubmitted');
    expect(ca_applicantNotifications[3].id).toBe('applicationWithdrawn');
    expect(ca_applicantNotifications[4].id).toBe('applicationServedByCourtPersonalNonPersonalService');
    expect(ca_applicantNotifications[5].id).toBe('viewResponseToApplication');
    expect(ca_applicantNotifications[6].id).toBe('applicantToPersonallyServeRespondent');
    expect(ca_applicantNotifications[7].id).toBe('applicationIssuedByCourtPersonalService');
    expect(ca_applicantNotifications[8].id).toBe('submitFM5');
    expect(ca_applicantNotifications[9].id).toBe('applicationClosed');
    expect(ca_applicantNotifications[10].id).toBe('orderPersonalService');
  });
});
