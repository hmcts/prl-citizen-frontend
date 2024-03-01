import dayjs from 'dayjs';

import { Case } from '../../../../app/case/case';
import {
  Attendee,
  CaseType,
  CompletedHearings,
  Hearing,
  HearingsList,
  PartyType,
  hearingDay,
  hearingStatus,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

import 'dayjs/locale/cy';
import { HEARING_METHOD } from '../../../../steps/constants';

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
    nextHearingHeading: 'Your next hearing',
    hearingDate: 'Hearing date',
    startTime: 'Start time',
    hearingDuration: 'Hearing duration',
    minutes: 'minutes',
    am: 'am',
    pm: 'pm',
    previousHearings: 'Previous hearings',
    supportDuringCaselinktext: 'Support you need during your hearing',
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
    smallDay: ' day',
    hours: ' hours',
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
    nextHearingHeading: 'Your next hearing - welsh',
    hearingDate: 'Hearing date - welsh',
    startTime: 'Start time - welsh',
    hearingDuration: 'Hearing duration - welsh',
    minutes: 'minutes - welsh',
    am: 'am - welsh',
    pm: 'pm - welsh',
    previousHearings: 'Previous hearings - welsh',
    supportDuringCaselinktext: 'Support you need during your hearing - welsh',
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
    smallDay: ' day - welsh',
    hours: ' hours - welsh',
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
    classes: 'govuk-button ga-pageLink govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const { nextHearing, futureHearings, completedHearings } = prepareHearingData(content.additionalData?.req);
  return {
    ...translations,
    nextHearing,
    futureHearings,
    completedHearings,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const prepareHearingData = (req: AppRequest<Partial<Case>>): any => {
  const nextHearing: Hearing[] = [];
  const futureHearings: Hearing[] = [];
  const completedHearings: CompletedHearings[] = [];
  let hearingsFuture: HearingsList[] = [];
  const hearingsCompleted: HearingsList[] = [];
  //Here we are sorting the hearing based on completed or future dated..
  if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection.length >= 1) {
    for (const hearing of req.session.userCase.hearingCollection) {
      if (hearing.hmcStatus === hearingStatus.COMPLETED) {
        hearingsCompleted.push(hearing);
      } else if (hearing.nextHearingDate && new Date() <= new Date(hearing.nextHearingDate)) {
        hearingsFuture?.push(hearing);
      }
    }
  }
  //sorting future hearings based on their next hearing dates
  hearingsFuture = hearingsFuture.sort(
    (a, b) => new Date(a.nextHearingDate!).valueOf() - new Date(b.nextHearingDate!).valueOf()
  );
  //sorting shddules of particular hearing
  if (hearingsFuture && hearingsFuture.length >= 1) {
    for (const hearing of hearingsFuture) {
      if (hearing.hearingDaySchedule!.length >= 2) {
        hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort(
          (a, b) => new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()
        );
      }
    }
    if (hearingsFuture.length >= 1) {
      for (const hearing of hearingsFuture) {
        const date = hearing.hearingDaySchedule![0].hearingStartDateTime!;
        let dates =
          req.session.lang === 'cy'
            ? dayjs(date).locale('cy').format('DD MMMM YYYY')
            : dayjs(date).locale('en').format('DD MMMM YYYY');
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          const endDate = hearing.hearingDaySchedule![len - 1].hearingStartDateTime!;
          const endDateFormatted =
            req.session.lang === 'cy'
              ? dayjs(endDate).locale('cy').format('DD MMMM YYYY').toString()
              : dayjs(endDate).locale('en').format('DD MMMM YYYY').toString();
          dates = `${dates} - ${endDateFormatted}`;
        }
        const lengthOfHearing = hearing.hearingDaySchedule?.length;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        const hearingDays: hearingDay[] = [];
        //Generating the schedule related data to be displayed for a paricular hearing
        for (const schedule of hearing.hearingDaySchedule!) {
          const startDate = schedule.hearingStartDateTime!;
          const formattedDate = new Date(startDate);
          const amPm = formattedDate.getHours() < 12 ? 'am' : 'pm';
          const endDate = new Date(schedule.hearingEndDateTime!);
          const hearingDate =
            req.session.lang === 'cy'
              ? dayjs(startDate).locale('cy').format('dddd, D MMMM YYYY')
              : dayjs(startDate).locale('en').format('dddd, D MMMM YYYY');
          const startTime = getProperTime(formattedDate);
          const diff = Math.abs(formattedDate.valueOf() - endDate.valueOf()) / 1000;
          const durationInDayOrHours = Math.floor(diff / 3600) % 24;
          const minutes = Math.floor(diff / 60) % 60;
          const judgeName = schedule.hearingJudgeName;
          const venue = schedule.hearingVenueName;
          const address = schedule.hearingVenueAddress;
          const roomId = schedule.hearingRoomId;
          hearingDays.push({
            hearingDate,
            startTime,
            amPm,
            durationInDayOrHours,
            minutes,
            judgeName,
            venue,
            address,
            roomId,
          });
        }
        futureHearings.push({
          dates,
          lengthOfHearing,
          hearingMethod,
          hearingDaySchedule: hearingDays,
        });
      }
      const next = futureHearings.shift();
      nextHearing.push(next!);
    }
//  } awaiting for shruti's reply
    //Generating completed hearing data
    if (hearingsCompleted && hearingsCompleted.length >= 1) {
      for (const hearing of hearingsCompleted) {
        if (hearing.hearingDaySchedule!.length >= 2) {
          hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort(
            (a, b) => new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()
          );
        }
        const hearingId = hearing.hearingID;
        const date = hearing.hearingDaySchedule![0].hearingStartDateTime!;
        let dates =
          req.session.lang === 'cy'
            ? dayjs(date).locale('cy').format('dddd, D MMMM YYYY')
            : dayjs(date).locale('en').format('dddd, D MMMM YYYY');
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          const endDate = hearing.hearingDaySchedule![len - 1].hearingStartDateTime!;
          const endDateFormatted =
            req.session.lang === 'cy'
              ? dayjs(endDate).locale('cy').format('dddd, D MMMM YYYY').toString()
              : dayjs(endDate).locale('en').format('dddd, D MMMM YYYY').toString();
          dates = dates + ' - ' + endDateFormatted;
        }
        const hearingLength = hearing.hearingDaySchedule?.length;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        completedHearings.push({
          hearingId,
          dates,
          lengthOfHearing: hearingLength,
          hearingMethod,
        });
      }
    }
  } //delete depend on shruti
  return {
    nextHearing,
    futureHearings,
    completedHearings,
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getHearingMethod(req: AppRequest, attendees: Attendee[]): string {
  const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
  const caseType = req.session.userCase.caseTypeOfApplication;
  let partyData;
  let hearingMethod;
  if (caseType === CaseType.C100) {
    if (partyType === PartyType.RESPONDENT) {
      partyData = req.session.userCase.respondents?.find(
        respondent => respondent?.value?.user?.idamId === req.session.user.id
      );
    } else {
      partyData = req.session.userCase.applicants?.find(
        applicant => applicant?.value?.user?.idamId === req.session.user.id
      );
    }
    hearingMethod = attendees.find(attendee => attendee.partyID === partyData.id)!.hearingSubChannel;
  } else {
    partyData =
      partyType === PartyType.RESPONDENT ? req.session.userCase.respondentsFL401 : req.session.userCase.applicantsFL401;
    hearingMethod = attendees.find(attendee => attendee.partyID === partyData.partyId)!.hearingSubChannel;
  }
  if (hearingMethod !== null) {
    const method =[{
      type:"VID",
      value:[HEARING_METHOD.VID,HEARING_METHOD.VIDCVP,HEARING_METHOD.VIDOTHER,HEARING_METHOD.VIDPVL,HEARING_METHOD.VIDSKYPE,HEARING_METHOD.VIDTEAMS,HEARING_METHOD.VIDVHS]
    },
    {
      type:"TEL",
      value:[HEARING_METHOD.TEL,HEARING_METHOD.TELBTM,HEARING_METHOD.TELCVP,HEARING_METHOD.TELOTHER,HEARING_METHOD.TELSKYP,HEARING_METHOD.TELTEMP]
    }]
    hearingMethod= method.map(hm => hm.value.find(i=>i==hearingMethod)?hm.type:hearingMethod)
    return hearingMethod[0];

    // My suggestion //
    
    // const video =[HEARING_METHOD.VID,HEARING_METHOD.VIDCVP,HEARING_METHOD.VIDOTHER,HEARING_METHOD.VIDPVL,HEARING_METHOD.VIDSKYPE,HEARING_METHOD.VIDTEAMS,HEARING_METHOD.VIDVHS];
    // const phone = [HEARING_METHOD.TEL,HEARING_METHOD.TELBTM,HEARING_METHOD.TELCVP,HEARING_METHOD.TELOTHER,HEARING_METHOD.TELSKYP,HEARING_METHOD.TELTEMP];
    // hearingMethod = video.some(method=>method.includes(hearingMethod))?
    // 'VID':phone.some(method=>method.includes(hearingMethod))?'TEL':hearingMethod
    
    // return hearingMethod;
  }
  return '';
}

export function getProperTime(date: Date): string {
  let dateString;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours > 12) {
    dateString = hours - 12 + ':' + (minutes < 10 ? '0' + minutes : minutes);
  } else {
    dateString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
  }
  return dateString;
}
