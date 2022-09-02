import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    respondentsDocuments: "Respondent's documents",
    applicantsDocuments: "Applicant's documents",
    attendingTheHearing: 'Attending the hearing',
    cafcassAndLaDocuments: 'CAFCASS and local authority document',
    otherDocuments: 'Other documents',
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    respondent_response_to_request_for_child_arrangements:
      "<namerespondentxxxxx>'s response to the request for child arrangements",
    applicant_allegations_of_harm_and_violence: "<nameapplicantxxxxx>'s allegations of harm and violence",
    applicant_position_statements: "<nameapplicantxxxxx>'s position statements",
    applicant_request_for_child_arrangements: "<nameapplicantxxxxx>'s request for child arrangements",
    applicant_request_for_domestic_abuse: "<nameapplicantxxxxx>'s request for domestic abuse",
    applicant_response_to_other_side_allegation_of_harm:
      "<nameapplicantxxxxx>'s response to the other side's allegations of harm or violence",
    applicant_witness_statements: "<nameapplicantxxxxx>'s witness statements",
    applications_made_in_these_proceedings: 'Applications made in these proceedings',
    applications_made_in_these_proceedings_respondent: 'Applications made in these proceedings',
    digital_downloads: 'Emails, screenshots, images and other media files',
    digital_downloads_respondent: 'Emails, screenshots, images and other media files',
    dna_reports: 'DNA reports',
    drug_alcohol_tests: 'Drug and alcohol tests (toxicology)',
    drug_alcohol_tests_respondent: 'Drug and alcohol tests (toxicology)',
    important_address_and_contact_details: 'Important information about your address and contact details',
    letters_from_school: 'Letters from school',
    letters_from_school_respondent: 'Letters from school',
    medical_records: 'Medical records',
    medical_records_respondent: 'Medical records',
    medical_reports: 'Medical reports',
    medical_reports_respondent: 'Medical reports',
    miam_certificate: 'MIAM certificate',
    notice_of_hearing: 'Notice of hearing',
    other_people_witness_statements: "Other people's witness statements",
    other_people_witness_statements_respondent: "Other people's witness statements",
    paternity_test_reports: 'Paternity test reports',
    paternity_test_reports_respondent: 'Paternity test reports',
    police_disclosures: 'Police reports',
    police_disclosures_respondent: 'Police reports',
    previous_orders_submitted: 'Previous orders submitted with application',
    previous_orders_submitted_respondent: 'Previous orders submitted with application',
    privacy_notice: 'Privacy notice',
    respondent_allegation_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
    respondent_position_statements: "<namerespondentxxxxx>'s position statements",
    respondent_response_for_domestic_abuse: "<namerespondentxxxxx>'s response to the request for domestic abuse",
    respondent_response_to_allegations_of_harm_and_violence:
      "<namerespondentxxxxx>'s response to the allegations of harm and violence",
    respondent_witness_statements: "<namerespondentxxxxx>'s witness statements",
    risk_assessment_16a: '16a risk assessment',
    safeguarding_letter: 'Safeguarding letter',
    section37_report: 'Section 37 report',
    section7_report: 'Section 7 report',
    special_measures: 'Special measures',
    support_you_need_during_your_case: 'Support you need during your case',
    tenancy_and_mortgage_availability: 'Tenancy and mortgage',
    witness_availability: 'Witness availability',
    witness_availability_respondent: 'Witness availability',
  },
};
const cyContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    respondentsDocuments: "Respondent's documents",
    applicantsDocuments: "Applicant's documents",
    attendingTheHearing: 'Attending the hearing',
    cafcassAndLaDocuments: 'CAFCASS and local authority document',
    otherDocuments: 'Other documents',
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    respondent_response_to_request_for_child_arrangements:
      "<namerespondentxxxxx>'s response to the request for child arrangements",
    applicant_allegations_of_harm_and_violence: "<nameapplicantxxxxx>'s allegations of harm and violence",
    applicant_position_statements: "<nameapplicantxxxxx>'s position statements",
    applicant_request_for_child_arrangements: "<nameapplicantxxxxx>'s request for child arrangements",
    applicant_request_for_domestic_abuse: "<nameapplicantxxxxx>'s request for domestic abuse",
    applicant_response_to_other_side_allegation_of_harm:
      "<nameapplicantxxxxx>'s response to the other side's allegations of harm or violence",
    applicant_witness_statements: "<nameapplicantxxxxx>'s witness statements",
    applications_made_in_these_proceedings: 'Applications made in these proceedings',
    applications_made_in_these_proceedings_respondent: 'Applications made in these proceedings',
    digital_downloads: 'Emails, screenshots, images and other media files',
    digital_downloads_respondent: 'Emails, screenshots, images and other media files',
    dna_reports: 'DNA reports',
    drug_alcohol_tests: 'Drug and alcohol tests (toxicology)',
    drug_alcohol_tests_respondent: 'Drug and alcohol tests (toxicology)',
    important_address_and_contact_details: 'Important information about your address and contact details',
    letters_from_school: 'Letters from school',
    letters_from_school_respondent: 'Letters from school',
    medical_records: 'Medical records',
    medical_records_respondent: 'Medical records',
    medical_reports: 'Medical reports',
    medical_reports_respondent: 'Medical reports',
    miam_certificate: 'MIAM certificate',
    notice_of_hearing: 'Notice of hearing',
    other_people_witness_statements: "Other people's witness statements",
    other_people_witness_statements_respondent: "Other people's witness statements",
    paternity_test_reports: 'Paternity test reports',
    paternity_test_reports_respondent: 'Paternity test reports',
    police_disclosures: 'Police reports',
    police_disclosures_respondent: 'Police reports',
    previous_orders_submitted: 'Previous orders submitted with application',
    previous_orders_submitted_respondent: 'Previous orders submitted with application',
    privacy_notice: 'Privacy notice',
    respondent_allegation_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
    respondent_position_statements: "<namerespondentxxxxx>'s position statements",
    respondent_response_for_domestic_abuse: "<namerespondentxxxxx>'s response to the request for domestic abuse",
    respondent_response_to_allegations_of_harm_and_violence:
      "<namerespondentxxxxx>'s response to the allegations of harm and violence",
    respondent_witness_statements: "<namerespondentxxxxx>'s witness statements",
    risk_assessment_16a: '16a risk assessment',
    safeguarding_letter: 'Safeguarding letter',
    section37_report: 'Section 37 report',
    section7_report: 'Section 7 report',
    special_measures: 'Special measures',
    support_you_need_during_your_case: 'Support you need during your case',
    tenancy_and_mortgage_availability: 'Tenancy and mortgage',
    witness_availability: 'Witness availability',
    witness_availability_respondent: 'Witness availability',
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
