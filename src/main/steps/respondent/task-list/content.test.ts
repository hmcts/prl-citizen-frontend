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
  },
  sectionTitles: {
    respondentYourDetails: 'Your details',
    consentToTheApplication: 'Consent to the application',
    applicationDetails: 'Application detail',
    respondentAdditionalInformation: 'Additional information',
    respondentSafetyConcerns: 'Safety concerns',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
    international_factors: 'International element',
    your_safety: 'Your safety',
  },
};
const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
  },
  sectionTitles: {
    respondentYourDetails: 'Your details',
    consentToTheApplication: 'Consent to the application',
    applicationDetails: 'Application detail',
    respondentAdditionalInformation: 'Additional information',
    respondentSafetyConcerns: 'Safety concerns',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
    international_factors: 'International element',
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
          ],
          title: 'Application detail',
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
