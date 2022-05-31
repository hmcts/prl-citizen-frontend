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
    [SectionStatus.NOT_STARTED]: 'Not Started',
  },
  sectionTitles: {
    respondentYourDetails: 'Your details',
    consentToTheApplication: 'Consent to the application',
    applicationDetails: 'Application detail',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
  },
};
const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.NOT_STARTED]: 'Heb Ddechrau',
  },
  sectionTitles: {
    respondentYourDetails: 'Your details',
    consentToTheApplication: 'Consent to the application',
    applicationDetails: 'Application detail',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    do_you_consent_to_the_application: 'Do you consent to the application?',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    mediation_miam: 'Mediation(MIAM)',
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
              status: 'NOT_STARTED',
              text: 'Keep your details private',
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
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
