import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus, State } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { respondent_cy, respondent_en } from './section-titles';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';
const enContent = {
  title: '',
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
  title: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: "barod i'w weld",
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
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
              href: '/respondent/miam/miam-start',
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
              href: '/respondent/international-factors/start',
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


  describe('check withdraw banners', () => {
    test('check withdraw banners', async () => {
      const userCase = mockUserCase;
      userCase.state = State.CASE_WITHDRAWN;
      userCase.orderCollection = [{
        id: '81dd27a1-e7fe-49d9-9015-d3231c79995b',
        value: {
          dateCreated: '2022-09-21T12:25:22.599271',
          orderType: 'Blank order or directions (C21) - to withdraw application',
          orderTypeId: 'blankOrderOrDirectionsWithdraw',
          orderDocument: {
            document_url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/0b3346e6-9642-4648-80ad-40cd0446e527',
            document_binary_url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/0b3346e6-9642-4648-80ad-40cd0446e527/binary',
            document_filename: 'Blank_Order_Directions_C21.pdf',
            document_hash: null,
          },
          otherDetails: {
            createdBy: 'test',
            orderCreatedDate: '21 September 2022',
            orderMadeDate: '21 September 2022',
            orderRecipients: 'test solicitor firm',
          },
        },
      }]
      const expectedBanners = [
        {
          bannerHeading: 'Respond to an application about a child',
          bannerContent: [
            {
              line1: 'Another person (the applicant) has applied to the court to make a decision about a child.',
              line2: 'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.'
            }
          ],
          bannerLinks: [
            {
              href: '/yourdocuments/alldocuments/cadafinaldocumentrequest',
              text: 'Check the application (PDF)'
            },
            {
              href: '/tasklistresponse/start',
              text: 'Respond to the application'
            }
          ]
        },
        {
          bannerHeading: 'The case has now been withdrawn',
          bannerContent: [
            {
              line1: 'The court has agreed to withdraw the case.'
            }
          ],
          bannerLinks: [
            {
              href: '/respondent/yourdocuments/alldocuments/orders/0b3346e6-9642-4648-80ad-40cd0446e527',
              text: 'View the order or letter that says the case has been withdrawn (PDF)'
            }
          ]
        }
      ];
      const { banners }  = generateContent({ ...commonContent, userCase });
      expect(banners).toEqual(expectedBanners);
    });
  });
});
