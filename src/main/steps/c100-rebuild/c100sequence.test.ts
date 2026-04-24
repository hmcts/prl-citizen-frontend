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

describe('C100Sequence - Logic Migration', () => {
  const commonUserCase: Partial<CaseWithId> = {
    sq_writtenAgreement: YesOrNo.NO,
    miam_attendance: YesOrNo.NO,
    miam_validReason: YesOrNo.NO,
    c100RebuildChildPostCode: 'test',
    too_courtOrder: ['test'],
    too_shortStatement: 'test',
    hu_urgentHearingReasons: YesOrNo.NO,
    hwn_hearingPart1: YesOrNo.NO,
    ie_internationalStart: YesOrNo.NO,
    hwf_needHelpWithFees: YesOrNo.NO,
    cd_children: [],
  };

  const getStep = (url: string) => {
    const step = C100Sequence.find(s => s.url === url);
    if (!step) {
      throw new Error(`Step ${url} missing!`);
    }
    return step;
  };

  // This helper ensures the session structure is EXACTLY what isC100ApplicationValid expects.
  const mockAppRequest = (
    isCompleted = false,
    originalUrl = '/c100-rebuild/international-elements/request'
  ): AppRequest =>
    ({
      originalUrl,
      session: {
        applicationSettings: { hasC100ApplicationBeenCompleted: isCompleted },
        enableC100CaseProgressionTrainTrack: true,
        // when marked completed, provide a session userCase that resembles a completed application for
        // the international-elements section so hasC100ApplicationBeenCompleted validation passes.
        userCase: isCompleted
          ? ({ ...commonUserCase, ie_internationalRequest: YesOrNo.YES } as CaseWithId)
          : (commonUserCase as CaseWithId),
      },
    } as unknown as AppRequest);

  test('should contain exactly 107 entries', () => {
    expect(C100Sequence).toHaveLength(107);
  });

  describe('Confidentiality Screens (Fixes TypeErrors)', () => {
    test('details-know branching logic', () => {
      const step = getStep('/c100-rebuild/confidentiality/details-know');
      const req = mockAppRequest();

      // We must spread commonUserCase to ensure sq_writtenAgreement exists in the first arg
      // AND pass req so it exists in the session.
      expect(step.getNextStep({ ...commonUserCase, detailsKnown: YesOrNo.YES } as CaseWithId, req)).toBe(
        '/c100-rebuild/confidentiality/start-alternative'
      );
      expect(step.getNextStep({ ...commonUserCase, detailsKnown: YesOrNo.NO } as CaseWithId, req)).toBe(
        '/c100-rebuild/confidentiality/start'
      );
    });

    test('feedback navigation', () => {
      const feedback = getStep('/c100-rebuild/confidentiality/feedback');
      expect(feedback.getNextStep(commonUserCase as CaseWithId, mockAppRequest())).toBe(
        '/c100-rebuild/international-elements/start'
      );
    });
  });

  describe('MIAM & Urgency Logic', () => {
    test('miam urgency routing', () => {
      const urgency = getStep('/c100-rebuild/miam/urgency');
      // Using miamMockData but casting correctly to avoid session property misses
      expect(
        urgency.getNextStep(miamMockData.session.userCase as CaseWithId, miamMockData as unknown as AppRequest)
      ).toBe('/c100-rebuild/miam/previous-attendance');

      const part2 = getStep('/c100-rebuild/hearing-without-notice/hearing-part2');
      expect(
        part2.getNextStep(
          {
            ...commonUserCase,
            miam_validReason: YesOrNo.YES,
            miam_nonAttendanceReasons: [MiamNonAttendReason.URGENT],
            miam_urgency: Miam_urgency.freedomPhysicalSafety,
          } as CaseWithId,
          mockAppRequest()
        )
      ).toBe('/c100-rebuild/typeoforder/select-courtorder');
    });
  });

  describe('Dynamic ID Data (Child/Applicant/Respondent)', () => {
    test('verifies all ID-based mocks are utilized', () => {
      // Applicant
      const appStep = getStep('/c100-rebuild/applicant/:applicantId/personal-details');
      expect(
        appStep.getNextStep(
          applicantMockRequest.session.userCase as CaseWithId,
          applicantMockRequest as unknown as AppRequest
        )
      ).toBe(
        '/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
      );

      // Respondent
      const respStep = getStep('/c100-rebuild/respondent-details/:respondentId/contact-details');
      expect(
        respStep.getNextStep(
          respondentMockData.session.userCase as CaseWithId,
          respondentMockData as unknown as AppRequest
        )
      ).toBe('/c100-rebuild/other-person-details/other-person-check');

      // Child
      const childStep = getStep('/c100-rebuild/child-details/add-children');
      expect(
        childStep.getNextStep(
          childrenMockData.session.userCase as CaseWithId,
          childrenMockData as unknown as AppRequest
        )
      ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/personal-details');
    });

    test('verifies other person and proceedings mocks', () => {
      // Other Person
      const opStep = getStep('/c100-rebuild/other-person-details/:otherPersonId/confidentiality');
      expect(
        opStep.getNextStep(
          otherPersonMockData.session.userCase as CaseWithId,
          otherPersonMockData as unknown as AppRequest
        )
      ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');

      // Other Children
      const ocStep = getStep('/c100-rebuild/child-details/other-children/names');
      expect(
        ocStep.getNextStep(
          otherChildrenMockData.session.userCase as CaseWithId,
          otherChildrenMockData as unknown as AppRequest
        )
      ).toBe('/c100-rebuild/child-details/other-children/c9f56483-6e2d-43ce-9de8-72661755b87c/personal-details');

      // Proceedings
      const procStep = getStep('/c100-rebuild/other-proceedings/proceeding-details');
      expect(
        procStep.getNextStep(
          otherProceedingsMockData.session.userCase as CaseWithId,
          otherProceedingsMockData as unknown as AppRequest
        )
      ).toBe('/c100-rebuild/other-proceedings/careOrder/order-details');
    });
  });

  describe('Train Track Sequences', () => {
    test('international elements exit logic', () => {
      const ieStep = getStep('/c100-rebuild/international-elements/request');
      expect(ieStep.getNextStep(commonUserCase as CaseWithId, mockAppRequest(true))).toBe(
        '/c100-rebuild/check-your-answers'
      );
      expect(ieStep.getNextStep(commonUserCase as CaseWithId, mockAppRequest(false))).toBe(
        '/c100-rebuild/reasonable-adjustments/attending-court'
      );
    });
  });
});
