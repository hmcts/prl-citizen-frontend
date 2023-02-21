import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getTaskListConfig } from './utils';

describe('testcase for progress-bar', () => {
  test('when state submitted but not paid', () => {
    const data = {
      id: '12',
      state: State.SUBMITTED_NOT_PAID,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([
      {
        heading: 'Your application',
        id: 'yourApplication',
        tasks: [],
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
  //   test('C100 Appilant', () => {
  //     const data = {
  //       id: '12',
  //       state: State.AWAITING_SUBMISSION_TO_HMCTS,
  //       caseTypeOfApplication: CaseType.C100,
  //     //   tasks:[
  //     //     {
  //     //         VIEW_ALL_DOCUMENTS : 'viewAllDocuments'
  //     //     }

  //     //   ]
  //     };
  //     const party = PartyType.APPLICANT;
  //     const language = 'en';

  //     expect(getTaskListConfig(data, party, language)).toStrictEqual([{
  //         heading: 'Your application',
  //         id: 'yourApplication',
  //         tasks: [],
  //       },]);
  //   });
});
