import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import { cleanHearingUrgency } from './utils';

describe('c100 > hearing urgency > utils', () => {
  describe('cleanHearingUrgency', () => {
    test('should clean hearing urgency data when urgent hearing reasons is no', () => {
      expect(
        cleanHearingUrgency(
          {
            hu_reasonOfUrgentHearing: ['riskOfSafety', 'riskOfChildAbduction'],
            hu_otherRiskDetails: 'test',
            hu_timeOfHearingDetails: 'Yes',
            hu_hearingWithNext48HrsDetails: 'Yes',
            hu_hearingWithNext48HrsMsg: 'Yes',
          } as CaseWithId,
          YesOrNo.NO
        )
      ).toStrictEqual({ hu_reasonOfUrgentHearing: [] });
    });

    test('should not clean hearing urgency data when urgent hearing reasons is yes', () => {
      expect(
        cleanHearingUrgency(
          {
            hu_reasonOfUrgentHearing: ['riskOfSafety', 'riskOfChildAbduction'],
            hu_otherRiskDetails: 'test',
            hu_timeOfHearingDetails: 'Yes',
            hu_hearingWithNext48HrsDetails: 'Yes',
            hu_hearingWithNext48HrsMsg: 'Yes',
          } as CaseWithId,
          YesOrNo.YES
        )
      ).toStrictEqual({
        hu_reasonOfUrgentHearing: ['riskOfSafety', 'riskOfChildAbduction'],
        hu_otherRiskDetails: 'test',
        hu_timeOfHearingDetails: 'Yes',
        hu_hearingWithNext48HrsDetails: 'Yes',
        hu_hearingWithNext48HrsMsg: 'Yes',
      });
    });
  });
});
