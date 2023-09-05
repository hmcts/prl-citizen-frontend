import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus, State } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { applicant_cy, applicant_en } from './section-titles';
import { applicant_tasklist_items_cy, applicant_tasklist_items_en } from './tasklist-items';

const enContent = {
  title: 'Applicant tasklist',
  caseNumber: 'Case number  ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.OPTIONAL]: 'Optional',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: '/applicant/add-legal-representative',
    },
    {
      label: 'Find my local court',
      link: '#',
    },
    {
      label: 'Find legal advice',
      link: '#',
    },
    {
      label: 'Know more about child arrangements',
      link: '#',
    },
    {
      label: 'Know more about attending court',
      link: '#',
    },
  ],
};
const cyContent = {
  title: 'Rhestr Tasgau’r Ceisydd',
  caseNumber: 'Rhif yr achos ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.OPTIONAL]: 'Optional-welsh',
  },
  sectionTitles: applicant_cy,
  taskListItems: applicant_tasklist_items_cy,
  iWantTo: 'Rwyf eisiau ...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: '/applicant/add-legal-representative',
    },
    {
      label: 'Dod o hyd i fy llys lleol',
      link: '#',
    },
    {
      label: 'Dod o hyd i gyngor cyfreithiol',
      link: '#',
    },
    {
      label: 'Gwybod mwy am drefniadau plant',
      link: '#',
    },
    {
      label: 'Gwybod mwy am fynychu’r llys',
      link: '#',
    },
  ],
};
describe('task-list > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
    additionalData: {
      req: {
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            respondentsFL401: {
              firstName: '',
              lastName: '',
            },
            applicantsFL401: {
              firstName: '',
              lastName: '',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
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
              href: '/applicant/keep-details-private/details_known/1234567',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers/1234567',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/applicant/support-you-need-during-case/attending-the-court',
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
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
            {
              href: '/application-within-proceedings/list-of-applications/1',
              id: 'request_court_about_your_case',
              status: 'OPTIONAL',
              text: 'Make a request to the court about your case',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
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
              status: SectionStatus.TO_DO,
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
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
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
      userCase: {
        ...mockUserCase,
        state: State.ALL_FINAL_ORDERS_ISSUED,
      },
      expected: [
        null,
        {
          title: 'Your application',
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (PDF)',
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
            {
              href: '/application-within-proceedings/list-of-applications/1',
              id: 'request_court_about_your_case',
              status: 'OPTIONAL',
              text: 'Make a request to the court about your case',
            },
          ],
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
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
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            null,
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct task list when the case is closed %#', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
