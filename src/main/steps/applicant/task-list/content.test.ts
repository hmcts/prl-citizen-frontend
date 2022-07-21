import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'DA Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
  },
  sectionTitles: {
    aboutYou: 'About you',
    yourApplication: 'Your application',
    courtHearings: 'Your court hearings',
    ordersFromCourt: 'Orders from the court',
    yourDocuments: 'Your documents',
    finalDecision: 'Final decision from the court',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    support_you_need_during_your_case: 'Support you need during your case',
    application_submitted: 'Application submitted (FL401)',
    witness_statement: 'Witness statement',
    details_of_court_hearings: 'Check details of your court hearings',
    orders: 'Orders',
    upload_document: 'Upload a document',
    see_all_documents: 'See all documents',
    see_all_documents_alternative_view: 'See all documents ( alternate view )',
    view_all_final_order: 'View your final order',
  },
};
const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
  },
  sectionTitles: {
    aboutYou: 'About you',
    yourApplication: 'Your application',
    courtHearings: 'Your court hearings',
    ordersFromCourt: 'Orders from the court',
    yourDocuments: 'Your documents',
    finalDecision: 'Final decision from the court',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    support_you_need_during_your_case: 'Support you need during your case',
    application_submitted: 'Application submitted (FL401)',
    witness_statement: 'Witness statement',
    details_of_court_hearings: 'Check details of your court hearings',
    orders: 'Orders',
    upload_document: 'Upload a document',
    see_all_documents: 'See all documents',
    see_all_documents_alternative_view: 'See all documents ( alternate view )',
    view_all_final_order: 'View your final order',
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
              status: 'TO_DO',
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
              href: '/applicant/keep-details-private/details_known',
              id: 'application-submitted',
              text: 'Application submitted (FL401)',
              status: 'TO_DO',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'witness-statement',
              text: 'Witness statement',
              status: 'TO_DO',
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
              id: 'orders',
              text: 'Orders',
              status: 'TO_DO',
            },
          ],
          title: 'Orders from the court',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'upload-document',
              text: 'Upload a document',
              status: 'TO_DO',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'see-all-documents',
              text: 'See all documents',
              status: 'TO_DO',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers',
              id: 'see-all-documents-alternative-view',
              text: 'See all documents ( alternate view )',
              status: 'TO_DO',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known',
              id: 'view-all-final-order',
              text: 'View your final order',
              status: 'TO_DO',
            },
          ],
          title: 'Final decision from the court',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
