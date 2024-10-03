import { HTMLParser, SafetyConcernsHelper, childNameFormatter } from './satetyConcernHelper';

const keys = {
  childrenConcernedAboutLabel: 'childrenConcernedAboutLabel',
  behaviourDetailsLabel: 'behaviourDetailsLabel',
  behaviourStartDateLabel: 'behaviourStartDateLabel',
  isOngoingBehaviourLabel: 'isOngoingBehaviourLabel',
  seekHelpFromPersonOrAgencyLabel: 'seekHelpFromPersonOrAgencyLabel',
};

const childField = 'childField';
const language = 'en';

describe('test cases for SaftyConcern', () => {
  const id = '7483640e-0817-4ddc-b709-6723f7925474';
  const userCase = {
    c1A_safteyConcerns: {
      child: {
        physicalAbuse: {
          behaviourDetails: 'pa',
          behaviourStartDate: 'pa',
          isOngoingBehaviour: 'Yes',
          seekHelpFromPersonOrAgency: 'Yes',
          seekHelpDetails: 'pa extra',
          childrenConcernedAbout: ['ec6e380e-5cad-4ee4-ae84-954864789916'],
        },
      },
      respondent: {
        physicalAbuse: {
          behaviourDetails: 'pa',
          behaviourStartDate: 'pa',
          isOngoingBehaviour: 'Yes',
          seekHelpFromPersonOrAgency: 'Yes',
          seekHelpDetails: 'pa extra',
          childrenConcernedAbout: ['ec6e380e-5cad-4ee4-ae84-954864789916'],
        },
      },
    },
    newChildDetails: [
      {
        id: '7483640e-0817-4ddc-b709-6723f7925474',
        value: {
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
      },
    ],
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

  test('SafetyConcernsHelper should return correct html for english', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(
      SafetyConcernsHelper({ ...userCase, sessionKey }, keys, sessionKey, 'physicalAbuse', typeOfUser, language)
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">pa extra</dd></div></dl>'
    );
  });

  test('SafetyConcernsHelper should return correct html for welsh', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(SafetyConcernsHelper({ ...userCase, sessionKey }, keys, sessionKey, 'physicalAbuse', typeOfUser, 'cy')).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Ydy</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Do</dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">pa extra</dd></div></dl>'
    );
  });

  test('SafetyConcernsHelper should return correct html for welsh when seekHelpFromPersonOrAgency is no', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(
      SafetyConcernsHelper(
        {
          ...userCase,
          sessionKey,
          c1A_safteyConcerns: {
            ...userCase.c1A_safteyConcerns,
            respondent: {
              ...userCase.c1A_safteyConcerns.respondent,
              physicalAbuse: {
                ...userCase.c1A_safteyConcerns.respondent.physicalAbuse,
                seekHelpFromPersonOrAgency: 'No',
              },
            },
          },
        },
        keys,
        sessionKey,
        'physicalAbuse',
        typeOfUser,
        'cy'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Ydy</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Naddo</dd></div></dl>'
    );
  });

  test('SafetyConcernsHelper should return correct html when specific child selected', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'children';
    expect(
      SafetyConcernsHelper({ ...userCase, sessionKey }, keys, sessionKey, 'physicalAbuse', typeOfUser, language)
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"></ul></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">pa extra</dd></div></dl>'
    );
  });

  test('SafetyConcernsHelper should return correct html when all children selected for english', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'children';
    expect(
      SafetyConcernsHelper(
        {
          ...userCase,
          sessionKey,
          c1A_safteyConcerns: {
            ...userCase.c1A_safteyConcerns,
            child: {
              ...userCase.c1A_safteyConcerns.child,
              physicalAbuse: {
                ...userCase.c1A_safteyConcerns.child.physicalAbuse,
                childrenConcernedAbout: ['All the children in application'],
              },
            },
          },
        },
        keys,
        sessionKey,
        'physicalAbuse',
        typeOfUser,
        language
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><li>All the children in application</li></ul></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">pa extra</dd></div></dl>'
    );
  });

  test('SafetyConcernsHelper should return correct html when all children selected for welsh', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'children';
    expect(
      SafetyConcernsHelper(
        {
          ...userCase,
          sessionKey,
          c1A_safteyConcerns: {
            ...userCase.c1A_safteyConcerns,
            child: {
              ...userCase.c1A_safteyConcerns.child,
              physicalAbuse: {
                ...userCase.c1A_safteyConcerns.child.physicalAbuse,
                childrenConcernedAbout: ['All the children in application'],
              },
            },
          },
        },
        keys,
        sessionKey,
        'physicalAbuse',
        typeOfUser,
        'cy'
      )
    ).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><li>All the children in application</li></ul></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">pa</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Ydy</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Do</dd></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">pa extra</dd></div></dl>'
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
      isOngoingBehaviour: 'Yes',
    };
    const typeOfUser = 'child';
    expect(HTMLParser(keys, FoundElement, bodyHtml, userCase, typeOfUser, language)).toBe(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">childrenConcernedAboutLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"><ul class="govuk-list govuk-list--bullet"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></ul></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourDetailsLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value"></dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">behaviourStartDateLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">isOngoingBehaviourLabel</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">seekHelpFromPersonOrAgencyLabel</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"></dd></div></dl>'
    );
  });
});
