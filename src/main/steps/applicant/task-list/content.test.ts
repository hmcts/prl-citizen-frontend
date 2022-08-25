import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { applicant_en } from './section-titles';
import { applicant_tasklist_items_en } from './tasklist-items';

const enContent = {
  title: 'Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
};
const cyContent = {
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
};
describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/applicant/support-you-need-during-case/language-requirements',
              id: 'support-you-need-during-your-case',
              text: 'Support you need during your case',
              status: 'TO_DO',
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
              href: '/applicant/public/docs/witness-statement-Final-Document.pdf',
              id: 'your-application-witness-statment',
              status: 'DOWNLOAD',
              text: 'Witness statement (PDF)',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
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
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: applicant_tasklist_items_en.view_all_orders_from_the_court,
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: {
        ...mockUserCase,
        orderCollection: [],
      },
      expected: [
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'confirm-or-edit-your-contact-details',
              status: 'TO_DO',
              text: 'Confirm or edit your contact details',
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
              href: '/applicant/public/docs/witness-statement-Final-Document.pdf',
              id: 'your-application-witness-statment',
              status: 'DOWNLOAD',
              text: 'Witness statement (PDF)',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
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
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: applicant_tasklist_items_en.view_all_orders_from_the_court,
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'application-submitted',
              text: 'Application submitted (PDF)',
              status: 'TO_DO',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'witness-statement',
              text: 'Witness statement (PDF)',
              status: 'IN_PROGRESS',
            },
          ],
          title: 'Your application',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'check-details-of-your-court-hearings',
              text: 'Check details of your court hearings',
              status: 'TO_DO',
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'upload-document',
              text: 'Upload documents',
              status: 'TO_DO',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'view-all-documents',
              text: 'View all documents',
              status: 'IN_PROGRESS',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'orders',
              text: 'View all orders from the court',
              status: 'TO_DO',
            },
          ],
          title: 'Orders from the court',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
