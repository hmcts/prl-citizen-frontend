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
      const caseData = await new CosApiClient(req.session.user.accessToken, 'https://return-url').retrieveByCaseId(
        req.params.caseId,
        req.session.user
      );
      req.session.userCase = caseData;
      // const citizenUser = req.session.user;
      // const caseId = req.session.userCase.id;
      // const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
      // const hearings = await client.retrieveCaseHearingsByCaseId(citizenUser, caseId);
      // req.session.userCase.hearingCollection = hearings.caseHearings;
      req.session.userCase.hearingCollection = [
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
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'VID',
                },
                {
                  partyID: 'aa2e16ed-f031-4be0-84b6-2a8126229703',
                  hearingSubChannel: 'INTER',
                },
              ],
            },
            {
              hearingStartDateTime: '2023-08-02T09:00:00',
              hearingEndDateTime: '2023-08-02T15:00:00',
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
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'VID',
                },
                {
                  partyID: 'aa2e16ed-f031-4be0-84b6-2a8126229703',
                  hearingSubChannel: 'INTER',
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
        {
          hearingID: 2000006134,
          hearingRequestDateTime: '2023-07-11T16:05:38.761289',
          hearingType: 'ABA5-FOF',
          hmcStatus: 'COMPLETED',
          lastResponseReceivedDateTime: '2023-07-11T16:20:38',
          requestVersion: 1,
          hearingListingStatus: 'FIXED',
          listAssistCaseStatus: 'LISTED',
          hearingDaySchedule: [
            {
              hearingStartDateTime: '2023-07-12T09:00:00',
              hearingEndDateTime: '2023-07-12T15:00:00',
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
                  partyID: '73f9997a-a245-460f-8ead-f53e2c3008a7',
                  hearingSubChannel: 'INTER',
                },
                {
                  partyID: 'aa2e16ed-f031-4be0-84b6-2a8126229703',
                  hearingSubChannel: 'TELOTHER',
                },
              ],
            },
          ],
          hearingGroupRequestId: null,
          hearingIsLinkedFlag: false,
          hearingTypeValue: 'Finding of Fact',
          nextHearingDate: '2023-07-12T09:00:00',
          urgentFlag: true,
        },
      ];
      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, req.session.user.id) }));
      });
    } catch (e) {
      res.redirect(DASHBOARD_URL);
    }
  }
}
