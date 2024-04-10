import dayjs from 'dayjs';

import { Case } from '../../../../app/case/case';
import {
  Attendee,
  CaseType,
  CompletedHearings,
  Hearing,
  HearingsList,
  PartyType,
  Row,
  HearingDay,
  hearingStatus,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { HEARING_METHOD } from '../../../../steps/constants';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

import { cy, en } from './content';

export const getHearingMethod = (req: AppRequest, attendees: Attendee[]): string => {
  const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
  const caseType = req.session.userCase.caseTypeOfApplication;
  let partyData;
  let hearingMethod;
  const lang = req.session.lang === 'cy' ? cy : en;
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
  if (!hearingMethod) {
    return '';
  } else {
    const methodOfHearingList = {
      vid: [
        HEARING_METHOD.VID,
        HEARING_METHOD.VIDCVP,
        HEARING_METHOD.VIDOTHER,
        HEARING_METHOD.VIDPVL,
        HEARING_METHOD.VIDSKYPE,
        HEARING_METHOD.VIDTEAMS,
        HEARING_METHOD.VIDVHS,
      ],
      tel: [
        HEARING_METHOD.TEL,
        HEARING_METHOD.TELBTM,
        HEARING_METHOD.TELCVP,
        HEARING_METHOD.TELOTHER,
        HEARING_METHOD.TELSKYP,
        HEARING_METHOD.TELTEMP,
      ],
      inter: [HEARING_METHOD.INTER],
      na: [HEARING_METHOD.NA],
      onpprs: [HEARING_METHOD.ONPPRS],
    };

    return lang[
      Object.keys(methodOfHearingList).find(key => methodOfHearingList[key].includes(hearingMethod)) ??
        mapHearingChannel(hearingMethod)
    ];
  }
};
//this method is if in future hmc team want to add new way of telephonic or video hearing
export const mapHearingChannel = (hearingMethod: string): string => {
  if (hearingMethod.startsWith('TEL')) {
    return 'tel';
  }
  if (hearingMethod.startsWith('VID')) {
    return 'vid';
  }
  return '';
};

export const generateHearingDaySchedule = (
  hearing: HearingsList,
  req: AppRequest<Partial<Case>>,
  hearingDays: HearingDay[],
  hearingMethod: string
): HearingDay[] => {
  for (const schedule of hearing.hearingDaySchedule!) {
    const startDate = schedule.hearingStartDateTime!;
    const formattedDate = new Date(startDate);
    const amPm = formattedDate.getHours() < 12 ? 'am' : 'pm';
    const endDate = new Date(schedule.hearingEndDateTime!);
    const hearingDate = generateHearingDateDisplayText(req, startDate);
    const startTime = generateHearingTimeDisplayText(formattedDate);
    const lang = req.session.lang === 'cy' ? cy : en;
    const startTimeDisplayText =
      hearingMethod === lang.inter ? startTime + ' ' + amPm + '<br>' + lang.inPersonTime : startTime + ' ' + amPm;
    const diff = Math.abs(formattedDate.valueOf() - endDate.valueOf()) / 1000;
    const durationInDayOrHours = Math.floor(diff / 3600) % 24;
    const minutes = Math.floor(diff / 60) % 60;
    const hearingDurationDisplayText = generateHearingScheduleDisplayText(
      durationInDayOrHours,
      minutes,
      req.session.lang
    );

    const judgeName = schedule.hearingJudgeName;
    const venue = schedule.hearingVenueName;
    const address = schedule.hearingVenueAddress;
    const roomId = schedule.hearingRoomId;
    const hearingToAttendDetails: Row[] = [];
    if (hearingMethod === lang.inter) {
      hearingToAttendDetails.push(
        { displayText: lang.venue, value: venue },
        { displayText: lang.address, value: address },
        { displayText: lang.roomId, value: roomId }
      );
    } else if (hearingMethod === lang.tel || hearingMethod === lang.vid) {
      hearingToAttendDetails.push({ displayText: lang.hearingLinkHeading, value: lang.hearingLink });
    }

    hearingDays.push({
      hearingDate,
      startTime,
      amPm,
      startTimeDisplayText,
      durationInDayOrHours,
      minutes,
      hearingDurationDisplayText,
      judgeName,
      venue,
      address,
      roomId,
      hearingToAttendDetails,
    });
  }
  return hearingDays;
};

export const generateHearingTimeDisplayText = (date: Date): string => {
  let dateString;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours > 12) {
    dateString = hours - 12 + ':' + (minutes < 10 ? '0' + minutes : minutes);
  } else {
    dateString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
  }
  return dateString;
};

export const generateHearingDate = (req: AppRequest<Partial<Case>>, endDate: string): string => {
  return req.session.lang === 'cy'
    ? dayjs(endDate).locale('cy').format('DD MMMM YYYY').toString()
    : dayjs(endDate).locale('en').format('DD MMMM YYYY').toString();
};
export const generateHearingDateDisplayText = (req: AppRequest<Partial<Case>>, date: string): string => {
  return req.session.lang === 'cy'
    ? dayjs(date).locale('cy').format('dddd, D MMMM YYYY')
    : dayjs(date).locale('en').format('dddd, D MMMM YYYY');
};

export const generateHearingScheduleDisplayText = (
  durationInDayOrHours: number,
  minutes: number,
  preference: string | undefined
): string => {
  const lang = preference === 'cy' ? cy : en;
  if (durationInDayOrHours >= 5) {
    return `1 ${lang.smallDay}`;
  } else {
    if (minutes > 0) {
      if (durationInDayOrHours > 0) {
        const hourText = generateHearingHourDisplayText(durationInDayOrHours, preference);
        const minuteText = generateHearingMinuteDisplayText(minutes, preference);
        return `${hourText} ${minuteText}`;
      } else {
        return generateHearingMinuteDisplayText(minutes, preference);
      }
    } else {
      return generateHearingHourDisplayText(durationInDayOrHours, preference);
    }
  }
};
export const generateHearingMinuteDisplayText = (minutes: number, preference: string | undefined): string => {
  const lang = preference === 'cy' ? cy : en;
  return minutes === 1 ? `1 ${lang.minute}` : `${minutes} ${lang.minutes}`;
};

export const generateHearingHourDisplayText = (
  durationInDayOrHours: number,
  preference: string | undefined
): string => {
  const lang = preference === 'cy' ? cy : en;
  return durationInDayOrHours === 1 ? `1 ${lang.hour}` : `${durationInDayOrHours} ${lang.hours}`;
};

export const prepareHearingData = (
  req: AppRequest<Partial<Case>>
): { nextHearing: Hearing[]; futureHearings: Hearing[]; completedHearings: CompletedHearings[] } => {
  const nextHearing: Hearing[] = [];
  const futureHearings: Hearing[] = [];
  const completedHearings: CompletedHearings[] = [];
  let hearingsFuture: HearingsList[] = [];
  const hearingsCompleted: HearingsList[] = [];
  //Here we are sorting the hearing based on completed or future dated..
  sortHearings(req, hearingsCompleted, hearingsFuture);
  //sorting future hearings based on their next hearing dates
  hearingsFuture = hearingsFuture.sort(
    (a, b) => new Date(a.nextHearingDate!).valueOf() - new Date(b.nextHearingDate!).valueOf()
  );
  //sorting shddules of particular hearing
  prepareFutureHearingData(hearingsFuture, req, futureHearings, nextHearing);
  //Generating completed hearing data
  prepareCompletedHearingData(hearingsCompleted, req, completedHearings);
  return {
    nextHearing,
    futureHearings,
    completedHearings,
  };
};

export const prepareCompletedHearingData = (
  hearingsCompleted: HearingsList[],
  req: AppRequest<Partial<Case>>,
  completedHearings: CompletedHearings[]
): CompletedHearings[] => {
  const lang = req.session.lang === 'cy' ? cy : en;
  if (hearingsCompleted && hearingsCompleted.length >= 1) {
    for (const hearing of hearingsCompleted) {
      if (hearing.hearingDaySchedule!.length >= 2) {
        hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort(
          (a, b) => new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()
        );
      }
      const hearingId = hearing.hearingID;
      const date = hearing.hearingDaySchedule![0].hearingStartDateTime!;
      let dates = generateHearingDateDisplayText(req, date);
      if (hearing.hearingDaySchedule!.length >= 2) {
        const len = hearing.hearingDaySchedule!.length;
        const endDate = hearing.hearingDaySchedule![len - 1].hearingStartDateTime!;
        const endDateFormatted = generateHearingDateDisplayText(req, endDate);
        dates = dates + ' - ' + endDateFormatted;
      }
      const hearingLength = hearing.hearingDaySchedule?.length;
      const hearingDurationDisplayText =
        hearingLength === 1 ? `${hearingLength} ${lang.smallDay}` : `${hearingLength} ${lang.days}`;
      const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
      completedHearings.push({
        hearingId,
        dates,
        lengthOfHearing: hearingLength,
        hearingDurationDisplayText,
        hearingMethod,
      });
    }
  }
  return completedHearings;
};

export const prepareFutureHearingData = (
  hearingsFuture: HearingsList[],
  req: AppRequest<Partial<Case>>,
  futureHearings: Hearing[],
  nextHearing: Hearing[]
): { nextHearing: Hearing[]; futureHearings: Hearing[] } => {
  const lang = req.session.lang === 'cy' ? cy : en;
  if (hearingsFuture && hearingsFuture.length >= 1) {
    multiHearingSort(hearingsFuture);
    if (hearingsFuture.length >= 1) {
      for (const hearing of hearingsFuture) {
        const date = hearing.hearingDaySchedule![0].hearingStartDateTime!;
        let dates = generateHearingDate(req, date);
        dates = generateDatesForMultidayHearing(hearing, req, dates);
        const lengthOfHearing = hearing.hearingDaySchedule?.length;
        const hearingDurationDisplayText =
          lengthOfHearing === 1 ? `${lengthOfHearing} ${lang.smallDay}` : `${lengthOfHearing} ${lang.days}`;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        const hearingDays: HearingDay[] = [];
        //Generating the schedule related data to be displayed for a paricular hearing
        generateHearingDaySchedule(hearing, req, hearingDays, hearingMethod);
        futureHearings.push({
          dates,
          lengthOfHearing,
          hearingDurationDisplayText,
          hearingMethod,
          hearingDaySchedule: hearingDays,
        });
      }
      const next = futureHearings.shift();
      nextHearing.push(next!);
    }
  }
  return {
    nextHearing,
    futureHearings,
  };
};

export const multiHearingSort = (hearingsFuture: HearingsList[]): HearingsList[] => {
  for (const hearing of hearingsFuture) {
    if (hearing.hearingDaySchedule!.length >= 2) {
      hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort(
        (a, b) => new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()
      );
    }
  }
  return hearingsFuture;
};

export const sortHearings = (
  req: AppRequest<Partial<Case>>,
  hearingsCompleted: HearingsList[],
  hearingsFuture: HearingsList[]
): { hearingsCompleted: HearingsList[]; hearingsFuture: HearingsList[] } => {
  if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection.length >= 1) {
    for (const hearing of req.session.userCase.hearingCollection) {
      if (hearing.hmcStatus === hearingStatus.COMPLETED || hearing.hmcStatus === hearingStatus.AWAITING_ACTUALS) {
        hearingsCompleted.push(hearing);
      } else if (hearing.nextHearingDate && new Date() <= new Date(hearing.nextHearingDate)) {
        hearingsFuture?.push(hearing);
      }
    }
  }
  return {
    hearingsCompleted,
    hearingsFuture,
  };
};
const generateDatesForMultidayHearing = (
  hearing: HearingsList,
  req: AppRequest<Partial<Case>>,
  dates: string
): string => {
  if (hearing.hearingDaySchedule!.length >= 2) {
    const len = hearing.hearingDaySchedule!.length;
    const endDate = hearing.hearingDaySchedule![len - 1].hearingStartDateTime!;
    const endDateFormatted = generateHearingDate(req, endDate);
    dates = `${dates} - ${endDateFormatted}`;
  }
  return dates;
};
