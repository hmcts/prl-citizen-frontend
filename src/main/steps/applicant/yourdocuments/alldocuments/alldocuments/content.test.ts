import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import { applicant_all_docs_cy, applicant_all_docs_en } from './section-titles-all-documents';
import {
  applicant_tasklist_items_all_docs_cy,
  applicant_tasklist_items_all_docs_en,
} from './tasklist-items-all-documents';

const enContent = {
  title: 'All documents',
  sectionTitles: applicant_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
const cyContent = {
  title: 'Pob dogfen',
  sectionTitles: applicant_all_docs_cy,
  taskListItems: applicant_tasklist_items_all_docs_cy,
};
describe('task-list > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/applicant/yourdocuments/alldocuments/alldocuments',
        session: {
          userCase: { caseTypeOfApplication: 'C100' },
        },
      },
    },
    userCase: {
      ...mockUserCase,
      applicants: [
        {
          id: '1',
          value: {
            email: 'test',
            gender: 'test',
            dxNumber: 'test',
            landline: 'test',
            lastName: 'test',
            firstName: 'test',
            dateOfBirth: 'test',
            otherGender: 'test',
            phoneNumber: 'test',
            placeOfBirth: 'test',
            previousName: 'test',
            sendSignUpLink: 'test',
            solicitorEmail: 'test',
            isAddressUnknown: 'test',
            isDateOfBirthKnown: 'test',
            solicitorReference: 'test',
            solicitorTelephone: 'test',
            isPlaceOfBirthKnown: 'test',
            isDateOfBirthUnknown: 'test',
            isAddressConfidential: 'test',
            isCurrentAddressKnown: 'test',
            relationshipToChildren: 'test',
            representativeLastName: 'test',
            representativeFirstName: 'test',
            canYouProvidePhoneNumber: 'test',
            canYouProvideEmailAddress: 'test',
            isAtAddressLessThan5Years: 'test',
            isPhoneNumberConfidential: 'test',
            isEmailAddressConfidential: 'test',
            respondentLivedWithApplicant: 'test',
            doTheyHaveLegalRepresentation: 'test',
            addressLivedLessThan5YearsDetails: 'test',
            isAtAddressLessThan5YearsWithDontKnow: 'test',
          },
        },
      ],
      allegationsOfHarmYesNo: 'NO',
    },
  } as unknown as CommonContent;
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
      userCase: {
        ...mockUserCase,
        orderCollection: [],
        allegationsOfHarmYesNo: 'NO',
      },
      expected: [
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/orders',
              id: 'orders-from-the-court-all-docs',
              text: 'View all orders from the court',
            },
          ],
          title: 'Orders from the court',
        },
        {
          items: [
            {
              id: 'applicant_request_for_child_arrangements',
              text: "test test's request for domestic abuse",
              href: '/applicant/yourdocuments/alldocuments/cadafinaldocumentrequest',
            },
            {
              id: 'applicant-allegations-of-harm-and-violence',
              text: "test test's allegations of harm and violence",
              href: '/yourdocuments/alldocuments/aohviolence',
            },
            {
              id: 'applicant_response_to_other_side_allegation_of_harm',
              text: "test test's response to the other side's allegations of harm or violence",
              href: '/applicant/yourdocuments/alldocuments/respond_others_allegation_of_harm_and_violence',
            },
            {
              id: 'applicant_position_statements',
              text: "test test's position statements",
              href: '/doc/positionstatements/applicant/test test?',
            },
            {
              id: 'applicant_witness_statements',
              text: "test test's witness statements",
              href: '/doc/yourwitnessstatements/applicant/test test?',
            },
            {
              id: 'other_people_witness_statements',
              text: "Other people's witness statements",
              href: '/doc/otherpeoplewitnessstatement/applicant',
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
              href: '/applicant/yourdocuments/alldocuments/safeguarding_letter',
              id: 'safeguarding_letter',
              text: 'Safeguarding letter',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/section7_report',
              id: 'section7_report',
              text: 'Section 7 report',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/section37_report',
              id: 'section37_report',
              text: 'Section 37 report',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/risk_assessment_16a',
              id: 'risk_assessment_16a',
              text: '16a risk assessment',
            },
          ],
          title: 'CAFCASS and local authority document',
        },
        {
          items: [
            {
              href: '/doc/otherDocuments/applicant',
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
              href: '/applicant/support-you-need-during-case/attending-the-court',
              id: 'support_you_need_during_your_case',
              text: 'Support you need during your case',
            },
          ],
          title: 'Attending the hearing',
        },
      ],
    },
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/orders',
              id: 'orders-from-the-court-all-docs',
              text: 'View all orders from the court',
            },
          ],
          title: 'Orders from the court',
        },
        {
          items: [
            {
              id: 'applicant_request_for_child_arrangements',
              text: "test test's request for domestic abuse",
              href: '/applicant/yourdocuments/alldocuments/cadafinaldocumentrequest',
            },
            {
              id: 'applicant-allegations-of-harm-and-violence',
              text: "test test's allegations of harm and violence",
              href: '/applicant/yourdocuments/alldocuments/allegationofharmandviolence',
            },
            {
              id: 'applicant_response_to_other_side_allegation_of_harm',
              text: "test test's response to the other side's allegations of harm or violence",
              href: '/applicant/yourdocuments/alldocuments/respond_others_allegation_of_harm_and_violence',
            },
            {
              id: 'applicant_position_statements',
              text: "test test's position statements",
              href: '/doc/positionstatements/applicant/test test?',
            },
            {
              id: 'applicant_witness_statements',
              text: "test test's witness statements",
              href: '/doc/yourwitnessstatements/applicant/test test?',
            },
            {
              id: 'other_people_witness_statements',
              text: "Other people's witness statements",
              href: '/doc/otherpeoplewitnessstatement/applicant',
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
              href: '/applicant/yourdocuments/alldocuments/safeguarding_letter',
              id: 'safeguarding_letter',
              text: 'Safeguarding letter',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/section7_report',
              id: 'section7_report',
              text: 'Section 7 report',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/section37_report',
              id: 'section37_report',
              text: 'Section 37 report',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/risk_assessment_16a',
              id: 'risk_assessment_16a',
              text: '16a risk assessment',
            },
          ],
          title: 'CAFCASS and local authority document',
        },
        {
          items: [
            {
              href: '/doc/otherDocuments/applicant',
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
              href: '/applicant/support-you-need-during-case/attending-the-court',
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
