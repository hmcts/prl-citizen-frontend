import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../app/case/definition';
import * as URL from '../../urls';

import { respondent_en as sectionTitles } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_en as taskListItems } from './tasklist-items';

describe('generateRespondentTaskList', () => {
  test('generateRespondentTaskListForDACase', () => {
    const data = {
      userCase: { ...mockUserCase, legalRepresentation: YesOrNo.NO },
      userIdamId: '12345',
    };
    const expected = [
      {
        title: sectionTitles.aboutYou,
        items: [
          {
            id: 'keep-your-details-private',
            text: taskListItems.keep_your_details_private,
            status: 'TO_DO',
            href: URL.RESPONDENT_DETAILS_KNOWN + '/' + '1234',
          },
          {
            id: 'confirm-or-edit-your-contact-details',
            text: taskListItems.confirm_or_edit_your_contact_details,
            status: 'IN_PROGRESS',
            href: URL.RESPONDENT_CHECK_ANSWERS + '/' + '1234',
          },
          {
            id: 'support_you_need_during_your_case',
            text: taskListItems.support_you_need_during_your_case,
            status: 'TO_DO',
            href: URL.CA_DA_ATTENDING_THE_COURT,
          },
        ],
      },
      {
        title: sectionTitles.theApplication,
        items: [
          {
            id: 'check_the_application',
            text: taskListItems.check_the_application,
            status: 'NOT_AVAILABLE_YET',
            href: '#',
          },
        ],
      },
      {
        title: sectionTitles.yourcourtHearings,
        items: [
          {
            id: 'check_details_of_your_court_hearings',
            text: taskListItems.check_details_of_your_court_hearings,
            status: 'TO_DO',
            href: URL.INTERNATIONAL_FACTORS_START,
          },
        ],
      },
      {
        title: sectionTitles.yourDocuments,
        items: [
          {
            id: 'view-all-documents',
            text: taskListItems.view_all_documents,
            status: 'READY_TO_VIEW',
            href: URL.RESPONDENT_VIEW_ALL_DOCUMENTS,
          },
          {
            id: 'upload-document',
            text: taskListItems.upload_document,
            status: 'TO_DO',
            href: URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
          },
        ],
      },
      {
        title: sectionTitles.ordersFromTheCourt,
        items: [
          {
            id: 'view-all-orders-from-the-court',
            text: taskListItems.view_all_orders_from_the_court,
            status: 'NOT_AVAILABLE_YET',
            href: '#',
          },
        ],
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });

  test('generateRespondentTaskList1', () => {
    const data = {
      userCase: { ...mockUserCase, legalRepresentation: YesOrNo.NO, start: YesOrNo.YES },
      userIdamId: '12345',
    };

    const expected = [
      {
        title: sectionTitles.aboutYou,
        items: [
          {
            id: 'keep-your-details-private',
            text: taskListItems.keep_your_details_private,
            status: 'TO_DO',
            href: URL.RESPONDENT_DETAILS_KNOWN + '/' + '1234',
          },
          {
            id: 'confirm-or-edit-your-contact-details',
            text: taskListItems.confirm_or_edit_your_contact_details,
            status: 'IN_PROGRESS',
            href: URL.RESPONDENT_CHECK_ANSWERS + '/' + '1234',
          },
          {
            id: 'support_you_need_during_your_case',
            text: taskListItems.support_you_need_during_your_case,
            status: 'TO_DO',
            href: URL.CA_DA_ATTENDING_THE_COURT,
          },
        ],
      },
      {
        title: sectionTitles.theApplication,
        items: [
          {
            id: 'check_the_application',
            text: taskListItems.check_the_application,
            status: 'NOT_AVAILABLE_YET',
            href: '#',
          },
        ],
      },
      {
        title: sectionTitles.yourcourtHearings,
        items: [
          {
            id: 'check_details_of_your_court_hearings',
            text: taskListItems.check_details_of_your_court_hearings,
            status: 'IN_PROGRESS',
            href: URL.INTERNATIONAL_FACTORS_START,
          },
        ],
      },
      {
        title: sectionTitles.yourDocuments,
        items: [
          {
            id: 'view-all-documents',
            text: taskListItems.view_all_documents,
            status: 'READY_TO_VIEW',
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
          },
          {
            id: 'upload-document',
            text: taskListItems.upload_document,
            status: 'TO_DO',
            href: URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_URL,
          },
        ],
      },
      {
        title: sectionTitles.ordersFromTheCourt,
        items: [
          {
            id: 'view-all-orders-from-the-court',
            text: taskListItems.view_all_orders_from_the_court,
            status: 'NOT_AVAILABLE_YET',
            href: '#',
          },
        ],
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });

  test('generateRespondentTaskListForC100', () => {
    const data = {
      userCase: { ...mockUserCase, legalRepresentation: YesOrNo.NO, start: YesOrNo.YES, caseTypeOfApplication: 'C100' },
      userIdamId: '12345',
    };

    const expected = [
      {
        title: sectionTitles.aboutYou,
        items: [
          {
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keep-your-details-private',
            status: 'TO_DO',
            text: 'Keep your details private',
          },
          {
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'TO_DO',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/respondent/support-you-need-during-case/attending-the-court',
            id: 'support_you_need_during_your_case',
            status: 'TO_DO',
            text: 'Support you need during your case',
          },
        ],
      },
      {
        title: sectionTitles.theApplication,
        items: [
          {
            href: '#',
            id: 'check_the_application',
            status: 'NOT_AVAILABLE_YET',
            text: 'Check the application (PDF)',
          },
          {
            href: '#',
            id: 'check_allegations_of_harm_and_violence',
            status: 'NOT_AVAILABLE_YET',
            text: 'Check the allegations of harm and violence (PDF)',
          },
        ],
      },
      {
        title: sectionTitles.yourResponse,
        items: [
          {
            href: '/tasklistresponse/start',
            id: 'respond_to_application',
            status: 'IN_PROGRESS',
            text: 'Respond to the application',
          },
          {
            href: '/tasklistresponse/international-factors/start',
            id: 'respond_to_allegations_of_harm_and_violence',
            status: 'IN_PROGRESS',
            text: 'Respond to the allegations of harm and violence',
          },
        ],
      },
      {
        title: sectionTitles.yourcourtHearings,
        items: [
          {
            href: '/tasklistresponse/international-factors/start',
            id: 'check_details_of_your_court_hearings',
            status: 'IN_PROGRESS',
            text: 'Check details of your court hearings',
          },
        ],
      },
      {
        title: sectionTitles.yourDocuments,
        items: [
          {
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            id: 'view-all-documents',
            status: 'READY_TO_VIEW',
            text: 'View all documents',
          },
          {
            href: '/respondent/upload-document',
            id: 'upload-document',
            status: 'TO_DO',
            text: 'Upload Documents',
          },
        ],
      },
      {
        title: sectionTitles.ordersFromTheCourt,
        items: [
          {
            href: '#',
            id: 'view-all-orders-from-the-court',
            status: 'NOT_AVAILABLE_YET',
            text: 'View all orders from the court',
          },
        ],
      },
    ];
    expect(generateRespondentTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
});
