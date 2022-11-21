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
    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe(undefined);
  });
});
