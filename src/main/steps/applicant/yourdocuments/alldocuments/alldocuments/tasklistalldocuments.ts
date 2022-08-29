import { Applicant, PartyDetails, Respondent } from '../../../../../app/case/definition';
import { CommonContent } from '../../../../../steps/common/common.content';
import * as URL from '../../../../urls';
import { getApplicantAllegationsOfHarmAndViolence } from '../../../task-list/utils';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateApplicantTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    ...getOrdersFromCourt(sectionTitles, taskListItems, userCase, URL.APPLICANT_ORDERS_FROM_THE_COURT),
    getApplicantDocuments(sectionTitles, taskListItems, userCase, true),
    getRespondentDocuments(sectionTitles, taskListItems, userCase, true),
    getCafcassDocuments(sectionTitles, taskListItems, userCase, URL.APPLICANT),
    getOtherDocuments(sectionTitles, taskListItems, userCase, URL.APPLICANT),
    getAttendingTheHearingDocs(sectionTitles, taskListItems, userCase, URL.APPLICANT),
  ];
};

function getText(inputStr: string, userCase: CommonContent) {
  console.log(userCase);
  return inputStr.replace('<nameapplicantxxxxx>', 'Applicant_FNAME_LNAME');
}

export const getOrdersFromCourt = (sectionTitles, taskListItems, userCase, url) => {
  if (userCase?.orderCollection) {
    return [
      {
        title: sectionTitles.ordersFromTheCourt,
        items: [
          {
            id: 'orders-from-the-court-all-docs',
            text: taskListItems.view_all_orders_from_the_court_all_docs,
            href: url,
          },
        ],
      },
    ];
  }
  return [];
};

export const getApplicantDocuments = (sectionTitles, taskListItems, userCase, isApplicant) => {
  let url = URL.APPLICANT;
  if (!isApplicant) {
    url = URL.RESPONDENT;
  }
  const applicantItems: object[] = [];
  if (userCase.caseTypeOfApplication === 'C100') {
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantRequestToCA(applicant, taskListItems));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantAohAndViolence(applicant, taskListItems, userCase));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantResponseToAohAndViolence(applicant, taskListItems, userCase));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantPositionStatements(applicant, taskListItems, url));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantWitnessStatements(applicant, taskListItems, url));
    });
  } else {
    console.log('**** Applicants Fl401 **** ' + JSON.stringify(userCase.applicantsFL401));

    applicantItems.push(getApplicantRequestToDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantAohAndViolenceDA(userCase.applicantsFL401, taskListItems, userCase));
    applicantItems.push(getApplicantResponseToAohAndViolenceDA(userCase.applicantsFL401, taskListItems, userCase));
    applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems, url));
    applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems, url));
  }
  applicantItems.push({
    id: 'other_people_witness_statements',
    text: getText(taskListItems.other_people_witness_statements, userCase),
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS,
  });
  applicantItems.push({
    id: 'medical_reports',
    text: getText(taskListItems.medical_reports, userCase),
    href: url + URL.MEDICAL_REPORTS + '?byApplicant=Yes',
  });
  if (userCase.miamCertificationDocumentUpload) {
    applicantItems.push({
      id: 'miam_certificate',
      text: getText(taskListItems.miam_certificate, userCase),
      href: url + URL.APPLICANT_MIAM_CERTIFICATE + '?byApplicant=Yes',
    });
  }
  applicantItems.push({
    id: 'applications_made_in_these_proceedings',
    text: getText(taskListItems.applications_made_in_these_proceedings, userCase),
    href: url + URL.APPLICANT_APP_MADE_IN_PRCEEDINGS + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'previous_orders_submitted',
    text: getText(taskListItems.previous_orders_submitted, userCase),
    href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'letters_from_school',
    text: getText(taskListItems.letters_from_school, userCase),
    href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'digital_downloads',
    text: getText(taskListItems.digital_downloads, userCase),
    href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'photographic_evidence',
    text: getText(taskListItems.photographic_evidence, userCase),
    href: url + URL.PHOTOGRAPHIC_EVIDENCE + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'medical_records',
    text: getText(taskListItems.medical_records, userCase),
    href: url + URL.MEDICAL_RECORDS + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'paternity_test_reports',
    text: getText(taskListItems.paternity_test_reports, userCase),
    href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'drug_alcohol_tests',
    text: getText(taskListItems.drug_alcohol_tests, userCase),
    href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'police_disclosures',
    text: getText(taskListItems.police_disclosures, userCase),
    href: url + URL.POLICE_DISCLOSURE + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'witness_availability',
    text: getText(taskListItems.witness_availability, userCase),
    href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=Yes',
  });
  applicantItems.push({
    id: 'tenancy_and_mortgage_availability',
    text: getText(taskListItems.tenancy_and_mortgage_availability, userCase),
    href: url + URL.TENANCY_AND_MORTGAGE_AVAILABILITY + '?byApplicant=Yes',
  });
  return {
    title: sectionTitles.applicantsDocuments,
    items: applicantItems,
  };
};

export const getRespondentDocuments = (sectionTitles, taskListItems, userCase, isApplicant) => {
  let url = URL.APPLICANT;
  if (!isApplicant) {
    url = URL.RESPONDENT;
  }
  const respondentItems: object[] = [];
  const respondentItems2: object[] = [];
  if (userCase.caseTypeOfApplication === 'C100') {
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToCA(respondent, taskListItems, userCase));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToAohAndViolence(respondent, taskListItems, userCase));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getAohAndViolence(respondent, taskListItems, userCase));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems2.push(getRespondentPositionStatements(respondent, taskListItems, url));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems2.push(getRespondentWitnessStatements(respondent, taskListItems, userCase, url));
    });
  } else {
    respondentItems.push(getResponseToDA(userCase.respondentsFL401, taskListItems, userCase));
    respondentItems.push(getResponseToAohAndViolenceDA(userCase.respondentsFL401, taskListItems, userCase));
    respondentItems.push(getAohAndViolenceDA(userCase.respondentsFL401, taskListItems, userCase));
    respondentItems2.push(getRespondentPositionStatementsDA(userCase.respondentsFL401, taskListItems, url));
    respondentItems2.push(getRespondentWitnessStatementsDA(userCase.respondentsFL401, taskListItems, userCase, url));
  }

  respondentItems.push({
    id: 'applications_made_in_these_proceedings_respondent',
    text: getText(taskListItems.applications_made_in_these_proceedings_respondent, userCase),
    href: url + URL.RESPONDENT_APP_MADE_IN_PRCEEDINGS + '?byApplicant=No',
  });
  respondentItems.push({
    id: 'previous_orders_submitted_respondent',
    text: getText(taskListItems.previous_orders_submitted_respondent, userCase),
    href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=No',
  });
  respondentItems.push({
    id: 'letters_from_school_respondent',
    text: getText(taskListItems.letters_from_school_respondent, userCase),
    href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=No',
  });

  respondentItems2.push({
    id: 'other_people_witness_statements_respondent',
    text: getText(taskListItems.other_people_witness_statements_respondent, userCase),
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'digital_downloads_respondent',
    text: getText(taskListItems.digital_downloads_respondent, userCase),
    href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'photographic_evidence_respondent',
    text: getText(taskListItems.photographic_evidence_respondent, userCase),
    href: url + URL.PHOTOGRAPHIC_EVIDENCE + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'medical_records_respondent',
    text: getText(taskListItems.medical_records_respondent, userCase),
    href: url + URL.MEDICAL_RECORDS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'medical_reports_respondent',
    text: getText(taskListItems.medical_reports_respondent, userCase),
    href: url + URL.MEDICAL_REPORTS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'paternity_test_reports_respondent',
    text: getText(taskListItems.paternity_test_reports_respondent, userCase),
    href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'drug_alcohol_tests_respondent',
    text: getText(taskListItems.drug_alcohol_tests_respondent, userCase),
    href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'police_disclosures_respondent',
    text: getText(taskListItems.police_disclosures_respondent, userCase),
    href: url + URL.POLICE_DISCLOSURE + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'witness_availability_respondent',
    text: getText(taskListItems.witness_availability_respondent, userCase),
    href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=No',
  });
  respondentItems2.push({
    id: 'tenancy_and_mortgage_availability',
    text: getText(taskListItems.tenancy_and_mortgage_availability, userCase),
    href: url + URL.TENANCY_AND_MORTGAGE_AVAILABILITY + '?byApplicant=No',
  });

  return {
    title: sectionTitles.respondentsDocuments,
    items: [...respondentItems, ...respondentItems2],
  };
};

export const getCafcassDocuments = (sectionTitles, taskListItems, userCase, url) => {
  return {
    title: sectionTitles.cafcassAndLaDocuments,
    items: [
      {
        id: 'safeguarding_letter',
        text: getText(taskListItems.safeguarding_letter, userCase),
        href: url + URL.RESPONDENT_SAFEGUARDING_LETTER,
      },
      {
        id: 'section7_report',
        text: getText(taskListItems.section7_report, userCase),
        href: url + URL.RESPONDENT_SECTION7_REPORT,
      },
      {
        id: 'section37_report',
        text: getText(taskListItems.section37_report, userCase),
        href: url + URL.RESPONDENT_SECTION37_REPORT,
      },
      {
        id: 'risk_assessment_16a',
        text: getText(taskListItems.risk_assessment_16a, userCase),
        href: url + URL.RESPONDENT_RISK_ASSESSMENT,
      },
    ],
  };
};

export const getOtherDocuments = (sectionTitles, taskListItems, userCase, url) => {
  return {
    title: sectionTitles.otherDocuments,
    items: [
      {
        id: 'important_address_and_contact_details',
        text: getText(taskListItems.important_address_and_contact_details, userCase),
        href: url + URL.RESPONDENT_IMP_ADDRESS_CONTACT_INFO,
      },
      {
        id: 'dna_reports',
        text: getText(taskListItems.dna_reports, userCase),
        href: url + URL.RESPONDENT_DNA_REPORTS,
      },
      {
        id: 'privacy_notice',
        text: getText(taskListItems.privacy_notice, userCase),
        href: url + URL.RESPONDENT_PRIVACY_NOTICE,
      },
      {
        id: 'special_measures',
        text: getText(taskListItems.special_measures, userCase),
        href: url + URL.RESPONDENT_SPECIAL_MEASURES,
      },
    ],
  };
};

export const getAttendingTheHearingDocs = (sectionTitles, taskListItems, userCase, url) => {
  return {
    title: sectionTitles.attendingTheHearing,
    items: [
      {
        id: 'notice_of_hearing',
        text: getText(taskListItems.notice_of_hearing, userCase),
        href: url + URL.RESPONDENT_NOTICE_OF_HEARING,
      },
      {
        id: 'support_you_need_during_your_case',
        text: getText(taskListItems.support_you_need_during_your_case, userCase),
        href: url + URL.RESPONDENT_SUPPORT_NEEDED,
      },
    ],
  };
};

const getResponseToCA = (respondent: Respondent, taskListItems, userCase) => {
  return {
    id: 'respondent_response_to_request_for_child_arrangements',
    text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE,
  };
};

const getAohAndViolence = (respondent: Respondent, taskListItems, userCase) => {
  return {
    id: 'respondent_allegation_of_harm_and_violence',
    text: taskListItems.respondent_allegation_of_harm_and_violence.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: URL.ALLEGATION_OF_HARM_VOILENCE,
  };
};

const getResponseToAohAndViolence = (respondent: Respondent, taskListItems, userCase) => {
  return {
    id: 'respondent_response_to_allegations_of_harm_and_violence',
    text: taskListItems.respondent_response_to_allegations_of_harm_and_violence.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href:
      getApplicantAllegationsOfHarmAndViolence(userCase) === true
        ? URL.APPLICANT + URL.RESPONDENT_RESPONSE_TO_AOH_VIOLENCE
        : '#',
  };
};

const getRespondentPositionStatements = (respondent: Respondent, taskListItems, url) => {
  return {
    id: 'respondent_position_statements',
    text: taskListItems.respondent_position_statements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: url + URL.POSITION_STATEMENTS + '?name=' + respondent.value.firstName + ' ' + respondent.value.lastName,
  };
};

const getRespondentWitnessStatements = (respondent: Respondent, taskListItems, userCase, url) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: url + URL.YOUR_WITNESS_STATEMENTS + '?name=' + respondent.value.firstName + ' ' + respondent.value.lastName,
  };
};

const getResponseToDA = (respondent: PartyDetails, taskListItems, userCase) => {
  return {
    id: 'respondent_response_to_request_for_child_arrangements',
    text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE,
  };
};

const getAohAndViolenceDA = (respondent: PartyDetails, taskListItems, userCase) => {
  return {
    id: 'respondent_allegation_of_harm_and_violence',
    text: taskListItems.respondent_allegation_of_harm_and_violence.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: URL.ALLEGATION_OF_HARM_VOILENCE,
  };
};

const getResponseToAohAndViolenceDA = (respondent: PartyDetails, taskListItems, userCase) => {
  return {
    id: 'respondent_response_to_allegations_of_harm_and_violence',
    text: taskListItems.respondent_response_to_allegations_of_harm_and_violence.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href:
      getApplicantAllegationsOfHarmAndViolence(userCase) === true
        ? URL.APPLICANT + URL.RESPONDENT_RESPONSE_TO_AOH_VIOLENCE
        : '#',
  };
};

const getRespondentPositionStatementsDA = (respondent: PartyDetails, taskListItems, url) => {
  return {
    id: 'respondent_position_statements',
    text: taskListItems.respondent_position_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: url + URL.POSITION_STATEMENTS + '?name=' + respondent.firstName + ' ' + respondent.lastName,
  };
};

const getRespondentWitnessStatementsDA = (respondent: PartyDetails, taskListItems, userCase, url) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: url + URL.YOUR_WITNESS_STATEMENTS + '?name=' + respondent.firstName + ' ' + respondent.lastName,
  };
};

const getApplicantRequestToCA = (applicant: Applicant, taskListItems) => {
  return {
    id: 'applicant_request_for_child_arrangements',
    text: taskListItems.applicant_request_for_child_arrangements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: URL.APPLICANT + URL.APPLICANT_CA_DA_REQUEST,
  };
};

const getApplicantAohAndViolence = (applicant: Applicant, taskListItems, userCase) => {
  return {
    id: 'applicant-allegations-of-harm-and-violence',
    text: taskListItems.applicant_allegations_of_harm_and_violence.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: getApplicantAllegationsOfHarmAndViolence(userCase) === true ? URL.ALLEGATION_OF_HARM_VOILENCE : '#',
  };
};
const getApplicantResponseToAohAndViolence = (applicant: Applicant, taskListItems, userCase) => {
  return {
    id: 'applicant_response_to_other_side_allegation_of_harm',
    text: taskListItems.applicant_response_to_other_side_allegation_of_harm.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: URL.APPLICANT + URL.APPLICANT_RESPONSE_TO_AOH_VIOLENCE,
  };
};
const getApplicantPositionStatements = (applicant: Applicant, taskListItems, url) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: url + URL.POSITION_STATEMENTS + '?name=' + applicant.value.firstName + ' ' + applicant.value.lastName,
  };
};
const getApplicantWitnessStatements = (applicant: Applicant, taskListItems, url) => {
  return {
    id: 'applicant_witness_statements',
    text: taskListItems.applicant_witness_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href:
      `${url}${URL.YOUR_WITNESS_STATEMENTS}` + '?name=' + applicant.value.firstName + ' ' + applicant.value.lastName,
  };
};

const getApplicantRequestToDA = (applicant: PartyDetails, taskListItems) => {
  return {
    id: 'applicant_request_for_child_arrangements',
    text: taskListItems.applicant_request_for_domestic_abuse.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: URL.APPLICANT + URL.APPLICANT_CA_DA_REQUEST,
  };
};

const getApplicantAohAndViolenceDA = (applicant: PartyDetails, taskListItems, userCase) => {
  return {
    id: 'applicant-allegations-of-harm-and-violence',
    text: taskListItems.applicant_allegations_of_harm_and_violence.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: getApplicantAllegationsOfHarmAndViolence(userCase) === true ? URL.ALLEGATION_OF_HARM_VOILENCE : '#',
  };
};
const getApplicantResponseToAohAndViolenceDA = (applicant: PartyDetails, taskListItems, userCase) => {
  return {
    id: 'applicant_response_to_other_side_allegation_of_harm',
    text: taskListItems.applicant_response_to_other_side_allegation_of_harm.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: URL.APPLICANT + URL.APPLICANT_RESPONSE_TO_AOH_VIOLENCE,
  };
};
const getApplicantPositionStatementsDA = (applicant: PartyDetails, taskListItems, url) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: url + URL.POSITION_STATEMENTS + '?name=' + applicant.firstName + ' ' + applicant.lastName,
  };
};
const getApplicantWitnessStatementsDA = (applicant: PartyDetails, taskListItems, url) => {
  return {
    id: 'applicant_witness_statements',
    text: taskListItems.applicant_witness_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: `${url}${URL.YOUR_WITNESS_STATEMENTS}` + '?name=' + applicant.firstName + ' ' + applicant.lastName,
  };
};
