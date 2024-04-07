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
    PRL_c1A_safteyConcerns: {
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
    children: [
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
      '<h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Yes</div><div class="govuk-!-padding-top-3">pa extra</div>'
    );
  });

  test('SafetyConcernsHelper should return correct html for welsh', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(SafetyConcernsHelper({ ...userCase, sessionKey }, keys, sessionKey, 'physicalAbuse', typeOfUser, 'cy')).toBe(
      '<h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Ydy<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Do</div><div class="govuk-!-padding-top-3">pa extra</div>'
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
          PRL_c1A_safteyConcerns: {
            ...userCase.PRL_c1A_safteyConcerns,
            respondent: {
              ...userCase.PRL_c1A_safteyConcerns.respondent,
              physicalAbuse: {
                ...userCase.PRL_c1A_safteyConcerns.respondent.physicalAbuse,
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
      '<h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Ydy<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Naddo</div>'
    );
  });

  test('SafetyConcernsHelper should return correct html when specific child selected', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'children';
    expect(
      SafetyConcernsHelper({ ...userCase, sessionKey }, keys, sessionKey, 'physicalAbuse', typeOfUser, language)
    ).toBe(
      '<h4>childrenConcernedAboutLabel</h4><ul></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Yes</div><div class="govuk-!-padding-top-3">pa extra</div>'
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
          PRL_c1A_safteyConcerns: {
            ...userCase.PRL_c1A_safteyConcerns,
            child: {
              ...userCase.PRL_c1A_safteyConcerns.child,
              physicalAbuse: {
                ...userCase.PRL_c1A_safteyConcerns.child.physicalAbuse,
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
      '<h4>childrenConcernedAboutLabel</h4><ul><li>All the children in application</li></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Yes</div><div class="govuk-!-padding-top-3">pa extra</div>'
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
          PRL_c1A_safteyConcerns: {
            ...userCase.PRL_c1A_safteyConcerns,
            child: {
              ...userCase.PRL_c1A_safteyConcerns.child,
              physicalAbuse: {
                ...userCase.PRL_c1A_safteyConcerns.child.physicalAbuse,
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
      '<h4>childrenConcernedAboutLabel</h4><ul><li>Pob plentyn yn y cais</li></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>pa<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Ydy<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4><div class="govuk-!-padding-bottom-3">Do</div><div class="govuk-!-padding-top-3">pa extra</div>'
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
      '<h4>childrenConcernedAboutLabel</h4><ul></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>undefined<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>test<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4>'
    );
  });
});
