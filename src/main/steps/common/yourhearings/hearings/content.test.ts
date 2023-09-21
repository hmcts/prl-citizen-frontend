import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent, getHearingMethod, getProperTime } from './content';

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
  nextHearingHeading: 'Your next hearing',
  hearingDate: 'Hearing date',
  startTime: 'Start time',
  hearingDuration: 'Hearing duration',
  previousHearings: 'Previous hearings',
  supportDuringCaselinktext: 'Support you need during your hearing',
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
  nextHearingHeading: 'Your next hearing - welsh',
  hearingDate: 'Hearing date - welsh',
  startTime: 'Start time - welsh',
  hearingDuration: 'Hearing duration - welsh',
  previousHearings: 'Previous hearings - welsh',
  supportDuringCaselinktext: 'Support you need during your hearing - welsh',
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
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          user: {
            id: '123',
          },
          userCase: {
            caseTypeOfApplication: 'C100',
            caseInvites: [
              {
                id: 'string',
                value: {
                  partyId: '123',
                  caseInviteEmail: 'string',
                  accessCode: 'string',
                  invitedUserId: '123',
                  expiryDate: 'string',
                  isApplicant: 'Yes',
                },
              },
            ],
            applicants: [
              {
                id: '123',
                value: {
                  user: {
                    idamId: '123',
                  },
                },
              },
            ],
            hearingCollection: [],
          },
        },
      },
    },
  } as unknown as CommonContent;
  commonContent.additionalData!.req.session.userCase.hearingCollection = [
    {
      hearingID: 2000006634,
      hearingRequestDateTime: '2023-09-12T09:55:00.283658',
      hearingType: 'ABA5-DRA',
      hmcStatus: 'AWAITING_ACTUALS',
      lastResponseReceivedDateTime: '2023-09-12T10:02:03',
      requestVersion: 1,
      hearingListingStatus: 'FIXED',
      listAssistCaseStatus: 'LISTED',
      hearingDaySchedule: [
        {
          hearingStartDateTime: '2023-09-15T09:00:00',
          hearingEndDateTime: '2023-09-16T10:00:00',
          listAssistSessionId: null,
          hearingVenueId: '234946',
          hearingVenueName: 'Swansea Civil And Family Justice Centre',
          hearingVenueLocationCode: '344',
          hearingVenueAddress: 'Quay West, Quay Parade',
          hearingRoomId: 'Courtroom 01',
          hearingJudgeId: null,
          hearingJudgeName: null,
          panelMemberIds: null,
          attendees: [
            { partyID: '123', hearingSubChannel: 'TEL' },
            { partyID: 'a7caf318-82e7-46c8-975a-b34b49c5376c', hearingSubChannel: 'TEL' },
            { partyID: '57a6bac4-f78d-475f-b9ac-98d63dee8de5', hearingSubChannel: 'TEL' },
            { partyID: 'fa9051fe-e2bd-47f6-a7fc-fc592ddd7af0', hearingSubChannel: 'TEL' },
          ],
        },
      ],
      hearingGroupRequestId: null,
      hearingIsLinkedFlag: false,
      hearingTypeValue: 'Dispute Resolution Appointment',
      nextHearingDate: '2023-09-29',
      urgentFlag: false,
    },
    {
      hearingID: 2000006289,
      hearingRequestDateTime: '2023-07-31T14:40:20.877578',
      hearingType: 'ABA5-FOF',
      hmcStatus: 'AWAITING_ACTUALS',
      lastResponseReceivedDateTime: '2023-08-01T09:10:49',
      requestVersion: 1,
      hearingListingStatus: 'FIXED',
      listAssistCaseStatus: 'LISTED',
      hearingDaySchedule: [
        {
          hearingStartDateTime: '2023-08-09T09:00:00',
          hearingEndDateTime: '2023-08-09T10:00:00',
          listAssistSessionId: null,
          hearingVenueId: '234946',
          hearingVenueName: null,
          hearingVenueLocationCode: null,
          hearingVenueAddress: null,
          hearingRoomId: 'Courtroom 05',
          hearingJudgeId: null,
          hearingJudgeName: null,
          panelMemberIds: null,
          attendees: [
            { partyID: '123', hearingSubChannel: 'VID' },
            { partyID: 'a7caf318-82e7-46c8-975a-b34b49c5376c', hearingSubChannel: 'VID' },
            { partyID: '57a6bac4-f78d-475f-b9ac-98d63dee8de5', hearingSubChannel: 'VID' },
            { partyID: 'fa9051fe-e2bd-47f6-a7fc-fc592ddd7af0', hearingSubChannel: 'VID' },
          ],
        },
        {
          hearingStartDateTime: '2023-08-08T09:00:00',
          hearingEndDateTime: '2023-08-08T15:00:00',
          listAssistSessionId: null,
          hearingVenueId: '234946',
          hearingVenueName: null,
          hearingVenueLocationCode: null,
          hearingVenueAddress: null,
          hearingRoomId: 'Courtroom 05',
          hearingJudgeId: null,
          hearingJudgeName: null,
          panelMemberIds: null,
          attendees: [
            { partyID: '123', hearingSubChannel: 'VID' },
            { partyID: 'a7caf318-82e7-46c8-975a-b34b49c5376c', hearingSubChannel: 'VID' },
            { partyID: '57a6bac4-f78d-475f-b9ac-98d63dee8de5', hearingSubChannel: 'VID' },
            { partyID: 'fa9051fe-e2bd-47f6-a7fc-fc592ddd7af0', hearingSubChannel: 'VID' },
          ],
        },
      ],
      hearingGroupRequestId: null,
      hearingIsLinkedFlag: false,
      hearingTypeValue: 'Finding of Fact',
      nextHearingDate: '2023-09-29',
      urgentFlag: false,
    },
    {
      hearingID: 2000006288,
      hearingRequestDateTime: '2023-07-31T14:38:52.403673',
      hearingType: 'ABA5-FOF',
      hmcStatus: 'COMPLETED',
      lastResponseReceivedDateTime: '2023-08-01T09:13:46',
      requestVersion: 1,
      hearingListingStatus: 'FIXED',
      listAssistCaseStatus: 'LISTED',
      hearingDaySchedule: [
        {
          hearingStartDateTime: '2023-08-03T09:00:00',
          hearingEndDateTime: '2023-08-03T10:00:00',
          listAssistSessionId: null,
          hearingVenueId: '234946',
          hearingVenueName: null,
          hearingVenueLocationCode: null,
          hearingVenueAddress: null,
          hearingRoomId: 'Courtroom 09',
          hearingJudgeId: null,
          hearingJudgeName: null,
          panelMemberIds: null,
          attendees: [
            { partyID: '123', hearingSubChannel: 'INTER' },
            { partyID: 'a7caf318-82e7-46c8-975a-b34b49c5376c', hearingSubChannel: 'INTER' },
            { partyID: '57a6bac4-f78d-475f-b9ac-98d63dee8de5', hearingSubChannel: 'INTER' },
            { partyID: 'fa9051fe-e2bd-47f6-a7fc-fc592ddd7af0', hearingSubChannel: 'INTER' },
          ],
        },
        {
          hearingStartDateTime: '2023-08-02T09:00:00',
          hearingEndDateTime: '2023-08-02T15:00:00',
          listAssistSessionId: null,
          hearingVenueId: '234946',
          hearingVenueName: null,
          hearingVenueLocationCode: null,
          hearingVenueAddress: null,
          hearingRoomId: 'Courtroom 09',
          hearingJudgeId: null,
          hearingJudgeName: null,
          panelMemberIds: null,
          attendees: [
            { partyID: '123', hearingSubChannel: 'INTER' },
            { partyID: 'a7caf318-82e7-46c8-975a-b34b49c5376c', hearingSubChannel: 'INTER' },
            { partyID: '57a6bac4-f78d-475f-b9ac-98d63dee8de5', hearingSubChannel: 'INTER' },
            { partyID: 'fa9051fe-e2bd-47f6-a7fc-fc592ddd7af0', hearingSubChannel: 'INTER' },
          ],
        },
      ],
      hearingGroupRequestId: null,
      hearingIsLinkedFlag: false,
      hearingTypeValue: 'Finding of Fact',
      nextHearingDate: '2023-09-29',
      urgentFlag: false,
    },
  ];
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

  test('getHearingMethod for c100 respondent', () => {
    const attendees = [{ partyID: '123', hearingSubChannel: 'VID' }];
    const req = commonContent.additionalData?.req;
    req.session.userCase = {
      ...req.session.userCase,
      respondents: [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
          },
        },
      ],
    };
    expect(getHearingMethod(req, attendees)).toBe('VID');
  });

  test('getHearingMethod for FL401 applicant', () => {
    const attendees = [{ partyID: '123', hearingSubChannel: 'VID' }];
    const req = commonContent.additionalData?.req;
    req.session.userCase = {
      ...req.session.userCase,
      caseTypeOfApplication: 'FL401',
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '123',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '123',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      applicantsFL401: {
        id: '123',
        partyId: '123',
        user: {
          idamId: '123',
        },
      },
    };
    expect(getHearingMethod(req, attendees)).toBe('VID');
  });

  test('getHearingMethod for FL401 respondent', () => {
    const attendees = [{ partyID: '123', hearingSubChannel: 'VID' }];
    const req = commonContent.additionalData?.req;
    req.session.userCase = {
      ...req.session.userCase,
      caseTypeOfApplication: 'FL401',
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '123',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '123',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      respondentsFL401: {
        id: '123',
        partyId: '123',
        user: {
          idamId: '123',
        },
      },
    };
    expect(getHearingMethod(req, attendees)).toBe('VID');
  });

  test('getProperTime should convert 24 hour time to 12 hour', () => {
    expect(getProperTime(new Date('December 17, 1995 22:24:00'))).toBe('10:24');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
