import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import { cleanHearingWithoutNotice, cleanHearingWithoutNoticePart2 } from './utils';

describe('c100 > hearing without notice > utils', () => {
  describe('cleanHearingWithoutNotice', () => {
    test('should clean hearing without notice data when hearing part 1 is no', () => {
      expect(
        cleanHearingWithoutNotice(
          {
            hwn_reasonsForApplicationWithoutNotice: 'test',
            hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
            hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
            hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
            hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
          } as CaseWithId,
          YesOrNo.NO
        )
      ).toStrictEqual({});
    });

    test('should not clean hearing without notice data when hearing part 1 is yes', () => {
      expect(
        cleanHearingWithoutNotice(
          {
            hwn_reasonsForApplicationWithoutNotice: 'test',
            hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
            hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
            hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
            hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
          } as CaseWithId,
          YesOrNo.YES
        )
      ).toStrictEqual({
        hwn_reasonsForApplicationWithoutNotice: 'test',
        hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
        hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
        hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
        hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
      });
    });
  });

  describe('cleanHearingWithoutNoticePart2', () => {
    test('should clean hearing without notice part 2 data when no is selected', () => {
      expect(
        cleanHearingWithoutNoticePart2(
          {
            hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
            hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
          } as CaseWithId,
          YesOrNo.NO,
          YesOrNo.NO
        )
      ).toStrictEqual({});
    });

    test('should not clean hearing without notice part 2 data when yes is selected', () => {
      expect(
        cleanHearingWithoutNoticePart2(
          {
            hwn_reasonsForApplicationWithoutNotice: 'test',
            hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
            hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
            hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
            hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
          } as CaseWithId,
          YesOrNo.YES,
          YesOrNo.YES
        )
      ).toStrictEqual({
        hwn_reasonsForApplicationWithoutNotice: 'test',
        hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
        hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
        hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
        hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
      });
    });
  });
});
