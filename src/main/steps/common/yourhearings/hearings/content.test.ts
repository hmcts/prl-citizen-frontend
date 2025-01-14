import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
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

const cyContent: typeof enContent = {
  section: 'Eich gwrandawiadau llys',
  title: 'Eich Gwrandawiadau',
  goBack: 'Cau a dychwelyd i drosolwg o’r achos ',
  caseNumber: 'Rhif yr achos',
  yourPreviousHearings: 'Eich gwrandawiadau blaenorol',
  yourFutureHearings: 'Eich gwrandawiadau yn y dyfodol',
  upcomingHearing: 'Gwrandawiad sydd ar ddod',
  dates: 'Dyddiadau',
  hearingLength: 'Hyd y gwrandawiad',
  hearingMethod: 'Math o wrandawiad',
  day: 'Diwrnod',
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
                    hearingEndDateTime: '2023-07-12T15:00:00',
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
                        hearingSubChannel: 'INTER',
                      },
                      {
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                  {
                    hearingStartDateTime: '2023-08-12T09:00:00',
                    hearingEndDateTime: '2023-08-12T15:00:00',
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
                        hearingSubChannel: 'INTER',
                      },
                      {
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                        hearingSubChannel: 'TELOTHER',
                      },
                    ],
                  },
                  {
                    hearingStartDateTime: '2023-09-12T09:00:00',
                    hearingEndDateTime: '2023-09-12T15:00:00',
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
                        hearingSubChannel: 'INTER',
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
                    hearingStartDateTime: '2023-07-12T19:00:00',
                    hearingEndDateTime: '2023-07-12T21:01:01',
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
                        partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
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
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
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
  test('should contain  field', () => {
    const caseNumberField = fields.caseNumber as FormOptions;
    expect(caseNumberField.type).toBe('hidden');
    expect((caseNumberField.label as Function)(generatedContent)).toBe(enContent.caseNumber + undefined);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
