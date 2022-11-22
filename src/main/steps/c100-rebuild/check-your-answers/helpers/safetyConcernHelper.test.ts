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
  };
  test('noSessionKey', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';

    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe('');
  });

  test('noFoundElement', () => {
    const sessionKey = 'sessionKey';
    const typeOfUser = 'child';
    expect(SafetyConcernsHelper(userCase, keys, sessionKey, childField, typeOfUser)).toBe('');
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
    expect(HTMLParser(keys, FoundElement, bodyHtml, userCase, typeOfUser)).toBe(
      '<h4>childrenConcernedAboutLabel</h4><ul>test</ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourDetailsLabel</h4>undefined<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>behaviourStartDateLabel</h4>test<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>isOngoingBehaviourLabel</h4>test<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>seekHelpFromPersonOrAgencyLabel</h4>'
    );
  });
});
