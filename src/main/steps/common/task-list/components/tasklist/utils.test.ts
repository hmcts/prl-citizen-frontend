import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getTaskListConfig } from './utils';

describe('testcase for tasklist', () => {
  const userDetails = {
    id: '123',
    accessToken: 'mock-user-access-token',
    name: 'test',
    givenName: 'First name',
    familyName: 'Last name',
    email: 'test@example.com',
  };

  test('when case is state pending', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'Your application',
        id: 'yourApplication',
        tasks: [
          {
            disabled: false,
            href: undefined,
            id: 'childArrangementApplication',
            linkText: 'Your child arrangements application',
            stateTag: {
              className: 'govuk-tag--yellow',
              label: 'In progress',
            },
          },
        ],
      },
    ]);
  });

  test('case in non pending state', () => {
    const data = {
      id: '123',
      state: State.CASE_GATE_KEEPING,
      hearingCollection: [
        {
          next: {
            courtName: 'Swansea',
          },
        },
      ],
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'Your application',
        id: 'yourApplication',
        tasks: [
          {
            disabled: false,
            href: '/c100-rebuild/application-copy/download',
            id: 'yourApplicationPDF',
            linkText: 'Your application (PDF)',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
            },
          },
        ],
      },
      {
        heading: 'Your documents',
        id: 'yourDocuments',
        tasks: [
          {
            disabled: false,
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            stateTag: {
              className: 'govuk-tag--blue',
              label: 'Ready to view',
            },
          },
        ],
      },
    ]);
  });
  test('FL401 Applicant', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([]);
  });
  test('FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([]);
  });
});
