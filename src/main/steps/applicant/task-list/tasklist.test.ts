import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../app/case/definition';

import { applicant_en as sectionTitles } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en as taskListItems } from './tasklist-items';

describe('applicant tasklist getRemainingTaskList', () => {
  test('applicant tasklist Consent to application', () => {
    const consent = {
      consentToTheApplication: YesOrNo.YES,
      applicationReceivedDate: '01-01-2022',
      permissionFromCourt: 'string',
    };

    const data = {
      userCase: {
        ...mockUserCase,
        hearingCollection: [
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
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'INTER',
                  },
                  {
                    partyID: 'a2b211f4-6072-4970-9c34-08a47ff6ec9c',
                    hearingSubChannel: 'TELOTHER',
                  },
                  {
                    partyID: '0d730a9e-74bf-468c-ac27-2f6cc9c9acef',
                    hearingSubChannel: 'VIDTEAMS',
                  },
                  {
                    partyID: 'c90440e6-22a4-4625-baa7-76a6fcb8309b',
                    hearingSubChannel: null,
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-07-12T09:00:00',
            urgentFlag: true,
          },
        ],
        legalRepresentation: YesOrNo.NO,
        applicants: [
          {
            id: '',
            value: {
              response: { consent },
            },
          },
        ],
      },
      userIdamId: '12345',
    };
    const isRepresentedBySolicotor = false;
    const expected = [
      {
        items: [
          {
            href: '/applicant/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/contact-preferences/fetch/1234',
            id: 'contact-preference',
            status: 'TO_DO',
            text: 'Contact preferences',
          },
          {
            href: '/applicant/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'IN_PROGRESS',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/applicant/support-you-need-during-case/attending-the-court',
            id: 'support-you-need-during-your-case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
        title: 'About you',
      },

      {
        items: [
          {
            href: '/applicant/public/docs/FL401-Final-Document.pdf',
            id: 'your-application',
            openInAnotherTab: true,
            status: 'DOWNLOAD',
            text: 'Application submitted (PDF)',
          },
          {
            href: '/applicant/witnessstatements',
            id: 'your-application-witness-statment',
            status: 'NOT_AVAILABLE_YET',
            text: 'Witness statement (PDF)',
          },
        ],
        title: 'Your application',
      },
      {
        items: [
          {
            href: '/applicant/yourhearings/hearings/1234',
            id: 'check-details-of-your-court-hearings',
            status: 'READY_TO_VIEW',
            text: 'Check details of your court hearings',
            disabled: false,
          },
        ],
        title: 'Your court hearings',
      },
      {
        items: [
          {
            href: '/applicant/upload-document',
            id: 'upload-document',
            status: 'TO_DO',
            text: 'Upload documents',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'view-all-documents',
            status: 'READY_TO_VIEW',
            text: 'View all documents',
          },
        ],
        title: 'Your documents',
      },
      {
        items: [
          {
            href: '#',
            id: 'view-all-orders-from-the-court',
            status: 'NOT_AVAILABLE_YET',
            text: 'View all orders from the court',
          },
        ],
        title: 'Orders from the court',
      },
    ];
    expect(
      generateApplicantTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId, isRepresentedBySolicotor)
    ).toEqual(expected);
  });

  test('applicant tasklist legalRepresentation yes C100 case', () => {
    const consent = {
      consentToTheApplication: YesOrNo.NO,
      applicationReceivedDate: '01-01-2022',
      permissionFromCourt: 'string',
    };

    const data = {
      userCase: {
        ...mockUserCase,
        caseTypeOfApplication: 'C100',
        legalRepresentation: YesOrNo.YES,
        applicants: [
          {
            id: '',
            value: {
              response: { consent },
            },
          },
        ],
      },
      userIdamId: '12345',
    };
    const isRepresentedBySolicotor = false;
    const expected = [
      {
        items: [
          {
            href: '/applicant/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/contact-preferences/fetch/1234',
            id: 'contact-preference',
            status: 'TO_DO',
            text: 'Contact preferences',
          },
          {
            href: '/applicant/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'TO_DO',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/applicant/support-you-need-during-case/attending-the-court',
            id: 'support-you-need-during-your-case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
        title: 'About you',
      },
      {
        items: [
          {
            href: '/applicant/public/docs/FL401-Final-Document.pdf',
            id: 'your_application_ca',
            status: 'DOWNLOAD',
            text: 'Your application (PDF)',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
            id: 'your_allegations_of_harm',
            status: 'DOWNLOAD',
            text: 'View allegations of harm and violence (PDF)',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
            id: 'respond_to_other_side_aoh_violence',
            status: 'DOWNLOAD',
            text: "Respond to the other side's allegations of harm and violence",
          },
        ],
        title: 'Your application',
      },
      {
        items: [
          {
            href: '/applicant/upload-document',
            id: 'response_to_your_application',
            status: 'TO_DO',
            text: 'The response to your application (PDF)',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'check_other_side_aoh_and_violence',
            status: 'READY_TO_VIEW',
            text: "Check the other side's allegations of harm and violence",
          },
        ],
        title: 'response',
      },
      {
        items: [
          {
            href: '#',
            id: 'check-details-of-your-court-hearings',
            status: 'NOT_AVAILABLE_YET',
            text: 'Check details of your court hearings',
            disabled: true,
          },
        ],
        title: 'Your court hearings',
      },
      {
        items: [
          {
            href: '/applicant/upload-document',
            id: 'upload-document',
            status: 'TO_DO',
            text: 'Upload documents',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'view-all-documents',
            status: 'READY_TO_VIEW',
            text: 'View all documents',
          },
        ],
        title: 'Your documents',
      },
      {
        items: [
          {
            href: '#',
            id: 'view-all-orders-from-the-court',
            status: 'NOT_AVAILABLE_YET',
            text: 'View all orders from the court',
          },
        ],
        title: 'Orders from the court',
      },
    ];
    expect(
      generateApplicantTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId, isRepresentedBySolicotor)
    ).toEqual(expected);
  });

  test('generateApplicentTaskListWhenRespresentedBySolicitor', () => {
    const data = {
      userCase: { ...mockUserCase, legalRepresentation: YesOrNo.NO, start: YesOrNo.YES },
      userIdamId: '12345',
    };
    const isRepresentedBySolicotor = true;
    const expected = [
      null,
      {
        items: [
          {
            href: '/applicant/public/docs/FL401-Final-Document.pdf',
            id: 'your-application',
            openInAnotherTab: true,
            status: 'DOWNLOAD',
            text: 'Application submitted (PDF)',
          },
          {
            href: '/applicant/witnessstatements',
            id: 'your-application-witness-statment',
            status: 'NOT_AVAILABLE_YET',
            text: 'Witness statement (PDF)',
          },
        ],
        title: 'Your application',
      },
      {
        items: [
          {
            href: '#',
            id: 'check-details-of-your-court-hearings',
            status: 'NOT_AVAILABLE_YET',
            text: 'Check details of your court hearings',
            disabled: true,
          },
        ],
        title: 'Your court hearings',
      },
      {
        items: [
          null,
          {
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'view-all-documents',
            status: 'READY_TO_VIEW',
            text: 'View all documents',
          },
        ],
        title: 'Your documents',
      },
      {
        items: [
          {
            href: '#',
            id: 'view-all-orders-from-the-court',
            status: 'NOT_AVAILABLE_YET',
            text: 'View all orders from the court',
          },
        ],
        title: 'Orders from the court',
      },
    ];
    expect(
      generateApplicantTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId, isRepresentedBySolicotor)
    ).toEqual(expected);
  });
});
