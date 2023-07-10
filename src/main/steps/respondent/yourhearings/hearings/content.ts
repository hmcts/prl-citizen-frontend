import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

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
    day: 'Day',
    judgeName: "Judge name",
    venue: "Venue",
    address: "Address",
    roomId: "Room",
    nextHearing: "Your next hearing",
    hearingDate: "Hearing date",
    startTime: "Start time",
    hearingDuration: "Hearing duration",
    previousHearings: "Previous hearings",
    supportDuringCaselinktext: 'Support you need during your case',
    delayorcancellinktext: 'Ask to delay or cancel a hearing date',
    linkforsupport:'/respondent/support-you-need-during-case/attending-the-court',
    linkfordelayorcancel:'#',
    hearingOutcome: 'Hearing outcome',
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
    day: 'Day',
    judgeName: "Judge name",
    venue: "Venue",
    address: "Address",
    roomId: "Room",
    nextHearing: "Your next hearing",
    hearingDate: "Hearing date",
    startTime: "Start time",
    hearingDuration: "Hearing duration",
    previousHearings: "Previous hearings",
    supportDuringCaselinktext: 'Support you need during your case',
    delayorcancellinktext: 'Ask to delay or cancel a hearing date',
    linkforsupport:'',
    linkfordelayorcancel:'#',
    hearingOutcome: 'Hearing outcome',
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

  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
