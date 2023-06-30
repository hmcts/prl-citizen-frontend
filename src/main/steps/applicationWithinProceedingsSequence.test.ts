import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import { applicationWithinProceedingsSequence } from './applicationWithinProceedingsSequence';

describe('applicationWithinProceedingsSequence', () => {
  let req;
  let userCase;

  beforeEach(() => {
    req = mockRequest({
      params: {
        applicationType: AWPApplicationType.C2,
        applicationReason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
      },
      session: {
        applicationSettings: {
          awpSelectedApplicationDetails: {
            applicationFee: '£0',
          },
        },
      },
    });
    userCase = {};
  });

  test('should contain 1 entries in applicationWithinProceedingsSequence 1 screen sequence', () => {
    expect(applicationWithinProceedingsSequence).toHaveLength(8);
    expect(applicationWithinProceedingsSequence[0].url).toBe(
      '/application-within-proceedings/list-of-applications/:pageNumber'
    );
    expect(applicationWithinProceedingsSequence[0].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[0].getNextStep(userCase, req)).toBe('/');

    expect(applicationWithinProceedingsSequence[1].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/guidance'
    );
    expect(applicationWithinProceedingsSequence[1].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[1].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[2].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/upload-your-application'
    );
    expect(applicationWithinProceedingsSequence[2].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_completedForm: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_completedForm: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/download-form'
    );

    expect(applicationWithinProceedingsSequence[3].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/download-form'
    );
    expect(applicationWithinProceedingsSequence[3].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[3].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[4].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/agreement-for-request'
    );
    expect(applicationWithinProceedingsSequence[4].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[4].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/agreement-for-request'
    );

    expect(applicationWithinProceedingsSequence[5].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees'
    );
    expect(applicationWithinProceedingsSequence[5].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[5].getNextStep({ awp_need_hwf: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[5].getNextStep({ awp_need_hwf: YesOrNo.NO }, req)).toBe('/dashboard');

    expect(applicationWithinProceedingsSequence[6].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[6].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[6].getNextStep({ awp_have_hwfReference: YesOrNo.YES }, req)).toBe(
      '/dashboard'
    );
    expect(applicationWithinProceedingsSequence[6].getNextStep({ awp_have_hwfReference: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/apply-for-hwf'
    );

    expect(applicationWithinProceedingsSequence[7].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/apply-for-hwf'
    );
    expect(applicationWithinProceedingsSequence[7].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[7].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );
  });

  test('should get correct url for upload application when c2 and not delay cancel hearing date', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(applicationWithinProceedingsSequence[2].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/request-more-time/agreement-for-request'
    );
  });
  test('should get correct url for upload application for free application', () => {
    req.params.applicationType = AWPApplicationType.EX740;
    req.params.applicationReason = AWPApplicationReason.YOU_ACCUSED_SOMEONE;
    expect(applicationWithinProceedingsSequence[2].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/EX740/prevent-questioning-in-person-accusing-someone/upload-your-application'
    );
  });
  test('should get correct url for upload application for paid application', () => {
    req.params.applicationType = AWPApplicationType.FP25;
    req.params.applicationReason = AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS;
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(applicationWithinProceedingsSequence[2].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/FP25/request-to-order-a-witness-to-attend-court/help-with-fees'
    );
  });

  test('should get correct url for agreement for request for paid delay or cancel hearing application', () => {
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(applicationWithinProceedingsSequence[4].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees'
    );
  });
  test('should get correct url for agreement for request for other C2 application when yes selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    req.session.applicationSettings.awpSelectedApplicationDetails.applicationFee = '£53';
    expect(applicationWithinProceedingsSequence[4].getNextStep({ awp_agreementForRequest: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/request-more-time/help-with-fees'
    );
  });
  test('should get correct url for agreement for request for other C2 application when no selected', () => {
    req.params.applicationReason = AWPApplicationReason.REQUEST_MORE_TIME;
    expect(applicationWithinProceedingsSequence[4].getNextStep({ awp_agreementForRequest: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/request-more-time/agreement-for-request'
    );
  });
});
