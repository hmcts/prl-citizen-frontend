import { applicantMockRequest } from '../../../test/unit/mocks/mocked-requests/applicant-details-mock';
import { childrenMockData } from '../../../test/unit/mocks/mocked-requests/child-details-mock';
import { miamMockData } from '../../../test/unit/mocks/mocked-requests/miam-mock';
import { otherChildrenMockData } from '../../../test/unit/mocks/mocked-requests/other-child-mock';
import { otherPersonMockData } from '../../../test/unit/mocks/mocked-requests/other-person-mock';
import { otherProceedingsMockData } from '../../../test/unit/mocks/mocked-requests/other-proceedings-mock';
import { respondentMockData } from '../../../test/unit/mocks/mocked-requests/respondent-details-mock';
import { CaseWithId, Miam_urgency } from '../../app/case/case';
import { MiamNonAttendReason, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

import { C100Sequence } from './c100sequence';

describe('C100Sequence', () => {
  const commonUserCase = {
    c100RebuildChildPostCode: 'test',
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
    ie_internationalParents: 'Yes',
    ie_provideDetailsParents: 'Scotland',
    ie_internationalJurisdiction: 'No',
    ie_internationalRequest: 'Yes',
    hwf_needHelpWithFees: 'No',
  };
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(103);

    expect(C100Sequence[0].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[0].showInSection).toBe('c100');
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/start-alternative'
    );
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.NO })).toBe(
      '/c100-rebuild/confidentiality/start-alternative'
    );

    expect(C100Sequence[1].url).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[1].showInSection).toBe('c100');
    expect(C100Sequence[1].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[2].url).toBe('/c100-rebuild/confidentiality/feedbackno');
    expect(C100Sequence[2].showInSection).toBe('c100');
    expect(C100Sequence[2].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[3].url).toBe('/c100-rebuild/confidentiality/start');
    expect(C100Sequence[3].showInSection).toBe('c100');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.YES })).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({ startAlternative: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/feedback'
    );

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({})).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[5].url).toBe('/c100-rebuild/international-elements/start');
    expect(C100Sequence[5].showInSection).toBe('c100');
    expect(C100Sequence[5].getNextStep({})).toBe('/c100-rebuild/international-elements/parents');

    expect(C100Sequence[6].url).toBe('/c100-rebuild/international-elements/parents');
    expect(C100Sequence[6].showInSection).toBe('c100');
    expect(C100Sequence[6].getNextStep({})).toBe('/c100-rebuild/international-elements/jurisdiction');

    expect(C100Sequence[7].url).toBe('/c100-rebuild/international-elements/jurisdiction');
    expect(C100Sequence[7].showInSection).toBe('c100');
    expect(C100Sequence[7].getNextStep({})).toBe('/c100-rebuild/international-elements/request');

    expect(C100Sequence[8].url).toBe('/c100-rebuild/international-elements/request');
    expect(C100Sequence[8].showInSection).toBe('c100');
    expect(
      C100Sequence[8].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/reasonable-adjustments/attending-court');
    expect(
      C100Sequence[8].getNextStep(
        { sq_writtenAgreement: 'Yes', co_certificate: {}, ...commonUserCase } as unknown as CaseWithId,
        {
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: false },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[9].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[9].showInSection).toBe('c100');
    expect(C100Sequence[9].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');

    expect(C100Sequence[10].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');
    expect(C100Sequence[10].showInSection).toBe('c100');
    expect(C100Sequence[10].getNextStep({ hwn_hearingPart1: YesOrNo.YES })).toBe(
      '/c100-rebuild/hearing-without-notice/hearing-part2'
    );
    expect(
      C100Sequence[10].getNextStep(
        {
          sq_writtenAgreement: 'Yes',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'No',
          miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
          miam_domesticAbuse: ['policeInvolvement'],
          miam_canProvideDomesticAbuseEvidence: 'Yes',
          miam_previousAttendance: 'fourMonthsPriorAttended',
          miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          hwn_hearingPart1: YesOrNo.NO,
          hu_urgentHearingReasons: 'Yes',
          hu_reasonOfUrgentHearing: ['riskOfSafety'],
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/hearing-without-notice/hearing-part1',
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');
    expect(
      C100Sequence[10].getNextStep({ hwn_hearingPart1: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/child-details/add-children');

    expect(C100Sequence[11].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part2');
    expect(C100Sequence[11].showInSection).toBe('c100');
    expect(
      C100Sequence[11].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/child-details/add-children');
    expect(
      C100Sequence[11].getNextStep(
        {
          sq_writtenAgreement: YesOrNo.NO,
          miam_validReason: YesOrNo.YES,
          miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT],
          miam_urgency: Miam_urgency.freedomPhysicalSafety,
        },
        {
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(
      C100Sequence[11].getNextStep(
        {
          sq_writtenAgreement: 'Yes',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'No',
          miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
          miam_domesticAbuse: ['policeInvolvement'],
          miam_canProvideDomesticAbuseEvidence: 'Yes',
          miam_previousAttendance: 'fourMonthsPriorAttended',
          miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          hwn_hearingPart1: YesOrNo.YES,
          hu_urgentHearingReasons: 'Yes',
          hu_reasonOfUrgentHearing: ['riskOfSafety'],
          hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
          hwn_doYouNeedAWithoutNoticeHearing: 'hwn_doYouNeedAWithoutNoticeHearing',
          hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
          hwn_doYouRequireAHearingWithReducedNotice: 'hwn_doYouRequireAHearingWithReducedNotice',
          hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/hearing-without-notice/hearing-part2',
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[12].url).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(C100Sequence[12].showInSection).toBe('c100');
    expect(C100Sequence[12].getNextStep({})).toBe('/c100-rebuild/typeoforder/caorder');

    expect(C100Sequence[13].url).toBe('/c100-rebuild/typeoforder/caorder');
    expect(C100Sequence[13].showInSection).toBe('c100');
    expect(C100Sequence[13].getNextStep({})).toBe('/c100-rebuild/typeoforder/shortstatement');

    expect(C100Sequence[14].url).toBe('/c100-rebuild/typeoforder/shortstatement');
    expect(C100Sequence[14].showInSection).toBe('c100');
    expect(
      C100Sequence[14].getNextStep({ sq_writtenAgreement: YesOrNo.YES }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/consent-order/upload');
    expect(
      C100Sequence[14].getNextStep({ hwf_needHelpWithFees: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/hearing-urgency/urgent');
    expect(
      C100Sequence[14].getNextStep(
        {
          sq_writtenAgreement: 'Yes',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'No',
          miam_nonAttendanceReasons: ['domesticViolence', 'previousMIAMOrExempt'],
          miam_domesticAbuse: ['policeInvolvement'],
          miam_canProvideDomesticAbuseEvidence: 'Yes',
          miam_previousAttendance: 'fourMonthsPriorAttended',
          miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
          hwn_hearingPart1: YesOrNo.YES,
          hu_urgentHearingReasons: 'Yes',
          hu_reasonOfUrgentHearing: ['riskOfSafety'],
          hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
          hwn_doYouNeedAWithoutNoticeHearing: 'hwn_doYouNeedAWithoutNoticeHearing',
          hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
          hwn_doYouRequireAHearingWithReducedNotice: 'hwn_doYouRequireAHearingWithReducedNotice',
          hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/hearing-without-notice/hearing-part2',
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[15].url).toBe('/c100-rebuild/start');
    expect(C100Sequence[15].showInSection).toBe('c100');
    expect(C100Sequence[15].getNextStep({})).toBe('/c100-rebuild/childaddress');

    expect(C100Sequence[16].url).toBe('/c100-rebuild/help-with-fees/need-help-with-fees');
    expect(C100Sequence[16].showInSection).toBe('c100');
    expect(C100Sequence[16].getNextStep({ hwf_needHelpWithFees: YesOrNo.YES })).toBe(
      '/c100-rebuild/help-with-fees/fees-applied'
    );
    expect(C100Sequence[16].getNextStep({ hwf_needHelpWithFees: YesOrNo.NO })).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[17].url).toBe('/c100-rebuild/help-with-fees/fees-applied');
    expect(C100Sequence[17].showInSection).toBe('c100');
    expect(C100Sequence[17].getNextStep({ hwf_feesAppliedDetails: YesOrNo.YES })).toBe(
      '/c100-rebuild/check-your-answers'
    );
    expect(C100Sequence[17].getNextStep({ hwf_feesAppliedDetails: YesOrNo.NO })).toBe(
      '/c100-rebuild/help-with-fees/hwf-guidance'
    );

    expect(C100Sequence[18].url).toBe('/c100-rebuild/help-with-fees/hwf-guidance');
    expect(C100Sequence[18].showInSection).toBe('c100');
    expect(C100Sequence[18].getNextStep({})).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[19].url).toBe('/c100-rebuild/child-details/add-children');
    expect(C100Sequence[19].showInSection).toBe('c100');
    expect(C100Sequence[19].getNextStep(childrenMockData.session.userCase)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/personal-details'
    );

    expect(C100Sequence[20].url).toBe('/c100-rebuild/child-details/:childId/personal-details');
    expect(C100Sequence[20].showInSection).toBe('c100');
    expect(C100Sequence[20].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/child-matters'
    );

    expect(C100Sequence[21].url).toBe('/c100-rebuild/child-details/:childId/child-matters');
    expect(C100Sequence[21].showInSection).toBe('c100');
    expect(C100Sequence[21].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/parental-responsibility'
    );

    expect(C100Sequence[22].url).toBe('/c100-rebuild/child-details/:childId/parental-responsibility');
    expect(C100Sequence[22].showInSection).toBe('c100');
    expect(C100Sequence[22].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/further-information'
    );

    expect(C100Sequence[23].url).toBe('/c100-rebuild/child-details/further-information');
    expect(C100Sequence[23].showInSection).toBe('c100');
    expect(C100Sequence[23].getNextStep({})).toBe('/c100-rebuild/child-details/has-other-children');

    expect(C100Sequence[24].url).toBe('/c100-rebuild/confirmation-page');
    expect(C100Sequence[24].showInSection).toBe('c100');
    expect(C100Sequence[24].getNextStep({})).toBe('/c100-rebuild/confirmation-page');

    expect(C100Sequence[25].url).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
    expect(C100Sequence[25].showInSection).toBe('c100');
    expect(
      C100Sequence[25].getNextStep(
        { op_childrenInvolvedCourtCase: YesOrNo.YES, op_courtOrderProtection: YesOrNo.YES },
        {
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/other-proceedings/proceeding-details');
    expect(
      C100Sequence[25].getNextStep({ op_childrenInvolvedCourtCase: YesOrNo.NO, op_courtOrderProtection: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/safety-concerns/concern-guidance');

    expect(C100Sequence[26].url).toBe('/c100-rebuild/other-proceedings/proceeding-details');
    expect(C100Sequence[26].showInSection).toBe('c100');
    expect(C100Sequence[26].getNextStep(otherProceedingsMockData.session.userCase)).toBe(
      '/c100-rebuild/other-proceedings/careOrder/order-details'
    );

    expect(C100Sequence[27].url).toBe('/c100-rebuild/other-proceedings/:orderType/order-details');
    expect(C100Sequence[27].showInSection).toBe('c100');
    expect(C100Sequence[27].getNextStep(otherProceedingsMockData.session.userCase, otherProceedingsMockData)).toBe(
      '/c100-rebuild/other-proceedings/careOrder/1/documentUpload'
    );

    expect(C100Sequence[28].url).toBe('/c100-rebuild/other-proceedings/:orderType/:orderId/documentUpload/:removeId?');
    expect(C100Sequence[28].showInSection).toBe('c100');
    expect(C100Sequence[28].getNextStep(otherProceedingsMockData.session.userCase, otherProceedingsMockData)).toBe(
      '/c100-rebuild/other-proceedings/document-summary'
    );

    expect(C100Sequence[29].url).toBe('/c100-rebuild/other-proceedings/document-summary');
    expect(C100Sequence[29].showInSection).toBe('c100');
    expect(
      C100Sequence[29].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/safety-concerns/concern-guidance');
    expect(
      C100Sequence[29].getNextStep(
        {
          sq_writtenAgreement: YesOrNo.NO,
          miam_otherProceedings: YesOrNo.YES,
          op_childrenInvolvedCourtCase: YesOrNo.NO,
          op_courtOrderProtection: YesOrNo.NO,
        },
        {
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(C100Sequence[30].url).toBe('/c100-rebuild/childaddress');
    expect(C100Sequence[30].showInSection).toBe('c100');
    expect(
      C100Sequence[30].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/consent-agreement');
    expect(
      C100Sequence[30].getNextStep({ c100RebuildChildPostCode: 'test' }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: true } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/consent-agreement');

    expect(C100Sequence[31].url).toBe('/c100-rebuild/miam/mediator-document');
    expect(C100Sequence[31].showInSection).toBe('c100');
    expect(C100Sequence[31].getNextStep({ miam_haveDocSigned: YesOrNo.YES })).toBe('/c100-rebuild/miam/upload');
    expect(C100Sequence[31].getNextStep({ miam_haveDocSigned: YesOrNo.NO })).toBe('/c100-rebuild/miam/get-doc');

    expect(C100Sequence[32].url).toBe('/c100-rebuild/miam/other-proceedings');
    expect(C100Sequence[32].showInSection).toBe('c100');
    expect(C100Sequence[32].getNextStep({ miam_otherProceedings: YesOrNo.YES })).toBe('/c100-rebuild/miam/no-need');
    expect(C100Sequence[32].getNextStep({ miam_otherProceedings: YesOrNo.NO })).toBe('/c100-rebuild/miam/miam-info');

    expect(C100Sequence[33].url).toBe('/c100-rebuild/miam/attendance');
    expect(C100Sequence[33].showInSection).toBe('c100');
    expect(C100Sequence[33].getNextStep({ miam_attendance: YesOrNo.YES })).toBe('/c100-rebuild/miam/mediator-document');
    expect(C100Sequence[33].getNextStep({ miam_attendance: YesOrNo.NO })).toBe('/c100-rebuild/miam/valid-reason');

    expect(C100Sequence[34].url).toBe('/c100-rebuild/miam/mediator-confirmation');
    expect(C100Sequence[34].showInSection).toBe('c100');
    expect(C100Sequence[34].getNextStep({ miam_mediatorDocument: YesOrNo.YES })).toBe(
      '/c100-rebuild/miam/mediator-document'
    );
    expect(C100Sequence[34].getNextStep({ miam_mediatorDocument: YesOrNo.NO })).toBe('/c100-rebuild/miam/valid-reason');

    expect(C100Sequence[35].url).toBe('/c100-rebuild/miam/urgency');
    expect(C100Sequence[35].showInSection).toBe('c100');
    expect(C100Sequence[35].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/previous-attendance');

    expect(C100Sequence[36].url).toBe('/c100-rebuild/miam/previous-attendance');
    expect(C100Sequence[36].showInSection).toBe('c100');
    expect(C100Sequence[36].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/miam-other');

    expect(C100Sequence[37].url).toBe('/c100-rebuild/miam/upload-evidence-of-attending-miam-or-ncdr/:removeFileId?');
    expect(C100Sequence[37].showInSection).toBe('c100');
    expect(C100Sequence[37].getNextStep({})).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[38].url).toBe('/c100-rebuild/miam/previous-miam-attendance-or-ncdr');
    expect(C100Sequence[38].showInSection).toBe('c100');
    expect(C100Sequence[38].getNextStep({})).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[39].url).toBe('/c100-rebuild/miam/miam-info');
    expect(C100Sequence[39].showInSection).toBe('c100');
    expect(C100Sequence[39].getNextStep({})).toBe('/c100-rebuild/miam/attendance');

    expect(C100Sequence[40].url).toBe('/c100-rebuild/miam/valid-reason');
    expect(C100Sequence[40].showInSection).toBe('c100');
    expect(C100Sequence[40].getNextStep({ miam_validReason: YesOrNo.YES })).toBe('/c100-rebuild/miam/general-reasons');
    expect(C100Sequence[40].getNextStep({ miam_validReason: YesOrNo.NO })).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[41].url).toBe('/c100-rebuild/miam/no-need');
    expect(C100Sequence[41].showInSection).toBe('c100');
    expect(
      C100Sequence[41].getNextStep(miamMockData.session.userCase, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
    expect(
      C100Sequence[41].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          too_courtOrder: ['test'],
          too_shortStatement: 'test',
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[42].url).toBe('/c100-rebuild/miam/miam-other');
    expect(C100Sequence[42].showInSection).toBe('c100');
    expect(
      C100Sequence[42].getNextStep(miamMockData.session.userCase, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[43].url).toBe('/c100-rebuild/miam/no-access-to-mediator');
    expect(C100Sequence[43].showInSection).toBe('c100');
    expect(C100Sequence[43].getNextStep(miamMockData.session.userCase)).toBe(
      '/c100-rebuild/miam/miam-excemptions-summary'
    );

    expect(C100Sequence[44].url).toBe('/c100-rebuild/miam/child-protection');
    expect(C100Sequence[44].showInSection).toBe('c100');
    expect(C100Sequence[44].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/urgency');

    expect(C100Sequence[45].url).toBe('/c100-rebuild/miam/domestic-abuse/domestic-abuse');
    expect(C100Sequence[45].showInSection).toBe('c100');
    expect(C100Sequence[45].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/child-protection');

    expect(C100Sequence[46].url).toBe('/c100-rebuild/miam/domestic-abuse/providing-evidence');
    expect(C100Sequence[46].showInSection).toBe('c100');
    expect(C100Sequence[46].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/child-protection');

    expect(C100Sequence[47].url).toBe('/c100-rebuild/miam/domestic-abuse/upload-evidence/:removeFileId?');
    expect(C100Sequence[47].showInSection).toBe('c100');
    expect(C100Sequence[47].getNextStep(miamMockData.session.userCase)).toBe('/c100-rebuild/miam/child-protection');

    expect(C100Sequence[48].url).toBe('/c100-rebuild/miam/general-reasons');
    expect(C100Sequence[48].showInSection).toBe('c100');
    expect(C100Sequence[48].getNextStep(miamMockData.session.userCase)).toBe(
      '/c100-rebuild/miam/domestic-abuse/domestic-abuse'
    );

    expect(C100Sequence[49].url).toBe('/c100-rebuild/miam/get-mediator');
    expect(C100Sequence[49].showInSection).toBe('c100');
    expect(C100Sequence[49].getNextStep({})).toBe('/c100-rebuild/miam/get-mediator');

    expect(C100Sequence[50].url).toBe('/c100-rebuild/miam/upload');
    expect(C100Sequence[50].showInSection).toBe('c100');
    expect(C100Sequence[50].getNextStep({})).toBe('/c100-rebuild/miam/upload-confirmation');

    expect(C100Sequence[51].url).toBe('/c100-rebuild/miam/upload-confirmation');
    expect(C100Sequence[51].showInSection).toBe('c100');
    expect(
      C100Sequence[51].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(
      C100Sequence[51].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          too_courtOrder: ['test'],
          too_shortStatement: 'test',
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[52].url).toBe('/c100-rebuild/miam/get-doc');
    expect(C100Sequence[52].showInSection).toBe('c100');
    expect(
      C100Sequence[52].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/miam/get-doc');

    expect(C100Sequence[53].url).toBe('/c100-rebuild/miam/miam-excemptions-summary');
    expect(C100Sequence[53].showInSection).toBe('c100');
    expect(
      C100Sequence[53].getNextStep(miamMockData.session.userCase, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(
      C100Sequence[53].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          too_courtOrder: ['test'],
          too_shortStatement: 'test',
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[54].url).toBe('/c100-rebuild/hearing-urgency/urgent');
    expect(
      C100Sequence[54].getNextStep({ hu_urgentHearingReasons: YesOrNo.YES }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/hearing-urgency/urgent-details');
    expect(
      C100Sequence[54].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');
    expect(
      C100Sequence[54].getNextStep({ hu_urgentHearingReasons: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');

    expect(C100Sequence[55].url).toBe('/c100-rebuild/hearing-urgency/urgent-details');
    expect(C100Sequence[55].showInSection).toBe('c100');
    expect(
      C100Sequence[55].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');
    expect(
      C100Sequence[55].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[56].url).toBe('/c100-rebuild/screening-questions/consent-agreement');
    expect(C100Sequence[56].showInSection).toBe('c100');
    expect(
      C100Sequence[56].getNextStep({ sq_writtenAgreement: YesOrNo.YES }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(
      C100Sequence[56].getNextStep({ sq_writtenAgreement: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/alternative-resolution');
    expect(
      C100Sequence[56].getNextStep(
        {
          sq_writtenAgreement: YesOrNo.YES,
          miam_otherProceedings: 'Yes',
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/screening-questions/consent-agreement',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(C100Sequence[57].url).toBe('/c100-rebuild/screening-questions/alternative-resolution');
    expect(C100Sequence[57].showInSection).toBe('c100');
    expect(C100Sequence[57].getNextStep({})).toBe('/c100-rebuild/screening-questions/alternative-routes');

    expect(C100Sequence[58].url).toBe('/c100-rebuild/screening-questions/legal-representation');
    expect(C100Sequence[58].showInSection).toBe('c100');
    expect(C100Sequence[58].getNextStep({ sq_legalRepresentation: YesOrNo.YES })).toBe(
      '/c100-rebuild/screening-questions/legal-representation-application'
    );
    expect(C100Sequence[58].getNextStep({ sq_legalRepresentation: YesOrNo.NO })).toBe(
      '/c100-rebuild/screening-questions/permission'
    );

    expect(C100Sequence[59].url).toBe('/c100-rebuild/screening-questions/legal-representation-application');
    expect(C100Sequence[59].showInSection).toBe('c100');
    expect(C100Sequence[59].getNextStep({ sq_legalRepresentationApplication: YesOrNo.YES })).toBe(
      '/c100-rebuild/screening-questions/contact-representative'
    );
    expect(C100Sequence[59].getNextStep({ sq_legalRepresentationApplication: YesOrNo.NO })).toBe(
      '/c100-rebuild/screening-questions/permission'
    );

    expect(C100Sequence[60].url).toBe('/c100-rebuild/screening-questions/permissions-request');
    expect(C100Sequence[60].showInSection).toBe('c100');
    expect(
      C100Sequence[60].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/miam/other-proceedings');
    expect(
      C100Sequence[60].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[61].url).toBe('/c100-rebuild/screening-questions/alternative-routes');
    expect(C100Sequence[61].showInSection).toBe('c100');
    expect(
      C100Sequence[61].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/legal-representation');

    expect(C100Sequence[62].url).toBe('/c100-rebuild/screening-questions/permissions-why');
    expect(C100Sequence[62].showInSection).toBe('c100');
    expect(C100Sequence[62].getNextStep({})).toBe('/c100-rebuild/screening-questions/permissions-request');

    expect(C100Sequence[63].url).toBe('/c100-rebuild/screening-questions/permission');
    expect(C100Sequence[63].showInSection).toBe('c100');
    expect(
      C100Sequence[63].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/miam/other-proceedings');
    expect(
      C100Sequence[63].getNextStep({ sq_courtPermissionRequired: YesOrNo.YES }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/permissions-why');

    expect(
      C100Sequence[63].getNextStep(
        {
          sq_writtenAgreement: 'No',
          sq_legalRepresentation: 'No',
          sq_courtPermissionRequired: 'No',
          miam_otherProceedings: 'Yes',
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/miam/no-need',
          body: { sq_writtenAgreement: YesOrNo.NO },
          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[64].url).toBe('/c100-rebuild/screening-questions/contact-representative');
    expect(C100Sequence[64].showInSection).toBe('c100');
    expect(
      C100Sequence[64].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/screening-questions/contact-representative');

    expect(C100Sequence[65].url).toBe('/c100-rebuild/applicant/add-applicants');
    expect(C100Sequence[65].showInSection).toBe('c100');
    expect(C100Sequence[65].getNextStep({})).toBe('/c100-rebuild/applicant/:applicantId/confidentiality/details-know');

    /*expect(C100Sequence[88].url).toBe('/c100-rebuild/applicant/add-applicants');
    expect(C100Sequence[88].showInSection).toBe('c100');
    expect(C100Sequence[88].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/details-know');

    expect(C100Sequence[89].url).toBe('/c100-rebuild/applicant/confidentiality/details-know');
    expect(C100Sequence[89].showInSection).toBe('c100');
    expect(C100Sequence[89].getNextStep({ detailsKnown: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/start-alternative'
    );
    expect(C100Sequence[89].getNextStep({ detailsKnown: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/start'
    );

    expect(C100Sequence[90].url).toBe('/c100-rebuild/applicant/confidentiality/feedback');
    expect(C100Sequence[90].showInSection).toBe('c100');
    expect(C100Sequence[90].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/feedback');

    expect(C100Sequence[91].url).toBe('/c100-rebuild/applicant/confidentiality/feedbackno');
    expect(C100Sequence[91].showInSection).toBe('c100');
    expect(C100Sequence[91].getNextStep({})).toBe('/c100-rebuild/applicant/confidentiality/feedbackno');

    expect(C100Sequence[92].url).toBe('/c100-rebuild/applicant/confidentiality/start');
    expect(C100Sequence[92].showInSection).toBe('c100');
    expect(C100Sequence[92].getNextStep({ start: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedback'
    );
    expect(C100Sequence[92].getNextStep({ start: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedbackno'
    );

    expect(C100Sequence[93].url).toBe('/c100-rebuild/applicant/confidentiality/start-alternative');
    expect(C100Sequence[93].showInSection).toBe('c100');
    expect(C100Sequence[93].getNextStep({ startAlternative: YesOrNo.YES })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedback'
    );
    expect(C100Sequence[93].getNextStep({ startAlternative: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/confidentiality/feedbackno'
    );

    expect(C100Sequence[94].url).toBe('/c100-rebuild/applicant/address/lookup');
    expect(C100Sequence[94].showInSection).toBe('c100');
    expect(C100Sequence[94].getNextStep({})).toBe('/c100-rebuild/applicant/address/select');

    expect(C100Sequence[95].url).toBe('/c100-rebuild/applicant/address/select');
    expect(C100Sequence[95].showInSection).toBe('c100');
    expect(C100Sequence[95].getNextStep({})).toBe('/c100-rebuild/applicant/address/manual');

    expect(C100Sequence[96].url).toBe('/c100-rebuild/applicant/address/manual');
    expect(C100Sequence[96].showInSection).toBe('c100');
    expect(C100Sequence[96].getNextStep({})).toBe('/c100-rebuild/applicant/address/lookup'); */

    expect(C100Sequence[74].url).toBe('/c100-rebuild/child-details/has-other-children');
    expect(C100Sequence[74].showInSection).toBe('c100');
    expect(C100Sequence[74].getNextStep({ ocd_hasOtherChildren: YesOrNo.NO })).toBe(
      '/c100-rebuild/applicant/add-applicants'
    );
    expect(C100Sequence[74].getNextStep({ ocd_hasOtherChildren: YesOrNo.YES })).toBe(
      '/c100-rebuild/child-details/other-children/names'
    );

    expect(C100Sequence[75].url).toBe('/c100-rebuild/child-details/other-children/names');
    expect(C100Sequence[75].showInSection).toBe('c100');
    expect(C100Sequence[75].getNextStep(otherChildrenMockData.session.userCase, otherChildrenMockData)).toBe(
      '/c100-rebuild/child-details/other-children/c9f56483-6e2d-43ce-9de8-72661755b87c/personal-details'
    );

    expect(C100Sequence[76].url).toBe('/c100-rebuild/child-details/other-children/:childId/personal-details');
    expect(C100Sequence[76].showInSection).toBe('c100');
    expect(C100Sequence[76].getNextStep(otherChildrenMockData.session.userCase, otherChildrenMockData)).toBe(
      '/c100-rebuild/applicant/add-applicants'
    );

    expect(C100Sequence[77].url).toBe('/c100-rebuild/respondent-details/add-respondents');
    expect(C100Sequence[77].showInSection).toBe('c100');
    expect(C100Sequence[77].getNextStep(respondentMockData.session.userCase)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/personal-details'
    );

    expect(C100Sequence[78].url).toBe('/c100-rebuild/respondent-details/:respondentId/personal-details');
    expect(C100Sequence[78].showInSection).toBe('c100');
    expect(C100Sequence[78].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );

    expect(C100Sequence[79].url).toBe('/c100-rebuild/respondent-details/:respondentId/relationship-to-child/:childId');
    expect(C100Sequence[79].showInSection).toBe('c100');
    expect(C100Sequence[79].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/lookup'
    );

    expect(C100Sequence[80].url).toBe('/c100-rebuild/respondent-details/:respondentId/address/lookup');
    expect(C100Sequence[80].showInSection).toBe('c100');
    expect(C100Sequence[80].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/select'
    );

    expect(C100Sequence[81].url).toBe('/c100-rebuild/respondent-details/:respondentId/address/select');
    expect(C100Sequence[81].showInSection).toBe('c100');
    expect(C100Sequence[81].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/address/manual'
    );

    expect(C100Sequence[82].url).toBe('/c100-rebuild/respondent-details/:respondentId/address/manual');
    expect(C100Sequence[82].showInSection).toBe('c100');
    expect(C100Sequence[82].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/contact-details'
    );

    expect(C100Sequence[83].url).toBe('/c100-rebuild/respondent-details/:respondentId/contact-details');
    expect(C100Sequence[83].showInSection).toBe('c100');
    expect(C100Sequence[83].getNextStep(respondentMockData.session.userCase, respondentMockData)).toBe(
      '/c100-rebuild/other-person-details/other-person-check'
    );

    expect(C100Sequence[84].url).toBe('/c100-rebuild/other-person-details/other-person-check');
    expect(C100Sequence[84].showInSection).toBe('c100');
    expect(C100Sequence[84].getNextStep({ oprs_otherPersonCheck: YesOrNo.YES })).toBe(
      '/c100-rebuild/other-person-details/add-other-persons'
    );
    expect(
      C100Sequence[84].getNextStep(
        { ...otherPersonMockData.session.userCase, oprs_otherPersonCheck: YesOrNo.NO },
        otherPersonMockData
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with');

    expect(C100Sequence[85].url).toBe('/c100-rebuild/other-person-details/add-other-persons');
    expect(C100Sequence[85].showInSection).toBe('c100');
    expect(C100Sequence[85].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/personal-details'
    );

    expect(C100Sequence[86].url).toBe('/c100-rebuild/other-person-details/:otherPersonId/personal-details');
    expect(C100Sequence[86].showInSection).toBe('c100');
    expect(C100Sequence[86].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );

    expect(C100Sequence[87].url).toBe('/c100-rebuild/other-person-details/:otherPersonId/address/lookup');
    expect(C100Sequence[87].showInSection).toBe('c100');
    expect(C100Sequence[87].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/address/select'
    );

    expect(C100Sequence[88].url).toBe('/c100-rebuild/other-person-details/:otherPersonId/address/select');
    expect(C100Sequence[88].showInSection).toBe('c100');
    expect(C100Sequence[88].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/other-person-details/7228444b-ef3f-4202-a1e7-cdcd2316e1f6/address/manual'
    );

    expect(C100Sequence[89].url).toBe('/c100-rebuild/other-person-details/:otherPersonId/address/manual');
    expect(C100Sequence[89].showInSection).toBe('c100');
    expect(C100Sequence[89].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/mainly-live-with'
    );

    expect(C100Sequence[90].url).toBe(
      '/c100-rebuild/other-person-details/:otherPersonId/relationship-to-child/:childId'
    );
    expect(C100Sequence[90].showInSection).toBe('c100');
    expect(C100Sequence[90].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/refuge/staying-in-refuge/7228444b-ef3f-4202-a1e7-cdcd2316e1f6?'
    );

    expect(C100Sequence[91].url).toBe('/c100-rebuild/child-details/:childId/live-with/mainly-live-with');
    expect(C100Sequence[91].showInSection).toBe('c100');
    expect(C100Sequence[91].getNextStep(childrenMockData.session.userCase, childrenMockData)).toBe(
      '/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/live-with/living-arrangements'
    );

    expect(C100Sequence[92].url).toBe('/c100-rebuild/child-details/:childId/live-with/living-arrangements');
    expect(C100Sequence[92].showInSection).toBe('c100');
    expect(
      C100Sequence[92].getNextStep({ ...childrenMockData.session.userCase, oprs_otherPersons: [] }, childrenMockData)
    ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');

    expect(C100Sequence[93].url).toBe('/c100-rebuild/applicant/:applicantId/personal-details');
    expect(C100Sequence[93].showInSection).toBe('c100');
    expect(C100Sequence[93].getNextStep(applicantMockRequest.session.userCase, applicantMockRequest)).toBe(
      '/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );

    expect(C100Sequence[94].url).toBe('/c100-rebuild/applicant/:applicantId/relationship-to-child/:childId');
    expect(C100Sequence[94].showInSection).toBe('c100');
    expect(C100Sequence[94].getNextStep(applicantMockRequest.session.userCase, applicantMockRequest)).toBe(
      '/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925635'
    );

    expect(C100Sequence[95].url).toBe('/c100-rebuild/applicant/:applicantId/contact-detail');
    expect(C100Sequence[95].showInSection).toBe('c100');
    expect(C100Sequence[95].getNextStep(applicantMockRequest.session.userCase, applicantMockRequest)).toBe(
      '/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/contact-preference'
    );

    expect(C100Sequence[96].url).toBe('/c100-rebuild/consent-order/upload');
    expect(C100Sequence[96].showInSection).toBe('c100');
    expect(C100Sequence[96].getNextStep({})).toBe('/c100-rebuild/consent-order/upload-confirmation');

    expect(C100Sequence[97].url).toBe('/c100-rebuild/consent-order/upload-confirmation');
    expect(C100Sequence[97].showInSection).toBe('c100');
    expect(
      C100Sequence[97].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/hearing-urgency/urgent');

    expect(
      C100Sequence[97].getNextStep(
        {
          sq_writtenAgreement: 'Yes',
          co_certificate: {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'applicantname_consent_order_draft_05102022.rtf',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
          ...commonUserCase,
        } as unknown as CaseWithId,
        {
          originalUrl: '/c100-rebuild/consent-order/upload-confirmation',

          session: {
            enableC100CaseProgressionTrainTrack: true,
            applicationSettings: { hasC100ApplicationBeenCompleted: true },
          },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[98].url).toBe('/c100-rebuild/check-your-answers');
    expect(C100Sequence[98].showInSection).toBe('c100');
    expect(
      C100Sequence[98].getNextStep({}, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/check-your-answers');

    expect(C100Sequence[99].url).toBe('/c100-rebuild/applicant/:applicantId/contact-preference');
    expect(C100Sequence[99].showInSection).toBe('c100');
    expect(C100Sequence[99].getNextStep(applicantMockRequest.session.userCase, applicantMockRequest)).toBe(
      '/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/confidentiality/details-know'
    );

    expect(C100Sequence[100].url).toBe('/c100-rebuild/:caseId/withdraw');
    expect(C100Sequence[100].showInSection).toBe('c100');
    expect(C100Sequence[100].getNextStep({})).toBe('/task-list/applicant');

    expect(C100Sequence[101].url).toBe('/c100-rebuild/withdraw/confirmation');
    expect(C100Sequence[101].showInSection).toBe('c100');
    expect(C100Sequence[101].getNextStep({})).toBe('/');

    expect(C100Sequence[102].url).toBe('/c100-rebuild/other-person-details/:otherPersonId/confidentiality');
    expect(C100Sequence[102].showInSection).toBe('c100');
    expect(C100Sequence[102].getNextStep(otherPersonMockData.session.userCase, otherPersonMockData)).toBe(
      '/c100-rebuild/other-proceedings/current-previous-proceedings'
    );
  });
});
