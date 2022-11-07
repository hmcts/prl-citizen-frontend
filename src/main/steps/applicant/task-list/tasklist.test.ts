import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../app/case/definition';

import { applicant_en as sectionTitles } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en as taskListItems } from './tasklist-items';

describe('getRemainingTaskList', () => {
  test('Consent to application', () => {
    const consent = {
      consentToTheApplication: YesOrNo.YES,
      applicationReceivedDate: '01-01-2022',
      permissionFromCourt: 'string',
    };

    const data = {
      userCase: {
        ...mockUserCase,
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
            href: '/applicant/confirm-contact-details/checkanswers/1234',
            id: 'confirm-or-edit-your-contact-details',
            status: 'IN_PROGRESS',
            text: 'Confirm or edit your contact details',
          },
          {
            href: '/applicant/support-you-need-during-case/language-requirements',
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
            status: 'DOWNLOAD',
            text: 'Application submitted (PDF)',
          },
          {
            href: '/applicant/witnessstatements',
            id: 'your-application-witness-statment',
            status: 'DOWNLOAD',
            text: 'Witness statement (PDF)',
          },
        ],
        title: 'Your application',
      },
      {
        items: [
          {
            href: '/applicant/keep-details-private/details_known',
            id: 'check-details-of-your-court-hearings',
            status: 'TO_DO',
            text: 'Check details of your court hearings',
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
    expect(generateApplicantTaskList(sectionTitles, taskListItems, data.userCase, data.userIdamId)).toEqual(expected);
  });
});
