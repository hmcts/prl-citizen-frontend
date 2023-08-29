/* eslint-disable no-fallthrough */
import {
  Applicant,
  CaseType,
  DocType,
  PartyDetails,
  PartyType,
  Respondent,
  YesNoDontKnow,
  YesOrNo,
} from '../../../../../app/case/definition';
import { applyParms } from '../../../../../steps/common/url-parser';
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
    getOtherDocuments(sectionTitles, taskListItems, URL.APPLICANT),
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
    Object.assign(applicantItems, applicantItemsForC100(userCase, taskListItems));
  } else {
    Object.assign(applicantItems, applicantItemsForFL401(isApplicant, userCase, taskListItems));
  }

  applicantItems.push({
    id: 'other_people_witness_statements',
    text: taskListItems.other_people_witness_statements,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.OTHER_PEOPLE_WITNESS_STATEMENTS,
      uploadedBy: PartyType.APPLICANT,
    }),
  });

  applicantItems.push(isMedicalReportsUploadedd(taskListItems, flags.isMedicalReportsUploaded));

  if (userCase.miamCertificationDocumentUpload) {
    applicantItems.push({
      id: 'miam_certificate',
      text: taskListItems.miam_certificate,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.MIAM_CERTIFICATE,
        uploadedBy: PartyType.APPLICANT,
      }),
    });
  }
  if (userCase?.previousOrOngoingProceedingsForChildren === YesNoDontKnow.yes) {
    applicantItems.push({
      id: 'applications_made_in_these_proceedings',
      text: taskListItems.applications_made_in_these_proceedings,
      href: url + URL.APPLICATION_MADE_IN_THESE_PRCEEDINGS,
    });
  }

  applicantItems.push(isPreviousOrdersSubmittedd(taskListItems, flags.isPreviousOrdersSubmitted));

  applicantItems.push(isLettersFromSchoold(taskListItems, flags.isLettersFromSchool));

  applicantItems.push(isDigitalDownloadsUploadedd(taskListItems, flags.isDigitalDownloadsUploaded));

  applicantItems.push(isMedicalRecordsUploadd(taskListItems, flags.isMedicalRecordsUpload));

  applicantItems.push(isPaternityDocUploadedd(taskListItems, flags.isPaternityDocUploaded));

  applicantItems.push(isDrugDocUploadedd(taskListItems, flags.isDrugDocUploaded));

  if (flags.isPoliceReportUploaded) {
    applicantItems.push({
      id: 'police_disclosures',
      text: taskListItems.police_disclosures,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.POLICE_REPORTS,
        uploadedBy: PartyType.APPLICANT,
      }),
    });
  }
  if (flags.isWitnessAvailabilityUploaded) {
    applicantItems.push({
      id: 'witness_availability',
      text: taskListItems.witness_availability,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.WITNESS_AVAILABILITY,
        uploadedBy: PartyType.APPLICANT,
      }),
    });
  }
  if (flags.isTenancyUploaded) {
    applicantItems.push({
      id: 'tenancy_and_mortgage_availability',
      text: taskListItems.tenancy_and_mortgage_availability,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.TENANCY_AND_MORTGAGE_AVAILABILITY,
        uploadedBy: PartyType.APPLICANT,
      }),
    });
  }

  return {
    title: sectionTitles.applicantsDocuments,
    items: applicantItems,
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalReportsUploadedd = (taskListItems, isMedicalReportsUploaded): any => {
  if (isMedicalReportsUploaded) {
    return {
      id: 'medical_reports',
      text: taskListItems.medical_reports,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.MEDICAL_REPORTS,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPreviousOrdersSubmittedd = (taskListItems, isPreviousOrdersSubmitted): any => {
  if (isPreviousOrdersSubmitted) {
    return {
      id: 'previous_orders_submitted',
      text: taskListItems.previous_orders_submitted,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.PREVIOUS_ORDERS,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isLettersFromSchoold = (taskListItems, isLettersFromSchool): any => {
  if (isLettersFromSchool) {
    return {
      id: 'letters_from_school',
      text: taskListItems.letters_from_school,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.LETTERS_FROM_SCHOOL,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDigitalDownloadsUploadedd = (taskListItems, isDigitalDownloadsUploaded): any => {
  if (isDigitalDownloadsUploaded) {
    return {
      id: 'digital_downloads',
      text: taskListItems.digital_downloads,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.DIGITAL_DOWNLOADS,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isMedicalRecordsUploadd = (taskListItems, isMedicalRecordsUpload): any => {
  if (isMedicalRecordsUpload) {
    return {
      id: 'medical_records',
      text: taskListItems.medical_records,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.MEDICAL_RECORDS,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isPaternityDocUploadedd = (taskListItems, isPaternityDocUploaded): any => {
  if (isPaternityDocUploaded) {
    return {
      id: 'paternity_test_reports',
      text: taskListItems.paternity_test_reports,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.PATERNITY_TEST_REPORTS,
        uploadedBy: PartyType.APPLICANT,
      }),
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDrugDocUploadedd = (taskListItems, isDrugDocUploaded): any => {
  if (isDrugDocUploaded) {
    return {
      id: 'drug_alcohol_tests',
      text: taskListItems.drug_alcohol_tests,
      href: applyParms(URL.VIEW_DOCUMENT_URL, {
        docType: DocType.DRUG_ALCOHOL_TESTS,
        uploadedBy: PartyType.APPLICANT,
      }),
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
    Object.assign(respondentItems, responseFromOtherPeople(userCase, taskListItems));
    userCase.respondents.forEach((respondent: Respondent) => {
      if (userCase.citizenResponseC7DocumentList) {
        respondentItems.push(getResponseToCA(respondent, taskListItems, userCase.citizenResponseC7DocumentList));
      }
      respondentItems2.push(getRespondentPositionStatements(respondent, taskListItems));
      respondentItems2.push(getRespondentWitnessStatements(respondent, taskListItems));
    });
  } else if (userCase.caseTypeOfApplication === 'DO_NOT_SHOW') {
    userCase.respondents.forEach((respondent: Respondent) => {
      respondentItems.push(getResponseToAohAndViolence(respondent, taskListItems, userCase));
      respondentItems.push(getAohAndViolence(respondent, taskListItems));
    });
  } else {
    respondentItems2.push(getRespondentPositionStatementsDA(userCase.respondentsFL401, taskListItems));
    respondentItems2.push(getRespondentWitnessStatementsDA(userCase.respondentsFL401, taskListItems));
  }
  if (userCase.previousOrOngoingProceedingsForChildren === YesNoDontKnow.yes) {
    respondentItems.push({
      id: 'applications_made_in_these_proceedings_respondent',
      text: taskListItems.applications_made_in_these_proceedings_respondent,
      href: url + URL.APPLICATION_MADE_IN_THESE_PRCEEDINGS,
    });
  }

  if (flags.isPreviousOrdersSubmitted) {
    respondentItems.push(previousOrdersSubmittedByRespondent(taskListItems));
  }
  if (flags.isLettersFromSchool) {
    respondentItems.push(lettersFromSchoolByRespondent(taskListItems));
  }
  respondentItems2.push({
    id: 'other_people_witness_statements_respondent',
    text: taskListItems.other_people_witness_statements_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.OTHER_PEOPLE_WITNESS_STATEMENTS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  });
  if (flags.isDigitalDownloadsUploaded) {
    respondentItems2.push(digitalDownloadsUploadedByRespondent(taskListItems));
  }
  if (flags.isMedicalRecordsUpload) {
    respondentItems2.push(medicalRecordsUploadByRespondent(taskListItems));
  }
  if (flags.isMedicalReportsUploaded) {
    respondentItems2.push(medicalReportsUploadedByRespondent(taskListItems));
  }
  if (flags.isPaternityDocUploaded) {
    respondentItems2.push(paternityDocUploadedByRespondent(taskListItems));
  }
  if (flags.isDrugDocUploaded) {
    respondentItems2.push(drugDocUploadedByRespondent(taskListItems));
  }
  if (flags.isPoliceReportUploaded) {
    respondentItems2.push(policeReportUploadedByRespondent(taskListItems));
  }
  if (flags.isWitnessAvailabilityUploaded) {
    respondentItems2.push(witnessAvailabilityUploadedByRespondent(taskListItems));
  }
  if (flags.isTenancyUploaded) {
    respondentItems2.push(tenancyUploadedByRespondent(taskListItems));
  }

  return {
    title: sectionTitles.respondentsDocuments,
    items: [...respondentItems, ...respondentItems2],
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const previousOrdersSubmittedByRespondent = (taskListItems): any => {
  return {
    id: 'previous_orders_submitted_respondent',
    text: taskListItems.previous_orders_submitted_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.PREVIOUS_ORDERS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const lettersFromSchoolByRespondent = (taskListItems): any => {
  return {
    id: 'letters_from_school_respondent',
    text: taskListItems.letters_from_school_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.LETTERS_FROM_SCHOOL,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const digitalDownloadsUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'digital_downloads_respondent',
    text: taskListItems.digital_downloads_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.DIGITAL_DOWNLOADS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const medicalRecordsUploadByRespondent = (taskListItems): any => {
  return {
    id: 'medical_records_respondent',
    text: taskListItems.medical_records_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.MEDICAL_RECORDS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const medicalReportsUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'medical_reports_respondent',
    text: taskListItems.medical_reports_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.MEDICAL_REPORTS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const paternityDocUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'paternity_test_reports_respondent',
    text: taskListItems.paternity_test_reports_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.PATERNITY_TEST_REPORTS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const drugDocUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'drug_alcohol_tests_respondent',
    text: taskListItems.drug_alcohol_tests_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.DRUG_ALCOHOL_TESTS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};
export const policeReportUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'police_disclosures_respondent',
    text: taskListItems.police_disclosures_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.POLICE_REPORTS,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};
export const witnessAvailabilityUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'witness_availability_respondent',
    text: taskListItems.witness_availability_respondent,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.WITNESS_AVAILABILITY,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
};
export const tenancyUploadedByRespondent = (taskListItems): any => {
  return {
    id: 'tenancy_and_mortgage_availability',
    text: taskListItems.tenancy_and_mortgage_availability,
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.TENANCY_AND_MORTGAGE_AVAILABILITY,
      uploadedBy: PartyType.RESPONDENT,
    }),
  };
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

export const getOtherDocuments = (sectionTitles, taskListItems, url) => {
  if (url.includes(URL.APPLICANT)) {
    url = applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.OTHER_DOCUMENTS,
      uploadedBy: PartyType.APPLICANT,
    });
  } else {
    url = applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.OTHER_DOCUMENTS,
      uploadedBy: PartyType.RESPONDENT,
    });
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
export const getOthersResponse = (doc, taskListItems, type) => {
  return {
    id:
      type === 'c7Document'
        ? 'respondent_response_to_request_for_child_arrangements'
        : 'respondent_allegation_of_harm_and_violence',
    text:
      type === 'c7Document'
        ? taskListItems.respondent_response_to_request_for_child_arrangements.replace(
            '<namerespondentxxxxx>',
            doc?.value?.c7Document?.partyName
          )
        : taskListItems.respondent_allegation_of_harm_and_violence.replace(
            '<namerespondentxxxxx>',
            doc?.value?.c1aDocument?.partyName
          ),
    href:
      type === 'c7Document'
        ? applyParms(URL.VIEW_DOCUMENT_URL, {
            docType: DocType.RESPONSE_TO_CA,
            uploadedBy: PartyType.RESPONDENT,
            partyName: doc?.value?.c1aDocument?.partyName,
          })
        : applyParms(URL.VIEW_DOCUMENT_URL, {
            docType: DocType.AOH_TO_CA,
            uploadedBy: PartyType.RESPONDENT,
            partyName: doc?.value?.c1aDocument?.partyName,
          }),
    openInAnotherTab: true,
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

const getRespondentPositionStatements = (respondent: Respondent, taskListItems) => {
  return {
    id: 'respondent_position_statements',
    text: taskListItems.respondent_position_statements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.POSITION_STATEMENTS,
      uploadedBy: PartyType.RESPONDENT,
      partyName: `${respondent.value.firstName} ${respondent.value.lastName}`,
    }),
  };
};

const getRespondentWitnessStatements = (respondent: Respondent, taskListItems) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.value.firstName + ' ' + respondent.value.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.YOUR_WITNESS_STATEMENTS,
      uploadedBy: PartyType.RESPONDENT,
      partyName: `${respondent.value.firstName} ${respondent.value.lastName}`,
    }),
  };
};

const getRespondentPositionStatementsDA = (respondent: PartyDetails, taskListItems) => {
  return {
    id: 'respondent_position_statements',
    text: taskListItems.respondent_position_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.POSITION_STATEMENTS,
      uploadedBy: PartyType.RESPONDENT,
      partyName: `${respondent.firstName} ${respondent.lastName}`,
    }),
  };
};

const getRespondentWitnessStatementsDA = (respondent: PartyDetails, taskListItems) => {
  return {
    id: 'respondent_witness_statements',
    text: taskListItems.respondent_witness_statements.replace(
      '<namerespondentxxxxx>',
      respondent.firstName + ' ' + respondent.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.YOUR_WITNESS_STATEMENTS,
      uploadedBy: PartyType.RESPONDENT,
      partyName: `${respondent.firstName} ${respondent.lastName}`,
    }),
  };
};

const getApplicantRequestToCA = (applicant: Applicant, taskListItems) => {
  return {
    id: 'applicant_request_for_child_arrangements',
    text: taskListItems.applicant_request_for_child_arrangements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: URL.APPLICANT + applyParms(URL.APPLICANT_CA_DA_REQUEST, {}),
    openInAnotherTab: true,
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
      ? applyParms(URL.ALLEGATION_OF_HARM_VOILENCE, {})
      : URL.ALLEGATION_OF_HARM_VOILENCE_DOC,
    openInAnotherTab: true,
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
const getApplicantPositionStatements = (applicant: Applicant, taskListItems) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.POSITION_STATEMENTS,
      uploadedBy: PartyType.APPLICANT,
      partyName: `${applicant.value.firstName} ${applicant.value.lastName}`,
    }),
  };
};
const getApplicantWitnessStatements = (applicant: Applicant, taskListItems) => {
  return {
    id: 'applicant_witness_statements',
    text: taskListItems.applicant_witness_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.value.firstName + ' ' + applicant.value.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.YOUR_WITNESS_STATEMENTS,
      uploadedBy: PartyType.APPLICANT,
      partyName: `${applicant.value.firstName} ${applicant.value.lastName}`,
    }),
  };
};

const getApplicantRequestToDA = (applicant: PartyDetails, taskListItems) => {
  return {
    id: 'applicant_request_for_child_arrangements',
    text: taskListItems.applicant_request_for_domestic_abuse.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: URL.APPLICANT + applyParms(URL.APPLICANT_CA_DA_REQUEST, {}),
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
      ? applyParms(URL.ALLEGATION_OF_HARM_VOILENCE, {})
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
const getApplicantPositionStatementsDA = (applicant: PartyDetails, taskListItems) => {
  return {
    id: 'applicant_position_statements',
    text: taskListItems.applicant_position_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.POSITION_STATEMENTS,
      uploadedBy: PartyType.APPLICANT,
      partyName: `${applicant.firstName} ${applicant.lastName}`,
    }),
  };
};

const getApplicantWitnessStatementsDA = (applicant: PartyDetails, taskListItems) => {
  return {
    id: 'applicant_witness_statements',
    text: taskListItems.applicant_witness_statements.replace(
      '<nameapplicantxxxxx>',
      applicant.firstName + ' ' + applicant.lastName
    ),
    href: applyParms(URL.VIEW_DOCUMENT_URL, {
      docType: DocType.YOUR_WITNESS_STATEMENTS,
      uploadedBy: PartyType.APPLICANT,
      partyName: `${applicant.firstName} ${applicant.lastName}`,
    }),
  };
};
const applicantItemsForC100 = (userCase: any, taskListItems: any) => {
  const applicantItems: object[] = [];
  userCase.applicants.forEach((applicant: Applicant) => {
    applicantItems.push(getApplicantRequestToCA(applicant, taskListItems));
    if (userCase.c1ADocument) {
      applicantItems.push(getApplicantAohAndViolence(applicant, taskListItems, userCase));
    }
    applicantItems.push(getApplicantResponseToAohAndViolence(applicant, taskListItems));
    applicantItems.push(getApplicantPositionStatements(applicant, taskListItems));
    applicantItems.push(getApplicantWitnessStatements(applicant, taskListItems));
  });
  return applicantItems;
};

const applicantItemsForFL401 = (isApplicant: any, userCase: any, taskListItems: any) => {
  const applicantItems: object[] = [];
  if (!isApplicant) {
    applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems));
  } else {
    applicantItems.push(getApplicantRequestToDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantAohAndViolenceDA(userCase.applicantsFL401, taskListItems, userCase));
    applicantItems.push(getApplicantResponseToAohAndViolenceDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantPositionStatementsDA(userCase.applicantsFL401, taskListItems));
    applicantItems.push(getApplicantWitnessStatementsDA(userCase.applicantsFL401, taskListItems));
  }
  return applicantItems;
};
const responseFromOtherPeople = (userCase: any, taskListItems: any) => {
  const respondentItems: object[] = [];
  if (userCase.respondentDocsList) {
    for (const doc of userCase.respondentDocsList) {
      if (doc?.value?.c7Document?.partyName) {
        respondentItems.push(getOthersResponse(doc, taskListItems, 'c7Document'));
      }
      if (doc?.value?.c1aDocument?.partyName) {
        respondentItems.push(getOthersResponse(doc, taskListItems, 'c1aDocument'));
      }
    }
  }
  return respondentItems;
};
