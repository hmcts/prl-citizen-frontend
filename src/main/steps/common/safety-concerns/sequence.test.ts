import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

import { AohSequence } from './sequence';

const safetyConcernsMockData = mockRequest({
  params: {
    root: '/tasklistresponse',
    orderType: 'childArrangementOrder',
    orderId: 2,
  },
  session: {
    userCase: {
      c1A_childAbductedBefore: 'No',
      c1A_safetyConernAbout: ['children', 'applicant', 'respondent'],
      c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction'],
      c1A_concernAboutApplicant: ['somethingElse'],
      c1A_concernAboutRespondent: ['physicalAbuse'],
      reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
      applicantDocsSupportPage: ['none'],
      applicantHelpCommunicationPage: ['none'],
      applicantCourtHearingPage: ['none'],
      applicantCourtComfortPage: ['none'],
      applicantTravellingToCourtPage: ['none'],
    },
  },
});

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    const sequence = AohSequence.getSequence();
    expect(sequence).toHaveLength(19);

    expect(sequence[0].url).toBe('/:root/safety-concerns/concern-about');
    expect(sequence[0].showInSection).toBe('c100');
    expect(sequence[0].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/child/concerns-about'
    );

    expect(sequence[1].url).toBe('/:root/safety-concerns/concerns-for-safety');
    expect(sequence[1].showInSection).toBe('c100');
    expect(sequence[1].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.YES })).toBe(
      '/respondent/safety-concerns/concern-about'
    );
    expect(
      sequence[1].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.YES }, {
        originalUrl: '/c100-rebuild',
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/safety-concerns/concern-about');
    expect(
      sequence[1].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.NO }, {
        originalUrl: '/c100-rebuild',
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/international-elements/start');
    expect(
      sequence[1].getNextStep(
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
          c1A_haveSafetyConcerns: 'No',
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
          originalUrl: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');
    expect(
      sequence[1].getNextStep({ c1A_haveSafetyConcerns: YesOrNo.NO }, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/respondent/safety-concerns/review');

    expect(sequence[2].url).toBe('/:root/safety-concerns/child/concerns-about');
    expect(sequence[2].showInSection).toBe('c100');
    expect(sequence[2].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/child/report-abuse/physicalAbuse'
    );

    expect(sequence[3].url).toBe('/:root/safety-concerns/concern-guidance');
    expect(sequence[3].showInSection).toBe('c100');
    expect(sequence[3].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/concerns-for-safety'
    );

    expect(sequence[4].url).toBe('/:root/safety-concerns/yourself/concerns-about');
    expect(sequence[4].showInSection).toBe('c100');
    expect(sequence[4].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/yourself/report-abuse/physicalAbuse'
    );

    expect(sequence[5].url).toBe('/:root/safety-concerns/child/report-abuse/:abuseType');
    expect(sequence[5].showInSection).toBe('c100');
    expect(
      sequence[5].getNextStep(safetyConcernsMockData.session.userCase, {
        ...mockRequest(),
        params: { root: '/tasklistresponse' },
      })
    ).toBe('/respondent/safety-concerns/yourself/concerns-about');

    expect(sequence[6].url).toBe('/:root/safety-concerns/yourself/report-abuse/:abuseType');
    expect(sequence[6].showInSection).toBe('c100');
    expect(sequence[6].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/other-concerns/drugs'
    );

    expect(sequence[7].url).toBe('/:root/safety-concerns/other-concerns/drugs');
    expect(sequence[7].showInSection).toBe('c100');
    expect(sequence[7].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/other-concerns/other-issues'
    );

    expect(sequence[8].url).toBe('/:root/safety-concerns/abduction/passport-amount');
    expect(sequence[8].showInSection).toBe('c100');
    expect(sequence[8].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/abduction/passport-office-notified'
    );

    expect(sequence[9].url).toBe('/:root/safety-concerns/abduction/passport-office-notified');
    expect(sequence[9].showInSection).toBe('c100');
    expect(sequence[9].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/abduction/threats'
    );

    expect(sequence[10].url).toBe('/:root/safety-concerns/other-concerns/other-issues');
    expect(sequence[10].showInSection).toBe('c100');
    expect(sequence[10].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/orders-required/court-action'
    );

    expect(sequence[11].url).toBe('/:root/safety-concerns/abduction/previousabductions');
    expect(sequence[11].showInSection).toBe('c100');
    expect(
      sequence[11].getNextStep(safetyConcernsMockData.session.userCase, {
        ...mockRequest(),
        params: { root: '/tasklistresponse' },
      })
    ).toBe('/respondent/safety-concerns/yourself/concerns-about');

    expect(sequence[12].url).toBe('/:root/safety-concerns/orders-required/court-action');
    expect(sequence[12].showInSection).toBe('c100');
    expect(sequence[12].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/orders-required/unsupervised'
    );

    expect(sequence[13].url).toBe('/:root/safety-concerns/abduction/child-location');
    expect(sequence[13].showInSection).toBe('c100');
    expect(sequence[13].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/abduction/passport-office'
    );

    expect(sequence[14].url).toBe('/:root/safety-concerns/abduction/passport-office');
    expect(sequence[14].showInSection).toBe('c100');
    expect(sequence[14].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/abduction/threats'
    );

    expect(sequence[15].url).toBe('/:root/safety-concerns/abduction/threats');
    expect(sequence[15].showInSection).toBe('c100');
    expect(
      sequence[15].getNextStep(safetyConcernsMockData.session.userCase, {
        ...mockRequest(),
        params: { root: '/tasklistresponse' },
      })
    ).toBe('/respondent/safety-concerns/yourself/concerns-about');

    expect(sequence[16].url).toBe('/:root/safety-concerns/no-feedback');
    expect(sequence[16].showInSection).toBe('c100');
    expect(sequence[16].getNextStep(safetyConcernsMockData.session.userCase)).toBe(
      '/respondent/safety-concerns/child/concerns-about'
    );

    expect(sequence[17].url).toBe('/:root/safety-concerns/orders-required/unsupervised');
    expect(sequence[17].showInSection).toBe('c100');
    expect(
      sequence[17].getNextStep(safetyConcernsMockData.session.userCase, {
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/respondent/safety-concerns/review');

    expect(
      sequence[17].getNextStep(safetyConcernsMockData.session.userCase, {
        originalUrl: '/c100-rebuild',
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/international-elements/start');

    expect(
      sequence[17].getNextStep(
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
          originalUrl: '/c100-rebuild/safety-concerns/orders-required/unsupervised',
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/check-your-answers');

    expect(sequence[18].url).toBe('/:root/safety-concerns/review');
    expect(sequence[18].showInSection).toBe('c100');
    expect(sequence[18].getNextStep(safetyConcernsMockData.session.userCase)).toBe('/tasklistresponse/start');
  });
});
