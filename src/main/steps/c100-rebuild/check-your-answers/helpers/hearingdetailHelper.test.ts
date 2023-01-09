import { hearingDetailsHelper, hearingDetailsQualifyForFirstHearingHelper } from './hearingdetailHelper';

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
      'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>hearingWithoutLine1Field</h4><p>hwn_reasonsForApplicationWithoutNotice</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouNeedAWithoutNoticeHearingLabel</h4><p></p><h4>undefined</h4><p>hwn_doYouNeedAWithoutNoticeHearingDetails</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouRequireAHearingWithReducedNoticeLabel</h4><p></p><h4>undefined</h4><p>hwn_doYouRequireAHearingWithReducedNoticeDetails</p>'
    );
  });

  test('hearingDetailsHelper > values undefined', () => {
    expect(
      hearingDetailsHelper(
        {
          ...userCase,
          hu_urgentHearingReasons: 'No',
          hwn_doYouNeedAWithoutNoticeHearingDetails: undefined,
          hwn_doYouRequireAHearingWithReducedNoticeDetails: undefined,
        },
        keys,
        sessionKey,
        language
      )
    ).toBe(
      'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>hearingWithoutLine1Field</h4><p>hwn_reasonsForApplicationWithoutNotice</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouNeedAWithoutNoticeHearingLabel</h4><p></p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>doYouRequireAHearingWithReducedNoticeLabel</h4><p></p>'
    );
  });

  test('hearingDetailsQualifyForFirstHearingHelper > Alternatice useCase', () => {
    expect(hearingDetailsQualifyForFirstHearingHelper(userCaseTwo, keysTwo, sessionKey, language)).toBe(
      'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>reasonForUrgentHearing</h4><ul><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>giveDetailsOtherRisks</h4><p>hu_otherRiskDetails</p><h4>timeOfHearing</h4><p>hu_timeOfHearingDetails</p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><p>Yes</p><h4>undefined</h4><p>hu_hearingWithNext48HrsMsg</p>'
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
    ).toBe('No');
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
      'Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>reasonForUrgentHearing</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>giveDetailsOtherRisks</h4><p>hu_otherRiskDetails</p><h4>timeOfHearing</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>undefined</h4><p>No</p>'
    );
  });
});
