/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';

import { CaseType } from '../../app/case/definition';

import { RACommonComponentUserAction, RASupportContext } from './definitions';
import { RAService } from './service';

import { RAProvider } from './index';

describe('ReasonableAdjustementsService', () => {
  let existingFlags;
  const correlationId = 'ra-cc-correlation-id';
  const language = 'en';
  const client = jest.spyOn(RAProvider, 'APIClient');

  jest.spyOn(RAProvider, 'getAppBaseUrl').mockImplementation(() => 'https://cui-ra.aat.platform.hmcts.net');
  jest.spyOn(RAProvider, 'log');

  beforeEach(() => {
    existingFlags = {
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
    };
    jest.clearAllMocks();
  });

  test('when invoking getCommonComponentUrl - success scenario', async () => {
    client.mockReturnValueOnce({
      post: jest.fn().mockResolvedValueOnce({ data: { url: 'https://cui-ra.aat.platform.hmcts.net/xyz-123' } }),
    } as unknown as AxiosInstance);
    const response = await RAService.getCommonComponentUrl(correlationId, existingFlags, language);

    expect(response.url).toBe('https://cui-ra.aat.platform.hmcts.net/xyz-123');
  });

  test('when invoking getCommonComponentUrl - error scenario', async () => {
    client.mockReturnValueOnce({
      post: jest.fn().mockRejectedValueOnce(new Error('404')),
    } as unknown as AxiosInstance);

    try {
      await RAService.getCommonComponentUrl(correlationId, existingFlags, language);
    } catch (error) {
      expect(RAProvider.log).toBeCalled;
    }
  });

  test('when invoking retrievePartyRAFlagsFromCommonComponent - success scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockResolvedValueOnce({
        data: {
          flagsAsSupplied: {
            partyName: 'testuser citizen',
            roleOnCase: 'Respondent1',
            details: [],
          },
          replacementFlags: {
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
          },
          action: RACommonComponentUserAction.SUBMIT,
          correlationId: 'ra-cc-correlation-id',
        },
      }),
    } as unknown as AxiosInstance);
    const response = await RAService.retrievePartyRAFlagsFromCommonComponent(correlationId);

    expect(response.flagsAsSupplied.details).toHaveLength(0);
    expect(response.replacementFlags.details).toHaveLength(1);
    expect(response.action).toBe(RACommonComponentUserAction.SUBMIT);
  });

  test('when invoking retrievePartyRAFlagsFromCommonComponent - error scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockRejectedValueOnce(new Error('404')),
    } as unknown as AxiosInstance);

    try {
      await RAService.retrievePartyRAFlagsFromCommonComponent(correlationId);
    } catch (error) {
      expect(RAProvider.log).toBeCalled;
    }
  });

  test('when invoking retrieveExistingPartyRAFlags - success scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockResolvedValueOnce({
        data: {
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
        },
      }),
    } as unknown as AxiosInstance);
    const response = await RAService.retrieveExistingPartyRAFlags(
      '1700583741814566',
      '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      'test-user-access-token'
    );

    expect(response.roleOnCase).toBe('Respondent1');
    expect(response.details).toHaveLength(1);
  });

  test('when invoking retrieveExistingPartyRAFlags - error scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockRejectedValueOnce(new Error('404')),
    } as unknown as AxiosInstance);

    try {
      await RAService.retrieveExistingPartyRAFlags(
        '1700583741814566',
        '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        'test-user-access-token'
      );
    } catch (error) {
      expect(RAProvider.log).toBeCalled;
    }
  });

  test('when invoking updatePartyRAFlags for manageSupport - success scenario', async () => {
    client.mockReturnValueOnce({
      post: jest.fn().mockResolvedValueOnce({
        data: '200',
      }),
    } as unknown as AxiosInstance);
    const response = await RAService.updatePartyRAFlags(
      '1700583741814566',
      CaseType.C100,
      '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      'test-user-access-token',
      RASupportContext.MANAGE_SUPPORT,
      existingFlags.details
    );

    expect(response).toBe('200');
  });

  test('when invoking updatePartyRAFlags for manageSupport - error scenario', async () => {
    client.mockReturnValueOnce({
      post: jest.fn().mockRejectedValueOnce(new Error('404')),
    } as unknown as AxiosInstance);

    try {
      await RAService.updatePartyRAFlags(
        '1700583741814566',
        CaseType.C100,
        '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        'test-user-access-token',
        RASupportContext.MANAGE_SUPPORT,
        existingFlags.details
      );
    } catch (error) {
      expect(RAProvider.log).toBeCalled;
    }
  });

  test('when invoking retrieveCommonComponentHealthStatus for health check - success scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockResolvedValueOnce({
        data: {
          status: 'UP',
        },
      }),
    } as unknown as AxiosInstance);
    const response = await RAService.retrieveCommonComponentHealthStatus();

    expect(response).toBe('UP');
  });

  test('when invoking retrieveCommonComponentHealthStatus for health check - error scenario', async () => {
    client.mockReturnValueOnce({
      get: jest.fn().mockRejectedValueOnce(new Error('404')),
    } as unknown as AxiosInstance);

    try {
      await RAService.retrieveCommonComponentHealthStatus();
    } catch (error) {
      expect(RAProvider.log).toBeCalled;
    }
  });
});
