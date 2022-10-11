import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
import { applicant_all_docs_en } from './section-titles-all-documents';
import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';

const enContent = {
  title: 'All documents',
  sectionTitles: applicant_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
const cyContent = {
  title: 'All documents',
  sectionTitles: applicant_all_docs_en,
  taskListItems: applicant_tasklist_items_all_docs_en,
};
describe('task-list > content', () => {
  const commonContent = {
    language: 'en',
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
  } as CommonContent;
  //eslint-disable-next-line jest/expect-expect
  test.skip('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  //eslint-disable-next-line jest/expect-expect
  test.skip('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test.skip.each([
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
              id: 'applicant_request_for_child_arrangements',
              text: "Applicant_FNAME_LNAME's request for child arrangements",
              href: '/applicant/yourdocuments/alldocuments/carequest',
            },
            {
              id: 'applicant-allegations-of-harm-and-violence',
              text: "Applicant_FNAME_LNAME's allegations of harm and violence",
              href: '/applicant/yourdocuments/alldocuments/aohviolence',
            },
            {
              id: 'applicant_response_to_other_side_allegation_of_harm',
              text: "Applicant_FNAME_LNAME's response to the other side's allegations of harm or violence",
              href: '/applicant/yourdocuments/alldocuments/aohviolenceresponse',
            },
            {
              id: 'applicant_position_statements',
              text: "Applicant_FNAME_LNAME's position statements",
              href: '/applicant/yourdocuments/alldocuments/positionstatement',
            },
            {
              id: 'applicant_witness_statements',
              text: "Applicant_FNAME_LNAME's witness statements",
              href: '/applicant/yourdocuments/alldocuments/applicantwitnessstatements',
            },
            {
              id: 'other_people_witness_statements',
              text: "Other people's witness statements",
              href: '/applicant/yourdocuments/alldocuments/otherpeoplewitnessstatement',
            },
            {
              id: 'medical_reports',
              text: 'Medical reports',
              href: '/applicant/yourdocuments/alldocuments/medicalreports',
            },
            {
              id: 'miam_certificate',
              text: 'MIAM certificate',
              href: '/applicant/yourdocuments/alldocuments/miamcertificate',
            },
            {
              id: 'applications_made_in_these_proceedings',
              text: 'Applications made in these proceedings',
              href: '/applicant/yourdocuments/alldocuments/applicationmade',
            },
            {
              id: 'previous_orders_submitted',
              text: 'Previous orders submitted with application',
              href: '/applicant/yourdocuments/alldocuments/previousorders',
            },
            {
              id: 'letters_from_school',
              text: 'Letters from school',
              href: '/applicant/yourdocuments/alldocuments/letterfromschool',
            },
            {
              id: 'digital_downloads',
              text: 'Emails, screenshots, images and other media files',
              href: '/applicant/yourdocuments/alldocuments/digitaldownloads',
            },
            {
              id: 'medical_records',
              text: 'Medical records',
              href: '/applicant/yourdocuments/alldocuments/medicalrecords',
            },
            {
              id: 'paternity_test_reports',
              text: 'Paternity test reports',
              href: '/applicant/yourdocuments/alldocuments/paternity_test_reports',
            },
            {
              id: 'drug_alcohol_tests',
              text: 'Drug and alcohol tests (toxicology)',
              href: '/applicant/yourdocuments/alldocuments/drug_alcohol_tests',
            },
            {
              id: 'police_disclosures',
              text: 'Police reports',
              href: '/applicant/yourdocuments/alldocuments/police_disclosures',
            },
            {
              id: 'witness_availability',
              text: 'Witness availability',
              href: '/applicant/yourdocuments/alldocuments/witness_availability',
            },
          ],
          title: "Applicant's documents",
        },
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/caresponse',
              id: 'respondent_response_to_request_for_child_arrangements',
              text: "<namerespondentxxxxx>'s response to the request for child arrangements",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentaohresponse',
              id: 'respondent_response_to_allegations_of_harm_and_violence',
              text: "<namerespondentxxxxx>'s response to the allegations of harm and violence",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentaohviolence',
              id: 'respondent_allegation_of_harm_and_violence',
              text: "<namerespondentxxxxx>'s allegations of harm and violence",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentapplicationmade',
              id: 'applications_made_in_these_proceedings_respondent',
              text: 'Applications made in these proceedings',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentpreviousorders',
              id: 'previous_orders_submitted_respondent',
              text: 'Previous orders submitted with application',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentletterfromschool',
              id: 'letters_from_school_respondent',
              text: 'Letters from school',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentpositionstatement',
              id: 'respondent_position_statements',
              text: "<namerespondentxxxxx>'s position statements",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentwitnessstatement',
              id: 'respondent_witness_statements',
              text: "<namerespondentxxxxx>'s witness statements",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentOtherPeopleWitnessStatement',
              id: 'other_people_witness_statements_respondent',
              text: "Other people's witness statements",
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentdigitaldownloads',
              id: 'digital_downloads_respondent',
              text: 'Emails, screenshots, images and other media files',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentmedicalrecords',
              id: 'medical_records_respondent',
              text: 'Medical records',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentmedicalreports',
              id: 'medical_reports_respondent',
              text: 'Medical reports',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondent_paternity_test_reports',
              id: 'paternity_test_reports_respondent',
              text: 'Paternity test reports',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondent_drug_alcohol_tests',
              id: 'drug_alcohol_tests_respondent',
              text: 'Drug and alcohol tests (toxicology)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondent_police_disclosure',
              id: 'police_disclosures_respondent',
              text: 'Police reports',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondent_drug_alcohol_tests',
              id: 'witness_availability_respondent',
              text: 'Witness availability',
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
              href: '/applicant/yourdocuments/alldocuments/important_address_and_contact_details',
              id: 'important_address_and_contact_details',
              text: 'Important information about your address and contact details',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/dna_reports',
              id: 'dna_reports',
              text: 'DNA reports',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/privacy_notice',
              id: 'privacy_notice',
              text: 'Privacy notice',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/special_measures',
              id: 'special_measures',
              text: 'Special measures',
            },
          ],
          title: 'Other documents',
        },
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/notice_of_hearing',
              id: 'notice_of_hearing',
              text: 'Notice of hearing',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/support_needed',
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
              id: 'applicant_request_for_child_arrangements',
              text: "Applicant_FNAME_LNAME's request for child arrangements",
              href: '#',
            },
            {
              id: 'applicant-allegations-of-harm-and-violence',
              text: "Applicant_FNAME_LNAME's allegations of harm and violence",
              href: '#',
            },
            {
              id: 'applicant_response_to_other_side_allegation_of_harm',
              text: "Applicant_FNAME_LNAME's response to the other side's allegations of harm or violence",
              href: '#',
            },
            {
              id: 'applicant_position_statements',
              text: "Applicant_FNAME_LNAME's position statements",
              href: '#',
            },
            {
              id: 'applicant_witness_statements',
              text: "Applicant_FNAME_LNAME's witness statements",
              href: '/applicant/yourdocuments/alldocuments/applicantwitnessstatements',
            },
            {
              id: 'other_people_witness_statements',
              text: "Other people's witness statements",
              href: '#',
            },
            {
              id: 'medical_reports',
              text: 'Medical reports',
              href: '#',
            },
            {
              id: 'miam_certificate',
              text: 'MIAM certificate',
              href: '#',
            },
            {
              id: 'applications_made_in_these_proceedings',
              text: 'Applications made in these proceedings',
              href: '#',
            },
            {
              id: 'previous_orders_submitted',
              text: 'Previous orders submitted with application',
              href: '#',
            },
            {
              id: 'letters_from_school',
              text: 'Letters from school',
              href: '#',
            },
            {
              id: 'digital_downloads',
              text: 'Emails, screenshots, images and other media files',
              href: '#',
            },
            {
              id: 'medical_records',
              text: 'Medical records',
              href: '#',
            },
            {
              id: 'paternity_test_reports',
              text: 'Paternity test reports',
              href: '#',
            },
            {
              id: 'drug_alcohol_tests',
              text: 'Drug and alcohol tests (toxicology)',
              href: '#',
            },
            {
              id: 'police_disclosures',
              text: 'Police reports',
              href: '#',
            },
            {
              id: 'witness_availability',
              text: 'Witness availability',
              href: '#',
            },
          ],
          title: "Applicant's documents",
        },
        {
          items: [
            {
              href: '#',
              id: 'respondent_response_to_request_for_child_arrangements',
              text: "<namerespondentxxxxx>'s response to the request for child arrangements",
            },
            {
              href: '#',
              id: 'respondent_response_to_allegations_of_harm_and_violence',
              text: "<namerespondentxxxxx>'s response to the allegations of harm and violence",
            },
            {
              href: '#',
              id: 'respondent_allegation_of_harm_and_violence',
              text: "<namerespondentxxxxx>'s allegations of harm and violence",
            },
            {
              href: '#',
              id: 'applications_made_in_these_proceedings_respondent',
              text: 'Applications made in these proceedings',
            },
            {
              href: '#',
              id: 'previous_orders_submitted_respondent',
              text: 'Previous orders submitted with application',
            },
            {
              href: '#',
              id: 'letters_from_school_respondent',
              text: 'Letters from school',
            },
            {
              href: '#',
              id: 'respondent_position_statements',
              text: "<namerespondentxxxxx>'s position statements",
            },
            {
              href: '#',
              id: 'respondent_witness_statements',
              text: "<namerespondentxxxxx>'s witness statements",
            },
            {
              href: '#',
              id: 'other_people_witness_statements_respondent',
              text: "Other people's witness statements",
            },
            {
              href: '#',
              id: 'digital_downloads_respondent',
              text: 'Emails, screenshots, images and other media files',
            },
            {
              href: '#',
              id: 'medical_records_respondent',
              text: 'Medical records',
            },
            {
              href: '#',
              id: 'medical_reports_respondent',
              text: 'Medical reports',
            },
            {
              href: '#',
              id: 'paternity_test_reports_respondent',
              text: 'Paternity test reports',
            },
            {
              href: '#',
              id: 'drug_alcohol_tests_respondent',
              text: 'Drug and alcohol tests (toxicology)',
            },
            {
              href: '#',
              id: 'police_disclosures_respondent',
              text: 'Police reports',
            },
            {
              href: '#',
              id: 'witness_availability_respondent',
              text: 'Witness availability',
            },
          ],
          title: "Respondent's documents",
        },
        {
          items: [
            {
              href: '#',
              id: 'safeguarding_letter',
              text: 'Safeguarding letter',
            },
            {
              href: '#',
              id: 'section7_report',
              text: 'Section 7 report',
            },
            {
              href: '#',
              id: 'section37_report',
              text: 'Section 37 report',
            },
            {
              href: '#',
              id: 'risk_assessment_16a',
              text: '16a risk assessment',
            },
          ],
          title: 'CAFCASS and local authority document',
        },
        {
          items: [
            {
              href: '#',
              id: 'important_address_and_contact_details',
              text: 'Important information about your address and contact details',
            },
            {
              href: '#',
              id: 'dna_reports',
              text: 'DNA reports',
            },
            {
              href: '#',
              id: 'privacy_notice',
              text: 'Privacy notice',
            },
            {
              href: '#',
              id: 'special_measures',
              text: 'Special measures',
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
              href: '#',
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
