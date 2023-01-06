import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';
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
      userCase: {
        ...mockUserCase,
        respondents: [
          {
            id: '123',
            value: {
              user: {
                idamId: '',
              },
              response: {
                legalRepresentation: 'No',
              },
            },
          },
        ] as Respondent[],
        legalRepresentation: YesOrNo.NO,
      },
      expected: [
        {
          title: '1. Legal representation',
          items: [
            {
              id: 'do_you_have_legal_representation',
              text: 'Do you have a legal representative?',
              status: 'COMPLETED',
              href: '/tasklistresponse/legalrepresentation/start',
            },
          ],
        },
        {
          title: '2. Consent to the application',
          items: [
            {
              id: 'consent-to-the-application',
              text: 'Do you consent to the application?',
              status: 'TO_DO',
              href: '/tasklistresponse/consent-to-application/consent/1234567',
            },
          ],
        },
        {
          items: [
            {
              href: '/respondent/keep-details-private/details_known/1234567',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/respondent/confirm-contact-details/checkanswers/1234567',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '#',
              id: 'support_you_need_during_your_case',
              status: 'NOT_AVAILABLE_YET',
              text: 'Support you need during your case',
            },
          ],
          title: '3. Your details',
        },
        {
          items: [
            {
              href: '/tasklistresponse/miam/miam-start/1234567',
              id: 'medation-miam',
              status: 'TO_DO',
              text: 'Mediation(MIAM)',
            },
            {
              href: '#',
              id: 'current-or-previous-proceedings',
              status: 'NOT_AVAILABLE_YET',
              text: 'Current or previous proceedings',
            },
          ],
          title: '4. Application details',
        },
        {
          items: [
            {
              id: 'allegations_of_harm_and_violence',
              text: 'Allegations of harm and violence',
              status: 'NOT_AVAILABLE_YET',
              href: '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page',
            },
          ],
          title: '5. Safety concerns',
        },
        {
          items: [
            {
              href: '/tasklistresponse/international-factors/start/1234567',
              id: 'international-factors',
              status: 'TO_DO',
              text: 'International element',
            },
          ],
          title: '6. Additional information',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          title: '1. Legal representation',
          items: [
            {
              id: 'do_you_have_legal_representation',
              text: 'Do you have a legal representative?',
              status: 'TO_DO',
              href: '/tasklistresponse/legalrepresentation/start',
            },
          ],
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
