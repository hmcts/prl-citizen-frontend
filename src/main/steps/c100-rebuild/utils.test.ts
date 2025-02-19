import { CaseWithId } from '../../app/case/case';
import { C100FlowTypes } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

import { getC100FlowType, isC100ApplicationValid } from './utils';

describe('C100 rebuild > utils', () => {
  describe('getC100FlowType', () => {
    test('should return flow 1 when written agreement is yes in caseData', () => {
      expect(
        getC100FlowType({ sq_writtenAgreement: 'Yes' } as unknown as CaseWithId, {} as unknown as AppRequest)
      ).toBe(C100FlowTypes.C100_WITH_CONSENT_ORDER);
    });

    test('should return flow 1 when written agreement is yes in request body', () => {
      expect(
        getC100FlowType({} as unknown as CaseWithId, { body: { sq_writtenAgreement: 'Yes' } } as unknown as AppRequest)
      ).toBe(C100FlowTypes.C100_WITH_CONSENT_ORDER);
    });

    test('should return flow 2 when miam other proceedings is yes in caseData', () => {
      expect(
        getC100FlowType(
          { miam_otherProceedings: 'Yes' } as unknown as CaseWithId,
          { body: {} } as unknown as AppRequest
        )
      ).toBe(C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE);
    });

    test('should return flow 2 when miam other proceedings is yes in request body', () => {
      expect(
        getC100FlowType(
          {} as unknown as CaseWithId,
          { body: { miam_otherProceedings: 'Yes' } } as unknown as AppRequest
        )
      ).toBe(C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE);
    });

    test('should return flow 3 when miam when miam urgency selected', () => {
      expect(
        getC100FlowType(
          {
            miam_nonAttendanceReasons: ['urgentHearing'],
            miam_urgency: 'freedomPhysicalSafety',
          } as unknown as CaseWithId,
          { body: {} } as unknown as AppRequest
        )
      ).toBe(C100FlowTypes.C100_WITH_MIAM_URGENCY);
    });

    test('should return flow 4 in other scenarios', () => {
      expect(getC100FlowType({} as unknown as CaseWithId, { body: {} } as unknown as AppRequest)).toBe(
        C100FlowTypes.C100_WITH_MIAM
      );
    });
  });

  describe('isC100ApplicationValid', () => {
    const commonUserCase = {
      too_courtOrder: ['test'],
      too_shortStatement: 'test',
      hu_urgentHearingReasons: 'No',
      hwn_hearingPart1: 'No',
      cd_children: [
        {
          firstName: 'test',
          lastName: 'test',
          personalDetails: { isDateOfBirthUnknown: 'Yes' },
          liveWith: [{}],
          mainlyLiveWith: {},
        },
      ],
      ocd_hasOtherChildren: 'No',
      appl_allApplicants: [
        {
          applicantAddress1: '',
          applicantFirstName: '',
          applicantLastName: '',
          contactDetailsPrivate: 'No',
          applicantContactDetail: { canLeaveVoiceMail: 'No' },
          relationshipDetails: { relationshipToChildren: {} },
        },
      ],
      resp_Respondents: [
        {
          address: {
            AddressLine1: '',
          },
          firstName: '',
          lastName: '',
          contactDetails: '',
          relationshipDetails: { relationshipToChildren: {} },
        },
      ],
      oprs_otherPersonCheck: 'No',
      op_courtOrderProtection: 'No',
      op_childrenInvolvedCourtCase: 'No',
      c1A_haveSafetyConcerns: 'No',
      ra_typeOfHearing: ['test'],
      ra_disabilityRequirements: ['test'],
      ie_internationalStart: 'No',
      ie_internationalRequest: 'No',
      hwf_needHelpWithFees: 'No',
    };

    test('should return true for flow 1 when all required sections present', () => {
      expect(
        isC100ApplicationValid(
          { sq_writtenAgreement: 'Yes', co_certificate: {}, ...commonUserCase } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: false },
            },
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 1 for specific section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'Yes',
            co_certificate: {},
            too_courtOrder: ['test'],
            too_shortStatement: 'test',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            originalUrl: 'localhost:3000/c100-rebuild/typeoforder/shortstatement',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 1 for consent order section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'Yes',
            co_certificate: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            originalUrl: 'localhost:3000/c100-rebuild/consent-order/upload',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 1 for screening questions section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'Yes',
            co_certificate: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            originalUrl: 'localhost:3000/c100-rebuild/screening-questions',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 2 when all required sections including miam other proceedings are present', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'Yes',
            ...commonUserCase,
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: false },
            },
            body: {},
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 2 for specific section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'Yes',
            too_courtOrder: ['test'],
            too_shortStatement: 'test',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/typeoforder/shortstatement',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 2 for screening questions section when miam valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/screening-questions/permission',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 2 for miam section when miam other proceedings', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/miam/other-proceedings',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 3 when all required sections present', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['urgentHearing'],
            miam_urgency: 'freedomPhysicalSafety',
            ...commonUserCase,
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: false },
            },
            body: {},
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 3 for specific section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['urgentHearing'],
            miam_urgency: 'freedomPhysicalSafety',
            too_courtOrder: ['test'],
            too_shortStatement: 'test',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/typeoforder/shortstatement',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 3 for screening section when miam valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['urgentHearing'],
            miam_urgency: 'freedomPhysicalSafety',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/screening-questions/permission',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 when all required sections present', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            ...commonUserCase,
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: false },
            },
            body: {},
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 when all required sections including miam attendance are present', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_attendance: 'Yes',
            miam_haveDocSigned: 'Yes',
            miam_certificate: {},
            ...commonUserCase,
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: false },
            },
            body: {},
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 for specific section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            too_courtOrder: ['test'],
            too_shortStatement: 'test',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/typeoforder/shortstatement',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 for screening section when miam valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/screening-questions/permission',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 for screening section when miam attendance valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_attendance: 'Yes',
            miam_haveDocSigned: 'Yes',
            miam_certificate: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/screening-questions/permission',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 for miam section when miam attendance valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_attendance: 'Yes',
            miam_haveDocSigned: 'Yes',
            miam_certificate: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/miam/miam-excemptions-summary',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true for flow 4 for miam section when miam valid', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['previousMIAMOrExempt'],
            miam_childProtectionEvidence: 'localAuthority',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/miam/miam-excemptions-summary',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from people section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            cd_children: [
              {
                firstName: 'test',
                lastName: 'test',
                personalDetails: { isDateOfBirthUnknown: 'Yes' },
                liveWith: [{}],
                mainlyLiveWith: {},
              },
            ],
            ocd_hasOtherChildren: 'Yes',
            ocd_otherChildren: [{ firstName: 'test', lastName: 'test' }],
            appl_allApplicants: [
              {
                applicantAddress1: '',
                applicantFirstName: '',
                applicantLastName: '',
                contactDetailsPrivate: 'No',
                applicantContactDetail: { canLeaveVoiceMail: 'No' },
                relationshipDetails: { relationshipToChildren: {} },
              },
            ],
            resp_Respondents: [
              {
                address: {
                  AddressLine1: '',
                },
                firstName: '',
                lastName: '',
                contactDetails: '',
                relationshipDetails: { relationshipToChildren: {} },
              },
            ],
            oprs_otherPersonCheck: 'Yes',
            oprs_otherPersons: [
              {
                address: {
                  AddressLine1: '',
                },
                firstName: '',
                lastName: '',
                contactDetails: '',
                relationshipDetails: { relationshipToChildren: {} },
              },
            ],
            op_courtOrderProtection: 'No',
            op_childrenInvolvedCourtCase: 'No',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/other-person-details/other-person-check',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from urgent hearing section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            hu_urgentHearingReasons: 'Yes',
            hu_reasonOfUrgentHearing: ['riskOfSafety'],
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/hearing-urgency/urgent-details',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from hearing without notice section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            hwn_hearingPart1: 'Yes',
            hwn_reasonsForApplicationWithoutNotice: 'test',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/hearing-without-notice/hearing-part2',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from other proceedings section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            op_courtOrderProtection: 'Yes',
            op_childrenInvolvedCourtCase: 'Yes',
            op_courtProceedingsOrders: ['childArrangementOrder'],
            op_otherProceedings: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/other-proceedings/document-summary',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from miam exemptions', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: [
              'domesticViolence',
              'previousMIAMOrExempt',
              'childProtection',
              'urgentHearing',
              'miam_urgency',
            ],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            miam_childProtectionEvidence: 'localAuthority',
            op_courtOrderProtection: 'Yes',
            op_childrenInvolvedCourtCase: 'Yes',
            miam_urgency: 'freedomPhysicalSafety',
            miam_notAttendingReasons: 'under18',
            op_courtProceedingsOrders: ['childArrangementOrder'],
            op_otherProceedings: {},
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/miam/document-summary',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from safety concerns section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            c1A_haveSafetyConcerns: 'Yes',
            c1A_safetyConernAbout: ['children'],
            c1A_safteyConcerns: { child: { physicalAbuse: {} } },
            c1A_otherConcernsDrugs: 'Yes',
            c1A_childSafetyConcerns: 'Yes',
            c1A_agreementOtherWaysDetails: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/safety-concerns/orders-required/unsupervised',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from safety concerns section when abduction selected', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            c1A_haveSafetyConcerns: 'Yes',
            c1A_safetyConernAbout: ['children'],
            c1A_safteyConcerns: { child: { physicalAbuse: {} } },
            c1A_concernAboutChild: ['abduction'],
            c1A_abductionReasonOutsideUk: 'Yes',
            c1A_childsCurrentLocation: 'Yes',
            c1A_passportOffice: 'Yes',
            c1A_possessionChildrenPassport: ['Father'],
            c1A_abductionPassportOfficeNotified: 'Yes',
            c1A_childAbductedBefore: 'Yes',
            c1A_previousAbductionsShortDesc: 'test',
            c1A_policeOrInvestigatorInvolved: 'Yes',
            c1A_childrenMoreThanOnePassport: 'Yes',
            c1A_otherConcernsDrugs: 'Yes',
            c1A_childSafetyConcerns: 'Yes',
            c1A_agreementOtherWaysDetails: 'Yes',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/safety-concerns/orders-required/unsupervised',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return true when navigating from hwf section', () => {
      expect(
        isC100ApplicationValid(
          {
            sq_writtenAgreement: 'No',
            sq_legalRepresentation: 'No',
            sq_courtPermissionRequired: 'No',
            miam_otherProceedings: 'No',
            miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
            miam_domesticAbuse: ['policeInvolvement'],
            miam_canProvideDomesticAbuseEvidence: 'Yes',
            miam_previousAttendance: 'fourMonthsPriorAttended',
            miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
            hwf_needHelpWithFees: 'Yes',
            hwf_feesAppliedDetails: 'Yes',
            helpWithFeesReferenceNumber: '1234',
          } as unknown as CaseWithId,
          {
            session: {
              enableC100CaseProgressionTrainTrack: true,
              applicationSettings: { hasC100ApplicationBeenCompleted: true },
            },
            body: {},
            originalUrl: 'localhost:3000/c100-rebuild/help-with-fees/fees-applied',
          } as unknown as AppRequest
        )
      ).toBe(true);
    });

    test('should return false when enableC100CaseProgressionTrainTrack is not true', () => {
      expect(isC100ApplicationValid({} as unknown as CaseWithId, { session: {} } as unknown as AppRequest)).toBe(false);
    });
  });
});
