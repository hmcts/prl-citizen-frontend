import { PartyType, State } from '../../../../../app/case/definition';

import { getNotificationBannerConfig } from './utils';

describe('testcase for notification Banner', () => {
  test('when casetype not mentioned', () => {
    const data = {
      id: '12',
      state: State.SUBMITTED_NOT_PAID,
    };
    const party = PartyType.APPLICANT;
    const language = 'cy';

    expect(getNotificationBannerConfig(data, party, language)).toStrictEqual([]);
  });
  // test('when casetype c100', () => {
  //     const data={
  //         id: "12",
  //         state: State.Draft,
  //         caseTypeOfApplication: CaseType.C100
  //       }
  //     const party = PartyType.APPLICANT;
  //     const language="cy";

  //     expect(getNotificationBannerConfig(data,party,language)).toStrictEqual([])
  //     })
});
