//import { CosApiClient } from '../../../app/case/CosApiClient';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';
//import { CosApiClient } from '../../../app/case/CosApiClient';
//import { RESPONDENT_ORDERS_FROM_THE_COURT } from '../../../steps/urls';

@autobind
export default class ApplicantTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
  public async load(req: AppRequest, res: Response): Promise<void> {
    // const citizenUser = req.session.user;
    // const caseId = req.session.userCase.id;
    // const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
    // const hearings = await client.getAllHearingsForCitizenCase(citizenUser, caseId);
    req.session.userCase.hearingCollection = [
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
            hearingStartDateTime: '2023-07-14T14:15:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'INTER',
              },
            ],
          },
        ],
        hearingGroupRequestId: null,
        hearingIsLinkedFlag: false,
        hearingTypeValue: 'Finding of Fact',
        nextHearingDate: '2023-07-14T12:00:00',
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
            hearingStartDateTime: '2023-07-16T12:00:00',
            hearingEndDateTime: '2023-07-16T15:12:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'VID',
              },
            ],
          },
          {
            hearingStartDateTime: '2023-07-17T09:00:00',
            hearingEndDateTime: '2023-07-17T15:00:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'VID',
              },
            ],
          },
        ],
        hearingGroupRequestId: null,
        hearingIsLinkedFlag: false,
        hearingTypeValue: 'Finding of Fact',
        nextHearingDate: '2023-07-16T12:00:00',
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
            hearingStartDateTime: '2023-07-18T12:00:00',
            hearingEndDateTime: '2023-07-18T15:00:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'TEL',
              },
            ],
          },
          {
            hearingStartDateTime: '2023-07-19T09:00:00',
            hearingEndDateTime: '2023-07-19T15:00:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'TEL',
              },
            ],
          },
        ],
        hearingGroupRequestId: null,
        hearingIsLinkedFlag: false,
        hearingTypeValue: 'Finding of Fact',
        nextHearingDate: '2023-07-18T12:00:00',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'TEL',
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
                partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                hearingSubChannel: 'TEL',
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
    console.log('Hello I am at applicant tasklist');
    
    req.session.save(() => {
      super.get(req, res);
    });
  }
}
