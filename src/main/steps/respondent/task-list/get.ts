import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { generateContent } from './content';
import { RESPONDENT_ORDERS_FROM_THE_COURT } from '../../../steps/urls';
@autobind
export class RespondentTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async load(req: AppRequest, res: Response): Promise<void> {
    const citizenUser = req.session.user;
    const caseId = req.session.userCase.id;
    const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
    const hearings = await client.getAllHearingsForCitizenCase(citizenUser, caseId);
    req.session.userCase.hearingCollection = hearings.caseHearings;
    console.log(citizenUser.id);
  //   [
  //     {
  //       hearingID: 2000005907,
  //       hearingRequestDateTime: "2023-06-26T13:57:45.060337",
  //       hearingType: "ABA5-FOF",
  //       hmcStatus: "LISTED",
  //       lastResponseReceivedDateTime: "2023-06-26T14:03:32",
  //       requestVersion: 1,
  //       hearingListingStatus: "FIXED",
  //       listAssistCaseStatus: "LISTED",
  //       hearingDaySchedule: [
  //           {
  //               hearingStartDateTime: "2023-07-12T12:00:00",
  //               hearingEndDateTime: "2023-07-12T15:00:00",
  //               listAssistSessionId: null,
  //               hearingVenueId: "20262",
  //               hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //               hearingVenueLocationCode: "",
  //               hearingVenueAddress: "Strand, London",
  //               hearingRoomId: "RCJ  Chambers 51",
  //               hearingJudgeId: "4925295",
  //               hearingJudgeName: "Joe Lockett",
  //               panelMemberIds: [],
  //               attendees: [
  //                   {
  //                       partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                       hearingSubChannel: "INTER"
  //                   },
  //               ]
  //           },
  //           {
  //             hearingStartDateTime: "2023-07-13T09:00:00",
  //             hearingEndDateTime: "2023-07-13T15:00:00",
  //             listAssistSessionId: null,
  //             hearingVenueId: "20262",
  //             hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //             hearingVenueLocationCode: "",
  //             hearingVenueAddress: "Strand, London",
  //             hearingRoomId: "RCJ  Chambers 51",
  //             hearingJudgeId: "4925295",
  //             hearingJudgeName: "Joe Lockett",
  //             panelMemberIds: [],
  //             attendees: [
  //                 {
  //                     partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                     hearingSubChannel: "INTER"
  //                 },
  //             ]
  //         },
  //       ],
  //       hearingGroupRequestId: null,
  //       hearingIsLinkedFlag: false,
  //     },
  //     {
  //         hearingID: 2000005907,
  //         hearingRequestDateTime: "2023-06-26T13:57:45.060337",
  //         hearingType: "ABA5-FOF",
  //         hmcStatus: "LISTED",
  //         lastResponseReceivedDateTime: "2023-06-26T14:03:32",
  //         requestVersion: 1,
  //         hearingListingStatus: "FIXED",
  //         listAssistCaseStatus: "LISTED",
  //         hearingDaySchedule: [
  //             {
  //                 hearingStartDateTime: "2023-07-14T12:00:00",
  //                 hearingEndDateTime: "2023-07-14T15:00:00",
  //                 listAssistSessionId: null,
  //                 hearingVenueId: "20262",
  //                 hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //                 hearingVenueLocationCode: "",
  //                 hearingVenueAddress: "Strand, London",
  //                 hearingRoomId: "RCJ  Chambers 51",
  //                 hearingJudgeId: "4925295",
  //                 hearingJudgeName: "Joe Lockett",
  //                 panelMemberIds: [],
  //                 attendees: [
  //                     {
  //                         partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                         hearingSubChannel: "INTER"
  //                     },
  //                 ]
  //             },
  //             {
  //               hearingStartDateTime: "2023-07-15T09:00:00",
  //               hearingEndDateTime: "2023-07-15T15:00:00",
  //               listAssistSessionId: null,
  //               hearingVenueId: "20262",
  //               hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //               hearingVenueLocationCode: "",
  //               hearingVenueAddress: "Strand, London",
  //               hearingRoomId: "RCJ  Chambers 51",
  //               hearingJudgeId: "4925295",
  //               hearingJudgeName: "Joe Lockett",
  //               panelMemberIds: [],
  //               attendees: [
  //                   {
  //                       partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                       hearingSubChannel: "INTER"
  //                   },
  //               ]
  //           },
  //         ],
  //         hearingGroupRequestId: null,
  //         hearingIsLinkedFlag: false,
  //     },
  //     {
  //       hearingID: 2000005907,
  //       hearingRequestDateTime: "2023-06-26T13:57:45.060337",
  //       hearingType: "ABA5-FOF",
  //       hmcStatus: "COMPLETED",
  //       lastResponseReceivedDateTime: "2023-06-26T14:03:32",
  //       requestVersion: 1,
  //       hearingListingStatus: "FIXED",
  //       listAssistCaseStatus: "LISTED",
  //       hearingDaySchedule: [
  //           {
  //               hearingStartDateTime: "2023-07-08T12:00:00",
  //               hearingEndDateTime: "2023-07-08T15:00:00",
  //               listAssistSessionId: null,
  //               hearingVenueId: "20262",
  //               hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //               hearingVenueLocationCode: "",
  //               hearingVenueAddress: "Strand, London",
  //               hearingRoomId: "RCJ  Chambers 51",
  //               hearingJudgeId: "4925295",
  //               hearingJudgeName: "Joe Lockett",
  //               panelMemberIds: [],
  //               attendees: [
  //                   {
  //                       partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                       hearingSubChannel: "INTER"
  //                   },
  //               ]
  //           },
  //           {
  //             hearingStartDateTime: "2023-07-09T09:00:00",
  //             hearingEndDateTime: "2023-07-09T15:00:00",
  //             listAssistSessionId: null,
  //             hearingVenueId: "20262",
  //             hearingVenueName: "Royal Courts of Justice - Queens Building (And West Green Building)",
  //             hearingVenueLocationCode: "",
  //             hearingVenueAddress: "Strand, London",
  //             hearingRoomId: "RCJ  Chambers 51",
  //             hearingJudgeId: "4925295",
  //             hearingJudgeName: "Joe Lockett",
  //             panelMemberIds: [],
  //             attendees: [
  //                 {
  //                     partyID: "b87ba2eb-7a03-4596-a071-5969c93a61cb",
  //                     hearingSubChannel: "INTER"
  //                 },
  //             ]
  //         },
  //       ],
  //       hearingGroupRequestId: null,
  //       hearingIsLinkedFlag: false,
  //   },
  // ];
  req.session.userCase.nextHearing = [];
  req.session.userCase.futureHearings = [];
  req.session.userCase.completedHearings = [];
  console.log(req.session.userCase.hearingCollection);
    if(req.session.userCase.hearingCollection!.length >= 1){
      for(const hearing of req.session.userCase?.hearingCollection!){
        if(hearing.hearingDaySchedule && hearing.hearingDaySchedule!.length >= 1){
          if(hearing.hmcStatus === 'COMPLETED'){
            req.session.userCase.completedHearings?.push(hearing);
          }
          else{
            if(new Date() <= new Date(hearing.hearingDaySchedule![0].hearingEndDateTime!)){
              req.session.userCase.futureHearings?.push(hearing);
            }
          }
        }
      }
    }
    console.log(req.session.userCase.futureHearings);
    if(req.session.userCase?.futureHearings!.length>=1){
      for(const hearing of req.session.userCase?.futureHearings!){
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        hearing.hearingRequestDateTime = day + " " + getMonthName(month) + " " +  year;
        if(hearing.hearingDaySchedule!.length>=2){
          let len = hearing.hearingDaySchedule!.length;
          let day = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getDate();
          let month = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getMonth();
          let year = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getFullYear();
          hearing.hearingRequestDateTime = hearing.hearingRequestDateTime + " - " + day + " " + getMonthName(month) + " " +  year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + " days";
        hearing.hearingType = "Remote";
        for(const schedule of hearing.hearingDaySchedule!){
          let day = new Date(schedule.hearingStartDateTime!).getDate();
          let month = new Date(schedule.hearingStartDateTime!).getMonth();
          let year = new Date(schedule.hearingStartDateTime!).getFullYear();
          let weekDay = new Date(schedule.hearingStartDateTime!).getDay();
          schedule.hearingEndDateTime = getProperTime(new Date(schedule.hearingStartDateTime!));
          schedule.hearingStartDateTime = getDayName(weekDay) + ", " + day + " " + getMonthName(month) + " " +  year;
          schedule.listAssistSessionId = "hours";
        }
      }
      let next = req.session.userCase.futureHearings.shift();
      req.session.userCase.nextHearing.push(next!);
    }
    if(req.session.userCase?.completedHearings!.length>=1){
      for(const hearing of req.session.userCase?.completedHearings!){
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        let weekDay = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDay();
        hearing.hearingRequestDateTime = getDayName(weekDay) + ", " + day + " " + getMonthName(month) + " " +  year;
        if(hearing.hearingDaySchedule!.length>=2){
          let len = hearing.hearingDaySchedule!.length;
          let day = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getDate();
          let month = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getMonth();
          let year = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getFullYear();
          let weekDay = new Date(hearing.hearingDaySchedule![len-1].hearingStartDateTime!).getDay();
          hearing.hearingRequestDateTime = hearing.hearingRequestDateTime + " - " + getDayName(weekDay) + ", " + day + " " + getMonthName(month) + " " +  year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + " days";
        hearing.hearingType = "Remote";
      }
    }
    req.session.userCase.hearingOrders = [];
    for (const doc of req.session.userCase?.orderCollection || []) {
      const uid = doc.value.orderDocument.document_url.substring(
        doc.value.orderDocument.document_url.lastIndexOf('/') + 1
      );
      req.session.userCase.hearingOrders?.push({
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
      });
    };
    console.log(req.session.userCase?.orderCollection);
    console.log(req.session.userCase.hearingOrders);
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: false,
    };

    req.session.save(() => {
      super.get(req, res);
    });
  }
}

export function getMonthName(month:Number) {
  switch(month){
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';  
    default:
      return '';  
  }
}

export function getDayName(day:Number) {
  switch(day){
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';  
  }
}
export function getProperTime(date:Date) {
  let dateString;
  if(date.getHours() > 12){
    dateString = date.getHours() - 12 + ":" + date.getMinutes() + "pm";
  }
  else if(date.getHours() === 12){
    dateString =  12 + ":" + date.getMinutes() + "pm";
  }
  else{
    dateString = date.getHours() + ":" + date.getMinutes() + "am";
  }
  return dateString;
}
