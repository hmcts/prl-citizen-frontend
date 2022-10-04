import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { respondent_en } from './section-titles';
import { respondent_tasklist_items_en } from './tasklist-items';
const enContent = {
  title: 'Respond to the application',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
};
const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view (in Welsh)',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet  (in Welsh)',
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
  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          title: 'Consent to the application',
          items: [
            {
              id: 'consent-to-the-application',
              text: 'Do you consent to the application?',
              status: 'IN_PROGRESS',
              href: '/tasklistresponse/consent-to-application/consent',
            },
          ],
        },
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
          title: 'Your details',
        },
        {
          items: [
            {
              href: '/tasklistresponse/miam/miam-start',
              id: 'medation-miam',
              status: 'IN_PROGRESS',
              text: 'Mediation(MIAM)',
            },
            {
              href: '/tasklistresponse/proceedings/start',
              id: 'current-or-previous-proceedings',
              status: 'TO_DO',
              text: 'Current or previous proceedings',
            },
          ],
          title: 'Application details',
        },
        {
          items: [
            {
              href: '/tasklistresponse/safety_concerns/main_page',
              id: 'your-safety',
              status: 'TO_DO',
              text: 'Your safety',
            },
          ],
          title: 'Safety concerns',
        },
        {
          items: [
            {
              href: '/tasklistresponse/international-factors/start',
              id: 'international-factors',
              status: 'TO_DO',
              text: 'International element',
            },
          ],
          title: 'Additional information',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
