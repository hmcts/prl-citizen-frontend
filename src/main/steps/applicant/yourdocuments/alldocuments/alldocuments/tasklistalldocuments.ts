import { CommonContent } from '../../../../../steps/common/common.content';
import * as URL from '../../../../urls';
import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantViewAllOrdersFromTheCourtAllDocuments,
} from '../../../task-list/utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateApplicantTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    getOrdersFromCourt(sectionTitles, taskListItems, userCase),
    getApplicantDocuments(sectionTitles, taskListItems, userCase),
    getRespondentDocuments(sectionTitles, taskListItems, userCase),
    getCafcassDocuments(sectionTitles, taskListItems, userCase),
    getOtherDocuments(sectionTitles, taskListItems, userCase),
    getAttendingTheHearingDocs(sectionTitles, taskListItems, userCase),
  ];
};

function getText(inputStr: string, userCase: CommonContent) {
  console.log(userCase);
  return inputStr.replace('<nameapplicantxxxxx>', 'Applicant_FNAME_LNAME');
}

export const getOrdersFromCourt = (sectionTitles, taskListItems, userCase) => {
  return {
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
  };
};

export const getApplicantDocuments = (sectionTitles, taskListItems, userCase) => {
  return {
    title: sectionTitles.applicantsDocuments,
    items: [
      {
        id: 'applicant-response-to-request-for-child-arrangements',
        text: getText(taskListItems.applicant_response_to_request_for_child_arrangements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_CA_REQUEST : '#',
      },
      {
        id: 'applicant-allegations-of-harm-and-violence',
        text: getText(taskListItems.applicant_allegations_of_harm_and_violence, userCase),
        href:
          getApplicantAllegationsOfHarmAndViolence(userCase) === true
            ? URL.APPLICANT + URL.APPLICANT_ALLEGATION_OF_HARM_VOILENCE
            : '#',
      },
      {
        id: 'applicant_response_to_other_side_allegation_of_harm',
        text: getText(taskListItems.applicant_response_to_other_side_allegation_of_harm, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_RESPONSE_TO_AOH_VIOLENCE : '#',
      },
      {
        id: 'applicant_position_statements',
        text: getText(taskListItems.applicant_position_statements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_POSITION_STATEMENT : '#',
      },
      {
        id: 'applicant_witness_statements',
        text: getText(taskListItems.applicant_witness_statements, userCase),
        href: URL.APPLICANT + URL.APPLICANT_WITNESS_STATEMENTS,
      },
      {
        id: 'other_people_witness_statements',
        text: getText(taskListItems.other_people_witness_statements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.OTHER_PEOPLE_WITNESS_STATEMENTS : '#',
      },
      {
        id: 'medical_reports',
        text: getText(taskListItems.medical_reports, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_MEDICAL_REPORTS : '#',
      },
      {
        id: 'miam_certificate',
        text: getText(taskListItems.miam_certificate, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_MIAM_CERTIFICATE : '#',
      },
      {
        id: 'applications_made_in_these_proceedings',
        text: getText(taskListItems.applications_made_in_these_proceedings, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_APP_MADE_IN_PRCEEDINGS : '#',
      },
      {
        id: 'previous_orders_submitted',
        text: getText(taskListItems.previous_orders_submitted, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_PREVIOUS_ORDERS_SUBMITTED : '#',
      },
      {
        id: 'letters_from_school',
        text: getText(taskListItems.letters_from_school, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_LETTER_FROM_SCHOOL : '#',
      },
      {
        id: 'digital_downloads',
        text: getText(taskListItems.digital_downloads, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_DIGITAL_DOWNLOADS : '#',
      },
      {
        id: 'photographic_evidence',
        text: getText(taskListItems.photographic_evidence, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_PHOTOGRAPHIC_EVIDENCE : '#',
      },
      {
        id: 'mobile_phone_screenshots',
        text: getText(taskListItems.mobile_phone_screenshots, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_MOBILE_SCREENSHOTS : '#',
      },
      {
        id: 'medical_records',
        text: getText(taskListItems.medical_records, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_MEDICAL_RECORDS : '#',
      },
      {
        id: 'paternity_test_reports',
        text: getText(taskListItems.paternity_test_reports, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_PATERNITY_TEST_REPORTS : '#',
      },
      {
        id: 'drug_alcohol_tests',
        text: getText(taskListItems.drug_alcohol_tests, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_DRUG_ALCOHOL_TESTS : '#',
      },
      {
        id: 'police_disclosures',
        text: getText(taskListItems.police_disclosures, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_POLICE_DISCLOSURE : '#',
      },
      {
        id: 'witness_availability',
        text: getText(taskListItems.witness_availability, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.APPLICANT_WITNESS_AVAILABILITY : '#',
      },
    ],
  };
};

export const getRespondentDocuments = (sectionTitles, taskListItems, userCase) => {
  return {
    title: sectionTitles.respondentsDocuments,
    items: [
      {
        id: 'respondent_response_to_request_for_child_arrangements',
        text: getText(taskListItems.respondent_response_to_request_for_child_arrangements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE : '#',
      },
      {
        id: 'respondent_response_to_allegations_of_harm_and_violence',
        text: getText(taskListItems.respondent_response_to_allegations_of_harm_and_violence, userCase),
        href:
          getApplicantAllegationsOfHarmAndViolence(userCase) === true
            ? URL.APPLICANT + URL.RESPONDENT_RESPONSE_TO_AOH_VIOLENCE
            : '#',
      },
      {
        id: 'respondent_allegation_of_harm_and_violence',
        text: getText(taskListItems.respondent_allegation_of_harm_and_violence, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_ALLEGATION_OF_HARM_VOILENCE : '#',
      },
      {
        id: 'applications_made_in_these_proceedings_respondent',
        text: getText(taskListItems.applications_made_in_these_proceedings_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_APP_MADE_IN_PRCEEDINGS : '#',
      },
      {
        id: 'previous_orders_submitted_respondent',
        text: getText(taskListItems.previous_orders_submitted_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_PREVIOUS_ORDERS_SUBMITTED : '#',
      },
      {
        id: 'letters_from_school_respondent',
        text: getText(taskListItems.letters_from_school_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_LETTER_FROM_SCHOOL : '#',
      },
      {
        id: 'respondent_position_statements',
        text: getText(taskListItems.respondent_position_statements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_POSITION_STATEMENT : '#',
      },
      {
        id: 'respondent_witness_statements',
        text: getText(taskListItems.respondent_witness_statements, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_WITNESS_STATEMENTS : '#',
      },
      {
        id: 'other_people_witness_statements_respondent',
        text: getText(taskListItems.other_people_witness_statements_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_OTHER_PEOPLE_WITNESS_STATEMENTS : '#',
      },
      {
        id: 'digital_downloads_respondent',
        text: getText(taskListItems.digital_downloads_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_DIGITAL_DOWNLOADS : '#',
      },
      {
        id: 'photographic_evidence_respondent',
        text: getText(taskListItems.photographic_evidence_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_PHOTOGRAPHIC_EVIDENCE : '#',
      },
      {
        id: 'mobile_phone_screenshots_respondent',
        text: getText(taskListItems.mobile_phone_screenshots_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_MOBILE_SCREENSHOTS : '#',
      },
      {
        id: 'medical_records_respondent',
        text: getText(taskListItems.medical_records_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_MEDICAL_RECORDS : '#',
      },
      {
        id: 'medical_reports_respondent',
        text: getText(taskListItems.medical_reports_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_MEDICAL_REPORTS : '#',
      },
      {
        id: 'paternity_test_reports_respondent',
        text: getText(taskListItems.paternity_test_reports_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_PATERNITY_TEST_REPORTS : '#',
      },
      {
        id: 'drug_alcohol_tests_respondent',
        text: getText(taskListItems.drug_alcohol_tests_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_DRUG_ALCOHOL_TESTS : '#',
      },
      {
        id: 'police_disclosures_respondent',
        text: getText(taskListItems.police_disclosures_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_POLICE_DISCLOSURE : '#',
      },
      {
        id: 'witness_availability_respondent',
        text: getText(taskListItems.witness_availability_respondent, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_WITNESS_AVAILABILITY : '#',
      },
    ],
  };
};

export const getCafcassDocuments = (sectionTitles, taskListItems, userCase) => {
  return {
    title: sectionTitles.cafcassAndLaDocuments,
    items: [
      {
        id: 'safeguarding_letter',
        text: getText(taskListItems.safeguarding_letter, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_SAFEGUARDING_LETTER : '#',
      },
      {
        id: 'section7_report',
        text: getText(taskListItems.section7_report, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_SECTION7_REPORT : '#',
      },
      {
        id: 'section37_report',
        text: getText(taskListItems.section37_report, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_SECTION37_REPORT : '#',
      },
      {
        id: 'risk_assessment_16a',
        text: getText(taskListItems.risk_assessment_16a, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_RISK_ASSESSMENT : '#',
      },
    ],
  };
};

export const getOtherDocuments = (sectionTitles, taskListItems, userCase) => {
  return {
    title: sectionTitles.otherDocuments,
    items: [
      {
        id: 'important_address_and_contact_details',
        text: getText(taskListItems.important_address_and_contact_details, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_IMP_ADDRESS_CONTACT_INFO : '#',
      },
      {
        id: 'dna_reports',
        text: getText(taskListItems.dna_reports, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_DNA_REPORTS : '#',
      },
      {
        id: 'privacy_notice',
        text: getText(taskListItems.privacy_notice, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_PRIVACY_NOTICE : '#',
      },
      {
        id: 'special_measures',
        text: getText(taskListItems.special_measures, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_SPECIAL_MEASURES : '#',
      },
    ],
  };
};

export const getAttendingTheHearingDocs = (sectionTitles, taskListItems, userCase) => {
  return {
    title: sectionTitles.attendingTheHearing,
    items: [
      {
        id: 'notice_of_hearing',
        text: getText(taskListItems.notice_of_hearing, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_NOTICE_OF_HEARING : '#',
      },
      {
        id: 'support_you_need_during_your_case',
        text: getText(taskListItems.support_you_need_during_your_case, userCase),
        href: userCase.allegationOfHarm ? URL.APPLICANT + URL.RESPONDENT_SUPPORT_NEEDED : '#',
      },
    ],
  };
};
