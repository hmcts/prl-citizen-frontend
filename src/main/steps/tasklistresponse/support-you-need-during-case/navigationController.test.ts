import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  C7_COMMUNICATION_HELP,
  C7_COURT_HEARING_COMFORT,
  C7_COURT_HEARING_SUPPORT,
  C7_DOCUMENTS_SUPPORT,
  C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY,
  C7_TRAVELLING_TO_COURT,
} from '../../urls';

import ReasonableAdjustmentsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
    },
  },
});

describe('ReasonableAdjustmentsNavigationController', () => {
  test('dynamic page routing case one', async () => {
    const nextUrl = ReasonableAdjustmentsNavigationController.getNextUrl(
      C7_DOCUMENTS_SUPPORT,
      dummyRequest.session.userCase
    );
    expect(nextUrl).toBe(C7_COMMUNICATION_HELP);

    const nextUrl1 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl, dummyRequest.session.userCase);
    expect(nextUrl1).toBe(C7_COURT_HEARING_SUPPORT);

    const nextUrl2 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl1, dummyRequest.session.userCase);
    expect(nextUrl2).toBe(C7_COURT_HEARING_COMFORT);

    const nextUrl3 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl2, dummyRequest.session.userCase);
    expect(nextUrl3).toBe(C7_TRAVELLING_TO_COURT);

    const nextUrl4 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl3, dummyRequest.session.userCase);
    expect(nextUrl4).toBe(C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY);
  });

  test('dynamic page routing case two', async () => {
    const dummyRequestone = mockRequest({
      query: {},
      session: {
        userCase: {
          reasonableAdjustments: ['docsformat', 'hearingcomfort'],
        },
      },
    });

    const nextUrl = ReasonableAdjustmentsNavigationController.getNextUrl(
      C7_DOCUMENTS_SUPPORT,
      dummyRequestone.session.userCase
    );
    expect(nextUrl).toBe(C7_COURT_HEARING_COMFORT);

    const nextUrl2 = ReasonableAdjustmentsNavigationController.getNextUrl(nextUrl, dummyRequestone.session.userCase);
    expect(nextUrl2).toBe(C7_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY);
  });
});
