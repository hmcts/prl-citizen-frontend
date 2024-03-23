/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { State, YesNoEmpty } from '../../app/case/definition';

import { RAController, ReasonableAdjustementsController } from './controller';
import { RACommonComponentUserAction, RAData } from './definitions';

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
        appl_allApplicants: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
            personalDetails: {
              haveYouChangeName: YesNoEmpty.YES,
              applPreviousName: 'Test1',
              dateOfBirth: {
                year: '1987',
                month: '12',
                day: '12',
              },
              gender: 'Male',
              applicantPlaceOfBirth: '',
            },
            reasonableAdjustmentsFlags: [
              {
                name: 'Private waiting area',
                name_cy: 'Ystafell aros breifat',
                flagComment: '',
                flagComment_cy: '',
                dateTimeCreated: '2023-11-16T16:05:25.000',
                dateTimeModified: '2023-11-16T16:05:57.000',
                path: ['Party', 'Reasonable adjustment', 'I need something to feel comfortable during my hearing'],
                hearingRelevant: 'Yes',
                flagCode: 'RA0033',
                status: 'Requested',
                availableExternally: 'Yes',
              },
            ],
          },
        ],
        applicants: [],
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
              isApplicant: 'No',
            },
          },
        ],
      },
    });
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    appResponse = mockResponse();
    jest.spyOn(ReasonableAdjustementsController as any, 'handleError');
    jest
      .spyOn(RAProvider.service, 'retrieveCommonComponentHealthStatus')
      .mockImplementation(() => Promise.resolve('UP'));
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
    await RAController.launch(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(RAProvider.launch).not.toBeCalled;
  });

  test('when launching RA module with no partyDetails present - error scenario', async () => {
    appRequest.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac0xxx';
    await RAController.launch(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(RAProvider.launch).not.toBeCalled;
  });

  test('when updating RA flags for both manageFlag & requestFlags scenarios- success scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
        flagsAsSupplied: {
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
                status: 'Inactive',
                availableExternally: 'Yes',
              },
            },
          ],
        },
        replacementFlags: {
          partyName: 'testuser citizen',
          roleOnCase: 'Respondent1',
          details: [
            {
              id: '1166265a-ebe3-4141-862f-07caa95e7123',
              value: {
                name: 'Private room',
                name_cy: 'Ystafell aros breifat',
                flagComment: '',
                flagComment_cy: '',
                dateTimeCreated: '2023-11-16T16:05:25.000',
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
                flagCode: 'RA0035',
                status: 'Requested',
                availableExternally: 'Yes',
              },
            },
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
                status: 'Inactive',
                availableExternally: 'Yes',
              },
            },
          ],
        },
        action: RACommonComponentUserAction.SUBMIT,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.resolve(RACommonComponentUserAction.SUBMIT));
    jest.spyOn(RAProvider.service, 'updatePartyRAFlags').mockImplementation(() => Promise.resolve('200'));

    await RAController.fetchData(appRequest, appResponse);
    expect(RAProvider.service.updatePartyRAFlags).toHaveBeenCalledTimes(2);
    expect(appResponse.redirect).toHaveBeenCalledWith('/respondent/reasonable-adjustments/confirmation');
  });

  test('when updating RA flags for only manageFlags scenario - success scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
        flagsAsSupplied: {
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
                status: 'Inactive',
                availableExternally: 'Yes',
              },
            },
          ],
        },
        replacementFlags: {
          partyName: 'testuser citizen',
          roleOnCase: 'Respondent1',
          details: [],
        },
        action: RACommonComponentUserAction.SUBMIT,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.resolve(RACommonComponentUserAction.SUBMIT));
    jest.spyOn(RAProvider.service, 'updatePartyRAFlags').mockImplementation(() => Promise.resolve('200'));

    await RAController.fetchData(appRequest, appResponse);
    expect(RAProvider.service.updatePartyRAFlags).toHaveBeenCalledTimes(1);
    expect(appResponse.redirect).toHaveBeenCalledWith('/respondent/reasonable-adjustments/confirmation');
  });

  test('when updating RA flags for only manageFlags scenario - error scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
        flagsAsSupplied: {
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
                status: 'Inactive',
                availableExternally: 'Yes',
              },
            },
          ],
        },
        replacementFlags: {
          partyName: 'testuser citizen',
          roleOnCase: 'Respondent1',
          details: [],
        },
        action: RACommonComponentUserAction.SUBMIT,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.resolve(RACommonComponentUserAction.SUBMIT));

    await RAController.fetchData(appRequest, appResponse);
    expect(RAProvider.service.updatePartyRAFlags).toHaveBeenCalledTimes(1);
    expect(appResponse.redirect).not.toHaveBeenCalled;
    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when updating RA flags while fetching flags from common component with no caseData present - error scenario', async () => {
    delete appRequest.session.userCase;
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when updating RA flags while fetching flags from common component with no extrernal reference id present - error scenario', async () => {
    delete appRequest.params.id;
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when updating RA flags while fetching flags from common component when correlationId not present - error scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(
      () =>
        Promise.resolve({
          flagsAsSupplied: {
            partyName: 'testuser citizen',
            roleOnCase: 'Respondent1',
            details: [],
          },
          replacementFlags: {
            partyName: 'testuser citizen',
            roleOnCase: 'Respondent1',
            details: [],
          },
          action: RACommonComponentUserAction.SUBMIT,
        }) as Promise<RAData>
    );
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when updating RA flags while fetching flags from common component with no flagsAsSupplied (or) replacementFlags present - error scenario', async () => {
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(
      () =>
        Promise.resolve({
          replacementFlags: {
            partyName: 'testuser citizen',
            roleOnCase: 'Respondent1',
          },
          action: RACommonComponentUserAction.SUBMIT,
          correlationId: 'ra-cc-correlation-id',
        }) as Promise<RAData>
    );
    await RAController.fetchData(appRequest, appResponse);

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
  });

  test('when updating RA flags while fetching flags from common component on user cancelling the action - error scenario', async () => {
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
        action: RACommonComponentUserAction.CANCEL,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.reject(RACommonComponentUserAction.CANCEL));
    await RAController.fetchData(appRequest, appResponse);
    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(appRequest.session.save).not.toBeCalled;
  });

  test('when updating RA flags for c100 application - success scenario', async () => {
    appRequest.session.userCase.state = State.AwaitingSubmissionToHmcts;
    jest.spyOn(RAProvider.service, 'retrievePartyRAFlagsFromCommonComponent').mockImplementation(() =>
      Promise.resolve({
        flagsAsSupplied: {
          partyName: 'testapplicant citizen',
          roleOnCase: 'Applicant1',
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
                    name: 'Party',
                  },
                  {
                    id: '904e4ede-1b43-4421-be41-ae24783d0dd3',
                    name: 'Reasonable adjustment',
                  },
                  {
                    id: '932d6182-c4a8-43fa-a489-5850a460c4c7',
                    name: 'I need something to feel comfortable during my hearing',
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
        replacementFlags: {
          partyName: 'testapplicant citizen',
          roleOnCase: 'Applicant1',
          details: [],
        },
        action: RACommonComponentUserAction.SUBMIT,
        correlationId: 'ra-cc-correlation-id',
      })
    );
    jest.spyOn(RAProvider, 'launch');
    jest
      .spyOn(RAProvider, 'trySettlingRequest')
      .mockImplementation(() => Promise.resolve(RACommonComponentUserAction.SUBMIT));
    jest.spyOn(RAProvider.service, 'updatePartyRAFlags').mockImplementation(() => Promise.resolve('200'));
    jest.spyOn(appRequest.locals.C100Api, 'updateCase').mockImplementation(() =>
      Promise.resolve({
        caseTypeOfApplication: 'C100',
        c100RebuildChildPostCode: 'AB2 3BV',
        helpWithFeesReferenceNumber: 'HWF-1234',
        c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
        applicantCaseName: 'C100 test case',
        id: '1234',
      })
    );

    await RAController.fetchData(appRequest, appResponse);
    expect(appRequest.locals.C100Api.updateCase).toHaveBeenCalled;
    expect(RAProvider.service.updatePartyRAFlags).not.toHaveBeenCalled;
  });

  test('handleError should be called when launching RA module and not all applicants are available', async () => {
    appRequest.session.userCase.state = State.AwaitingSubmissionToHmcts;
    appRequest.session.userCase.appl_allApplicants = [];
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

    expect((ReasonableAdjustementsController as any).handleError).toBeCalled;
    expect(RAProvider.launch).not.toBeCalled;
  });
});
