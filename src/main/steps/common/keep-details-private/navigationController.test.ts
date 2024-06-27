import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import KeepDetailsPrivateNavigationController from './navigationController';

describe('common > keep-details-private > navigationController', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          id: '1234',
          caseTypeOfApplication: 'C100',
          caseInvites: [
            {
              id: '1234',
              value: {
                partyId: '1234',
                invitedUserId: '1234',
              },
            },
          ],
          respondents: [
            {
              id: '1234',
              value: {
                id: '1234',
                user: {
                  idamId: '1234',
                },
              },
            },
          ],
        },
        user: {
          id: '1234',
        },
      },
    });
  });

  test('should get correct next url for details known', () => {
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/details_known',
        req.session.userCase,
        req
      )
    ).toBe('/respondent/keep-details-private/start_alternative');
  });

  test('should get correct next url for start alternative when startAlternative is Yes', () => {
    req.session.userCase = { ...req.session.userCase, startAlternative: 'Yes' };
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/start_alternative',
        req.session.userCase,
        req
      )
    ).toBe('/respondent/keep-details-private/private_details_confirmed');
  });

  test('should get correct next url for start alternative when startAlternative is No', () => {
    req.session.userCase = { ...req.session.userCase, startAlternative: 'No' };
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/start_alternative',
        req.session.userCase,
        req
      )
    ).toBe('/respondent/keep-details-private/private_details_not_confirmed');
  });

  test('should get correct next url for private details confirmed', () => {
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/private_details_confirmed',
        req.session.userCase,
        req
      )
    ).toBe('/case/1234');
  });

  test('should get correct next url for private details confirmed for tasklistresponse', () => {
    req.session.applicationSettings = {
      navfromRespondToApplication: true,
    };
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/private_details_confirmed',
        req.session.userCase,
        req
      )
    ).toBe('/tasklistresponse/start');
  });

  test('should get correct next url for private details not confirmed', () => {
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/private_details_not_confirmed',
        req.session.userCase,
        req
      )
    ).toBe('/case/1234');
  });

  test('should get correct next url for private details not confirmed for tasklistresponse', () => {
    req.session.applicationSettings = {
      navfromRespondToApplication: true,
    };
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl(
        '/:partyType/keep-details-private/private_details_not_confirmed',
        req.session.userCase,
        req
      )
    ).toBe('/tasklistresponse/start');
  });

  test('should return current url for default case', () => {
    expect(
      KeepDetailsPrivateNavigationController.getNextPageUrl('/task-list/applicant', req.session.userCase, req)
    ).toBe('/task-list/applicant');
  });
});
