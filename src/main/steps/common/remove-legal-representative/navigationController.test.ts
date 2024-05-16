import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import RemoveLegalRepresentativeNavigationController from './navigationController';

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

  test('should get correct next url for start', () => {
    expect(
      RemoveLegalRepresentativeNavigationController.getNextPageUrl(
        '/:partyType/remove-legal-representative/start',
        req.session.userCase,
        req
      )
    ).toBe('/respondent/remove-legal-representative/confirm');
  });

  test('should get correct next url for confirm', () => {
    req.session.userCase = { ...req.session.userCase, startAlternative: 'Yes' };
    expect(
      RemoveLegalRepresentativeNavigationController.getNextPageUrl(
        '/:partyType/remove-legal-representative/confirm',
        req.session.userCase,
        req
      )
    ).toBe('/case/1234');
  });

  test('should return current url for default case', () => {
    expect(
      RemoveLegalRepresentativeNavigationController.getNextPageUrl('/task-list/applicant', req.session.userCase, req)
    ).toBe('/task-list/applicant');
  });
});
