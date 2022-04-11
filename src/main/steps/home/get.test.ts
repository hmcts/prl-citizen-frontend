import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { State } from '../../app/case/definition';
import {
  // APPLICATION_SUBMITTED,
  // CHECK_ANSWERS_URL,
  CITIZEN_HOME_URL,
  // CONFIRM_JOINT_APPLICATION,
  // HUB_PAGE,
  // PAY_YOUR_FEE,
  // SENT_TO_APPLICANT2_FOR_REVIEW,
} from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //     mockQuestion: 'mockExistingAnswer',
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to the check your answers page for existing users', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  // test('throws an error if the user switches service type', () => {
  //   const req = mockRequest();
  //   const res = mockResponse({
  //     locals: { serviceType: DivorceOrDissolution.DISSOLUTION },
  //   });

  //   expect(() => controller.get(req, res)).toThrowError(new Error('Invalid case type'));
  // });

  test('redirects to application sent for review page for applicant 1 users in awaitingApplicant2 state', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //     state: State.AwaitingApplicant2Response,
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to confirmation page for applicant 1 users in applicant2Approved state', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //     state: State.Applicant2Approved,
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to application submitted page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //     state: State.Submitted,
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to the check your answers page for applicant 1 users in awaitingApplicant1Response state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to the pay your fee page for applicant 1 users for sole application in awaitingPayment state', () => {
    const req = mockRequest({
      // session: {
      //   userCase: {
      //     id: '123',
      //     state: State.AwaitingPayment,
      //   },
      // },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  test('redirects to the hub page for applicant 1 users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CITIZEN_HOME_URL);
  });

  //TODO uncomment these tests
  // test('redirects to the check your answers page for respondent users in AosDrafted state', () => {
  //   const req = mockRequest({
  //     session: {
  //       userCase: {
  //         id: '123',
  //         applicationType: ApplicationType.SOLE_APPLICATION,
  //         state: State.AosDrafted,
  //       },
  //     },
  //   });
  //   const res = mockResponse();
  //   controller.get(req, res);

  //   expect(res.redirect).toBeCalledWith(`${RESPONDENT}${CHECK_ANSWERS_URL}`);
  // });

  // test('redirects to the hub page for respondent users in holding state', () => {
  //   const req = mockRequest({
  //     session: {
  //       userCase: {
  //         id: '123',
  //         applicationType: ApplicationType.SOLE_APPLICATION,
  //         state: State.Holding,
  //       },
  //     },
  //   });
  //   const res = mockResponse();
  //   controller.get(req, res);

  //   expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HUB_PAGE}`);
  // });

  // test('redirects to the how do you want to respond page for respondent users if first question not complete', () => {
  //   const req = mockRequest({
  //     session: {
  //       userCase: {
  //         id: '123',
  //         applicationType: ApplicationType.SOLE_APPLICATION,
  //         state: State.AosDrafted,
  //       },
  //     },
  //   });
  //   const res = mockResponse();
  //   controller.get(req, res);

  //   expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`);
  // });
});
