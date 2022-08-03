import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'Not Started',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
  },
  sectionTitles: {
    applicantYourDetails: 'About you',
    applicationDetails: 'Application detail',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    your_application: 'Application submitted (FL401)',
    your_application_witness_statement: 'Witness statement (PDF)',
  },
};
const cyContent = {
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
  },
  sectionTitles: {
    applicantYourDetails: 'About you',
    applicationDetails: 'Application detail',
  },
  taskListItems: {
    keep_your_details_private: 'Keep your details private',
    confirm_or_edit_your_contact_details: 'Confirm or edit your contact details',
    your_application: 'Application submitted (FL401)',
    your_application_witness_statement: 'Witness statement (PDF)',
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
          ],
          title: 'About you',
        },
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (FL401)',
            },
            {
              href: '/applicant/public/docs/witness-statement-Final-Document.pdf',
              id: 'your-application-witness-statment',
              status: 'DOWNLOAD',
              text: 'Witness statement (PDF)',
            },
          ],
          title: undefined,
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
