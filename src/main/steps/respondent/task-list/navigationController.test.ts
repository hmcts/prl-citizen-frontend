import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  CA_DA_TRAVELLING_TO_COURT,
} from '../../urls';

import ReasonableAdjustmentsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      respondentReasonableAdjustments: [
        'document format',
        'comminication help',
        'hearing support',
        'hearing comfort',
        'travel help',
      ],
    },
  },
});

describe('ReasonableAdjustmentsNavigationController', () => {
  test('dynamic page routing case one', async () => {
    const nextUrl = ReasonableAdjustmentsNavigationController.getNextUrl(
      CA_DA_DOCUMENTS_SUPPORT,
      dummyRequest.session.userCase
    );
    expect(nextUrl).toBe(CA_DA_COMMUNICATION_HELP);

    const nextUrl1 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl, dummyRequest.session.userCase);
    expect(nextUrl1).toBe(CA_DA_COURT_HEARING_SUPPORT);

    const nextUrl2 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl1, dummyRequest.session.userCase);
    expect(nextUrl2).toBe(CA_DA_COURT_HEARING_COMFORT);

    const nextUrl3 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl2, dummyRequest.session.userCase);
    expect(nextUrl3).toBe(CA_DA_TRAVELLING_TO_COURT);

    const nextUrl4 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl3, dummyRequest.session.userCase);
    expect(nextUrl4).toBe(CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY);
  });

  test('dynamic page routing case two', async () => {
    const dummyRequestone = mockRequest({
      query: {},
      session: {
        userCase: {
          respondentReasonableAdjustments: ['document format', 'hearing comfort'],
        },
      },
    });

    const nextUrl = ReasonableAdjustmentsNavigationController.getNextUrl(
      CA_DA_DOCUMENTS_SUPPORT,
      dummyRequestone.session.userCase
    );
    expect(nextUrl).toBe(CA_DA_COURT_HEARING_COMFORT);

    const nextUrl2 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl, dummyRequestone.session.userCase);
    expect(nextUrl2).toBe(CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY);
  });
});
