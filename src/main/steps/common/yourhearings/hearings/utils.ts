/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Case } from 'app/case/case';
import dayjs from 'dayjs';

import { Attendee, CaseType, HearingsList, PartyType, hearingDay } from '../../../../app/case/definition';
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
  if (hearingMethod !== null) {
    const a = {
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

    return lang[Object.keys(a).find(key => a[key].includes(hearingMethod)) ?? hearingMethod];
  }
  return '';
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
    const hearingDate = dateGenarationWithDay(req, startDate);
    const startTime = getProperTime(formattedDate);
    const lang = req.session.lang === 'cy' ? cy : en;
    const preparedStartTime =
      hearingMethod === lang.inter ? startTime + ' ' + amPm + '<br>' + lang.inPersonTime : startTime + ' ' + amPm;
    const diff = Math.abs(formattedDate.valueOf() - endDate.valueOf()) / 1000;
    const durationInDayOrHours = Math.floor(diff / 3600) % 24;
    const minutes = Math.floor(diff / 60) % 60;
    const hearingDurationText = generateHearingText(durationInDayOrHours, minutes, lang);

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

export type Row = {
  key: string;
  value: string | null | undefined;
};

export const dateGenaration = (req: AppRequest<Partial<Case>>, endDate: string) => {
  return req.session.lang === 'cy'
    ? dayjs(endDate).locale('cy').format('DD MMMM YYYY').toString()
    : dayjs(endDate).locale('en').format('DD MMMM YYYY').toString();
};
export const dateGenarationWithDay = (req: AppRequest<Partial<Case>>, date: string) => {
  return req.session.lang === 'cy'
    ? dayjs(date).locale('cy').format('dddd, D MMMM YYYY')
    : dayjs(date).locale('en').format('dddd, D MMMM YYYY');
};

export const generateHearingText = (durationInDayOrHours: number, minutes: number, lang) => {
  if (durationInDayOrHours >= 5) {
    return `1 ${lang.smallDay}`;
  } else {
    if (minutes > 0) {
      if (durationInDayOrHours > 0) {
        const hourText = generateHourText(durationInDayOrHours, lang);
        const minuteText = generateMinuteText(minutes, lang);
        return `${hourText} ${minuteText}`;
      } else {
        return generateMinuteText(minutes, lang);
      }
    } else {
      return generateHourText(durationInDayOrHours, lang);
    }
  }
};
export const generateMinuteText = (minutes: number, lang: any) => {
  return minutes === 1 ? `1 ${lang.minute}` : `${minutes} ${lang.minutes}`;
};

export const generateHourText = (durationInDayOrHours: number, lang: any) => {
  return durationInDayOrHours === 1 ? `1 ${lang.hour}` : `${durationInDayOrHours} ${lang.hours}`;
};
