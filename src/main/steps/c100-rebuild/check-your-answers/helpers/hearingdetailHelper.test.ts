import { hearingDetailsHelper, hearingDetailsQualifyForFirstHearingHelper } from './hearingdetailHelper';

const sessionKey = 'sessionKey';
const userCase = {
  sessionKey: 'sessionKey',
  hwn_hearingPart1: 'Yes',
  hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
  hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
  hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
  hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
  hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
};

const keys = {
  hearingWithoutLine1Field: 'hearingWithoutLine1Field',
  hearingWithoutLine1: 'hearingWithoutLine1',
  doYouNeedAWithoutNoticeHearingLabel: 'doYouNeedAWithoutNoticeHearingLabel',
  doYouRequireAHearingWithReducedNoticeLabel: 'doYouRequireAHearingWithReducedNoticeLabel',
};

const userCaseTwo = {
  sessionKey: 'sessionKey',
  hu_urgentHearingReasons: 'Yes',
  hu_reasonOfUrgentHearing: ['riskOfSafety', 'riskOfChildAbduction', 'overseasLegalProceeding', 'otherRisks'],
  hu_otherRiskDetails: 'hu_otherRiskDetails',
  hu_timeOfHearingDetails: 'hu_timeOfHearingDetails',
  hu_hearingWithNext48HrsDetails: 'Yes',
  hearingWithNext48Hrs: 'hearingWithNext48Hrs',
  hu_hearingWithNext48HrsMsg: 'hu_hearingWithNext48HrsMsg',
};

const keysTwo = {
  reasonForUrgentHearing: 'reasonForUrgentHearing',
  giveDetailsOtherRisks: 'giveDetailsOtherRisks',
  timeOfHearing: 'timeOfHearing',
};
const language = 'en';
describe('test cases for hearing details', () => {
  test('hearingDetailsHelper', () => {
    expect(hearingDetailsHelper(userCase, keys, sessionKey, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">hearingWithoutLine1Field</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">hwn_reasonsForApplicationWithoutNotice</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">doYouNeedAWithoutNoticeHearingLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">hwn_doYouNeedAWithoutNoticeHearingDetails</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">doYouRequireAHearingWithReducedNoticeLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">hwn_doYouRequireAHearingWithReducedNoticeDetails</dd></div></dl>'
    );
  });

  test('hearingDetailsHelper should return correct html when hwn_hearingPart1 not present', () => {
    expect(hearingDetailsHelper({}, keys, sessionKey, language)).toBe(
      '<div class="govuk-summary-list__row border-bottom--none"><span class="govuk-error-message">Complete this section</span></div>'
    );
  });

  test('hearingDetailsHelper > values undefined', () => {
    expect(
      hearingDetailsHelper(
        {
          ...userCase,
          hu_urgentHearingReasons: 'No',
          hwn_doYouNeedAWithoutNoticeHearing: undefined,
          hwn_doYouRequireAHearingWithReducedNotice: undefined,
        },
        keys,
        sessionKey,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">hearingWithoutLine1Field</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">hwn_reasonsForApplicationWithoutNotice</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">doYouNeedAWithoutNoticeHearingLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">doYouRequireAHearingWithReducedNoticeLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>'
    );
  });

  test('hearingDetailsQualifyForFirstHearingHelper > Alternatice useCase', () => {
    expect(hearingDetailsQualifyForFirstHearingHelper(userCaseTwo, keysTwo, sessionKey, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">reasonForUrgentHearing</dt></div><div class="govuk-summary-list__row"><ul class="govuk-list govuk-list--bullet"><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">giveDetailsOtherRisks</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">hu_otherRiskDetails</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">timeOfHearing</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">hu_timeOfHearingDetails</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key"><span class="govuk-error-message">Complete this section</span></dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">hu_hearingWithNext48HrsMsg</dd></div></dl>'
    );
  });

  test('hearingDetailsQualifyForFirstHearingHelper > values undefined', () => {
    expect(
      hearingDetailsQualifyForFirstHearingHelper(
        {
          ...userCaseTwo,
          hu_urgentHearingReasons: 'No',
          hu_reasonOfUrgentHearing: [],
          hu_timeOfHearingDetails: undefined,
          hu_hearingWithNext48HrsDetails: 'No',
        },
        keysTwo,
        sessionKey,
        language
      )
    ).toBe('<div class="govuk-summary-list__row border-bottom--none">No</div>');
  });

  test('hearingDetailsQualifyForFirstHearingHelper > values undefined > alternative', () => {
    const { hu_reasonOfUrgentHearing, hu_timeOfHearingDetails, ...rest } = userCaseTwo;
    expect(
      hearingDetailsQualifyForFirstHearingHelper(
        {
          ...rest,
          hu_hearingWithNext48HrsDetails: 'No',
          hu_urgentHearingReasons: 'Yes',
        },
        keysTwo,
        sessionKey,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">reasonForUrgentHearing</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">giveDetailsOtherRisks</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">hu_otherRiskDetails</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">timeOfHearing</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });
});
