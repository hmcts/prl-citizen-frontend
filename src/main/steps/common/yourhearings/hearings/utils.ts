/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
import { HEARING_METHOD } from '../../../../steps/constants';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

import { cy, en } from './content';

export function getHearingMethod(req: AppRequest, attendees: Attendee[]): string {
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

    return lang[Object.keys(methodOfHearingList).find(key => methodOfHearingList[key].includes(hearingMethod)) ?? ''];
  }
}

export const generateHearingDaySchedule = (
  hearing: HearingsList,
  req: AppRequest<Partial<Case>>,
  hearingDays: hearingDay[],
  hearingMethod
) => {
  for (const schedule of hearing.hearingDaySchedule!) {
    const startDate = schedule.hearingStartDateTime!;
    const formattedDate = new Date(startDate);
    const amPm = formattedDate.getHours() < 12 ? 'am' : 'pm';
    const endDate = new Date(schedule.hearingEndDateTime!);
    const hearingDate = generateHearingDateDisplayText(req, startDate);
    const startTime = generateHearingTimeDisplayText(formattedDate);
    const lang = req.session.lang === 'cy' ? cy : en;
    const preparedStartTime =
      hearingMethod === lang.inter ? startTime + ' ' + amPm + '<br>' + lang.inPersonTime : startTime + ' ' + amPm;
    const diff = Math.abs(formattedDate.valueOf() - endDate.valueOf()) / 1000;
    const durationInDayOrHours = Math.floor(diff / 3600) % 24;
    const minutes = Math.floor(diff / 60) % 60;
    const hearingDurationText = generateHearingScheduleDisplayText(durationInDayOrHours, minutes, lang);

    const judgeName = schedule.hearingJudgeName;
    const venue = schedule.hearingVenueName;
    const address = schedule.hearingVenueAddress;
    const roomId = schedule.hearingRoomId;
    const detailsBlock: Row[] = [];
    if (hearingMethod === lang.inter) {
      detailsBlock.push(
        { key: lang.venue, value: venue },
        { key: lang.address, value: address },
        { key: lang.roomId, value: roomId }
      );
    } else if (hearingMethod === lang.tel || lang.vid) {
      detailsBlock.push({ key: lang.hearingLinkHeading, value: lang.hearingLink });
    }

    hearingDays.push({
      hearingDate,
      startTime,
      amPm,
      preparedStartTime,
      durationInDayOrHours,
      minutes,
      hearingDurationText,
      judgeName,
      venue,
      address,
      roomId,
      detailsBlock,
    });
  }
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

export type Row = {
  key: string;
  value: string | null | undefined;
};

export const generateHearingDate = (req: AppRequest<Partial<Case>>, endDate: string) => {
  return req.session.lang === 'cy'
    ? dayjs(endDate).locale('cy').format('DD MMMM YYYY').toString()
    : dayjs(endDate).locale('en').format('DD MMMM YYYY').toString();
};
export const generateHearingDateDisplayText = (req: AppRequest<Partial<Case>>, date: string) => {
  return req.session.lang === 'cy'
    ? dayjs(date).locale('cy').format('dddd, D MMMM YYYY')
    : dayjs(date).locale('en').format('dddd, D MMMM YYYY');
};

export const generateHearingScheduleDisplayText = (durationInDayOrHours: number, minutes: number, lang) => {
  if (durationInDayOrHours >= 5) {
    return `1 ${lang.smallDay}`;
  } else {
    if (minutes > 0) {
      if (durationInDayOrHours > 0) {
        const hourText = generateHearingHourDisplayText(durationInDayOrHours, lang);
        const minuteText = generateHearingMinuteDisplayText(minutes, lang);
        return `${hourText} ${minuteText}`;
      } else {
        return generateHearingMinuteDisplayText(minutes, lang);
      }
    } else {
      return generateHearingHourDisplayText(durationInDayOrHours, lang);
    }
  }
};
export const generateHearingMinuteDisplayText = (minutes: number, lang: any) => {
  return minutes === 1 ? `1 ${lang.minute}` : `${minutes} ${lang.minutes}`;
};

export const generateHearingHourDisplayText = (durationInDayOrHours: number, lang: any) => {
  return durationInDayOrHours === 1 ? `1 ${lang.hour}` : `${durationInDayOrHours} ${lang.hours}`;
};

export const prepareHearingData = (req: AppRequest<Partial<Case>>): any => {
  const nextHearing: Hearing[] = [];
  const futureHearings: Hearing[] = [];
  const completedHearings: CompletedHearings[] = [];
  let hearingsFuture: HearingsList[] = [];
  const hearingsCompleted: HearingsList[] = [];
  const lang = req.session.lang === 'cy' ? cy : en;
  //Here we are sorting the hearing based on completed or future dated..
  sortHearings(req, hearingsCompleted, hearingsFuture);
  //sorting future hearings based on their next hearing dates
  hearingsFuture = hearingsFuture.sort(
    (a, b) => new Date(a.nextHearingDate!).valueOf() - new Date(b.nextHearingDate!).valueOf()
  );
  //sorting shddules of particular hearing
  prepareFutureHearingData(hearingsFuture, req, lang, futureHearings, nextHearing);
  //Generating completed hearing data
  prepareCompletedHearingData(hearingsCompleted, req, lang, completedHearings);
  return {
    nextHearing,
    futureHearings,
    completedHearings,
  };
};

export const prepareCompletedHearingData = (
  hearingsCompleted: HearingsList[],
  req: AppRequest<Partial<Case>>,
  lang,
  completedHearings: CompletedHearings[]
) => {
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
      const lengthOfHearingText =
        hearingLength === 1 ? `${hearingLength} ${lang.smallDay}` : `${hearingLength} ${lang.days}`;
      const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
      completedHearings.push({
        hearingId,
        dates,
        lengthOfHearing: hearingLength,
        lengthOfHearingText,
        hearingMethod,
      });
    }
  }
};

export const prepareFutureHearingData = (
  hearingsFuture: HearingsList[],
  req: AppRequest<Partial<Case>>,
  lang,
  futureHearings: Hearing[],
  nextHearing: Hearing[]
) => {
  if (hearingsFuture && hearingsFuture.length >= 1) {
    multidayHearingSort(hearingsFuture);
    if (hearingsFuture.length >= 1) {
      for (const hearing of hearingsFuture) {
        const date = hearing.hearingDaySchedule![0].hearingStartDateTime!;
        let dates = generateHearingDate(req, date);
        if (hearing.hearingDaySchedule!.length >= 2) {
          const len = hearing.hearingDaySchedule!.length;
          const endDate = hearing.hearingDaySchedule![len - 1].hearingStartDateTime!;
          const endDateFormatted = generateHearingDate(req, endDate);
          dates = `${dates} - ${endDateFormatted}`;
        }
        const lengthOfHearing = hearing.hearingDaySchedule?.length;
        const lengthOfHearingText =
          lengthOfHearing === 1 ? `${lengthOfHearing} ${lang.smallDay}` : `${lengthOfHearing} ${lang.days}`;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        const hearingDays: hearingDay[] = [];
        //Generating the schedule related data to be displayed for a paricular hearing
        generateHearingDaySchedule(hearing, req, hearingDays, hearingMethod);
        futureHearings.push({
          dates,
          lengthOfHearing,
          lengthOfHearingText,
          hearingMethod,
          hearingDaySchedule: hearingDays,
        });
      }
      const next = futureHearings.shift();
      nextHearing.push(next!);
    }
  }
};

export const multidayHearingSort = (hearingsFuture: HearingsList[]) => {
  for (const hearing of hearingsFuture) {
    if (hearing.hearingDaySchedule!.length >= 2) {
      hearing.hearingDaySchedule = hearing.hearingDaySchedule!.sort(
        (a, b) => new Date(a.hearingStartDateTime!).valueOf() - new Date(b.hearingStartDateTime!).valueOf()
      );
    }
  }
};

export const sortHearings = (
  req: AppRequest<Partial<Case>>,
  hearingsCompleted: HearingsList[],
  hearingsFuture: HearingsList[]
) => {
  if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection.length >= 1) {
    for (const hearing of req.session.userCase.hearingCollection) {
      if (hearing.hmcStatus === hearingStatus.COMPLETED) {
        hearingsCompleted.push(hearing);
      } else if (hearing.nextHearingDate && new Date() <= new Date(hearing.nextHearingDate)) {
        hearingsFuture?.push(hearing);
      }
    }
  }
};
