import autobind from 'autobind-decorator';
import { Response } from 'express';
import { CaseType, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import {
  APPLICANT_YOURHEARINGS_HEARINGS,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_YOURHEARINGS_HEARINGS,
} from '../../../urls';

@autobind
export class HearingsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
    req.session.userCase.nextHearing = [];
    req.session.userCase.futureHearings = [];
    req.session.userCase.completedHearings = [];
    if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection!.length >= 1) {
      for (const hearing of req.session.userCase.hearingCollection) {
        if (hearing.hearingDaySchedule && hearing.hearingDaySchedule!.length >= 1) {
          if (hearing.hmcStatus === 'COMPLETED') {
            req.session.userCase.completedHearings?.push(hearing);
          } else {
            if (new Date() <= new Date(hearing.hearingDaySchedule![0].hearingEndDateTime!)) {
              req.session.userCase.futureHearings?.push(hearing);
            }
          }
        }
      }
    }
    console.log(req.session.userCase.futureHearings);
    if (req.session.userCase?.futureHearings && req.session.userCase?.futureHearings!.length >= 1) {
      for (const hearing of req.session.userCase.futureHearings) {
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        hearing.hearingRequestDateTime = day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          day = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDate();
          month = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getMonth();
          year = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getFullYear();
          hearing.hearingRequestDateTime =
            hearing.hearingRequestDateTime + ' - ' + day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + ' days';
        hearing.hearingType = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees);
        for (const schedule of hearing.hearingDaySchedule!) {
          schedule.listAssistSessionId = getDuration((new Date(schedule.hearingEndDateTime!).getHours() - new Date(schedule.hearingStartDateTime!).getHours()));
          const day1 = new Date(schedule.hearingStartDateTime!).getDate();
          const month1 = new Date(schedule.hearingStartDateTime!).getMonth();
          const year1 = new Date(schedule.hearingStartDateTime!).getFullYear();
          const weekDay1 = new Date(schedule.hearingStartDateTime!).getDay();
          schedule.hearingEndDateTime = getProperTime(new Date(schedule.hearingStartDateTime!));
          schedule.hearingStartDateTime = getDayName(weekDay1,req.session.lang!) + ', ' + day1 + ' ' + getMonthName(month1,req.session.lang!) + ' ' + year1;
        }
      }
      const next = req.session.userCase.futureHearings.shift();
      req.session.userCase.nextHearing.push(next!);
    }
    if (req.session.userCase?.completedHearings && req.session.userCase?.completedHearings!.length >= 1) {
      for (const hearing of req.session.userCase.completedHearings) {
        let day = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDate();
        let month = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getMonth();
        let year = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getFullYear();
        let weekDay = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!).getDay();
        hearing.hearingRequestDateTime = getDayName(weekDay,req.session.lang!) + ', ' + day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          day = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDate();
          month = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getMonth();
          year = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getFullYear();
          weekDay = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!).getDay();
          hearing.hearingRequestDateTime =
            hearing.hearingRequestDateTime +
            ' - ' +
            getDayName(weekDay,req.session.lang!) +
            ', ' +
            day +
            ' ' +
            getMonthName(month,req.session.lang!) +
            ' ' +
            year;
        }
        hearing.lastResponseReceivedDateTime = hearing.hearingDaySchedule?.length + ' days';
        hearing.hearingType = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees);
      }
    }
    req.session.userCase.hearingOrders = [];
    for (const doc of req.session.userCase?.orderCollection || []) {
      if(doc.value.selectedHearingType){
        const uid = doc.value.orderDocument.document_url.substring(
          doc.value.orderDocument.document_url.lastIndexOf('/') + 1
        );
        req.session.userCase.hearingOrders?.push({
          href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
          createdDate: doc.value.otherDetails.orderCreatedDate,
          fileName: doc.value.orderDocument.document_filename,
          id:Number((doc.value.selectedHearingType.split(' '))[0]),
        });
      }
    }

    let redirectUrl;
    if (partyType === PartyType.APPLICANT) {
        redirectUrl = APPLICANT_YOURHEARINGS_HEARINGS;
    } else {
      redirectUrl = RESPONDENT_YOURHEARINGS_HEARINGS;
    }

    req.session.save(() => res.redirect(redirectUrl));
    console.log('I am in common hearings get controller');
  }
}

export function getMonthName(month: number, language:string): string {
  let monthToDisplay = '';
  if(language === 'cy'){
    switch (month) {
      case 0:
        return 'Ionawr';
      case 1:
        return 'Chwefror';
      case 2:
        return 'Mawrth';
      case 3:
        return 'Ebrill';
      case 4:
        return 'Mai';
      case 5:
        return 'Mehefin';
      case 6:
        return 'Gorffennaf';
      case 7:
        return 'Awst';
      case 8:
        return 'Medi';
      case 9:
        return 'Hydref';
      case 10:
        return 'Tachwedd';
      case 11:
        return 'Rhagfyr';
    }
  }
  else{
    switch (month) {
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
    }
  }
  return monthToDisplay;
}

export function getDuration(timeDiff: number): string {
 if(timeDiff >= 5){
  return '1day';
 }
 return timeDiff.toString();
}

export function getDayName(day: number , language:string): string {
  let dayinEng = ''
  if(language === 'cy'){
    switch (day) {
      case 0:
        dayinEng = 'Dydd Sul';
        break;
      case 1:
        dayinEng = 'Dydd Llun';
        break;
      case 2:
        dayinEng = 'Dydd Mawrth';
        break;
      case 3:
        dayinEng = 'Dydd Mercher';
        break;
      case 4:
        dayinEng = 'Dydd Iau';
        break;
      case 5:
        dayinEng = 'Dydd Gwener';
        break;
      case 6:
        dayinEng = 'Dydd Sadwrn';
        break;
    }
  }
  else{
    switch (day) {
      case 0:
        dayinEng = 'Sunday';
        break;
      case 1:
        dayinEng = 'Monday';
        break;
      case 2:
        dayinEng = 'Tuesday';
        break;
      case 3:
        dayinEng = 'Wednesday';
        break;
      case 4:
        dayinEng = 'Thursday';
        break;
      case 5:
        dayinEng = 'Friday';
        break;
      case 6:
        dayinEng = 'Saturday';
        break;
    }
  }
  return dayinEng; 
}


/* eslint-disable @typescript-eslint/no-explicit-any */
export function getHearingMethod(req: AppRequest, attendees: any): string {
  const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
  const caseType = req.session.userCase.caseTypeOfApplication;
  let partyData;
  let hearingMethod;
  if (caseType === CaseType.C100) {
    if (partyType === PartyType.RESPONDENT) {
      partyData = req.session.userCase.respondents!.find(
        respondent => respondent?.value?.user?.idamId === req.session.user.id
      );
    } else {
      partyData = req.session.userCase.applicants!.find(
        applicant => applicant?.value?.user?.idamId === req.session.user.id
      );
    }
    hearingMethod = attendees.find(attendee => attendee.partyID === partyData.id).hearingSubChannel;
  } else {
    partyData =
      partyType === PartyType.RESPONDENT ? req.session.userCase.respondentsFL401 : req.session.userCase.applicantsFL401;
      console.log(partyData);
    hearingMethod = attendees.find(attendee => attendee.partyID === partyData.partyId).hearingSubChannel;
  }
  console.log("8***********" , partyData);
  if (hearingMethod !== null) {
    return hearingMethod;
  }
  return '';
}

export function getProperTime(date: Date): string {
  let dateString;
  if (date.getHours() > 12) {
    dateString = date.getHours() - 12 + ':' + date.getMinutes() + 'pm';
  } else if (date.getHours() === 12) {
    dateString = 12 + ':' + date.getMinutes() + 'pm';
  } else {
    dateString = date.getHours() + ':' + date.getMinutes() + 'am';
  }
  return dateString;
}
