import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

import { prepareHearingData } from './utils';

export const en = {
  title: 'Your court hearings',
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
  minute: 'minute',
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
  inPersonTime: 'Make sure you arrive at least 30 minutes before the start of the hearing',
  hearingLinkHeading: 'Hearing link',
  hearingLink: 'The court will contact you with instructions to join the hearing',
  smallDay: ' day',
  hours: ' hours',
  hour: ' hour',
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

export const cy = {
  title: 'Eich gwrandawiadau llys',
  goBack: 'Cau a dychwelyd i drosolwg o’r achos ',
  caseNumber: 'Rhif yr achos',
  yourPreviousHearings: 'Eich gwrandawiadau blaenorol',
  yourFutureHearings: 'Eich gwrandawiadau yn y dyfodol',
  upcomingHearing: 'Gwrandawiad sydd ar ddod',
  dates: 'Dyddiadau',
  hearingLength: 'Hyd y gwrandawiad',
  hearingMethod: 'Math o wrandawiad',
  day: 'Diwrnod ',
  days: 'dyddiau',
  judgeName: 'Enw’r barnwr',
  venue: 'Lleoliad',
  address: 'Cyfeiriad',
  roomId: 'Ystafell',
  nextHearingHeading: 'Eich gwrandawiad nesaf',
  hearingDate: 'Dyddiad y gwrandawiad',
  startTime: 'Amser cychwyn',
  hearingDuration: 'Hyd y gwrandawiad',
  minutes: 'cofnodion',
  minute: 'munud',
  am: 'am',
  pm: 'pm',
  previousHearings: 'Gwrandawiadau blaenorol',
  supportDuringCaselinktext: 'Cymorth y mae arnoch ei angen yn ystod eich gwrandawiad',
  delayorcancellinktext: 'Gofyn i ohirio neu ganslo dyddiad gwrandawiad',
  linkforsupport: '',
  linkfordelayorcancel: '#',
  hearingOutcome: 'Canlyniad y gwrandawiad',
  inter: 'Wyneb yn wyneb',
  tel: 'O bell (ffôn)',
  vid: 'O Bell (fideo)',
  na: 'Ddim yn Bresennol',
  onpprs: 'Ar sail y papurau',
  inPersonTime: 'Sicrhewch eich bod yn cyrraedd o leiaf 30 munud cyn amser cychwyn y gwrandawiad',
  hearingLinkHeading: 'Dolen i’r gwrandawiad',
  hearingLink: 'Bydd y llys yn cysylltu â chi gyda chyfarwyddiadau ar sut i ymuno â’r gwrandawiad',
  smallDay: 'diwrnod',
  hours: ' awr',
  hour: ' awr',
  hearing: 'Gwrandawiad',
  hearingid: 'Rhif adnabod y gwrandawiad',
  typeOfHearing: 'Math o wrandawiad',
  hearingRequestDate: 'Y dyddiad y gofynnwyd am wrandawiad',
  lastResponseDate: 'Y dyddiad diwethaf y cafwyd yr ymateb',
  hearingListingStatus: 'Statws rhestru’r gwrandawiad',
  listAssistStatus: 'Statws achos list assist',
  schedule: 'Atodlen',
  hearingStartDateTime: 'Dyddiad cychwyn ac amser y gwrandawiad',
  hearingEndDateTime: 'Dyddiad gorffen ac amser y gwrandawiad',
  hearingRoomId: 'Cyfeiriad y gwrandawiad',
  noOfAttendees: 'Nifer y rhai sy’n bresennol',
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
  const translations = languages[content.language];
  const { nextHearing, futureHearings, completedHearings } = prepareHearingData(content.additionalData?.req);
  return {
    ...translations,
    nextHearing,
    futureHearings,
    completedHearings,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
