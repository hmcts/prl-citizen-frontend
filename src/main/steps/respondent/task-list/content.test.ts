import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'Respond to the application',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: {
    respondentYourDetails: 'Your details',
    consentToTheApplication: 'Consent to the application',
    applicationDetails: 'Application details',
    respondentAdditionalInformation: 'Additional information',
    ordersFromTheCourt: 'Orders from the court',
    viewAllDocuments: 'Your documents',
    respondentSafetyConcerns: 'Safety concerns',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
    international_factors: 'International element',
    view_all_orders_from_the_court: 'View all orders from the court',
    view_all_documents: 'View all documents',
    current_or_previous_proceedings: 'Current or previous proceedings',
    your_safety: 'Your safety',
  },
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
  sectionTitles: {
    respondentYourDetails: 'Your details',
    applicationDetails: 'Application details',
    consentToTheApplication: 'Consent to the application',
    respondentAdditionalInformation: 'Additional information',
    ordersFromTheCourt: 'Orders from the court',
    viewAllDocuments: 'Your documents',
    respondentSafetyConcerns: 'Safety concerns',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
    international_factors: 'International element',
    view_all_orders_from_the_court: 'View all orders from the court',
    view_all_documents: 'View all documents',
    current_or_previous_proceedings: 'Current or previous proceedings',
    your_safety: 'Your safety',
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
          title: 'Consent to the application',
          items: [
            {
              id: 'consent-to-the-application',
              text: 'Do you consent to the application?',
              status: 'IN_PROGRESS',
              href: '/respondent/consent-to-application/consent',
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
          ],
          title: 'Your details',
        },
        {
          items: [
            {
              href: '/respondent/miam/miam-start',
              id: 'medation-miam',
              status: 'IN_PROGRESS',
              text: 'Mediation(MIAM)',
            },
            {
              href: '/respondent/proceedings/start',
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
              href: '/respondent/international-factors/start',
              id: 'international-factors',
              status: 'TO_DO',
              text: 'International element',
            },
          ],
          title: 'Additional information',
        },
        {
          items: [
            {
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
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
        {
          items: [
             {
              href: '/respondent/safety_concerns/main_page',
              id: 'your-safety',
              status: 'TO_DO',
              text: 'Your safety',
            },
          ],
          title: 'Safety concerns',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
