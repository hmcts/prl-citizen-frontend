import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';
const getHearings = jest.spyOn(CosApiClient.prototype, 'retrieveCaseHearingsByCaseId');
//const mockToken = 'authToken';

describe('Select hearing Route Guard', () => {
  test('Should render the page when the guard validation passes', async () => {
    const hearingCollection = [
      {
        hearingID: 2000006135,
        hearingRequestDateTime: '2023-07-11T16:07:21.253071',
        hearingType: 'ABA5-FOF',
        hmcStatus: 'LISTED',
        lastResponseReceivedDateTime: '2023-07-11T16:41:37',
        requestVersion: 1,
        hearingListingStatus: 'FIXED',
        listAssistCaseStatus: 'LISTED',
        hearingDaySchedule: [
          {
            hearingStartDateTime: '2023-08-03T09:00:00',
            hearingEndDateTime: '2023-08-03T12:00:00',
            listAssistSessionId: null,
            hearingVenueId: '234946',
            hearingVenueName: 'Swansea Civil And Family Justice Centre',
            hearingVenueLocationCode: '344',
            hearingVenueAddress: 'Quay West, Quay Parade',
            hearingRoomId: 'Courtroom 01',
            hearingJudgeId: '',
            hearingJudgeName: null,
            panelMemberIds: [],
            attendees: [
              {
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'VID',
              },
            ],
          },
        ],
        hearingGroupRequestId: null,
        hearingIsLinkedFlag: false,
        hearingTypeValue: 'Finding of Fact',
        nextHearingDate: '2023-08-02T09:00:00',
        urgentFlag: false,
      },
    ];
    const req = mockRequest();

    const res = mockResponse();
    getHearings.mockResolvedValueOnce({
      hearingData: {
        courtTypeId: '',
        courtName: '',
        hmctsServiceCode: '',
        caseRef: '',
        caseHearings: hearingCollection,
      },
    });
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.hearingCollection).toBe(hearingCollection);
    expect(req.session.save).toHaveBeenCalled();
  });
  test('Should not render the page when failled to get api response', async () => {
    const req = mockRequest();

    const res = mockResponse();
    getHearings.mockRejectedValueOnce;
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(req.session.userCase.hearingCollection).toBe(undefined);
    expect(req.session.save).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/error');
  });

  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest();
    req.session.user.accessToken = undefined;
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/error');
  });
});
