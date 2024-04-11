import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import ContactPreferenceNavigationController from './navigationController';

describe('common > contact-preference > navigationController', () => {
  test('should get correct next url for choose contact preference', () => {
    const req = mockRequest();
    expect(
      ContactPreferenceNavigationController.getNextPageUrl(
        '/:partyType/contact-preference/choose-a-contact-preference',
        req.session.userCase,
        req
      )
    ).toBe('/applicant/contact-preference/review');
  });

  test('should get correct next url for review contact preference', () => {
    const req = mockRequest();
    expect(
      ContactPreferenceNavigationController.getNextPageUrl(
        '/:partyType/contact-preference/review',
        req.session.userCase,
        req
      )
    ).toBe('/applicant/contact-preference/confirmation');
  });

  test('should get correct next url for contact preference confirmation for applicant', () => {
    const req = mockRequest();
    expect(
      ContactPreferenceNavigationController.getNextPageUrl(
        '/:partyType/contact-preference/confirmation',
        req.session.userCase,
        req
      )
    ).toBe('/task-list/applicant');
  });

  test('should get correct next url for contact preference confirmation for respondent', () => {
    const req = mockRequest({
      session: {
        userCase: {
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
    expect(
      ContactPreferenceNavigationController.getNextPageUrl(
        '/:partyType/contact-preference/confirmation',
        req.session.userCase,
        req
      )
    ).toBe('/respondent/task-list');
  });

  test('should get correct next url for contact preference confirmation for tasklistresponse', () => {
    const req = mockRequest({
      session: {
        applicationSettings: {
          navfromRespondToApplication: true,
        },
        userCase: {
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
    expect(
      ContactPreferenceNavigationController.getNextPageUrl(
        '/:partyType/contact-preference/confirmation',
        req.session.userCase,
        req
      )
    ).toBe('/tasklistresponse/start');
  });

  test('should return current url for default case', () => {
    const req = mockRequest();
    expect(
      ContactPreferenceNavigationController.getNextPageUrl('/task-list/applicant', req.session.userCase, req)
    ).toBe('/task-list/applicant');
  });
});
