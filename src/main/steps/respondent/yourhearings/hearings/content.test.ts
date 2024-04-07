import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyType } from '../../../../app/case/definition';
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
  nextHearingHeading: 'Your next hearing',
  hearingDate: 'Hearing date',
  startTime: 'Start time',
  hearingDuration: 'Hearing duration',
  previousHearings: 'Previous hearings',
  supportDuringCaselinktext: 'Support you need during your hearing',
  delayorcancellinktext: 'Ask to delay or cancel a hearing date',
  linkforsupport: '/respondent/hearing-needs/support-help',
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
  linkforsupport: '/respondent/hearing-needs/support-help',
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
        originalUrl: PartyType.RESPONDENT,
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
            hearingCollection: [
              {
                hearingID: 2000006135,
                hearingRequestDateTime: '2023-07-11T16:07:21.253071',
                hearingType: 'ABA5-FOF',
                hmcStatus: 'COMPLETED',
                lastResponseReceivedDateTime: '2023-07-11T16:41:37',
                requestVersion: 1,
                hearingListingStatus: 'FIXED',
                listAssistCaseStatus: 'LISTED',
                hearingDaySchedule: [
                  {
                    hearingStartDateTime: '2023-08-03T09:00:00',
                    hearingEndDateTime: '2023-08-03T12:00:00',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                        hearingSubChannel: 'VID',
                      },
                      {
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                        hearingSubChannel: 'INTER',
                      },
                    ],
                  },
                  {
                    hearingStartDateTime: '2023-08-02T09:00:00',
                    hearingEndDateTime: '2023-08-02T15:00:00',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                        hearingSubChannel: 'VID',
                      },
                      {
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                        hearingSubChannel: 'INTER',
                      },
                    ],
                  },
                ],
                hearingGroupRequestId: null,
                hearingIsLinkedFlag: false,
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: '',
                urgentFlag: false,
              },
              {
                hearingID: 2000006134,
                hearingRequestDateTime: '2023-07-11T16:05:38.761289',
                hearingType: 'ABA5-FOF',
                hmcStatus: 'LISTED',
                lastResponseReceivedDateTime: '2023-07-11T16:20:38',
                requestVersion: 1,
                hearingListingStatus: 'FIXED',
                listAssistCaseStatus: 'LISTED',
                hearingDaySchedule: [
                  {
                    hearingStartDateTime: '2023-07-12T09:00:00',
                    hearingEndDateTime: '2023-07-12T10:00:01',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                        hearingSubChannel: 'TELOTH',
                      },
                      {
                        partyID: '234',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                  {
                    hearingStartDateTime: '2023-08-12T09:00:00',
                    hearingEndDateTime: '2023-08-12T09:00:05',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                        hearingSubChannel: 'VIDO',
                      },
                      {
                        partyID: '234',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                  {
                    hearingStartDateTime: '2023-09-12T09:00:00',
                    hearingEndDateTime: '2023-09-12T09:02:00',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                        hearingSubChannel: 'TELOTHE',
                      },
                      {
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                ],
                hearingGroupRequestId: null,
                hearingIsLinkedFlag: false,
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: new Date().setDate(new Date().getDate() + 1),
                urgentFlag: true,
              },
              {
                hearingID: 2000006134,
                hearingRequestDateTime: '2023-07-11T16:05:38.761289',
                hearingType: 'ABA5-FOF',
                hmcStatus: 'LISTED',
                lastResponseReceivedDateTime: '2023-07-11T16:20:38',
                requestVersion: 1,
                hearingListingStatus: 'FIXED',
                listAssistCaseStatus: 'LISTED',
                hearingDaySchedule: [
                  {
                    hearingStartDateTime: '2023-07-12T09:00:00',
                    hearingEndDateTime: '2023-07-12T10:00:00',
                    listAssistSessionId: null,
                    hearingVenueId: '234946',
                    hearingVenueName: 'Swansea Civil And Family Justice Centre',
                    hearingVenueLocationCode: '344',
                    hearingVenueAddress: 'Quay West, Quay Parade',
                    hearingRoomId: 'Courtroom 01',
                    hearingJudgeId: '',
                    hearingJudgeName: null,
                    panelMemberIds: [],
                    attendees: [
                      {
                        partyID: '123',
                      },
                      {
                        partyID: '234',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                ],
                hearingGroupRequestId: null,
                hearingIsLinkedFlag: false,
                hearingTypeValue: 'Finding of Fact',
                nextHearingDate: new Date().setDate(new Date().getDate() + 2),
                urgentFlag: true,
              },
            ],
          },
        },
      },
    },
  } as unknown as CommonContent;
  commonContent.additionalData!.req.session.userCase.orderCollection = [
    {
      id: '123',
      value: {
        selectedHearingType: '1 hearing',
        dateCreated: '2/2/2020',
        orderType: '',
        orderDocument: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: 'finalDocument.pdf',
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
        orderDocumentWelsh: {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
          document_filename: 'finalDocument_cy.pdf',
          document_binary_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
        },
        otherDetails: {
          createdBy: '',
          orderCreatedDate: '1/1/2020',
          orderMadeDate: '',
          orderRecipients: '',
        },
        orderTypeId: 'blankOrderOrDirectionsWithdraw',
        isWithdrawnRequestApproved: 'No',
        withdrawnRequestType: 'Withdrawn application',
      },
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

  test('orders should be added to hearing orders', () => {
    expect(generatedContent.hearingOrders).toStrictEqual([
      {
        href: '/respondent/yourdocuments/alldocuments/orders/c9f56483-6e2d-43ce-9de8-72661755b87c',
        createdDate: '1/1/2020',
        fileName: 'finalDocument.pdf',
        id: 1,
      },
    ]);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
