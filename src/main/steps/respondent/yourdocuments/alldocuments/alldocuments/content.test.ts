import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    respondentsDocuments: "Respondent's documents",
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    respondent_response_to_request_for_child_arrangements: "<namerespondentxxxxx>'s request for child arrangements",
    respondent_allegations_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
  },
};
const cyContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    respondentsDocuments: "Respondent's documents",
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    respondent_response_to_request_for_child_arrangements: "<namerespondentxxxxx>'s request for child arrangements",
    respondent_allegations_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
  },
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
  test.each([
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
