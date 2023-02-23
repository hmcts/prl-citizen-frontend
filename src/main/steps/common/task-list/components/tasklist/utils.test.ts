import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getTaskListConfig } from './utils';

describe('testcase for progress-bar', () => {
  test('when state submitted but not paid', () => {
    const data = {
      id: '12',
      state: State.AwaitingSubmissionToHmcts,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([
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
  test('FL401 Applicant', () => {
    const data = {
      id: '12',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([]);
  });
  test('FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([]);
  });
});
