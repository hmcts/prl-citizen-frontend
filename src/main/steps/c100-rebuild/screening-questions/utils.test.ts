import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import { cleanConsentAgreement, cleanPermissionsWhy } from './utils';

describe('c100 > screening questions > utils', () => {
  describe('cleanConsentAgreement', () => {
    let caseData;

    beforeEach(() => {
      caseData = {
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
      } as unknown as CaseWithId;
    });

    test('should clean data if written agreement is yes', () => {
      expect(cleanConsentAgreement(caseData, YesOrNo.YES)).toStrictEqual({
        miam_domesticAbuse: [],
        miam_domesticAbuseEvidenceDocs: [],
        miam_domesticAbuse_courtInvolvement_subfields: [],
        miam_domesticAbuse_letterFromAuthority_subfields: [],
        miam_domesticAbuse_letterFromSupportService_subfields: [],
        miam_domesticAbuse_letterOfBeingVictim_subfields: [],
        miam_domesticAbuse_policeInvolvement_subfields: [],
        miam_nonAttendanceReasons: [],
        co_certificate: {
          id: '1234',
          url: 'MOCK_URL',
          filename: 'MOCK_FILENAME',
          binaryUrl: 'MOCK_BINARY_URL',
        },
      });
    });

    test('should clean data if written agreement is no', () => {
      expect(cleanConsentAgreement(caseData, YesOrNo.NO)).toStrictEqual({
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
    });
  });

  describe('cleanPermissionsWhy', () => {
    test('should clean permissions why subfields if not selected', () => {
      expect(
        cleanPermissionsWhy(
          {
            sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
            sq_doNotHaveParentalResponsibility_subfield: 'test',
            sq_courtOrderPrevent_subfield: 'test',
            sq_anotherReason_subfield: 'test',
          } as CaseWithId,
          []
        )
      ).toStrictEqual({ sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'] });
    });

    test('should clean permissions why subfields if selected', () => {
      expect(
        cleanPermissionsWhy(
          {
            sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
            sq_doNotHaveParentalResponsibility_subfield: 'test',
            sq_courtOrderPrevent_subfield: 'test',
            sq_anotherReason_subfield: 'test',
          } as CaseWithId,
          ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason']
        )
      ).toStrictEqual({
        sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
        sq_doNotHaveParentalResponsibility_subfield: 'test',
        sq_courtOrderPrevent_subfield: 'test',
        sq_anotherReason_subfield: 'test',
      });
    });
  });
});
