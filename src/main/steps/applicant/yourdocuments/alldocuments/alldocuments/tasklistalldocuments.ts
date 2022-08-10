import { CommonContent } from '../../../../../steps/common/common.content';
import * as URL from '../../../../urls';
import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantResponseToRequestForChildArrangements,
  getApplicantViewAllOrdersFromTheCourtAllDocuments,
} from '../../../task-list/utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateApplicantTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'orders-from-the-court-all-docs',
          text: taskListItems.view_all_orders_from_the_court_all_docs,
          href:
            getApplicantViewAllOrdersFromTheCourtAllDocuments(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
    {
      title: sectionTitles.applicantsDocuments,
      items: [
        {
          id: 'applicant-response-to-request-for-child-arrangements',
          text: getText(taskListItems.applicant_response_to_request_for_child_arrangements, userCase),
          href:
            getApplicantResponseToRequestForChildArrangements(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
        {
          id: 'applicant-allegations-of-harm-and-violence',
          text: getText(taskListItems.applicant_allegations_of_harm_and_violence, userCase),
          href:
            getApplicantAllegationsOfHarmAndViolence(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
        {
          id: 'applicant_response_to_other_side_allegation_of_harm',
          text: getText(taskListItems.applicant_response_to_other_side_allegation_of_harm, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'applicant_position_statements',
          text: getText(taskListItems.applicant_position_statements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'applicant_witness_statements',
          text: getText(taskListItems.applicant_witness_statements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'other_people_witness_statements',
          text: getText(taskListItems.other_people_witness_statements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'medical_reports',
          text: getText(taskListItems.medical_reports, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'miam_certificate',
          text: getText(taskListItems.miam_certificate, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'applications_made_in_these_proceedings',
          text: getText(taskListItems.applications_made_in_these_proceedings, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'previous_orders_submitted',
          text: getText(taskListItems.previous_orders_submitted, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'letters_from_school',
          text: getText(taskListItems.letters_from_school, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'digital_downloads',
          text: getText(taskListItems.digital_downloads, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'photographic_evidence',
          text: getText(taskListItems.photographic_evidence, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'mobile_phone_screenshots',
          text: getText(taskListItems.mobile_phone_screenshots, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'medical_records',
          text: getText(taskListItems.medical_records, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'paternity_test_reports',
          text: getText(taskListItems.paternity_test_reports, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'drug_alcohol_tests',
          text: getText(taskListItems.drug_alcohol_tests, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'police_disclosures',
          text: getText(taskListItems.police_disclosures, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'witness_availability',
          text: getText(taskListItems.witness_availability, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
      ],
    },
    {
      title: sectionTitles.respondentsDocuments,
      items: [
        {
          id: 'respondent_response_to_request_for_child_arrangements',
          text: getText(taskListItems.respondent_response_to_request_for_child_arrangements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'respondent_response_to_allegations_of_harm_and_violence',
          text: getText(taskListItems.respondent_response_to_allegations_of_harm_and_violence, userCase),
          href: getApplicantAllegationsOfHarmAndViolence(userCase) === true ? '#' : '#',
        },
        {
          id: 'respondent_allegation_of_harm_and_violence',
          text: getText(taskListItems.respondent_allegation_of_harm_and_violence, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'applications_made_in_these_proceedings_respondent',
          text: getText(taskListItems.applications_made_in_these_proceedings_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'previous_orders_submitted_respondent',
          text: getText(taskListItems.previous_orders_submitted_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'letters_from_school_respondent',
          text: getText(taskListItems.letters_from_school_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'respondent_position_statements',
          text: getText(taskListItems.respondent_position_statements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'respondent_witness_statements',
          text: getText(taskListItems.respondent_witness_statements, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'other_people_witness_statements_respondent',
          text: getText(taskListItems.other_people_witness_statements_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'digital_downloads_respondent',
          text: getText(taskListItems.digital_downloads_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'photographic_evidence_respondent',
          text: getText(taskListItems.photographic_evidence_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'mobile_phone_screenshots_respondent',
          text: getText(taskListItems.mobile_phone_screenshots_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'medical_records_respondent',
          text: getText(taskListItems.medical_records_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'medical_reports_respondent',
          text: getText(taskListItems.medical_reports_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'paternity_test_reports_respondent',
          text: getText(taskListItems.paternity_test_reports_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'drug_alcohol_tests_respondent',
          text: getText(taskListItems.drug_alcohol_tests_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'police_disclosures_respondent',
          text: getText(taskListItems.police_disclosures_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'witness_availability_respondent',
          text: getText(taskListItems.witness_availability_respondent, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
      ],
    },
    {
      title: sectionTitles.cafcassAndLaDocuments,
      items: [
        {
          id: 'safeguarding_letter',
          text: getText(taskListItems.safeguarding_letter, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'section7_report',
          text: getText(taskListItems.section7_report, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'section37_report',
          text: getText(taskListItems.section37_report, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'risk_assessment_16a',
          text: getText(taskListItems.risk_assessment_16a, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
      ],
    },
    {
      title: sectionTitles.otherDocuments,
      items: [
        {
          id: 'important_address_and_contact_details',
          text: getText(taskListItems.important_address_and_contact_details, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'dna_reports',
          text: getText(taskListItems.dna_reports, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'privacy_notice',
          text: getText(taskListItems.privacy_notice, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'special_measures',
          text: getText(taskListItems.special_measures, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
      ],
    },
    {
      title: sectionTitles.attendingTheHearing,
      items: [
        {
          id: 'notice_of_hearing',
          text: getText(taskListItems.notice_of_hearing, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
        {
          id: 'support_you_need_during_your_case',
          text: getText(taskListItems.support_you_need_during_your_case, userCase),
          href: getApplicantResponseToRequestForChildArrangements(userCase) === true ? '#' : '#',
        },
      ],
    },
  ];
};

function getText(inputStr: string, userCase: CommonContent) {
  console.log(userCase);
  return inputStr.replace('<nameapplicantxxxxx>', 'Applicant_FNAME_LNAME');
}
