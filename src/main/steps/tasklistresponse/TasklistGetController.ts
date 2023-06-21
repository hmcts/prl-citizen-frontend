import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../app/case/CosApiClient';
import { EventRoutesContext } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  C7_ATTENDING_THE_COURT,
  CONSENT_TO_APPLICATION,
  INTERNATIONAL_FACTORS_START,
  MIAM_START,
  PROCEEDINGS_START,
  RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_DETAILS_KNOWN,
} from '../urls';

import { mapDataInSession } from './utils';
@autobind
export class TasklistGetController {
  constructor(protected readonly context: EventRoutesContext) {}
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const citizenUser = req.session.user;
      const caseId = req.params?.caseId;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');

      req.session.userCase = await client.retrieveByCaseId(caseId, citizenUser);
      mapDataInSession(req.session.userCase, citizenUser.id);
      // req.session.userCase.hearingCollection = [
      //   {
      //     hearingID: 2000005761,
      //     hearingRequestDateTime: "2023-06-19T14:14:22.608675",
      //     hearingType: "ABA5-FOF",
      //     hmcStatus: "AWAITING_ACTUALS",
      //     lastResponseReceivedDateTime: "2023-06-19T14:43:10",
      //     requestVersion: 1,
      //     hearingListingStatus: "FIXED",
      //     listAssistCaseStatus: "LISTED",
      //     hearingDaySchedule: [
      //         {
      //             hearingStartDateTime: "2023-06-20T09:00:00",
      //             hearingEndDateTime: "2023-06-20T10:00:00",
      //             listAssistSessionId: "null",
      //             hearingVenueId: "234946",
      //             hearingVenueName: "null",
      //             hearingVenueLocationCode: "null",
      //             hearingVenueAddress: "null",
      //             hearingRoomId: "Swansea CJC Courtroom 03",
      //             hearingJudgeId: "",
      //             hearingJudgeName: "null",
      //             panelMemberIds: [],
      //             attendees: [
      //                 {
      //                     partyID: "c7a15ca6-c0e1-4a09-aff1-d7096fdd38ac",
      //                     hearingSubChannel: "null"
      //                 }
      //             ]
      //         }
      //     ],
      //     hearingGroupRequestId: "null",
      //     hearingIsLinkedFlag: false
      // }
      // ];
      req.session.userCase.hearingCollection = [];
      req.session.save(() => res.redirect(this.getRedirectUrl()));
    } catch (err) {
      throw new Error('Case Data could not be retrieved.');
    }
  }

  private getRedirectUrl() {
    let redirectUrl;
    switch (this.context) {
      case EventRoutesContext.INTERNATIONAL_FACTORS_RESPONSE:
        redirectUrl = INTERNATIONAL_FACTORS_START;
        break;
      case EventRoutesContext.MIAM_RESPONSE:
        redirectUrl = MIAM_START;
        break;
      case EventRoutesContext.PROCEEDINGS_RESPONSE:
        redirectUrl = PROCEEDINGS_START;
        break;
      case EventRoutesContext.SAFETY_CONCERNS_RESPONSE:
        redirectUrl = RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE;
        break;
      case EventRoutesContext.CONSENT_RESPONSE:
        redirectUrl = CONSENT_TO_APPLICATION;
        break;
      case EventRoutesContext.SUPPORT_DURING_CASE:
        redirectUrl = C7_ATTENDING_THE_COURT;
        break;
      case EventRoutesContext.KEEP_DETAILS_PRIVATE_APPLICANT:
        redirectUrl = APPLICANT_DETAILS_KNOWN;
        break;
      case EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT:
        redirectUrl = RESPONDENT_DETAILS_KNOWN;
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT:
        redirectUrl = APPLICANT_CHECK_ANSWERS;
        break;
      case EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT:
        redirectUrl = RESPONDENT_CHECK_ANSWERS;
        break;
    }

    return redirectUrl;
  }
}
