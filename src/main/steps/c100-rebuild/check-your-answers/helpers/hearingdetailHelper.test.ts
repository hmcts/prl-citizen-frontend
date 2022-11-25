import { hearingDetailsHelper } from './hearingdetailHelper';

const sessionKey = 'sessionKey';
const userCase = {
  sessionKey: 'sessionKey',
  hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
  hwn_doYouNeedAWithoutNoticeHearing: 'hwn_doYouNeedAWithoutNoticeHearing',
  hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
  hwn_doYouRequireAHearingWithReducedNotice: 'hwn_doYouRequireAHearingWithReducedNotice',
  hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
};

const keys = {
  hearingWithoutLine1: 'hearingWithoutLine1',
  doYouNeedAWithoutNoticeHearingLabel: 'doYouNeedAWithoutNoticeHearingLabel',
  doYouRequireAHearingWithReducedNoticeLabel: 'doYouRequireAHearingWithReducedNoticeLabel',
};

describe('test cases for hearing details', () => {
  test('html', () => {
    expect(hearingDetailsHelper(userCase, keys, sessionKey)).not.toBe(null);
  });
});
