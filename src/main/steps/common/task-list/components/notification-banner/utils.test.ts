import { CaseType, PartyType, State, YesOrNo } from '../../../../../app/case/definition';

import { getNotificationBannerConfig } from './utils';
const userDetails = {
  id: '123',
  accessToken: 'mock-user-access-token',
  name: 'test',
  givenName: 'First name',
  familyName: 'Last name',
  email: 'test@example.com',
};
describe('testcase for notification Banner', () => {
  test('when casetype not mentioned', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        heading: 'Your application is in progress',
        id: 'applicationSubmitted',
        links: [
          {
            href: '/c100-rebuild/12/withdraw',
            text: 'Withdraw your application',
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when casetype c100', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
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
            href: '#',
            text: 'Continue your application',
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when case is withdrawn', () => {
    const data = {
      id: '12',
      state: State.CASE_WITHDRAWN,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'You can still access all documents related to the case',
          },
        ],
        heading: 'This case has now been withdrawn',
        id: 'applicationWithdrawn',
        title: 'Important',
      },
    ]);
  });
  test('withdrawn is rejected', () => {
    const data = {
      id: '12',
      state: State.Submitted,
      orderCollection: [
        {
          id: '',
          value: {
            dateCreated: '',
            orderType: '',
            orderDocument: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            otherDetails: {
              createdBy: '',
              orderCreatedDate: '',
              orderMadeDate: '',
              orderRecipients: '',
            },
            orderTypeId: 'blankOrderOrDirectionsWithdraw',
            isWithdrawnRequestApproved: YesOrNo.NO,
            withdrawnRequestType: 'Withdrawn application',
          },
        },
      ],
    };
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'The court rejected your request to withdraw this application. The application will continue to progress.',
          },
        ],
        heading: 'Your withdrawal request was rejected',
        id: 'withdrawalRequestRejected',
        title: 'Important',
      },
    ]);
  });
});
