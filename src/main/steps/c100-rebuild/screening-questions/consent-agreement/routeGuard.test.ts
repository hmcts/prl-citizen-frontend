import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('c100 > screening questions > permissions why > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          sq_legalRepresentation: 'Yes',
          sq_legalRepresentationApplication: 'Yes',
          sq_courtPermissionRequired: 'Yes',
          sq_permissionsRequest: 'test',
          sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
          sq_doNotHaveParentalResponsibility_subfield: 'test',
          sq_courtOrderPrevent_subfield: 'test',
          sq_anotherReason_subfield: 'test',
          miam_consent: 'Yes',
          miam_attendance: 'No',
          miam_haveDocSigned: 'Yes',
          miam_certificate: {
            id: '1234',
            url: 'MOCK_URL',
            filename: 'MOCK_FILENAME',
            binaryUrl: 'MOCK_BINARY_URL',
          },
          miam_nonAttendanceReasons: [
            'domesticViolence',
            'childProtection',
            'urgentHearing',
            'previousMIAMOrExempt',
            'validExemption',
          ],
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
          co_certificate: {
            id: '1234',
            url: 'MOCK_URL',
            filename: 'MOCK_FILENAME',
            binaryUrl: 'MOCK_BINARY_URL',
          },
        },
      },
    });
    res = mockResponse();
  });

  test('should clean fields for consent agreement yes and call next', async () => {
    req.body.sq_writtenAgreement = 'Yes';
    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      miam_domesticAbuse: [],
      miam_domesticAbuseEvidenceDocs: [],
      miam_domesticAbuse_courtInvolvement_subfields: [],
      miam_domesticAbuse_letterFromAuthority_subfields: [],
      miam_domesticAbuse_letterFromSupportService_subfields: [],
      miam_domesticAbuse_letterOfBeingVictim_subfields: [],
      miam_domesticAbuse_policeInvolvement_subfields: [],
      miam_nonAttendanceReasons: [],
      sq_permissionsWhy: [],
      co_certificate: {
        id: '1234',
        url: 'MOCK_URL',
        filename: 'MOCK_FILENAME',
        binaryUrl: 'MOCK_BINARY_URL',
      },
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should clean fields for consent agreement no and call next', async () => {
    req.body.sq_writtenAgreement = 'No';
    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      sq_legalRepresentation: 'Yes',
      sq_legalRepresentationApplication: 'Yes',
      sq_courtPermissionRequired: 'Yes',
      sq_permissionsRequest: 'test',
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
      sq_doNotHaveParentalResponsibility_subfield: 'test',
      sq_courtOrderPrevent_subfield: 'test',
      sq_anotherReason_subfield: 'test',
      miam_consent: 'Yes',
      miam_attendance: 'No',
      miam_haveDocSigned: 'Yes',
      miam_certificate: {
        id: '1234',
        url: 'MOCK_URL',
        filename: 'MOCK_FILENAME',
        binaryUrl: 'MOCK_BINARY_URL',
      },
      miam_nonAttendanceReasons: [
        'domesticViolence',
        'childProtection',
        'urgentHearing',
        'previousMIAMOrExempt',
        'validExemption',
      ],
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
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
