import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
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
  judgeName: 'Judge name',
  venue: 'Venue',
  address: 'Address',
  roomId: 'Room',
  nextHearing: 'Your next hearing',
  hearingDate: 'Hearing date',
  startTime: 'Start time',
  hearingDuration: 'Hearing duration',
  previousHearings: 'Previous hearings',
  supportDuringCaselinktext: 'Support you need during your case',
  delayorcancellinktext: 'Ask to delay or cancel a hearing date',
  linkforsupport: '',
  linkfordelayorcancel: '#',
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

const cyContent: typeof enContent = {
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
  judgeName: 'Judge name - welsh',
  venue: 'Venue - welsh',
  address: 'Address - welsh',
  roomId: 'Room - welsh',
  nextHearing: 'Your next hearing - welsh',
  hearingDate: 'Hearing date - welsh',
  startTime: 'Start time - welsh',
  hearingDuration: 'Hearing duration - welsh',
  previousHearings: 'Previous hearings - welsh',
  supportDuringCaselinktext: 'Support you need during your case - welsh',
  delayorcancellinktext: 'Ask to delay or cancel a hearing date - welsh',
  linkforsupport: '',
  linkfordelayorcancel: '#',
  hearingOutcome: 'Hearing outcome - welsh',
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

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home yourhearings hearings content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Your court hearings');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain go back button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Close and return to case overview');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
