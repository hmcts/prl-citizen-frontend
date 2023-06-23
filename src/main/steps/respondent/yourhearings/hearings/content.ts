import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

const en = () => {
  return {
    section: 'Your court hearings',
    title: 'Your Hearings',
    goBack: 'Go back',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings',
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
    goBack: 'Go back',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings',
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
  // content.additionalData!.req.session.userCase.hearingCollection = [
  //   {
  //     hearingID: 2000005761,
  //     hearingRequestDateTime: "2023-06-19T14:14:22.608675",
  //     hearingType: "ABA5-FOF",
  //     hmcStatus: "AWAITING_ACTUALS",
  //     lastResponseReceivedDateTime: "2023-06-19T14:43:10",
  //     requestVersion: 1,
  //     hearingListingStatus: "FIXED",
  //     listAssistCaseStatus: "LISTED",
  //     hearingDaySchedule: [
  //         {
  //             hearingStartDateTime: "2023-06-20T09:00:00",
  //             hearingEndDateTime: "2023-06-20T10:00:00",
  //             listAssistSessionId: null,
  //             hearingVenueId: "234946",
  //             hearingVenueName: null,
  //             hearingVenueLocationCode: null,
  //             hearingVenueAddress: null,
  //             hearingRoomId: "Swansea CJC Courtroom 03",
  //             hearingJudgeId: "",
  //             hearingJudgeName: null,
  //             panelMemberIds: [],
  //             attendees: [
  //                 {
  //                     partyID: "c7a15ca6-c0e1-4a09-aff1-d7096fdd38ac",
  //                     hearingSubChannel: null
  //                 }
  //             ]
  //         }
  //     ],
  //     hearingGroupRequestId: null,
  //     hearingIsLinkedFlag: false
  // }
  // ];
  if (content.additionalData?.req.session.userCase.hearingCollection.length === 0) {
    translations.yourPreviousHearings = 'No previous hearings';
  }
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
