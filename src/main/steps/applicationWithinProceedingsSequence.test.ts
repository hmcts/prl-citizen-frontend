import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import { applicationWithinProceedingsSequence } from './applicationWithinProceedingsSequence';

describe('applicationWithinProceedingsSequence', () => {
  let req;
  let userCase;

  beforeEach(() => {
    req = mockRequest({
      params: {
        partyType: 'applicant',
        applicationType: AWPApplicationType.C2,
        applicationReason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
      },
    });
    userCase = {};
  });
  afterEach(() => {
    req = {};
    userCase = {};
  });

  test('should contain 1 entries in applicationWithinProceedingsSequence 1 screen sequence', () => {
    expect(applicationWithinProceedingsSequence).toHaveLength(17);
    expect(applicationWithinProceedingsSequence[0].url).toBe(
      '/:partyType/application-within-proceedings/list-of-applications/:pageNumber'
    );
    expect(applicationWithinProceedingsSequence[0].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[0].getNextStep(userCase, req)).toBe('/');

    expect(applicationWithinProceedingsSequence[1].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/guidance'
    );
    expect(applicationWithinProceedingsSequence[1].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[1].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[2].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/upload-your-application'
    );
    expect(applicationWithinProceedingsSequence[2].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_completedForm: YesOrNo.YES }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/select-hearing'
    );
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_completedForm: YesOrNo.NO }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/download-form'
    );

    expect(applicationWithinProceedingsSequence[3].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/download-form'
    );
    expect(applicationWithinProceedingsSequence[3].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[3].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[4].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/select-hearing'
    );
    expect(applicationWithinProceedingsSequence[4].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[4].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/agreement-for-request'
    );

    expect(applicationWithinProceedingsSequence[5].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/agreement-for-request'
    );
    expect(applicationWithinProceedingsSequence[5].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[5].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees'
    );

    expect(applicationWithinProceedingsSequence[6].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/inform-other-parties'
    );
    expect(applicationWithinProceedingsSequence[6].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[6].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees'
    );

    expect(applicationWithinProceedingsSequence[7].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/help-with-fees'
    );
    expect(applicationWithinProceedingsSequence[7].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[7].getNextStep({ awp_need_hwf: YesOrNo.YES }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[7].getNextStep({ awp_need_hwf: YesOrNo.NO }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );

    expect(applicationWithinProceedingsSequence[8].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[8].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[8].getNextStep({ awp_have_hwfReference: YesOrNo.YES }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );
    expect(applicationWithinProceedingsSequence[8].getNextStep({ awp_have_hwfReference: YesOrNo.NO }, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/apply-for-hwf'
    );

    expect(applicationWithinProceedingsSequence[9].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/apply-for-hwf'
    );
    expect(applicationWithinProceedingsSequence[9].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[9].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );

    expect(applicationWithinProceedingsSequence[10].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/document-upload/:removeId?'
    );
    expect(applicationWithinProceedingsSequence[10].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[10].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/supporting-documents'
    );

    expect(applicationWithinProceedingsSequence[11].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/checkanswers'
    );
    expect(applicationWithinProceedingsSequence[11].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[11].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/pay-and-submit'
    );
    expect(
      applicationWithinProceedingsSequence[11].getNextStep(
        { ...userCase, awp_need_hwf: YesOrNo.YES, awp_have_hwfReference: YesOrNo.YES, awp_hwf_referenceNumber: 'abcd' },
        req
      )
    ).toBe('/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/application-submitted');
    expect(
      applicationWithinProceedingsSequence[11].getNextStep(userCase, {
        ...req,
        params: { ...req.params, applicationReason: AWPApplicationReason.PROHIBITED_STEPS_ORDER },
        session: {
          ...req.session,
          applicationSettings: {
            ...req.session.applicationSettings,
            awpSelectedApplicationDetails: {
              applicationFee: '£20',
            },
          },
        },
      })
    ).toBe('/applicant/application-within-proceedings/C2/prohibited-steps-order/pay-and-submit');
    expect(
      applicationWithinProceedingsSequence[11].getNextStep(userCase, {
        ...req,
        params: { ...req.params, applicationReason: AWPApplicationReason.PROHIBITED_STEPS_ORDER },
        session: {
          ...req.session,
          applicationSettings: {
            ...req.session.applicationSettings,
            awpSelectedApplicationDetails: {
              applicationFee: '£0.00',
            },
          },
        },
      })
    ).toBe('/applicant/application-within-proceedings/C2/prohibited-steps-order/application-submitted');

    expect(applicationWithinProceedingsSequence[12].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/urgent-request'
    );
    expect(applicationWithinProceedingsSequence[12].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[12].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/checkanswers'
    );

    expect(applicationWithinProceedingsSequence[13].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/supporting-documents'
    );
    expect(applicationWithinProceedingsSequence[13].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[13].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/checkanswers'
    );
    expect(
      applicationWithinProceedingsSequence[13].getNextStep(userCase, {
        ...req,
        params: { ...req.params, applicationReason: AWPApplicationReason.PROHIBITED_STEPS_ORDER },
      })
    ).toBe('/applicant/application-within-proceedings/C2/prohibited-steps-order/urgent-request');

    expect(applicationWithinProceedingsSequence[14].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/supporting-document-upload/:removeId?'
    );
    expect(applicationWithinProceedingsSequence[14].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[14].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/checkanswers'
    );
    expect(
      applicationWithinProceedingsSequence[14].getNextStep(userCase, {
        ...req,
        params: { ...req.params, applicationReason: AWPApplicationReason.PROHIBITED_STEPS_ORDER },
      })
    ).toBe('/applicant/application-within-proceedings/C2/prohibited-steps-order/urgent-request');

    expect(applicationWithinProceedingsSequence[15].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/pay-and-submit'
    );
    expect(applicationWithinProceedingsSequence[15].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[15].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance'
    );

    expect(applicationWithinProceedingsSequence[16].url).toBe(
      '/:partyType/application-within-proceedings/:applicationType/:applicationReason/application-submitted'
    );
    expect(applicationWithinProceedingsSequence[16].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[16].getNextStep(userCase, req)).toBe(
      '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance'
    );
  });
});
