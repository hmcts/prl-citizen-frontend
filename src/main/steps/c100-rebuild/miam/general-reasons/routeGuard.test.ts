import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('c100 > miam > general reasons > route guard', () => {
  test('should clean data for unselected miam exemptions', async () => {
    const req = mockRequest({
      body: {
        miam_nonAttendanceReasons: [],
      },
      session: {
        userCase: {
          miam_domesticAbuse: [],
          miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSomeoneArrest'],
          miam_domesticAbuse_courtInvolvement_subfields: ['boundedByCourtAction'],
          miam_domesticAbuse_letterOfBeingVictim_subfields: ['letterFromHealthProfessional'],
          miam_domesticAbuse_letterFromAuthority_subfields: ['letterFromMultiAgencyMember'],
          miam_domesticAbuse_letterFromSupportService_subfields: ['letterFromDomesticViolenceAdvisor'],
          miam_canProvideDomesticAbuseEvidence: 'yes',
          miam_detailsOfDomesticAbuseEvidence: 'test',
          miam_domesticAbuseEvidenceDocs: [
            {
              id: '1234',
              url: 'MOCK_URL',
              filename: 'MOCK_FILENAME',
              binaryUrl: 'MOCK_BINARY_URL',
            },
          ],
          miam_childProtectionEvidence: 'localAuthority',
          miam_urgency: 'freedomPhysicalSafety',
          miam_previousAttendance: 'fourMonthsPriorAttended',
          miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          miam_detailsOfEvidence: 'test',
          miam_previousAttendanceEvidenceDoc: {
            id: '1234',
            url: 'MOCK_URL',
            filename: 'MOCK_FILENAME',
            binaryUrl: 'MOCK_BINARY_URL',
          },
          miam_notAttendingReasons: 'canNotAccessMediator',
          miam_noMediatorReasons: 'noAppointmentAvailable',
          miam_noAppointmentAvailableDetails: 'test',
          miam_unableToAttainDueToDisablityDetails: 'test',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      miam_domesticAbuse: [],
      miam_domesticAbuseEvidenceDocs: [],
      miam_domesticAbuse_courtInvolvement_subfields: [],
      miam_domesticAbuse_letterFromAuthority_subfields: [],
      miam_domesticAbuse_letterFromSupportService_subfields: [],
      miam_domesticAbuse_letterOfBeingVictim_subfields: [],
      miam_domesticAbuse_policeInvolvement_subfields: [],
    });
    expect(req.session.save).toHaveBeenCalled();
  });
});
