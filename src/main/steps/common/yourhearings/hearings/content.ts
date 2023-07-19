import dayjs from 'dayjs';

import { Case } from '../../../../app/case/case';
import { Attendee, CaseType, HearingsList, PartyType, hearingStatus } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

import 'dayjs/locale/cy';

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
    minutes: 'minutes',
    am: 'am',
    pm: 'pm',
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
    nextHearing: 'Your next hearing - welsh',
    hearingDate: 'Hearing date - welsh',
    startTime: 'Start time - welsh',
    hearingDuration: 'Hearing duration - welsh',
    minutes: 'minutes - welsh',
    am: 'am - welsh',
    pm: 'pm - welsh',
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
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  updateCaseDataForHearings(content.additionalData?.req);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};

const updateCaseDataForHearings = (req: AppRequest<Partial<Case>>): void => {
  req.session.userCase.nextHearing1 = [];
  req.session.userCase.futureHearings1 = [];
  req.session.userCase.completedHearings1 = [];
  let hearingsFuture: HearingsList[] = [];
  const hearingsCompleted: HearingsList[] = [];
  if (req.session.userCase.hearingCollection && req.session.userCase.hearingCollection.length >= 1) {
    for (const hearing of req.session.userCase.hearingCollection) {
      if (hearing.hmcStatus === hearingStatus.COMPLETED) {
        hearingsCompleted.push(hearing);
      } else if (hearing.nextHearingDate && new Date() <= new Date(hearing.nextHearingDate)) {
        hearingsFuture?.push(hearing);
      }
    }
  }
  hearingsFuture = hearingsFuture.sort(
    (a, b) => new Date(a.nextHearingDate!).valueOf() - new Date(b.nextHearingDate!).valueOf()
  );
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
          dates = dates + ' - ' + endDateFormatted;
        }
        const lengthOfHearing = hearing.hearingDaySchedule?.length;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        const hearingDays: object[] = [];
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
        req.session.userCase.futureHearings1.push({
          dates,
          lengthOfHearing,
          hearingMethod,
          hearingDaySchedule: hearingDays,
        });
      }
      const next = req.session.userCase.futureHearings1.shift();
      req.session.userCase.nextHearing1.push(next!);
    }
    console.log(req.session.userCase.futureHearings1);
    if (hearingsCompleted && hearingsCompleted.length >= 1) {
      for (const hearing of hearingsCompleted) {
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
              ? dayjs(endDate).locale('cy').format('DD MMMM YYYY').toString()
              : dayjs(endDate).locale('en').format('DD MMMM YYYY').toString();
          dates = dates + ' - ' + endDateFormatted;
        }
        const hearingLength = hearing.hearingDaySchedule?.length;
        const hearingMethod = getHearingMethod(req, hearing.hearingDaySchedule![0].attendees!);
        req.session.userCase.completedHearings1.push({
          dates,
          lengthOfHearing: hearingLength,
          hearingMethod,
        });
      }
    }
  }
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
    return hearingMethod;
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
