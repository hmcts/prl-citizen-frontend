import { SafetyConcernsHelper } from './satetyConcernHelper';

const keys = {
  childrenConcernedAboutLabel: 'childrenConcernedAboutLabel',
  behaviourDetailsLabel: 'behaviourDetailsLabel',
  behaviourStartDateLabel: 'behaviourStartDateLabel',
  isOngoingBehaviourLabel: 'isOngoingBehaviourLabel',
  seekHelpFromPersonOrAgencyLabel: 'seekHelpFromPersonOrAgencyLabel',
};

const childField = 'childField';

describe('test cases for SaftyConcern', () => {
  test('noSessionKey', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    const userCase = {};

    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe('');
  });

  test('noFoundElement', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    const userCase = {
      sessionKey: 'sessionKey',
    };

    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe('');
  });
  test('withFoundElement', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    const userCase = {
      sessionKey: 'sessionKey',
      c1A_safteyConcerns: {
        child: {
          childField: 'yes',
        },
      },
      sessionChildKey: 'cd_children',
      childField: 'childField',
      hwn_reasonsForApplicationWithoutNotice: 'hwn_reasonsForApplicationWithoutNotice',
      hwn_doYouNeedAWithoutNoticeHearing: 'hwn_doYouNeedAWithoutNoticeHearing',
      hwn_doYouNeedAWithoutNoticeHearingDetails: 'hwn_doYouNeedAWithoutNoticeHearingDetails',
      hwn_doYouRequireAHearingWithReducedNotice: 'hwn_doYouRequireAHearingWithReducedNotice',
      hwn_doYouRequireAHearingWithReducedNoticeDetails: 'hwn_doYouRequireAHearingWithReducedNoticeDetails',
    };

    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe(
      '<h4>childrenConcernedAboutLabel</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>undefined<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>undefined<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4>'
    );
  });
});
