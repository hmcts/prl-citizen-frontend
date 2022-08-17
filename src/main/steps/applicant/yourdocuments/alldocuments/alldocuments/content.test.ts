import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    applicantsDocuments: "Applicant's documents",
    respondentsDocuments: "Respondent's documents",
    cafcassAndLaDocuments: 'CAFCASS and local authority document',
    otherDocuments: 'Other documents',
    attendingTheHearing: 'Attending the hearing',
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    applicant_request_for_child_arrangements: "<nameapplicantxxxxx>'s request for child arrangements",
    applicant_allegations_of_harm_and_violence: "<nameapplicantxxxxx>'s allegations of harm and violence",
    applicant_response_to_other_side_allegation_of_harm:
      "<nameapplicantxxxxx>'s response to the other side's allegations of harm or violence",
    applicant_position_statements: "<nameapplicantxxxxx>'s position statements",
    applicant_witness_statements: "<nameapplicantxxxxx>'s witness statements",
    other_people_witness_statements: "Other people's witness statements",
    medical_reports: 'Medical reports',
    miam_certificate: 'MIAM certificate',
    applications_made_in_these_proceedings: 'Applications made in these proceedings',
    previous_orders_submitted: 'Previous orders submitted with application',
    letters_from_school: 'Letters from school',
    digital_downloads: 'Emails, screenshots, images and other media files',
    photographic_evidence: 'Photographic evidence',
    mobile_phone_screenshots: 'Mobile phone screenshots',
    medical_records: 'Medical records',
    paternity_test_reports: 'Paternity test reports',
    drug_alcohol_tests: 'Drug and alcohol tests (toxicology)',
    police_disclosures: 'Police disclosures',
    witness_availability: 'Witness availability',
    respondent_response_to_request_for_child_arrangements:
      "<namerespondentxxxxx>'s response to the request for child arrangements",
    respondent_response_to_allegations_of_harm_and_violence:
      "<namerespondentxxxxx>'s response to the allegations of harm and violence",
    respondent_allegation_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
    applications_made_in_these_proceedings_respondent: 'Applications made in these proceedings',
    previous_orders_submitted_respondent: 'Previous orders submitted with application',
    letters_from_school_respondent: 'Letters from school',
    respondent_position_statements: "<namerespondentxxxxx>'s position statements",
    respondent_witness_statements: "<namerespondentxxxxx>'s witness statements",
    other_people_witness_statements_respondent: "Other people's witness statements",
    digital_downloads_respondent: 'Emails, screenshots, images and other media files',
    photographic_evidence_respondent: 'Photographic evidence',
    mobile_phone_screenshots_respondent: 'Mobile phone screenshots',
    medical_records_respondent: 'Medical records',
    medical_reports_respondent: 'Medical reports',
    paternity_test_reports_respondent: 'Paternity test reports',
    drug_alcohol_tests_respondent: 'Drug and alcohol tests (toxicology)',
    police_disclosures_respondent: 'Police disclosures',
    witness_availability_respondent: 'Witness availability',
    safeguarding_letter: 'Safeguarding letter',
    section7_report: 'Section 7 report',
    section37_report: 'Section 37 report',
    risk_assessment_16a: '16a risk assessment',
    important_address_and_contact_details: 'Important information about your address and contact details',
    dna_reports: 'DNA reports',
    privacy_notice: 'Privacy notice',
    special_measures: 'Special measures',
    notice_of_hearing: 'Notice of hearing',
    support_you_need_during_your_case: 'Support you need during your case',
  },
};
const cyContent = {
  title: 'All documents',
  sectionTitles: {
    ordersFromTheCourt: 'Orders from the court',
    applicantsDocuments: "Applicant's documents",
    respondentsDocuments: "Respondent's documents",
    cafcassAndLaDocuments: 'CAFCASS and local authority document',
    otherDocuments: 'Other documents',
    attendingTheHearing: 'Attending the hearing',
  },
  taskListItems: {
    view_all_orders_from_the_court_all_docs: 'View all orders from the court',
    applicant_request_for_child_arrangements: "<nameapplicantxxxxx>'s request for child arrangements",
    applicant_allegations_of_harm_and_violence: "<nameapplicantxxxxx>'s allegations of harm and violence",
    applicant_response_to_other_side_allegation_of_harm:
      "<nameapplicantxxxxx>'s response to the other side's allegations of harm or violence",
    applicant_position_statements: "<nameapplicantxxxxx>'s position statements",
    applicant_witness_statements: "<nameapplicantxxxxx>'s witness statements",
    other_people_witness_statements: "Other people's witness statements",
    medical_reports: 'Medical reports',
    miam_certificate: 'MIAM certificate',
    applications_made_in_these_proceedings: 'Applications made in these proceedings',
    previous_orders_submitted: 'Previous orders submitted with application',
    letters_from_school: 'Letters from school',
    digital_downloads: 'Emails, screenshots, images and other media files',
    photographic_evidence: 'Photographic evidence',
    mobile_phone_screenshots: 'Mobile phone screenshots',
    medical_records: 'Medical records',
    paternity_test_reports: 'Paternity test reports',
    drug_alcohol_tests: 'Drug and alcohol tests (toxicology)',
    police_disclosures: 'Police disclosures',
    witness_availability: 'Witness availability',
    respondent_response_to_request_for_child_arrangements:
      "<namerespondentxxxxx>'s response to the request for child arrangements",
    respondent_response_to_allegations_of_harm_and_violence:
      "<namerespondentxxxxx>'s response to the allegations of harm and violence",
    respondent_allegation_of_harm_and_violence: "<namerespondentxxxxx>'s allegations of harm and violence",
    applications_made_in_these_proceedings_respondent: 'Applications made in these proceedings',
    previous_orders_submitted_respondent: 'Previous orders submitted with application',
    letters_from_school_respondent: 'Letters from school',
    respondent_position_statements: "<namerespondentxxxxx>'s position statements",
    respondent_witness_statements: "<namerespondentxxxxx>'s witness statements",
    other_people_witness_statements_respondent: "Other people's witness statements",
    digital_downloads_respondent: 'Emails, screenshots, images and other media files',
    photographic_evidence_respondent: 'Photographic evidence',
    mobile_phone_screenshots_respondent: 'Mobile phone screenshots',
    medical_records_respondent: 'Medical records',
    medical_reports_respondent: 'Medical reports',
    paternity_test_reports_respondent: 'Paternity test reports',
    drug_alcohol_tests_respondent: 'Drug and alcohol tests (toxicology)',
    police_disclosures_respondent: 'Police disclosures',
    witness_availability_respondent: 'Witness availability',
    safeguarding_letter: 'Safeguarding letter',
    section7_report: 'Section 7 report',
    section37_report: 'Section 37 report',
    risk_assessment_16a: '16a risk assessment',
    important_address_and_contact_details: 'Important information about your address and contact details',
    dna_reports: 'DNA reports',
    privacy_notice: 'Privacy notice',
    special_measures: 'Special measures',
    notice_of_hearing: 'Notice of hearing',
    support_you_need_during_your_case: 'Support you need during your case',
  },
};
describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
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
              id: 'photographic_evidence',
              text: 'Photographic evidence',
              href: '/applicant/yourdocuments/alldocuments/photographicevidence',
            },
            {
              id: 'mobile_phone_screenshots',
              text: 'Mobile phone screenshots',
              href: '/applicant/yourdocuments/alldocuments/mobilescreenshots',
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
              text: 'Police disclosures',
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
              href: '/applicant/yourdocuments/alldocuments/respondentphotographicevidence',
              id: 'photographic_evidence_respondent',
              text: 'Photographic evidence',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/respondentmobilescreenshots',
              id: 'mobile_phone_screenshots_respondent',
              text: 'Mobile phone screenshots',
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
              text: 'Police disclosures',
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
              id: 'photographic_evidence',
              text: 'Photographic evidence',
              href: '#',
            },
            {
              id: 'mobile_phone_screenshots',
              text: 'Mobile phone screenshots',
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
              text: 'Police disclosures',
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
              id: 'photographic_evidence_respondent',
              text: 'Photographic evidence',
            },
            {
              href: '#',
              id: 'mobile_phone_screenshots_respondent',
              text: 'Mobile phone screenshots',
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
              text: 'Police disclosures',
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
