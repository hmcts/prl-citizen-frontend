import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';

const en = () => {
  return {
    section: 'Your court hearings',
    title: 'Your Hearings',
    goBack: 'Go back',
    caseNumber: 'Case number',
    yourPreviousHearings: 'Your previous hearings',
    yourFutureHearings: 'Your future hearings',
    upcomingHearing: 'Upcoming hearing',
    dates: 'Dates',
    hearingLength: 'Length of hearing',
    hearingMethod: 'Hearing method',
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
    yourFutureHearings: 'Your future hearings',
    upcomingHearing: 'Upcoming hearing',
    dates: 'Dates',
    hearingLength: 'Length of hearing',
    hearingMethod: 'Hearing method',
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
  if (content.additionalData?.req.session.userCase.hearingCollection.length === 0) {
    translations.yourPreviousHearings = 'No previous hearings';
  }
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
