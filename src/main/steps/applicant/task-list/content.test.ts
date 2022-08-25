import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

// eslint-disable-next-line import/namespace
import { generateContent } from './content';

const enContent = {
  title: 'DA Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'Not Started',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
  },
  sectionTitles: {
    aboutYou: 'About you',
    yourApplication: 'Your application',
    courtHearings: 'Your court hearings',
    ordersFromCourt: 'Orders from the court',
    yourDocuments: 'Your documents',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    your_application: 'Application submitted (PDF)',
    your_application_witness_statement: 'Witness statement (PDF)',
    support_you_need_during_your_case: 'Support you need during your case',
    application_submitted: 'Application submitted (PDF)',
    witness_statement: 'Witness statement (PDF)',
    details_of_court_hearings: 'Check details of your court hearings',
    orders: 'View all orders from the court',
    upload_document: 'Upload documents',
    view_all_documents: 'View all documents',
  },
};
const cyContent = {
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
  },
  sectionTitles: {
    aboutYou: 'About you',
    yourApplication: 'Your application',
    courtHearings: 'Your court hearings',
    ordersFromCourt: 'Orders from the court',
    yourDocuments: 'Your documents',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    your_application: 'Application submitted (PDF)',
    your_application_witness_statement: 'Witness statement (PDF)',
    support_you_need_during_your_case: 'Support you need during your case',
    application_submitted: 'Application submitted (PDF)',
    witness_statement: 'Witness statement (PDF)',
    details_of_court_hearings: 'Check details of your court hearings',
    orders: 'View all orders from the court',
    upload_document: 'Upload documents',
    view_all_documents: 'View all documents',
  },
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
          title: 'Your application',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'application-submitted',
              status: 'TO_DO',
              text: 'Application submitted (PDF)',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'witness-statement',
              status: 'IN_PROGRESS',
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
              href: '/applicant/keep-details-private/details_known',
              id: 'upload-document',
              status: 'TO_DO',
              text: 'Upload documents',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'view-all-documents',
              status: 'IN_PROGRESS',
              text: 'View all documents',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'orders',
              status: 'TO_DO',
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
