import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { respondent_en } from './section-titles';
import { respondent_tasklist_items_en } from './tasklist-items';
const enContent = {
  title: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.VIEW]: 'VIEW',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
};
const cyContent = {
  title: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view (in Welsh)',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet  (in Welsh)',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD (in Welsh)',
    [SectionStatus.VIEW]: 'VIEW (in Welsh)',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
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
  test.skip.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              href: '/respondent/keep-details-private/details_known',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/respondent/confirm-contact-details/checkanswers',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/respondent/support-you-need-during-case/attending-the-court',
              id: 'support_you_need_during_your_case',
              status: 'TO_DO',
              text: 'Support you need during your case',
            },
          ],
          title: 'About you',
        },
        {
          items: [
            {
              href: '/tasklistresponse/miam/miam-start',
              id: 'check_the_application',
              status: 'IN_PROGRESS',
              text: 'Check the application (PDF)',
            },
          ],
          title: 'The application',
        },
        {
          items: [
            {
              href: '/tasklistresponse/international-factors/start',
              id: 'check_details_of_your_court_hearings',
              status: 'TO_DO',
              text: 'Check details of your court hearings',
            },
          ],
          title: 'Your court hearings',
        },
        {
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
              status: SectionStatus.TO_DO,
              text: 'Upload Documents',
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
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
