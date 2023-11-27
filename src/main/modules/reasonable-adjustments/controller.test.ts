/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CommonComponentUserAction } from '../../app/case/definition';

import { RAController, ReasonableAdjustementsController } from './controller';

import { RAProvider } from './index';

describe('ReasonableAdjustementsController', () => {
  let appResponse;
  let appRequest;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.create = jest.fn(() => mockedAxios);

  beforeEach(() => {
    appRequest = mockRequest({
      params: {
        id: 'ra-cc-external-id',
      },
      query: {
        lng: 'en',
      },
      userCase: {
        caseTypeOfApplication: 'C100',
        respondents: [
          {
            id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            value: {
              firstName: 'testuser',
              lastName: 'citizen',
              email: 'abc@example.net',
              dateOfBirth: '03-20-2023',
              phoneNumber: '7755664466',
              placeOfBirth: 'BPP',
              previousName: 'test',
              isAtAddressLessThan5Years: 'No',
              addressLivedLessThan5YearsDetails: 'Hello',
              address: {
                AddressLine1: 'string',
                AddressLine2: 'string',
                AddressLine3: 'string',
                PostTown: 'string',
                County: 'string',
                PostCode: 'string',
                Country: 'string',
              },
              user: {
                idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
                email: 'test@example.net',
              },
              response: {
                legalRepresentation: 'No',
              },
            },
          },
        ],
        caseInvites: [
          {
            id: '1',
            value: {
              partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              caseInviteEmail: 'string',
              accessCode: 'string',
              invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              expiryDate: 'string',
              isApplicant: 'Yes',
            },
          },
        ],
      },
    });
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    appResponse = mockResponse();
    jest.clearAllMocks();
  });

  test('when launching RA module - success scenario', async () => {
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
    jest.spyOn(RAProvider, 'launch');
    await RAController.launch(appRequest, appResponse);

    expect(RAProvider.launch).toBeCalled;
  });

  test('when launching RA module with no caseData present - error scenario', async () => {
    delete appRequest.session.userCase;
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    await RAController.launch(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(RAProvider.launch).not.toBeCalled;
  });

  test('when launching RA module with no partyDetails present - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac0xxx';
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    await RAController.launch(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(RAProvider.launch).not.toBeCalled;
  });

  test('when fetching flags from common component - success scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
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
        action: CommonComponentUserAction.SUBMIT,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.resolve(CommonComponentUserAction.SUBMIT));
    await RAController.fetchData(appRequest, appResponse);
    expect(appRequest.session.save).toBeCalled;
  });

  test('when fetching flags from common component with no caseData present - error scenario', async () => {
    delete appRequest.session.userCase;
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when fetching flags from common component with no extrernal reference id present - error scenario', async () => {
    delete appRequest.params.id;
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when fetching flags from common component on user cancelling the action- error scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
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
        action: CommonComponentUserAction.CANCEL,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.reject(CommonComponentUserAction.CANCEL));
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    await RAController.fetchData(appRequest, appResponse);
    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(appRequest.session.save).not.toBeCalled;
  });
});
