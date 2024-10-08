import { YesNoEmpty } from '../../../../app/case/definition';

import { HTMLParser, SafetyConcernsHelper, childNameFormatter } from './satetyConcernHelper';

const keys = {
  childrenConcernedAboutLabel: 'childrenConcernedAboutLabel',
  behaviourDetailsLabel: 'behaviourDetailsLabel',
  behaviourStartDateLabel: 'behaviourStartDateLabel',
  isOngoingBehaviourLabel: 'isOngoingBehaviourLabel',
  seekHelpFromPersonOrAgencyLabel: 'seekHelpFromPersonOrAgencyLabel',
};

const childField = 'childField';

describe('test cases for SaftyConcern', () => {
  const language = 'en';
  const id = '7483640e-0817-4ddc-b709-6723f7925474';
  const userCase = {
    cd_children: [
      {
        id: '7483640e-0817-4ddc-b709-6723f7925474',
        firstName: 'Bob',
        lastName: 'Silly',
        personalDetails: {
          dateOfBirth: {
            year: '',
            month: '',
            day: '',
          },
          isDateOfBirthUnknown: 'Yes',
          approxDateOfBirth: {
            year: '1987',
            month: '12',
            day: '12',
          },
          sex: 'Male',
        },
        childMatters: {
          needsResolution: [],
        },
        parentialResponsibility: {
          statement: 'lorem ipsum dolor sit am',
        },
      },
    ],
    c1A_safteyConcerns: {
      child: {
        physicalAbuse: {
          behaviourDetails: '',
          behaviourStartDate: '',
          isOngoingBehaviour: YesNoEmpty.YES,
          seekHelpFromPersonOrAgency: YesNoEmpty.NO,
          seekHelpDetails: '',
        },
        childField: 'childField',
      },
    },
    sessionKey: 'sessionKey',
  };
  test('noSessionKey', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';

    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser, language)).toBe('');
  });

  test('noFoundElement', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser, language)).toBe('');
  });

  test('FoundElement and SessionKey', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'children';
    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });

  test('childNameFormatter', () => {
    expect(childNameFormatter(id, userCase)).toBe('<li>Bob Silly</li>');
  });

  test('HTMLParser', () => {
    const bodyHtml = '';
    const FoundElement = {
      childrenConcernedAbout: 'test',
      behaviourDetailsLabel: 'test',
      behaviourStartDate: 'test',
      isOngoingBehaviour: 'test',
    };
    const typeOfUser = 'child';
    expect(HTMLParser(keys, FoundElement, bodyHtml, userCase, typeOfUser, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><li>undefined undefined</li></ul></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });

  test('Condition Checks', () => {
    const bodyHtml = '';
    const FoundElement = {
      childrenConcernedAbout: ['childrenConcernedAbout'],
      behaviourDetailsLabel: 'test',
      behaviourStartDate: 'test',
      isOngoingBehaviour: 'test',
    };
    const typeOfUser = 'child';
    expect(HTMLParser(keys, FoundElement, bodyHtml, userCase, typeOfUser, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><li>undefined undefined</li></ul></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });
});
