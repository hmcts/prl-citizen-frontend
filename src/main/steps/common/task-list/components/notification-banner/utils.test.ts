import { CaseType, PartyType, State } from '../../../../../app/case/definition';

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
  test('when casetype c100', () => {
    const data = {
      id: '12',
      state: State.AwaitingSubmissionToHmcts,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'You have caseData.noOfDaysRemainingToSubmitCase days to submit your application or it will be deleted and you will need to start again. This is for security reasons.',
          },
        ],
        heading: 'You have not finished your application',
        id: 'applicationInProgress',
        links: [
          {
            href: '#caseData.c100RebuildReturnUrl',
            text: 'Continue your application',
          },
        ],
        title: 'Important',
      },
    ]);
  });
});
