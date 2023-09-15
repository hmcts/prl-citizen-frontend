import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus, State } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { respondent_cy, respondent_en } from './section-titles';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';
const enContent = {
  title: 'Respondent tasklist',
  respondentName: ' ',
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
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: '/respondent/add-legal-representative',
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
  title: 'Rhestr Tasgau’r Atebydd',
  respondentName: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.VIEW]: 'GWELD',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  iWantTo: 'Rwyf eisiau ...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: '/respondent/add-legal-representative',
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
    userCase: {
      ...mockUserCase,
      respondentsFL401: {
        firstName: '',
        lastName: '',
        response: { citizenFlags: { isAllDocumentsViewed: 'No' } },
      },
      orderCollection: [{}],
      state: '',
    },
    additionalData: {
      req: {
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            respondentsFL401: {
              firstName: '',
              lastName: '',
              response: { citizenFlags: { isAllDocumentsViewed: 'No' } },
            },
            orderCollection: [{}],
            state: '',
            applicantsFL401: {
              firstName: '',
              lastName: '',
            },
            caseTypeOfApplication: 'FL401',
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
              href: '/respondent/keep-details-private/details_known/' + mockUserCase.id,
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/respondent/confirm-contact-details/checkanswers/1234',
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
              href: '#',
              id: 'check_the_application',
              status: 'NOT_AVAILABLE_YET',
              openInAnotherTab: true,
              text: 'Check the application (PDF)',
            },
          ],
          title: 'The application',
        },
        {
          items: [
            {
              href: '#',
              disabled: true,
              id: 'check_details_of_your_court_hearings',
              status: 'NOT_AVAILABLE_YET',
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

  test('FL401 final order banner should be added correctly', () => {
    expect(
      generateContent({
        ...commonContent,
        userCase: { ...commonContent.userCase, state: State.ALL_FINAL_ORDERS_ISSUED },
      }).banners
    ).toStrictEqual([
      {
        bannerContent: [
          {
            line1: 'A new document has been added to your case.',
          },
        ],
        bannerHeading: 'You have a new document to view',
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            text: 'See all documents',
          },
        ],
      },
      {
        bannerContent: [
          {
            line1:
              'The court has made a final decision about your case. The order tells you what the court has decided. ',
          },
        ],
        bannerHeading: 'You have a final order',
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/orders',
            text: 'View the order (PDF)',
          },
        ],
      },
    ]);
  });

  test('FL401 da respondent banner should be added correctly', () => {
    const contentForBanners = {
      ...commonContent,
      userCase: {
        ...commonContent.userCase,
        orderWithoutGivingNoticeToRespondent: {
          orderWithoutGivingNotice: 'Yes',
        },
        orderCollection: undefined,
        respondentsFL401: {
          firstName: '',
          lastName: '',
        },
      },
    } as unknown as CommonContent;
    expect(generateContent(contentForBanners).banners).toStrictEqual([
      {
        bannerContent: [
          {
            line1:
              'This means that another person (the applicant) has applied to a court for protection from domestic abuse.',
            line2: 'The court has considered their concerns. The order tells you what the court has decided.',
          },
        ],
        bannerHeading:
          'You have been named as the respondent in a domestic abuse application and have an order from the court',
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/orders',
            text: 'Read the order (PDF)',
          },
          {
            href: '/applicant/yourdocuments/alldocuments/cadafinaldocumentrequest',
            text: 'Read the application (PDF)',
          },
        ],
      },
    ]);
  });

  describe('c100 tests', () => {
    const content = {
      language: 'en',
      userIdamId: '1234',
      userCase: {
        ...mockUserCase,
        caseTypeOfApplication: 'C100',
        orderCollection: [{}],
        state: '',
        respondents: [
          {
            id: '1234',
            value: {
              response: { citizenFlags: { isAllDocumentsViewed: 'No' } },
              firstName: '',
              lastName: '',
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        citizenResponseC7DocumentList: [
          {
            id: 'string',
            value: {
              partyName: 'string',
              createdBy: '1234',
              dateCreated: new Date(),
              citizenDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
            },
          },
        ],
      },
      additionalData: {
        req: {
          session: {
            user: { id: '1234' },
            userCase: {
              ...mockUserCase,
              caseTypeOfApplication: 'C100',
              orderCollection: [{}],
              state: '',
              respondents: [
                {
                  id: '1234',
                  value: {
                    response: { citizenFlags: {} },
                    firstName: '',
                    lastName: '',
                    partyId: '1234',
                    user: {
                      idamId: '1234',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    } as unknown as CommonContent;
    const generatedContent = generateContent(content);

    test('update stages for c7 docs should change stages correctly', () => {
      expect(generatedContent.stages).toContainEqual({
        active: false,
        ariaLabel: 'Response submitted stage',
        completed: true,
        title: 'Response<br/> submitted',
      });
    });

    test('should get correct c100 banners', () => {
      expect(generatedContent.banners).toStrictEqual([
        {
          bannerContent: [{ line1: 'A new document has been added to your case.' }],
          bannerHeading: 'You have a new document to view',
          bannerLinks: [{ href: '/respondent/yourdocuments/alldocuments/alldocuments', text: 'See all documents' }],
        },
        {
          bannerContent: [
            { line1: 'The court has made a decision about your case. The order tells you what the court has decided.' },
          ],
          bannerHeading: 'You have a new order from the court',
          bannerLinks: [{ href: '/respondent/yourdocuments/alldocuments/orders', text: 'View the order (PDF)' }],
        },
      ]);
    });

    test('should get correct c100 banners when state is ALL_FINAL_ORDERS_ISSUED', () => {
      expect(
        generateContent({ ...content, userCase: { ...content.userCase, state: State.ALL_FINAL_ORDERS_ISSUED } }).banners
      ).toStrictEqual([
        {
          bannerContent: [{ line1: 'A new document has been added to your case.' }],
          bannerHeading: 'You have a new document to view',
          bannerLinks: [{ href: '/respondent/yourdocuments/alldocuments/alldocuments', text: 'See all documents' }],
        },
        {
          bannerContent: [
            {
              line1:
                'The court has made a final decision about your case. The order tells you what the court has decided. ',
            },
          ],
          bannerHeading: 'You have a final order',
          bannerLinks: [{ href: '/respondent/yourdocuments/alldocuments/orders', text: 'View the order (PDF)' }],
        },
      ]);
    });
  });
});
