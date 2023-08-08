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
    expect(applicationWithinProceedingsSequence).toHaveLength(15);
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
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/select-hearing'
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
      '/application-within-proceedings/:applicationType/:applicationReason/select-hearing'
    );
    expect(applicationWithinProceedingsSequence[4].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[4].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/agreement-for-request'
    );

    expect(applicationWithinProceedingsSequence[5].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/agreement-for-request'
    );
    expect(applicationWithinProceedingsSequence[5].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[5].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );

    expect(applicationWithinProceedingsSequence[6].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/inform-other-parties'
    );
    expect(applicationWithinProceedingsSequence[6].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[6].getNextStep({ awp_need_hwf: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees'
    );
    expect(applicationWithinProceedingsSequence[6].getNextStep({ awp_need_hwf: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees'
    );

    expect(applicationWithinProceedingsSequence[7].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees'
    );
    expect(applicationWithinProceedingsSequence[7].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[7].getNextStep({ awp_have_hwfReference: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );
    expect(applicationWithinProceedingsSequence[7].getNextStep({ awp_have_hwfReference: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );

    expect(applicationWithinProceedingsSequence[8].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[8].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[8].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload'
    );

    expect(applicationWithinProceedingsSequence[9].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/apply-for-hwf'
    );
    expect(applicationWithinProceedingsSequence[9].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[9].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );

    expect(applicationWithinProceedingsSequence[10].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/document-upload/:removeId?'
    );
    expect(applicationWithinProceedingsSequence[10].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[10].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/guidance'
    );

    expect(applicationWithinProceedingsSequence[11].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/select-hearing'
    );
    expect(applicationWithinProceedingsSequence[11].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[11].getNextStep(userCase, req)).toBe('/');
  });
});
