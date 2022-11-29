import { hearingDetailsHelper } from './hearingdetailHelper';

const sessionKey = 'sessionKey';
const userCase = {
  sessionKey: 'sessionKey',
  hwn_hearingPart1: 'Yes',
  hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
  hwn_doYouNeedAWithoutNoticeHearing: 'hwn_doYouNeedAWithoutNoticeHearing',
  hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
  hwn_doYouRequireAHearingWithReducedNotice: 'hwn_doYouRequireAHearingWithReducedNotice',
  hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
};

const keys = {
  hearingWithoutLine1Field: 'hearingWithoutLine1Field',
  hearingWithoutLine1: 'hearingWithoutLine1',
  doYouNeedAWithoutNoticeHearingLabel: 'doYouNeedAWithoutNoticeHearingLabel',
  doYouRequireAHearingWithReducedNoticeLabel: 'doYouRequireAHearingWithReducedNoticeLabel',
};

describe('test cases for hearing details', () => {
  test('html', () => {
    expect(hearingDetailsHelper(userCase, keys, sessionKey)).toBe(
      'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>hearingWithoutLine1Field</h4><p>hwn_reasonsForApplicationWithoutNotice</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouNeedAWithoutNoticeHearingLabel</h4><p>hwn_doYouNeedAWithoutNoticeHearing</p><p>hwn_doYouNeedAWithoutNoticeHearingDetails</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouRequireAHearingWithReducedNoticeLabel</h4><p>hwn_doYouRequireAHearingWithReducedNotice</p><p>hwn_doYouRequireAHearingWithReducedNoticeDetails</p>'
    );
  });
});
