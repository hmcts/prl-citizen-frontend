import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import {
  applicant_tasklist_items_all_docs_cy,
  applicant_tasklist_items_all_docs_en,
} from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import { respondent_all_docs_cy, respondent_all_docs_en } from './section-titles-all-documents';

const enContent = {
  title: 'All documents',
  sectionTitles: respondent_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
const cyContent = {
  title: 'Pob dogfen',
  sectionTitles: respondent_all_docs_cy,
  taskListItems: applicant_tasklist_items_all_docs_cy,
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
              href: '/respondent/yourdocuments/alldocuments/orders',
              id: 'orders-from-the-court-all-docs',
              text: 'View all orders from the court',
            },
          ],
          title: 'Orders from the court',
        },
        {
          items: [
            {
              href: '/doc/positionstatements/respondent/test test?',
              id: 'respondent_position_statements',
              text: "test test's position statements",
            },
            {
              href: '/doc/yourwitnessstatements/respondent/test test?',
              id: 'respondent_witness_statements',
              text: "test test's witness statements",
            },
            {
              href: '/doc/otherpeoplewitnessstatement/respondent',
              id: 'other_people_witness_statements_respondent',
              text: "Other people's witness statements",
            },
          ],
          title: "Respondent's documents",
        },
        {
          items: [
            {
              href: '/doc/positionstatements/applicant/test test?',
              id: 'applicant_position_statements',
              text: "test test's position statements",
            },
            {
              href: '/doc/yourwitnessstatements/applicant/test test?',
              id: 'applicant_witness_statements',
              text: "test test's witness statements",
            },
            {
              href: '/doc/otherpeoplewitnessstatement/applicant',
              id: 'other_people_witness_statements',
              text: "Other people's witness statements",
            },
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          title: "Applicant's documents",
        },
        {
          items: [
            {
              href: '/respondent/yourdocuments/alldocuments/safeguarding_letter',
              id: 'safeguarding_letter',
              text: 'Safeguarding letter',
            },
            {
              href: '/respondent/yourdocuments/alldocuments/section7_report',
              id: 'section7_report',
              text: 'Section 7 report',
            },
            {
              href: '/respondent/yourdocuments/alldocuments/section37_report',
              id: 'section37_report',
              text: 'Section 37 report',
            },
            {
              href: '/respondent/yourdocuments/alldocuments/risk_assessment_16a',
              id: 'risk_assessment_16a',
              text: '16a risk assessment',
            },
          ],
          title: 'CAFCASS and local authority document',
        },
        {
          items: [
            {
              href: '/doc/otherdocuments/respondent',
              id: 'other_documents',
              text: 'Other documents',
            },
          ],
          title: 'Other documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'notice_of_hearing',
              text: 'Notice of hearing',
            },
            {
              href: '/respondent/support-you-need-during-case/attending-the-court',
              id: 'support_you_need_during_your_case',
              text: 'Support you need during your case',
            },
          ],
          title: 'Attending the hearing',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
