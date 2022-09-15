import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { applicant_tasklist_items_all_docs_en } from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import { respondent_all_docs_en } from './section-titles-all-documents';

const enContent = {
  title: 'All documents',
  sectionTitles: respondent_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
const cyContent = {
  title: 'All documents',
  sectionTitles: respondent_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  //eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  //eslint-disable-next-line jest/expect-expect
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
              href: '#',
              id: 'orders-from-the-court-all-docs',
              text: 'View all orders from the court',
            },
          ],
          title: 'Orders from the court',
        },
        {
          items: [
            {
              id: 'respondent-response-to-request-for-child-arrangements',
              text: "RESPONDENT_FNAME_LNAME's request for child arrangements",
              href: '#',
            },
            {
              id: 'respondent-allegations-of-harm-and-violence',
              text: "RESPONDENT_FNAME_LNAME's allegations of harm and violence",
              href: '#',
            },
          ],
          title: "Respondent's documents",
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
