export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
export const CALLBACK_URL: PageLink = '/receiver';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';
export const SAVE_AND_SIGN_OUT: PageLink = '/save-and-sign-out';
export const TIMED_OUT_URL: PageLink = '/timed-out';
export const KEEP_ALIVE_URL: PageLink = '/keep-alive';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';
export const CITIZEN_HOME_URL: PageLink = '/citizen-home';
export const SERVICE_TYPE: PageLink = '/service-type';
export const DASHBOARD_URL: PageLink = '/dashboard';
export const ELIGIBILITY_URL: PageLink = '/eligibility';
export const PRL_CASE_URL: PageLink = '/prl-cases';

export const MANUAL_ADDRESS: PageLink = '/address/manual';

export const COOKIES_PAGE: PageLink = '/cookies';
export const PRIVACY_POLICY: PageLink = '/privacy-policy';
export const ACCESSIBILITY_STATEMENT: PageLink = '/accessibility-statement';
export const TERMS_AND_CONDITIONS: PageLink = '/terms-and-conditions';
export const CONTACT_US: PageLink = '/contact-us';

export const RESPOND_TO_APPLICATION: PageLink = '/tasklistresponse/start';
export const RESPONSE_TASKLIST: PageLink = '/tasklistresponse';
export const RESPONDENT: PageLink = '/respondent';

/*confirm-contact-details-start */
export const CONFIRM_CONTACT_DETAILS: PageLink = '/confirm-contact-details';
export const CHECK_ANSWERS: PageLink = `${CONFIRM_CONTACT_DETAILS}/checkanswers`;
export const PERSONAL_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/personaldetails`;
export const CONTACT_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/contactdetails`;
export const ADDRESS_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressdetails`;
export const ADDRESS_LOOKUP: PageLink = `${CONFIRM_CONTACT_DETAILS}/address/lookup`;
export const ADDRESS_LOOKUP_CONT: PageLink = `${CONFIRM_CONTACT_DETAILS}/addresslookupcont`;
export const FIND_ADDRESS: PageLink = `${ADDRESS_LOOKUP}`;
export const ADDRESS_CONFIRMATION: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressconfirmation`;
export const ADDRESS_BLANK: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressblank`;
export const ADDRESS_HISTORY: PageLink = `${CONFIRM_CONTACT_DETAILS}/addresshistory`;
export const CONTACT_DETAILS_SAVE: PageLink = `${CONFIRM_CONTACT_DETAILS}/save`;
/*confirm-contact-details-end */

/* keep-details-private */
export const KEEP_DETAILS_PRIVATE: PageLink = '/keep-details-private';
export const DETAILS_KNOWN: PageLink = `${KEEP_DETAILS_PRIVATE}/details_known`;
export const START_ALTERNATIVE: PageLink = `${KEEP_DETAILS_PRIVATE}/start_alternative`;
export const PRIVATE_DETAILS_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_confirmed`;
export const PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_not_confirmed`;
/* keep-details-private-end */

/* Respondent-start */
export const RESPONDENT_TASK_LIST_URL: PageLink = '/respondent/task-list';

/* Applicant Upload document start */
export const APPLICANT_UPLOAD_DOCUMENT_LIST_URL: PageLink = '/applicant/upload-document';
export const APPLICANT_UPLOAD_DOCUMENT_LIST_START_URL: PageLink = `${APPLICANT_UPLOAD_DOCUMENT_LIST_URL}/start`;
export const APPLICANT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL: PageLink = `${APPLICANT_UPLOAD_DOCUMENT_LIST_URL}/document-sharing-details`;
export const APPLICANT_UPLOAD_DOCUMENT: PageLink = `${APPLICANT_UPLOAD_DOCUMENT_LIST_URL}/upload-your-documents`;
export const APPLICANT_UPLOAD_DOCUMENT_SUCCESS: PageLink = `${APPLICANT_UPLOAD_DOCUMENT_LIST_URL}/upload-documents-success`;
/* Applicant Upload document end */
/* Respondent Upload document start */
export const RESPONDENT_UPLOAD_DOCUMENT_LIST_URL: PageLink = '/respondent/upload-document';
export const RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL: PageLink = `${RESPONDENT_UPLOAD_DOCUMENT_LIST_URL}/start`;
export const RESPONDENT_UPLOAD_DOCUMENT_LIST_SUMMARY_URL: PageLink = `${RESPONDENT_UPLOAD_DOCUMENT_LIST_URL}/document-sharing-details`;
export const RESPONDENT_UPLOAD_DOCUMENT: PageLink = `${RESPONDENT_UPLOAD_DOCUMENT_LIST_URL}/upload-your-documents`;
export const RESPONDENT_UPLOAD_DOCUMENT_SUCCESS: PageLink = `${RESPONDENT_UPLOAD_DOCUMENT_LIST_URL}/upload-documents-success`;
/* Respondent Upload document end */
/* respondent-keep-details-private */
export const RESPONDENT_KEEP_DETAILS_PRIVATE: PageLink = `${RESPONDENT}${KEEP_DETAILS_PRIVATE}`;
export const RESPONDENT_DETAILS_KNOWN: PageLink = `${RESPONDENT}${DETAILS_KNOWN}`;
export const RESPONDENT_START_ALTERNATIVE: PageLink = `${RESPONDENT}${START_ALTERNATIVE}`;
export const RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE: PageLink = `${RESPONDENT}${KEEP_DETAILS_PRIVATE}/save`;
export const RESPONDENT_PRIVATE_DETAILS_CONFIRMED: PageLink = `${RESPONDENT}${PRIVATE_DETAILS_CONFIRMED}`;
export const RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${RESPONDENT}${PRIVATE_DETAILS_NOT_CONFIRMED}`;
/* respondent-keep-details-private-end */

/* MIAM */
export const TASK_LIST_RESPONSE: PageLink = '/tasklistresponse';
export const MIAM_HOME: PageLink = `${TASK_LIST_RESPONSE}`;
export const MIAM: PageLink = `${MIAM_HOME}/miam`;
export const MIAM_START: PageLink = `${MIAM}/miam-start`;
export const MIAM_ATTEND_WILLINGNESS: PageLink = `${MIAM}/willingness-to-attend-miam`;

/* international-factors */
export const INTERNATIONAL_FACTORS: PageLink = `${TASK_LIST_RESPONSE}/international-factors`;
export const INTERNATIONAL_FACTORS_START: PageLink = `${INTERNATIONAL_FACTORS}/start`;
export const INTERNATIONAL_FACTORS_PARENTS: PageLink = `${INTERNATIONAL_FACTORS}/parents`;
export const INTERNATIONAL_FACTORS_JURISDICTION: PageLink = `${INTERNATIONAL_FACTORS}/jurisdiction`;
export const INTERNATIONAL_FACTORS_REQUEST: PageLink = `${INTERNATIONAL_FACTORS}/request`;
export const INTERNATIONAL_FACTORS_SUMMARY: PageLink = `${INTERNATIONAL_FACTORS}/summary`;
export const INTERNATIONAL_FACTORS_SAVE: PageLink = `${INTERNATIONAL_FACTORS}/save`;
/* international-factors */

export const MIAM_SUMMARY: PageLink = `${MIAM}/summary`;
export const MIAM_SAVE: PageLink = `${MIAM}/save`;
/* MIAM */

/* safety concerns */
export const SAFETY_CONCERNS: PageLink = `${RESPONSE_TASKLIST}/safety_concerns`;
export const SAFETY_MAIN_PAGE: PageLink = `${SAFETY_CONCERNS}/main_page`;
export const YOUR_SAFETY: PageLink = `${SAFETY_CONCERNS}/your_safety`;
export const DOMESTIC_ABUSE_RISK: PageLink = `${SAFETY_CONCERNS}/domestic_abuse_risk`;
export const DOMESTIC_ABUSE_RISK_NO: PageLink = `${SAFETY_CONCERNS}/domestic_abuse_risk_no`;

/* respondent-confirm-contact-details-start */
export const RESPONDENT_CONFIRM_CONTACT_DETAILS: PageLink = `${RESPONDENT}${CONFIRM_CONTACT_DETAILS}`;
export const RESPONDENT_CHECK_ANSWERS: PageLink = `${RESPONDENT}${CHECK_ANSWERS}`;
export const RESPONDENT_PERSONAL_DETAILS: PageLink = `${RESPONDENT}${PERSONAL_DETAILS}`;
export const RESPONDENT_CONTACT_DETAILS: PageLink = `${RESPONDENT}${CONTACT_DETAILS}`;
export const RESPONDENT_ADDRESS_DETAILS: PageLink = `${RESPONDENT}${ADDRESS_DETAILS}`;
export const RESPONDENT_ADDRESS_LOOKUP: PageLink = `${RESPONDENT}/confirm-contact-details/address/lookup`;
export const RESPONDENT_ADDRESS_SELECT: PageLink = `${RESPONDENT}/confirm-contact-details/address/select`;
export const RESPONDENT_FIND_ADDRESS: PageLink = `${RESPONDENT_ADDRESS_LOOKUP}`;
export const RESPONDENT_ADDRESS_CONFIRMATION: PageLink = `${RESPONDENT}${ADDRESS_CONFIRMATION}`;
export const RESPONDENT_ADDRESS_MANUAL: PageLink = `${RESPONDENT}/confirm-contact-details/address/manual`;
export const RESPONDENT_ADDRESS_HISTORY: PageLink = `${RESPONDENT}${ADDRESS_HISTORY}`;
export const RESPONDENT_CONTACT_DETAILS_SAVE: PageLink = `${RESPONDENT}${CONTACT_DETAILS_SAVE}`;
/* respondent-confirm-contact-details-end */

/* Applicant-start */
export const APPLICANT: PageLink = '/applicant';
export const APPLICANT_TASK_LIST_URL: PageLink = '/applicant/task-list';

/* applicant-confirm-contact-details-start */
export const APPLICANT_CONFIRM_CONTACT_DETAILS: PageLink = `${APPLICANT}${CONFIRM_CONTACT_DETAILS}`;
export const APPLICANT_CHECK_ANSWERS: PageLink = `${APPLICANT}${CHECK_ANSWERS}`;
export const APPLICANT_PERSONAL_DETAILS: PageLink = `${APPLICANT}${PERSONAL_DETAILS}`;
export const APPLICANT_CONTACT_DETAILS: PageLink = `${APPLICANT}${CONTACT_DETAILS}`;
export const APPLICANT_ADDRESS_DETAILS: PageLink = `${APPLICANT}${ADDRESS_DETAILS}`;
export const APPLICANT_POSTAL_ADDRESS_DETAILS: PageLink = `${APPLICANT}${CONFIRM_CONTACT_DETAILS}/postaladdress`;
export const APPLICANT_ADDRESS_LOOKUP: PageLink = `${APPLICANT}${ADDRESS_LOOKUP}`;
export const APPLICANT_FIND_ADDRESS: PageLink = `${APPLICANT_ADDRESS_LOOKUP}`;
export const APPLICANT_ADDRESS_CONFIRMATION: PageLink = `${APPLICANT}${ADDRESS_CONFIRMATION}`;
export const APPLICANT_ADDRESS_BLANK: PageLink = `${APPLICANT}${ADDRESS_BLANK}`;
export const APPLICANT_ADDRESS_HISTORY: PageLink = `${APPLICANT}${ADDRESS_HISTORY}`;
export const APPLICANT_CONTACT_DETAILS_SAVE: PageLink = `${APPLICANT}${CONTACT_DETAILS_SAVE}`;
export const APPLICANT_SELECT_ADDRESS: PageLink = `${APPLICANT_CONFIRM_CONTACT_DETAILS}/address/select`;
export const APPLICANT_MANUAL_ADDRESS: PageLink = `${APPLICANT_CONFIRM_CONTACT_DETAILS}/address/manual`;
/* applicant-confirm-contact-details-end */

/* applicant-respondent-keep-details-private */
export const APPLICANT_KEEP_DETAILS_PRIVATE: PageLink = `${APPLICANT}${KEEP_DETAILS_PRIVATE}`;
export const APPLICANT_DETAILS_KNOWN: PageLink = `${APPLICANT}${DETAILS_KNOWN}`;
export const APPLICANT_START_ALTERNATIVE: PageLink = `${APPLICANT}${START_ALTERNATIVE}`;
export const APPLICANT_KEEP_DETAILS_PRIVATE_SAVE: PageLink = `${APPLICANT}${KEEP_DETAILS_PRIVATE}/save`;
export const APPLICANT_PRIVATE_DETAILS_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_CONFIRMED}`;
export const APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_NOT_CONFIRMED}`;
/* applicant-keep-details-private-end */

export const APPLICANT_ORDERS_FROM_THE_COURT: PageLink = `${APPLICANT}/yourdocuments/alldocuments/orders`;

/* consent-to-the-application */
export const CONSENT: PageLink = `${RESPONSE_TASKLIST}/consent-to-application`;
export const CONSENT_TO_APPLICATION: PageLink = `${CONSENT}/consent`;
export const CONSENT_SUMMARY: PageLink = `${CONSENT}/summary`;
export const CONSENT_SAVE: PageLink = `${CONSENT}/save`;

/* consent-to-the-application */
export const RESPONDENT_ORDERS_FROM_THE_COURT: PageLink = `${RESPONDENT}/yourdocuments/alldocuments/orders`;

export const APPLICATION_FL401: PageLink = '/public/docs/FL401-Final-Document.pdf';
export const YOUR_APPLICATION_FL401: PageLink = `${APPLICANT}${APPLICATION_FL401}`;
export const APPLICATION_WITNESS_STATEMENT: PageLink = '/public/docs/witness-statement-Final-Document.pdf';
export const YOUR_APPLICATION_WITNESS_STATEMENT: PageLink = `${APPLICANT}${APPLICATION_WITNESS_STATEMENT}`;

export const VIEW_ALL_DOCUMENTS: PageLink = '/yourdocuments/alldocuments';
export const RESPONDENT_VIEW_ALL_DOCUMENTS: PageLink = `${RESPONDENT}${VIEW_ALL_DOCUMENTS}/alldocuments`;
export const APPLICANT_VIEW_ALL_DOCUMENTS: PageLink = `${APPLICANT}${VIEW_ALL_DOCUMENTS}/alldocuments`;
export const RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER: PageLink = `${RESPONDENT_VIEW_ALL_DOCUMENTS}/allDocumentsViewed`;
export const APPLICANT_VIEW_ALL_DOCUMENTS_FROM_BANNER: PageLink = `${APPLICANT_VIEW_ALL_DOCUMENTS}/allDocumentsViewed`;

export const RESPNDT_TO_APPLICATION_SUMMARY: PageLink = '/tasklistresponse/summary';

export const APPLICANT_WITNESS_STATEMENTS_DA: PageLink = `${APPLICANT}/witnessstatements`;
/* view all documents */
export const CITIZEN_DOWNLOAD_UPLOADED_DOCS: PageLink = `${VIEW_ALL_DOCUMENTS}/downloadCitizenDocument`;
export const MANAGE_DOCUMENTS_DOWNLOAD: PageLink = `${VIEW_ALL_DOCUMENTS}/downloadManageDocument`;

/* Applicant Documents */
export const APPLICANT_CA_DA_REQUEST: PageLink = `${VIEW_ALL_DOCUMENTS}/cadafinaldocumentrequest`;
export const ALLEGATION_OF_HARM_VOILENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/aohviolence`;
export const APPLICANT_RESPONSE_TO_AOH_VIOLENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/aohviolenceresponse`;
export const POSITION_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/positionstatements`;
export const YOUR_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/yourwitnessstatements`;
export const OTHER_PEOPLE_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/otherpeoplewitnessstatement`;
export const MEDICAL_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/medicalreports`;
export const APPLICANT_MIAM_CERTIFICATE: PageLink = `${VIEW_ALL_DOCUMENTS}/miamcertificate`;
export const APPLICATION_MADE_IN_THESE_PRCEEDINGS: PageLink = `${VIEW_ALL_DOCUMENTS}/applicationmade`;
export const PREVIOUS_ORDERS_SUBMITTED: PageLink = `${VIEW_ALL_DOCUMENTS}/previousorders`;
export const LETTER_FROM_SCHOOL: PageLink = `${VIEW_ALL_DOCUMENTS}/lettersfromschool`;
export const DIGITAL_DOWNLOADS: PageLink = `${VIEW_ALL_DOCUMENTS}/digitaldownloads`;
export const MEDICAL_RECORDS: PageLink = `${VIEW_ALL_DOCUMENTS}/medicalrecords`;
export const PATERNITY_TEST_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/paternity_test_reports`;
export const DRUG_ALCOHOL_TESTS: PageLink = `${VIEW_ALL_DOCUMENTS}/drug_alcohol_tests`;
export const POLICE_DISCLOSURE: PageLink = `${VIEW_ALL_DOCUMENTS}/police_disclosures`;
export const WITNESS_AVAILABILITY: PageLink = `${VIEW_ALL_DOCUMENTS}/witness_availability`;
export const TENANCY_AND_MORTGAGE_AVAILABILITY: PageLink = `${VIEW_ALL_DOCUMENTS}/tenancy_and_mortgage_availability`;

/* Respondent Documents */
export const RESPONDENT_CA_RESPONSE: PageLink = `${VIEW_ALL_DOCUMENTS}/caresponse`;
export const RESPONDENT_RESPONSE_TO_AOH_VIOLENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentaohresponse`;
/** CAFCASS and local authority document */
export const RESPONDENT_SAFEGUARDING_LETTER: PageLink = `${VIEW_ALL_DOCUMENTS}/safeguarding_letter`;
export const RESPONDENT_SECTION7_REPORT: PageLink = `${VIEW_ALL_DOCUMENTS}/section7_report`;
export const RESPONDENT_SECTION37_REPORT: PageLink = `${VIEW_ALL_DOCUMENTS}/section37_report`;
export const RESPONDENT_RISK_ASSESSMENT: PageLink = `${VIEW_ALL_DOCUMENTS}/risk_assessment_16a`;
/** Other document */
export const RESPONDENT_IMP_ADDRESS_CONTACT_INFO: PageLink = `${VIEW_ALL_DOCUMENTS}/important_address_and_contact_details`;
export const RESPONDENT_DNA_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/dna_reports`;
export const RESPONDENT_PRIVACY_NOTICE: PageLink = `${VIEW_ALL_DOCUMENTS}/privacy_notice`;
export const RESPONDENT_SPECIAL_MEASURES: PageLink = `${VIEW_ALL_DOCUMENTS}/special_measures`;
export const OTHER_DOCUMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/otherDocuments`;

/** Attending the hearing */
export const RESPONDENT_NOTICE_OF_HEARING: PageLink = `${VIEW_ALL_DOCUMENTS}/notice_of_hearing`;
export const RESPONDENT_SUPPORT_NEEDED: PageLink = `${VIEW_ALL_DOCUMENTS}/support_needed`;

/** Document Urls */

export const DOCUMENT_MANAGER: PageLink = '/document-manager';
/* your needs when you go to court */
export const SUPPORT_YOU_NEED_DURING_CASE: PageLink = `${APPLICANT}/support-you-need-during-case`;
export const LANGUAGE_REQUIREMENTS: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/language-requirements`;
export const REASONABLE_ADJUSTMENTS: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/reasonable-adjustments`;
export const DOCUMENTS_SUPPORT: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/documents-support`;
export const COMMUNICATION_HELP: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/communication-help`;
export const COURT_HEARING_SUPPORT: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/court-hearing-support`;
export const COURT_HEARING_COMFORT: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/court-hearing-comfort`;
export const TRAVELLING_TO_COURT: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/travelling-to-court`;
export const UNABLE_TO_TAKE_COURT_PROCEEDINGS: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/unable-to-take-court-proceedings`;
export const SAFETY_ARRANGEMENTS: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/safety-arrangements`;
export const SUPPORT_YOU_NEED_DURING_CASE_SUMMARY: PageLink = `${SUPPORT_YOU_NEED_DURING_CASE}/summary`;

export const PROCEEDINGS: PageLink = `${RESPONSE_TASKLIST}/proceedings`;
export const PROCEEDINGS_START: PageLink = `${PROCEEDINGS}/start`;
export const PROCEEDINGS_COURT_PROCEEDINGS: PageLink = `${PROCEEDINGS}/court-proceedings`;
export const COURT_PROCEEDINGS_SUMMARY: PageLink = `${PROCEEDINGS}/summary`;

/* your needs when you go to court */
export const CA_DA_SUPPORT_YOU_NEED_DURING_CASE: PageLink = `${RESPONDENT}/support-you-need-during-case`;
export const CA_DA_ATTENDING_THE_COURT: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/attending-the-court`;
export const CA_DA_LANGUAGE_REQUIREMENTS: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/language-requirements`;
export const CA_DA_SPECIAL_ARRANGEMENTS: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/special-arrangements`;
export const CA_DA_REASONABLE_ADJUSTMENTS: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/reasonable-adjustments`;
export const CA_DA_DOCUMENTS_SUPPORT: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/documents-support`;
export const CA_DA_COMMUNICATION_HELP: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/communication-help`;
export const CA_DA_COURT_HEARING_SUPPORT: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/court-hearing-support`;
export const CA_DA_COURT_HEARING_COMFORT: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/court-hearing-comfort`;
export const CA_DA_TRAVELLING_TO_COURT: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/travelling-to-court`;
export const CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SUMMARY: PageLink = `${CA_DA_SUPPORT_YOU_NEED_DURING_CASE}/summary`;

/* Banner Links */
export const FIND_OUT_ABOUT_CAFCASS =
  'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/';
export const FIND_OUT_ABOUT_CAFCASS_CYMRU = 'https://gov.wales/cafcass-cymru/what-we-do';

/* Respondent respnse */
export const CA_RESPONDENT_RESPONSE_CONFIRMATION: PageLink = '/tasklistresponse/summary-confirmation';
export const CA_RESPONDENT_RESPONSE_SUBMIT: PageLink = `${CA_RESPONDENT_RESPONSE_CONFIRMATION}/submit`;

/* Legal representation*/

export const LEGAL_REPRESENTATION_START: PageLink = '/tasklistresponse/legalrepresentation/start';
export const LEGAL_REPRESENTATION_SOLICITOR_DIRECT: PageLink = '/tasklistresponse/legalrepresentation/solicitordirect';
export const LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT: PageLink =
  '/tasklistresponse/legalrepresentation/solicitornotdirect';
export const REDIRECT_LEGAL: PageLink = '/legalrepresentation/redirect';
