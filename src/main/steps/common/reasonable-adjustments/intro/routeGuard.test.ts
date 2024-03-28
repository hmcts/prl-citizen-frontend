import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { RAProvider } from '../../../../modules/reasonable-adjustments';

import { routeGuard } from './routeGuard';

describe('RA > intro > routeGuard', () => {
  test('should get existing RA flags and set isManageSupport to true when they are present', async () => {
    jest.spyOn(RAProvider.service, 'retrieveExistingPartyRAFlags').mockImplementation(() =>
      Promise.resolve({
        partyName: 'testuser citizen',
        roleOnCase: 'Respondent1',
        details: [
          {
            id: '1166265a-ebe3-4141-862f-07caa95e7110',
            value: {
              name: 'Private waiting area',
              name_cy: 'Ystafell aros breifat',
              flagComment: '',
              flagComment_cy: '',
              dateTimeCreated: '2023-11-16T16:05:25.000',
              dateTimeModified: '2023-11-16T16:05:57.000',
              path: [
                {
                  id: 'c5e4508d-8ed0-49ae-8a3e-e5a3d5b28b1a',
                  value: 'Party',
                },
                {
                  id: '904e4ede-1b43-4421-be41-ae24783d0dd3',
                  value: 'Reasonable adjustment',
                },
                {
                  id: '932d6182-c4a8-43fa-a489-5850a460c4c7',
                  value: 'I need something to feel comfortable during my hearing',
                },
              ],
              hearingRelevant: 'Yes',
              flagCode: 'RA0033',
              status: 'Requested',
              availableExternally: 'Yes',
            },
          },
        ],
      })
    );

    const req = mockRequest({
      session: {
        userCase: {
          id: '1166265a-ebe3-4141-862f-07caa95e7110',
          applicantsFL401: {
            firstName: 'test',
            user: {
              idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
            },
          },
        },
        user: {
          idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    await routeGuard.get(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_existingFlags).toStrictEqual({
      partyName: 'testuser citizen',
      roleOnCase: 'Respondent1',
      details: [
        {
          id: '1166265a-ebe3-4141-862f-07caa95e7110',
          value: {
            name: 'Private waiting area',
            name_cy: 'Ystafell aros breifat',
            flagComment: '',
            flagComment_cy: '',
            dateTimeCreated: '2023-11-16T16:05:25.000',
            dateTimeModified: '2023-11-16T16:05:57.000',
            path: [
              {
                id: 'c5e4508d-8ed0-49ae-8a3e-e5a3d5b28b1a',
                value: 'Party',
              },
              {
                id: '904e4ede-1b43-4421-be41-ae24783d0dd3',
                value: 'Reasonable adjustment',
              },
              {
                id: '932d6182-c4a8-43fa-a489-5850a460c4c7',
                value: 'I need something to feel comfortable during my hearing',
              },
            ],
            hearingRelevant: 'Yes',
            flagCode: 'RA0033',
            status: 'Requested',
            availableExternally: 'Yes',
          },
        },
      ],
    });
  });

  test('should get existing RA flags and set isManageSupport to true when they are not present', async () => {
    jest.spyOn(RAProvider.service, 'retrieveExistingPartyRAFlags').mockImplementation(() =>
      Promise.resolve({
        partyName: 'testuser citizen',
        roleOnCase: 'Respondent1',
        details: [],
      })
    );

    const req = mockRequest({
      session: {
        userCase: {
          id: '1166265a-ebe3-4141-862f-07caa95e7110',
          applicantsFL401: {
            firstName: 'test',
            user: {
              idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
            },
          },
        },
        user: {
          idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    await routeGuard.get(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_existingFlags).toStrictEqual({
      partyName: 'testuser citizen',
      roleOnCase: 'Respondent1',
      details: [],
    });
  });

  test('should catch error and redirect to RA error page', async () => {
    jest.spyOn(RAProvider.service, 'retrieveExistingPartyRAFlags').mockImplementation(() =>
      Promise.resolve({
        partyName: 'testuser citizen',
        roleOnCase: 'Respondent1',
        details: [],
      })
    );

    const req = mockRequest({
      session: {},
    });
    const res = mockResponse();
    const mockNext = jest.fn();

    await routeGuard.get(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith('/reasonable-adjustments/error');
  });
});
