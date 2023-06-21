/* eslint-disable no-fallthrough */
import {
  Applicant,
  CaseType,
  PartyDetails,
  Respondent,
  YesNoDontKnow,
  YesOrNo,
} from '../../../../../app/case/definition';
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
    getAttendingTheHearingDocs(sectionTitles, taskListItems, URL.APPLICANT, userCase),
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
  const flags = {
    isDrugDocUploaded: false,
    isPaternityDocUploaded: false,
    isPreviousOrdersSubmitted: false,
    isMedicalReportsUploaded: false,
    isLettersFromSchool: false,
    isMedicalRecordsUpload: false,
    isDigitalDownloadsUploaded: false,
    isPoliceReportUploaded: false,
    isWitnessAvailabilityUploaded: false,
    isTenancyUploaded: false,
  };

  for (const doc of userCase?.citizenUploadedDocumentList || []) {
    if (doc.value.isApplicant === YesOrNo.YES) {
      getUpdatedFlags(doc, flags);
    }
  }
  const applicantItems: object[] = [];
  if (userCase.caseTypeOfApplication === 'C100') {
    userCase.applicants.forEach((applicant: Applicant) => {
      applicantItems.push(getApplicantRequestToCA(applicant, taskListItems));
    });
    userCase.applicants.forEach((applicant: Applicant) => {
      if (userCase.c1ADocument) {
        applicantItems.push(getApplicantAohAndViolence(applicant, taskListItems, userCase));
      }
    });
    /** Uncomment and add condition when Response to AOH document is implemeted for Applicant */
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
    if (!isApplicant) {
      applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems, url));
      applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems, url));
    } else {
      applicantItems.push(getApplicantRequestToDA(userCase.applicantsFL401, taskListItems));
      applicantItems.push(getApplicantAohAndViolenceDA(userCase.applicantsFL401, taskListItems, userCase));
      applicantItems.push(getApplicantResponseToAohAndViolenceDA(userCase.applicantsFL401, taskListItems));
      applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems, url));
      applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems, url));
    }
  }

  applicantItems.push({
    id: 'other_people_witness_statements',
    text: taskListItems.other_people_witness_statements,
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS,
  });

  applicantItems.push(isMedicalReportsUploadedd(taskListItems, url, flags.isMedicalReportsUploaded));

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

  applicantItems.push(isPreviousOrdersSubmittedd(taskListItems, url, flags.isPreviousOrdersSubmitted));

  applicantItems.push(isLettersFromSchoold(taskListItems, url, flags.isLettersFromSchool));

  applicantItems.push(isDigitalDownloadsUploadedd(taskListItems, url, flags.isDigitalDownloadsUploaded));

  applicantItems.push(isMedicalRecordsUploadd(taskListItems, url, flags.isMedicalRecordsUpload));

  applicantItems.push(isPaternityDocUploadedd(taskListItems, url, flags.isPaternityDocUploaded));

  applicantItems.push(isDrugDocUploadedd(taskListItems, url, flags.isDrugDocUploaded));

  if (flags.isPoliceReportUploaded) {
    applicantItems.push({
      id: 'police_disclosures',
      text: taskListItems.police_disclosures,
      href: url + URL.POLICE_DISCLOSURE + '?byApplicant=Yes',
    });
  }
  if (flags.isWitnessAvailabilityUploaded) {
    applicantItems.push({
      id: 'witness_availability',
      text: taskListItems.witness_availability,
      href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=Yes',
    });
  }
  if (flags.isTenancyUploaded) {
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalReportsUploadedd = (taskListItems, url, isMedicalReportsUploaded): any => {
  if (isMedicalReportsUploaded) {
    return {
      id: 'medical_reports',
      text: taskListItems.medical_reports,
      href: url + URL.MEDICAL_REPORTS + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPreviousOrdersSubmittedd = (taskListItems, url, isPreviousOrdersSubmitted): any => {
  if (isPreviousOrdersSubmitted) {
    return {
      id: 'previous_orders_submitted',
      text: taskListItems.previous_orders_submitted,
      href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isLettersFromSchoold = (taskListItems, url, isLettersFromSchool): any => {
  if (isLettersFromSchool) {
    return {
      id: 'letters_from_school',
      text: taskListItems.letters_from_school,
      href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDigitalDownloadsUploadedd = (taskListItems, url, isDigitalDownloadsUploaded): any => {
  if (isDigitalDownloadsUploaded) {
    return {
      id: 'digital_downloads',
      text: taskListItems.digital_downloads,
      href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalRecordsUploadd = (taskListItems, url, isMedicalRecordsUpload): any => {
  if (isMedicalRecordsUpload) {
    return {
      id: 'medical_records',
      text: taskListItems.medical_records,
      href: url + URL.MEDICAL_RECORDS + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPaternityDocUploadedd = (taskListItems, url, isPaternityDocUploaded): any => {
  if (isPaternityDocUploaded) {
    return {
      id: 'paternity_test_reports',
      text: taskListItems.paternity_test_reports,
      href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=Yes',
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDrugDocUploadedd = (taskListItems, url, isDrugDocUploaded): any => {
  if (isDrugDocUploaded) {
    return {
      id: 'drug_alcohol_tests',
      text: taskListItems.drug_alcohol_tests,
      href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=Yes',
    };
  }
};

export const getRespondentDocuments = (sectionTitles, taskListItems, userCase, isApplicant) => {
  let url = URL.APPLICANT;
  if (!isApplicant) {
    url = URL.RESPONDENT;
  }
  const flags = {
    isDrugDocUploaded: false,
    isPaternityDocUploaded: false,
    isPreviousOrdersSubmitted: false,
    isMedicalReportsUploaded: false,
    isLettersFromSchool: false,
    isMedicalRecordsUpload: false,
    isDigitalDownloadsUploaded: false,
    isPoliceReportUploaded: false,
    isWitnessAvailabilityUploaded: false,
    isTenancyUploaded: false,
  };

  for (const doc of userCase?.citizenUploadedDocumentList || []) {
    if (doc.value.isApplicant === YesOrNo.NO) {
      getUpdatedFlags(doc, flags);
    }
  }
  const respondentItems: object[] = [];
  const respondentItems2: object[] = [];
  if (userCase.caseTypeOfApplication === 'C100') {
    userCase.respondents.forEach((respondent: Respondent) => {
      if (userCase.citizenResponseC7DocumentList) {
        respondentItems.push(getResponseToCA(respondent, taskListItems, userCase.citizenResponseC7DocumentList));
      }
      if(userCase.respondentDocsList) {
        respondentItems.push(getResponseFromSolicitors(respondent, taskListItems, userCase.respondentDocsList));
      }
      respondentItems2.push(getRespondentPositionStatements(respondent, taskListItems, url));
      respondentItems2.push(getRespondentWitnessStatements(respondent, taskListItems, userCase, url));
    });
  } else if (userCase.caseTypeOfApplication === 'DO_NOT_SHOW') {
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToAohAndViolence(respondent, taskListItems, userCase));
      respondentItems.push(getAohAndViolence(respondent, taskListItems));
    });
  } else {
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

  respondentItems.push(isPreviousOrdersSubmittedRespondent(taskListItems, url, flags.isPreviousOrdersSubmitted));

  respondentItems.push(isLettersFromSchoolRespondent(taskListItems, url, flags.isLettersFromSchool));

  respondentItems2.push({
    id: 'other_people_witness_statements_respondent',
    text: taskListItems.other_people_witness_statements_respondent,
    href: url + URL.OTHER_PEOPLE_WITNESS_STATEMENTS + '?byApplicant=No',
  });

  respondentItems2.push(isDigitalDownloadsUploadedRespondent(taskListItems, url, flags.isDigitalDownloadsUploaded));

  respondentItems2.push(isMedicalRecordsUploadRespondent(taskListItems, url, flags.isMedicalRecordsUpload));

  respondentItems2.push(isMedicalReportsUploadedRespondent(taskListItems, url, flags.isMedicalReportsUploaded));

  respondentItems2.push(isPaternityDocUploadedRespondent(taskListItems, url, flags.isPaternityDocUploaded));

  respondentItems2.push(isDrugDocUploadedRespondent(taskListItems, url, flags.isDrugDocUploaded));

  if (flags.isPoliceReportUploaded) {
    respondentItems2.push({
      id: 'police_disclosures_respondent',
      text: taskListItems.police_disclosures_respondent,
      href: url + URL.POLICE_DISCLOSURE + '?byApplicant=No',
    });
  }
  if (flags.isWitnessAvailabilityUploaded) {
    respondentItems2.push({
      id: 'witness_availability_respondent',
      text: taskListItems.witness_availability_respondent,
      href: url + URL.WITNESS_AVAILABILITY + '?byApplicant=No',
    });
  }
  if (flags.isTenancyUploaded) {
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPreviousOrdersSubmittedRespondent = (taskListItems, url, isPreviousOrdersSubmitted): any => {
  if (isPreviousOrdersSubmitted) {
    return {
      id: 'previous_orders_submitted_respondent',
      text: taskListItems.previous_orders_submitted_respondent,
      href: url + URL.PREVIOUS_ORDERS_SUBMITTED + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isLettersFromSchoolRespondent = (taskListItems, url, isLettersFromSchool): any => {
  if (isLettersFromSchool) {
    return {
      id: 'letters_from_school_respondent',
      text: taskListItems.letters_from_school_respondent,
      href: url + URL.LETTER_FROM_SCHOOL + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDigitalDownloadsUploadedRespondent = (taskListItems, url, isDigitalDownloadsUploaded): any => {
  if (isDigitalDownloadsUploaded) {
    return {
      id: 'digital_downloads_respondent',
      text: taskListItems.digital_downloads_respondent,
      href: url + URL.DIGITAL_DOWNLOADS + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalRecordsUploadRespondent = (taskListItems, url, isMedicalRecordsUpload): any => {
  if (isMedicalRecordsUpload) {
    return {
      id: 'medical_records_respondent',
      text: taskListItems.medical_records_respondent,
      href: url + URL.MEDICAL_RECORDS + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalReportsUploadedRespondent = (taskListItems, url, isMedicalReportsUploaded): any => {
  if (isMedicalReportsUploaded) {
    return {
      id: 'medical_reports_respondent',
      text: taskListItems.medical_reports_respondent,
      href: url + URL.MEDICAL_REPORTS + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPaternityDocUploadedRespondent = (taskListItems, url, isPaternityDocUploaded): any => {
  if (isPaternityDocUploaded) {
    return {
      id: 'paternity_test_reports_respondent',
      text: taskListItems.paternity_test_reports_respondent,
      href: url + URL.PATERNITY_TEST_REPORTS + '?byApplicant=No',
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDrugDocUploadedRespondent = (taskListItems, url, isDrugDocUploaded): any => {
  if (isDrugDocUploaded) {
    return {
      id: 'drug_alcohol_tests_respondent',
      text: taskListItems.drug_alcohol_tests_respondent,
      href: url + URL.DRUG_ALCOHOL_TESTS + '?byApplicant=No',
    };
  }
};

export const getUpdatedFlags = (doc, flags) => {
  switch (doc.value.documentType) {
    case applicant_tasklist_items_all_docs_en.drug_alcohol_tests:
      flags.isDrugDocUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.paternity_test_reports:
      flags.isPaternityDocUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.medical_reports:
      flags.isMedicalReportsUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.previous_orders_submitted:
      flags.isPreviousOrdersSubmitted = true;
      break;
    case applicant_tasklist_items_all_docs_en.letters_from_school:
      flags.isLettersFromSchool = true;
      break;
    case applicant_tasklist_items_all_docs_en.medical_records:
      flags.isMedicalRecordsUpload = true;
      break;
    case applicant_tasklist_items_all_docs_en.digital_downloads:
      flags.isDigitalDownloadsUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.police_disclosures:
      flags.isPoliceReportUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.witness_availability:
      flags.isWitnessAvailabilityUploaded = true;
      break;
    case applicant_tasklist_items_all_docs_en.tenancy_and_mortgage_availability:
      flags.isTenancyUploaded = true;
      break;
    default:
      break;
  }
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
  if (url.includes(URL.APPLICANT)) {
    url = url + URL.OTHER_DOCUMENTS + '?byApplicant=Yes';
  } else {
    url = url + URL.OTHER_DOCUMENTS + '?byApplicant=No';
  }
  return {
    title: sectionTitles.otherDocuments,
    items: [
      {
        id: 'other_documents',
        text: taskListItems.other_documents,
        href: url,
      },
    ],
  };
};

export const getAttendingTheHearingDocs = (sectionTitles, taskListItems, url, caseData) => {
  const config = {
    title: sectionTitles.attendingTheHearing,
    items: [
      {
        id: 'notice_of_hearing',
        text: taskListItems.notice_of_hearing,
        href: '#',
      },
      {
        id: 'support_you_need_during_your_case',
        text: taskListItems.support_you_need_during_your_case,
        href: url + '/support-you-need-during-case/attending-the-court',
      },
    ],
  };

  if (url !== URL.RESPONDENT && caseData && caseData?.caseTypeOfApplication === CaseType.C100) {
    config.items = config.items.filter(item => item.id !== 'support_you_need_during_your_case');
  }

  return config;
};

export const getResponseToCA = (respondent: Respondent, taskListItems, citizenResponseC7DocumentList) => {
  for (const doc of citizenResponseC7DocumentList) {
    if (doc.value.partyName === respondent.value.firstName + ' ' + respondent.value.lastName) {
      return {
        id: 'respondent_response_to_request_for_child_arrangements',
        text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
          '<namerespondentxxxxx>',
          respondent.value.firstName + ' ' + respondent.value.lastName
        ),
        href: URL.APPLICANT + URL.RESPONDENT_CA_RESPONSE + '/' + respondent.id,
      };
    }
  }
  return {};
};

export const getResponseFromSolicitors = (respondent: Respondent, taskListItems, respondentDocsList) => {
  for (const doc of respondentDocsList) {
    if (doc.value.c1aDocument.partyName === respondent.value.firstName + ' ' + respondent.value.lastName) {
      return {
        id: 'respondent_allegations_of_harm_from_solicitor',
        text: taskListItems.respondent_allegations_of_harm_from_solicitor_for_child_arrangements.replace(
          '<namerespondentxxxxx>',
          doc.value.c1aDocument.partyName
        ),
        href: URL.RESPONDENT_C1A_RESPONSE_FROM_SOLICITOR,
      };
    }
    if (doc.value.c7Document.partyName === respondent.value.firstName + ' ' + respondent.value.lastName) {
      return {
        id: 'respondent_response_from_solicitor_to_request_for_child_arrangements',
        text: taskListItems.respondent_response_to_request_for_child_arrangements.replace(
          '<namerespondentxxxxx>',
          respondent.value.firstName + ' ' + respondent.value.lastName
        ),
        href: URL.RESPONDENT_C7_RESPONSE_FROM_SOLICITOR,
      };
    }
  }
  return {};
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

export const getResponseToAohAndViolence = (respondent: Respondent, taskListItems, userCase) => {
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
    href:
      url +
      URL.POSITION_STATEMENTS +
      '?name=' +
      respondent.value.firstName +
      ' ' +
      respondent.value.lastName +
      '&byApplicant=No',
  };
};

const getRespondentWitnessStatements = (respondent: Respondent, taskListItems, userCase, url) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href:
      url +
      URL.YOUR_WITNESS_STATEMENTS +
      '?name=' +
      respondent.value.firstName +
      ' ' +
      respondent.value.lastName +
      '&byApplicant=No',
  };
};

const getRespondentPositionStatementsDA = (respondent: PartyDetails, taskListItems, url) => {
  return {
    id: 'respondent_position_statements',
    text: taskListItems.respondent_position_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href:
      url + URL.POSITION_STATEMENTS + '?name=' + respondent.firstName + ' ' + respondent.lastName + '&byApplicant=No',
  };
};

const getRespondentWitnessStatementsDA = (respondent: PartyDetails, taskListItems, userCase, url) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href:
      url +
      URL.YOUR_WITNESS_STATEMENTS +
      '?name=' +
      respondent.firstName +
      ' ' +
      respondent.lastName +
      '&byApplicant=No',
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
    href: getApplicantAllegationsOfHarmAndViolence(userCase)
      ? URL.ALLEGATION_OF_HARM_VOILENCE
      : URL.ALLEGATION_OF_HARM_VOILENCE_DOC,
  };
};
export const getApplicantResponseToAohAndViolence = (applicant: Applicant, taskListItems) => {
  return {
    id: 'applicant_response_to_other_side_allegation_of_harm',
    text: taskListItems.applicant_response_to_other_side_allegation_of_harm.replace(
      '<nameapplicantxxxxx>',
      `${applicant.value.firstName} ${applicant.value.lastName}`
    ),
    href: URL.APPLICANT + URL.RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC,
  };
};
const getApplicantPositionStatements = (applicant: Applicant, taskListItems, url) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href:
      url +
      URL.POSITION_STATEMENTS +
      '?name=' +
      applicant.value.firstName +
      ' ' +
      applicant.value.lastName +
      '&byApplicant=Yes',
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
      `${url}${URL.YOUR_WITNESS_STATEMENTS}` +
      '?name=' +
      applicant.value.firstName +
      ' ' +
      applicant.value.lastName +
      '&byApplicant=Yes',
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
    href: getApplicantAllegationsOfHarmAndViolence(userCase)
      ? URL.ALLEGATION_OF_HARM_VOILENCE
      : URL.APPLICANT + URL.ALLEGATION_OF_HARM_VOILENCE_DOC,
  };
};
const getApplicantResponseToAohAndViolenceDA = (applicant: PartyDetails, taskListItems) => {
  return {
    id: 'applicant_response_to_other_side_allegation_of_harm',
    text: taskListItems.applicant_response_to_other_side_allegation_of_harm.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: URL.APPLICANT + URL.RESPOND_TO_OTHERS_ALLEGATION_OF_HARM_VOILENCE_DOC,
  };
};
const getApplicantPositionStatementsDA = (applicant: PartyDetails, taskListItems, url) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: `${url}${URL.POSITION_STATEMENTS}?name=${applicant.firstName} ${applicant.lastName}&byApplicant=Yes`,
  };
};

const getApplicantWitnessStatementsDA = (applicant: PartyDetails, taskListItems, url) => {
  return {
    id: 'applicant_witness_statements',
    text: taskListItems.applicant_witness_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href:
      `${url}${URL.YOUR_WITNESS_STATEMENTS}` +
      '?name=' +
      applicant.firstName +
      ' ' +
      applicant.lastName +
      '&byApplicant=Yes',
  };
};
