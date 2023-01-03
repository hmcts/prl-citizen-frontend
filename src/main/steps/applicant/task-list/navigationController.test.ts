import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  COMMUNICATION_HELP,
  COURT_HEARING_COMFORT,
  COURT_HEARING_SUPPORT,
  DOCUMENTS_SUPPORT,
  SAFETY_ARRANGEMENTS,
  TRAVELLING_TO_COURT,
} from '../../urls';

import ApplicantReasonableAdjustmentsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      reasonableAdjustments: [
        'I need documents in an alternative format',
        'I need help communicating and understanding',
        'I need to bring support with me to a hearing',
        'I need something to feel comfortable during a hearing',
        'I need help travelling to, or moving around court buildings',
      ],
    },
  },
});

describe('ReasonableAdjustmentsNavigationController', () => {
  test('dynamic page routing case one', async () => {
    const nextUrl = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      DOCUMENTS_SUPPORT,
      dummyRequest.session.userCase
    );
    expect(nextUrl).toBe(COMMUNICATION_HELP);

    const nextUrl1 = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      nextUrl,
      dummyRequest.session.userCase
    );
    expect(nextUrl1).toBe(COURT_HEARING_SUPPORT);

    const nextUrl2 = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      nextUrl1,
      dummyRequest.session.userCase
    );
    expect(nextUrl2).toBe(COURT_HEARING_COMFORT);

    const nextUrl3 = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      nextUrl2,
      dummyRequest.session.userCase
    );
    expect(nextUrl3).toBe(TRAVELLING_TO_COURT);

    const nextUrl4 = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      nextUrl3,
      dummyRequest.session.userCase
    );
    expect(nextUrl4).toBe(SAFETY_ARRANGEMENTS);
  });

  test('dynamic page routing case two', async () => {
    const dummyRequestone = mockRequest({
      query: {},
      session: {
        userCase: {
          reasonableAdjustments: [
            'I need documents in an alternative format',
            'I need something to feel comfortable during a hearing',
          ],
        },
      },
    });

    const nextUrl = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      DOCUMENTS_SUPPORT,
      dummyRequestone.session.userCase
    );
    expect(nextUrl).toBe(COURT_HEARING_COMFORT);

    const nextUrl2 = ApplicantReasonableAdjustmentsNavigationController.getNextUrl(
      nextUrl,
      dummyRequestone.session.userCase
    );
    expect(nextUrl2).toBe(SAFETY_ARRANGEMENTS);
  });
});
