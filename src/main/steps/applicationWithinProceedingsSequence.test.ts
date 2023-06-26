import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AWPApplicationReason, AWPApplicationType, YesOrNo } from '../app/case/definition';

import { applicationWithinProceedingsSequence } from './applicationWithinProceedingsSequence';

describe('applicationWithinProceedingsSequence', () => {
  const req = mockRequest({
    params: {
      applicationType: AWPApplicationType.C2,
      applicationReason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
    },
  });
  const userCase = {};

  test('should contain 1 entries in applicationWithinProceedingsSequence 1 screen sequence', () => {
    expect(applicationWithinProceedingsSequence).toHaveLength(5);
    expect(applicationWithinProceedingsSequence[0].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/guidance'
    );
    expect(applicationWithinProceedingsSequence[0].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[0].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[1].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/upload-your-application'
    );
    expect(applicationWithinProceedingsSequence[1].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[1].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/upload-your-application'
    );

    expect(applicationWithinProceedingsSequence[2].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees'
    );
    expect(applicationWithinProceedingsSequence[2].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_need_hwf: YesOrNo.YES }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[2].getNextStep({ awp_need_hwf: YesOrNo.NO }, req)).toBe('/dashboard');

    expect(applicationWithinProceedingsSequence[3].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/reference'
    );
    expect(applicationWithinProceedingsSequence[3].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[3].getNextStep({ awp_have_hwfReference: YesOrNo.YES }, req)).toBe(
      '/dashboard'
    );
    expect(applicationWithinProceedingsSequence[3].getNextStep({ awp_have_hwfReference: YesOrNo.NO }, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/apply-for-hwf'
    );

    expect(applicationWithinProceedingsSequence[4].url).toBe(
      '/application-within-proceedings/:applicationType/:applicationReason/help-with-fees/apply-for-hwf'
    );
    expect(applicationWithinProceedingsSequence[4].showInSection).toBe('applicationWithinProceedings');
    expect(applicationWithinProceedingsSequence[4].getNextStep(userCase, req)).toBe(
      '/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference'
    );
  });
});
