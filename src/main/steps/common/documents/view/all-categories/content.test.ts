import { CommonContent } from '../../../common.content';

import { generateContent } from './content';

describe('documents > view > all-documents > content', () => {
  test('generateContent should get correct document sections', () => {
    expect(
      generateContent({
        language: 'en',
        additionalData: {
          req: {
            session: {
              user: {
                id: '1234',
              },
              userCase: {
                id: '1234',
                respondentDocuments: [
                  {
                    partyId: 1234,
                    partyName: null,
                    partyType: 'respondent',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                  {
                    partyId: 2,
                    partyName: null,
                    partyType: 'applicant',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user2',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                ],
                applicantDocuments: [
                  {
                    partyId: 1234,
                    partyName: null,
                    partyType: 'respondent',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                  {
                    partyId: 2,
                    partyName: null,
                    partyType: 'applicant',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user2',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                ],
                citizenOtherDocuments: [
                  {
                    partyId: 1234,
                    partyName: null,
                    partyType: 'respondent',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                  {
                    partyId: 2,
                    partyName: null,
                    partyType: 'applicant',
                    categoryId: 'positionStatements',
                    uploadedBy: 'test user2',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    document: null,
                    documentWelsh: null,
                  },
                ],
                citizenOrders: [
                  {
                    partyId: '1234',
                    partyType: 'applicant',
                    categoryId: 'policeReport',
                    uploadedBy: 'test user',
                    madeDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: '01/01/2024',
                    document: {
                      document_url: 'MOCK_DOCUMENT_URL',
                      document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                      document_filename: 'MOCK_FILENAME',
                      document_hash: null,
                      category_id: 'policeReport',
                      document_creation_date: '01/01/2024',
                    },
                    documentWelsh: null,
                  },
                ],
                citizenApplicationPacks: [
                  {
                    servedParty: 'applicant',
                    partyId: 1234,
                    partyName: null,
                    partyType: 'applicant',
                    categoryId: 'undefined',
                    uploadedBy: 'test user',
                    uploadedDate: '2024-03-11T16:24:33.122506',
                    reviewedDate: null,
                    applicantSoaPack: [
                      {
                        document_url: 'MOCK_DOCUMENT_URL',
                        document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                        document_filename: 'MOCK_FILENAME',
                        document_hash: null,
                        category_id: 'positionStatements',
                        document_creation_date: '01/01/2024',
                      },
                    ],
                    documentWelsh: null,
                  },
                ],
                hearingCollection: [
                  {
                    hearingID: 2000006135,
                    hearingRequestDateTime: '2023-07-11T16:07:21.253071',
                    hearingType: 'ABA5-FOF',
                    hmcStatus: 'LISTED',
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
                            partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                            hearingSubChannel: 'VID',
                          },
                        ],
                      },
                    ],
                    hearingGroupRequestId: null,
                    hearingIsLinkedFlag: false,
                    hearingTypeValue: 'Finding of Fact',
                    nextHearingDate: '2023-08-02T09:00:00',
                    urgentFlag: false,
                  },
                ],
              },
            },
          },
        },
      } as unknown as CommonContent).sections
    ).toStrictEqual([
      {
        id: 'applicationPacks',
        items: [
          {
            link: {
              text: 'Your served application pack',
              url: '/applicant/documents/view/application-pack-documents',
              serveDate: '11 Mar 2024',
            },
          },
        ],
        title: 'Application packs',
      },
      {
        id: 'ordersFromTheCourt',
        items: [
          {
            link: {
              text: 'Orders from the court',
              url: '/applicant/documents/view/orders-from-the-court',
              serveDate: '11 Mar 2024',
            },
          },
        ],
        title: 'Orders from the court',
      },
      {
        id: 'applicantsDocuments',
        items: [
          {
            link: {
              text: "Applicant's documents",
              //url: '/applicant/documents/view/applicant-document',
              url: '/applicant/documents/view/applicant/doc',
              serveDate: '11 Mar 2024',
            },
          },
        ],
        title: "Applicant's documents",
      },
      {
        id: 'respondentsDocuments',
        items: [
          {
            link: {
              text: "Respondent's documents",
              //url: '/applicant/documents/view/respondent-document',
              url: '/applicant/documents/view/respondent/doc',
              serveDate: '11 Mar 2024',
            },
          },
        ],
        title: "Respondent's documents",
      },
      {
        id: 'attendingTheHearing',
        items: [
          {
            link: {
              serveDate: '11 Jul 2023',
              text: 'Hearing details',
              url: '/applicant/hearings/1234',
            },
          },
        ],
        title: 'Hearing details',
      },
      {
        id: 'otherDocuments',
        items: [
          {
            link: {
              serveDate: '11 Mar 2024',
              text: 'Other documents',
              url: '/applicant/documents/view/other/doc',
            },
          },
        ],
        title: 'Other documents',
      },
    ]);
  });
});
