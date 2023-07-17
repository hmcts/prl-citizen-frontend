import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { CaseType, HearingsList, PartyType } from '../../../../app/case/definition';
import { RESPONDENT_ORDERS_FROM_THE_COURT } from '../../../../steps/urls';
import { Case } from 'app/case/case';

const en = () => {
  return {
    section: 'Your court hearings',
    title: 'Your Hearings',
    goBack: 'Close and return to case overview',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings',
    yourFutureHearings: 'Your future hearings',
    upcomingHearing: 'Upcoming hearing',
    dates: 'Dates',
    hearingLength: 'Length of hearing',
    hearingMethod: 'Hearing method',
    day: 'Day ',
    days: 'days',
    judgeName: 'Judge name',
    venue: 'Venue',
    address: 'Address',
    roomId: 'Room',
    nextHearing: 'Your next hearing',
    hearingDate: 'Hearing date',
    startTime: 'Start time',
    hearingDuration: 'Hearing duration',
    minutes:'minutes',
    am:'am',
    pm:'pm',
    previousHearings: 'Previous hearings',
    supportDuringCaselinktext: 'Support you need during your case',
    delayorcancellinktext: 'Ask to delay or cancel a hearing date',
    linkforsupport: '',
    linkfordelayorcancel: '#',
    hearingOutcome: 'Hearing outcome',
    inter: 'In Person',
    tel: 'Remote (phone)',
    vid: 'Remote (video)',
    na: 'Not in attendance',
    onpprs: 'On the papers',
    inPersonTime: 'Make Sure you arrive atleast 30 minutes before the start of hearing',
    hearingLinkHeading: 'Hearing link',
    hearingLink: 'The court will contact you with instructions to join the hearing',
    smallDay:' day',
    hours:' hours',
    hearing: 'Hearing',
    hearingid: 'Hearing Id',
    typeOfHearing: 'Type of hearing',
    hearingRequestDate: 'Hearing requested date',
    lastResponseDate: 'Last response received date',
    hearingListingStatus: 'Listing status of hearing',
    listAssistStatus: 'List assist case status',
    schedule: 'Schedule',
    hearingStartDateTime: 'Start date and time of hearing',
    hearingEndDateTime: 'End date and time of hearing',
    hearingRoomId: 'Hearing Address',
    noOfAttendees: 'Number of attendees',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Your court hearings - welsh',
    title: 'Your Hearings - welsh',
    goBack: 'Close and return to case overview - welsh',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings - welsh',
    yourFutureHearings: 'Your future hearings - welsh',
    upcomingHearing: 'Upcoming hearing - welsh',
    dates: 'Dates - welsh',
    hearingLength: 'Length of hearing - welsh',
    hearingMethod: 'Hearing method - welsh',
    day: 'Day - welsh',
    days: 'days - welsh',
    judgeName: 'Judge name - welsh',
    venue: 'Venue - welsh',
    address: 'Address - welsh',
    roomId: 'Room - welsh',
    nextHearing: 'Your next hearing - welsh',
    hearingDate: 'Hearing date - welsh',
    startTime: 'Start time - welsh',
    hearingDuration: 'Hearing duration - welsh',
    minutes:'minutes - welsh',
    am:'am - welsh',
    pm:'pm - welsh',
    previousHearings: 'Previous hearings - welsh',
    supportDuringCaselinktext: 'Support you need during your case - welsh',
    delayorcancellinktext: 'Ask to delay or cancel a hearing date - welsh',
    linkforsupport: '',
    linkfordelayorcancel: '#',
    hearingOutcome: 'Hearing outcome - welsh',
    inter: 'In Person - welsh',
    tel: 'Remote (phone) - welsh',
    vid: 'Remote (video) - welsh',
    na: 'Not in attendance - welsh',
    onpprs: 'On the papers - welsh',
    inPersonTime: 'Make Sure you arrive atleast 30 minutes before the start of hearing - welsh',
    hearingLinkHeading: 'Hearing link - welsh',
    hearingLink: 'The court will contact you with instructions to join the hearing - welsh',
    smallDay:' day - welsh',
    hours:' hours - welsh',
    hearing: 'Hearing - welsh',
    hearingid: 'Hearing Id - welsh',
    typeOfHearing: 'Type of hearing - welsh',
    hearingRequestDate: 'Hearing requested date - welsh',
    lastResponseDate: 'Last response received date - welsh',
    hearingListingStatus: 'Listing status of hearing - welsh',
    listAssistStatus: 'List assist case status - welsh',
    schedule: 'Schedule - welsh',
    hearingStartDateTime: 'Start date and time of hearing - welsh',
    hearingEndDateTime: 'End date and time of hearing - welsh',
    hearingRoomId: 'Hearing Address - welsh',
    noOfAttendees: 'Number of attendees - welsh',
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    return {
      caseNumber: {
        label: l => l.caseNumber + '' + userCase.caseCode,
        type: 'hidden',
        labelHidden: true,
      },
    };
  },
  submit: {
    text: l => l.goBack,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  updateCaseDataForHearings(content.additionalData!.req);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};

const updateCaseDataForHearings = (req:AppRequest<Partial<Case>>):void =>  {
    req.session.userCase.nextHearing1 = [];
    req.session.userCase.futureHearings1 = [];
    req.session.userCase.completedHearings1 = [];
    let HearingsFuture:HearingsList[] = [];
    let HearingsCompleted:HearingsList[] = [];
    if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection!.length >= 1) {
      for (const hearing of req.session.userCase.hearingCollection) {
          if (hearing.hmcStatus === 'COMPLETED') {
            HearingsCompleted.push(hearing);
          } 
          else if(hearing.nextHearingDate && new Date() <= new Date(hearing.nextHearingDate))
          {
              HearingsFuture?.push(hearing);
          }
      }
    }
    HearingsFuture = HearingsFuture.sort((a, b) => (new Date(a.nextHearingDate!).valueOf() - new Date(b.nextHearingDate!).valueOf()));
    if (HearingsFuture && HearingsFuture.length >= 1) {
      for (const hearing of HearingsFuture) {
        if (hearing.hearingDaySchedule!.length >= 2) {
          hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort((a, b) => (new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()));
        }
      }
    };
    if (HearingsFuture && HearingsFuture.length >= 1) {
      for (const hearing of HearingsFuture) {
        let date = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!)
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let dates = day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          let endDate = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!);
          day = endDate.getDate();
          month = endDate.getMonth();
          year = endDate.getFullYear();
          dates =
          dates + ' - ' + day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        }
        let lengthOfHearing = hearing.hearingDaySchedule?.length;
        let hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees);
        let hearingDays : Object[] = [];
         for (const schedule of hearing.hearingDaySchedule!) {
          let date = new Date(schedule.hearingStartDateTime!);
          let amPm = date.getHours()<12 ? 'am' : 'pm';
          let endDate = new Date(schedule.hearingEndDateTime!);
          let day1 = date.getDate();
          let month1 = date.getMonth();
          let year1 = date.getFullYear();
          let weekDay1 = date.getDay();
          let hearingDate = getDayName(weekDay1,req.session.lang!) + ', ' + day1 + ' ' + getMonthName(month1,req.session.lang!) + ' ' + year1;
          let startTime = getProperTime(date);
          let diff = Math.abs(date.valueOf() - endDate.valueOf()) / 1000;
          let durationInDayOrHours = Math.floor(diff / 3600) % 24;
          let minutes = Math.floor(diff / 60) % 60; 
          let judgeName = schedule.hearingJudgeName;
          let venue = schedule.hearingVenueName;
          let address = schedule.hearingVenueAddress;
          let roomId = schedule.hearingRoomId;
          hearingDays.push({
            hearingDate,
            startTime,
            amPm,
            durationInDayOrHours,
            minutes,
            judgeName,
            venue,
            address,
            roomId
          })
        }
        req.session.userCase.futureHearings1.push({
          dates:dates,
          lengthOfHearing:lengthOfHearing,
          hearingMethod:hearingMethod,
          hearingDaySchedule:hearingDays
        })
      }
      const next = req.session.userCase.futureHearings1.shift();
      req.session.userCase.nextHearing1.push(next!);
    }
    console.log(req.session.userCase.futureHearings1);
    if (HearingsCompleted && HearingsCompleted.length >= 1) {
      for (const hearing of HearingsCompleted) {
        let date = new Date(hearing.hearingDaySchedule![0].hearingStartDateTime!);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let weekDay = date.getDay();
        let dates = getDayName(weekDay,req.session.lang!) + ', ' + day + ' ' + getMonthName(month,req.session.lang!) + ' ' + year;
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          let endDate = new Date(hearing.hearingDaySchedule![len - 1].hearingStartDateTime!)
          day = endDate.getDate();
          month = endDate.getMonth();
          year = endDate.getFullYear();
          weekDay = endDate.getDay();
          dates =
            dates +
            ' - ' +
            getDayName(weekDay,req.session.lang!) +
            ', ' +
            day +
            ' ' +
            getMonthName(month,req.session.lang!) +
            ' ' +
            year;
        }
        let hearingLength = hearing.hearingDaySchedule?.length;
        let hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees);
        req.session.userCase.completedHearings1.push({
          dates:dates,
          lengthOfHearing:hearingLength,
          hearingMethod:hearingMethod
        });
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
        // console.log(partyData);
      hearingMethod = attendees.find(attendee => attendee.partyID === partyData.partyId).hearingSubChannel;
    }
    // console.log("8***********" , partyData);
    if (hearingMethod !== null) {
      return hearingMethod;
    }
    return '';
  }
  
  export function getProperTime(date: Date): string {
    let dateString;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours > 12) {
      dateString = hours - 12 + ':' + (minutes <10 ? '0'+minutes : minutes);
    } 
    else {
      dateString = hours + ':' + (minutes <10 ? '0'+minutes : minutes);
    }
    return dateString;
  }
  

