import { Applicant, PartyDetails, Respondent, YesNoDontKnow, YesOrNo } from '../../../../../app/case/definition';
import * as URL from '../../../../urls';
import { getApplicantAllegationsOfHarmAndViolence } from '../../../task-list/utils';

import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateApplicantTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    ...getOrdersFromCourt(sectionTitles, taskListItems, userCase, URL.APPLICANT_ORDERS_FROM_THE_COURT),
    getApplicantDocuments(sectionTitles, taskListItems, userCase, true),
    getRespondentDocuments(sectionTitles, taskListItems, userCase, true),
    getCafcassDocuments(sectionTitles, taskListItems, userCase, URL.APPLICANT),
    getOtherDocuments(sectionTitles, taskListItems, userCase, URL.APPLICANT),
    getAttendingTheHearingDocs(sectionTitles, taskListItems, URL.APPLICANT),
  ];
};

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

  let isDrugDocUploaded = false,
    isPaternityDocUploaded = false,
    isPreviousOrdersSubmitted = false,
    isMedicalReportsUploaded = false,
    isLettersFromSchool = false,
    isMedicalRecordsUpload = false,
    isDigitalDownloadsUploaded = false,
    isPoliceReportUploaded = false,
    isWitnessAvailabilityUploaded = false,
    isTenancyUploaded = false;

  for (const doc of userCase?.citizenUploadedDocumentList || []) {
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.drug_alcohol_tests &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isDrugDocUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.paternity_test_reports &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isPaternityDocUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.medical_reports &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isMedicalReportsUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.previous_orders_submitted &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isPreviousOrdersSubmitted = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.letters_from_school &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isLettersFromSchool = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.medical_records &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isMedicalRecordsUpload = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.digital_downloads &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isDigitalDownloadsUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.police_disclosures &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isPoliceReportUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.witness_availability &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isWitnessAvailabilityUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.tenancy_and_mortgage_availability &&
      doc.value.isApplicant === YesOrNo.YES
    ) {
      isTenancyUploaded = true;
    }
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
      applicantItems.push(getApplicantResponseToAohAndViolence(applicant, taskListItems));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantPositionStatements(applicant, taskListItems, url));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantWitnessStatements(applicant, taskListItems, url));
    });
  } else {
    applicantItems.push(getApplicantRequestToDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantAohAndViolenceDA(userCase.applicantsFL401, taskListItems, userCase));
    applicantItems.push(getApplicantResponseToAohAndViolenceDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems, url));
    applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems, url));
  }

  applicantItems.push({
    id: 'other_people_witness_statements',
    text: taskListItems.other_people_witness_statements,
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS,
  });

  if (isMedicalReportsUploaded) {
    applicantItems.push({
      id: 'medical_reports',
      text: taskListItems.medical_reports,
      href: url + URL.MEDICAL_REPORTS + '?byApplicant=Yes',
    });
  }

  if (userCase.miamCertificationDocumentUpload) {
    applicantItems.push({
      id: 'miam_certificate',
      text: taskListItems.miam_certificate,
      href: url + URL.APPLICANT_MIAM_CERTIFICATE + '?byApplicant=Yes',
    });
  }
  if (userCase?.previousOrOngoingProceedingsForChildren === YesNoDontKnow.yes) {
    applicantItems.push({
      id: 'applications_made_in_these_proceedings',
      text: taskListItems.applications_made_in_these_proceedings,
      href: url + URL.APPLICATION_MADE_IN_THESE_PRCEEDINGS,
    });
  }
  if (isPreviousOrdersSubmitted) {
    applicantItems.push({
      id: 'previous_orders_submitted',
      text: taskListItems.previous_orders_submitted,
      href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=Yes',
    });
  }
  if (isLettersFromSchool) {
    applicantItems.push({
      id: 'letters_from_school',
      text: taskListItems.letters_from_school,
      href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=Yes',
    });
  }
  if (isDigitalDownloadsUploaded) {
    applicantItems.push({
      id: 'digital_downloads',
      text: taskListItems.digital_downloads,
      href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=Yes',
    });
  }
  if (isMedicalRecordsUpload) {
    applicantItems.push({
      id: 'medical_records',
      text: taskListItems.medical_records,
      href: url + URL.MEDICAL_RECORDS + '?byApplicant=Yes',
    });
  }

  if (isPaternityDocUploaded) {
    applicantItems.push({
      id: 'paternity_test_reports',
      text: taskListItems.paternity_test_reports,
      href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=Yes',
    });
  }
  if (isDrugDocUploaded) {
    applicantItems.push({
      id: 'drug_alcohol_tests',
      text: taskListItems.drug_alcohol_tests,
      href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=Yes',
    });
  }
  if (isPoliceReportUploaded) {
    applicantItems.push({
      id: 'police_disclosures',
      text: taskListItems.police_disclosures,
      href: url + URL.POLICE_DISCLOSURE + '?byApplicant=Yes',
    });
  }
  if (isWitnessAvailabilityUploaded) {
    applicantItems.push({
      id: 'witness_availability',
      text: taskListItems.witness_availability,
      href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=Yes',
    });
  }
  if (isTenancyUploaded) {
    applicantItems.push({
      id: 'tenancy_and_mortgage_availability',
      text: taskListItems.tenancy_and_mortgage_availability,
      href: url + URL.TENANCY_AND_MORTGAGE_AVAILABILITY + '?byApplicant=Yes',
    });
  }

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
  let isDrugDocUploaded = false,
    isPaternityDocUploaded = false,
    isPreviousOrdersSubmitted = false,
    isMedicalReportsUploaded = false,
    isLettersFromSchool = false,
    isMedicalRecordsUpload = false,
    isDigitalDownloadsUploaded = false,
    isPoliceReportUploaded = false,
    isWitnessAvailabilityUploaded = false,
    isTenancyUploaded = false;

  for (const doc of userCase?.citizenUploadedDocumentList || []) {
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.drug_alcohol_tests &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isDrugDocUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.paternity_test_reports &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isPaternityDocUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.medical_reports &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isMedicalReportsUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.previous_orders_submitted &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isPreviousOrdersSubmitted = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.letters_from_school &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isLettersFromSchool = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.medical_records &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isMedicalRecordsUpload = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.digital_downloads &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isDigitalDownloadsUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.police_disclosures &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isPoliceReportUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.witness_availability &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isWitnessAvailabilityUploaded = true;
    }
    if (
      doc.value.documentType === applicant_tasklist_items_all_docs_en.tenancy_and_mortgage_availability &&
      doc.value.isApplicant === YesOrNo.NO
    ) {
      isTenancyUploaded = true;
    }
  }
  const respondentItems: object[] = [];
  const respondentItems2: object[] = [];
  if (userCase.caseTypeOfApplication === 'C100') {
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToCA(respondent, taskListItems));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToAohAndViolence(respondent, taskListItems, userCase));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getAohAndViolence(respondent, taskListItems));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems2.push(getRespondentPositionStatements(respondent, taskListItems, url));
    });
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems2.push(getRespondentWitnessStatements(respondent, taskListItems, userCase, url));
    });
  } else {
    respondentItems.push(getResponseToDA(userCase.respondentsFL401, taskListItems));
    respondentItems.push(getResponseToAohAndViolenceDA(userCase.respondentsFL401, taskListItems, userCase));
    respondentItems.push(getAohAndViolenceDA(userCase.respondentsFL401, taskListItems));
    respondentItems2.push(getRespondentPositionStatementsDA(userCase.respondentsFL401, taskListItems, url));
    respondentItems2.push(getRespondentWitnessStatementsDA(userCase.respondentsFL401, taskListItems, userCase, url));
  }
  if (userCase.previousOrOngoingProceedingsForChildren === YesNoDontKnow.yes) {
    respondentItems.push({
      id: 'applications_made_in_these_proceedings_respondent',
      text: taskListItems.applications_made_in_these_proceedings_respondent,
      href: url + URL.APPLICATION_MADE_IN_THESE_PRCEEDINGS,
    });
  }
  if (isPreviousOrdersSubmitted) {
    respondentItems.push({
      id: 'previous_orders_submitted_respondent',
      text: taskListItems.previous_orders_submitted_respondent,
      href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=No',
    });
  }
  if (isLettersFromSchool) {
    respondentItems.push({
      id: 'letters_from_school_respondent',
      text: taskListItems.letters_from_school_respondent,
      href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=No',
    });
  }

  respondentItems2.push({
    id: 'other_people_witness_statements_respondent',
    text: taskListItems.other_people_witness_statements_respondent,
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS + '?byApplicant=No',
  });
  if (isDigitalDownloadsUploaded) {
    respondentItems2.push({
      id: 'digital_downloads_respondent',
      text: taskListItems.digital_downloads_respondent,
      href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=No',
    });
  }
  if (isMedicalRecordsUpload) {
    respondentItems2.push({
      id: 'medical_records_respondent',
      text: taskListItems.medical_records_respondent,
      href: url + URL.MEDICAL_RECORDS + '?byApplicant=No',
    });
  }
  if (isMedicalReportsUploaded) {
    respondentItems2.push({
      id: 'medical_reports_respondent',
      text: taskListItems.medical_reports_respondent,
      href: url + URL.MEDICAL_REPORTS + '?byApplicant=No',
    });
  }
  if (isPaternityDocUploaded) {
    respondentItems2.push({
      id: 'paternity_test_reports_respondent',
      text: taskListItems.paternity_test_reports_respondent,
      href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=No',
    });
  }
  if (isDrugDocUploaded) {
    respondentItems2.push({
      id: 'drug_alcohol_tests_respondent',
      text: taskListItems.drug_alcohol_tests_respondent,
      href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=No',
    });
  }
  if (isPoliceReportUploaded) {
    respondentItems2.push({
      id: 'police_disclosures_respondent',
      text: taskListItems.police_disclosures_respondent,
      href: url + URL.POLICE_DISCLOSURE + '?byApplicant=No',
    });
  }
  if (isWitnessAvailabilityUploaded) {
    respondentItems2.push({
      id: 'witness_availability_respondent',
      text: taskListItems.witness_availability_respondent,
      href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=No',
    });
  }
  if (isTenancyUploaded) {
    respondentItems2.push({
      id: 'tenancy_and_mortgage_availability',
      text: taskListItems.tenancy_and_mortgage_availability,
      href: url + URL.TENANCY_AND_MORTGAGE_AVAILABILITY + '?byApplicant=No',
    });
  }

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
        text: taskListItems.safeguarding_letter,
        href: url + URL.RESPONDENT_SAFEGUARDING_LETTER,
      },
      {
        id: 'section7_report',
        text: taskListItems.section7_report,
        href: url + URL.RESPONDENT_SECTION7_REPORT,
      },
      {
        id: 'section37_report',
        text: taskListItems.section37_report,
        href: url + URL.RESPONDENT_SECTION37_REPORT,
      },
      {
        id: 'risk_assessment_16a',
        text: taskListItems.risk_assessment_16a,
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
        id: 'other_documents',
        text: taskListItems.other_documents,
        href: url + URL.OTHER_DOCUMENTS,
      },
    ],
  };
};

export const getAttendingTheHearingDocs = (sectionTitles, taskListItems, url) => {
  return {
    title: sectionTitles.attendingTheHearing,
    items: [
      {
        id: 'notice_of_hearing',
        text: taskListItems.notice_of_hearing,
        href: url + URL.RESPONDENT_NOTICE_OF_HEARING,
      },
      {
        id: 'support_you_need_during_your_case',
        text: taskListItems.support_you_need_during_your_case,
        href: url + URL.RESPONDENT_SUPPORT_NEEDED,
      },
    ],
  };
};

const getResponseToCA = (respondent: Respondent, taskListItems) => {
  return {
    id: 'respondent_response_to_request_for_child_arrangements',
    text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE,
  };
};

const getAohAndViolence = (respondent: Respondent, taskListItems) => {
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

const getResponseToDA = (respondent: PartyDetails, taskListItems) => {
  return {
    id: 'respondent_response_to_request_for_child_arrangements',
    text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE,
  };
};

const getAohAndViolenceDA = (respondent: PartyDetails, taskListItems) => {
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
const getApplicantResponseToAohAndViolence = (applicant: Applicant, taskListItems) => {
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
const getApplicantResponseToAohAndViolenceDA = (applicant: PartyDetails, taskListItems) => {
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
