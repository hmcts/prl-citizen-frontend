import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { DASHBOARD_URL, PARTY_TASKLIST, SIGN_IN_URL } from '../../../urls';
import { applyParms } from '../../url-parser';

@autobind
export default class CaseDetailsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      res.redirect(`${SIGN_IN_URL}?callback=${req.originalUrl}`);
      return;
    }

    try {
      const data = [
        {
          hearingID: 2000005907,
          hearingRequestDateTime: '2023-06-26T13:57:45.060337',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'LISTED',
          lastResponseReceivedDateTime: '2023-06-26T14:03:32',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-07-12T12:00:00',
              hearingEndDateTime: '2023-07-12T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: '1fa548dd-b7fd-4e10-a24e-595e01c744f2',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
            {
              hearingStartDateTime: '2023-07-13T09:00:00',
              hearingEndDateTime: '2023-07-13T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: '1fa548dd-b7fd-4e10-a24e-595e01c744f2',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
          ],
          hearingGroupRequestId: null,
          hearingIsLinkedFlag: false,
          hearingTypeValue: 'Finding of Fact',
          nextHearingDate: null,
          urgentFlag: false,
        },
        {
          hearingID: 2000005907,
          hearingRequestDateTime: '2023-06-26T13:57:45.060337',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'LISTED',
          lastResponseReceivedDateTime: '2023-06-26T14:03:32',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-07-14T12:00:00',
              hearingEndDateTime: '2023-07-14T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: '1fa548dd-b7fd-4e10-a24e-595e01c744f2',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
            {
              hearingStartDateTime: '2023-07-15T09:00:00',
              hearingEndDateTime: '2023-07-15T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
          ],
          hearingGroupRequestId: null,
          hearingIsLinkedFlag: false,
          hearingTypeValue: 'Finding of Fact',
          nextHearingDate: null,
          urgentFlag: false,
        },
        {
          hearingID: 2000005907,
          hearingRequestDateTime: '2023-06-26T13:57:45.060337',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'COMPLETED',
          lastResponseReceivedDateTime: '2023-06-26T14:03:32',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-07-08T12:00:00',
              hearingEndDateTime: '2023-07-08T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: '1fa548dd-b7fd-4e10-a24e-595e01c744f2',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
            {
              hearingStartDateTime: '2023-07-09T09:00:00',
              hearingEndDateTime: '2023-07-09T15:00:00',
              listAssistSessionId: null,
              hearingVenueId: '20262',
              hearingVenueName: 'Royal Courts of Justice - Queens Building (And West Green Building)',
              hearingVenueLocationCode: '',
              hearingVenueAddress: 'Strand, London',
              hearingRoomId: 'RCJ  Chambers 51',
              hearingJudgeId: '4925295',
              hearingJudgeName: 'Joe Lockett',
              panelMemberIds: [],
              attendees: [
                {
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: '1fa548dd-b7fd-4e10-a24e-595e01c744f2',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
          ],
          hearingGroupRequestId: null,
          hearingIsLinkedFlag: false,
          hearingTypeValue: 'Finding of Fact',
          nextHearingDate: null,
          urgentFlag: false,
        },
      ];
      const caseData = await new CosApiClient(req.session.user.accessToken, 'https://return-url').retrieveByCaseId(
        req.params.caseId,
        req.session.user
      );
      req.session.userCase = caseData;
      // const citizenUser = req.session.user;
      // const caseId = req.session.userCase.id;
      // const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
      // const hearings = await client.getAllHearingsForCitizenCase(citizenUser, caseId);
      req.session.userCase.hearingCollection = data;
      console.log(req.session.userCase.hearingCollection);
      console.log('Hello I am at tasklist applicant');
      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (e) {
      res.redirect(DASHBOARD_URL);
    }
  }
}
