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
export const EDGE_CASE_URL: PageLink = '/edge-case';

export const COOKIES_PAGE: PageLink = '/cookies';
export const PRIVACY_POLICY: PageLink = '/privacy-policy';
export const ACCESSIBILITY_STATEMENT: PageLink = '/accessibility-statement';
export const TERMS_AND_CONDITIONS: PageLink = '/terms-and-conditions';
export const CONTACT_US: PageLink = '/contact-us';

/*confirm-contact-details-start */
export const CONFIRM_CONTACT_DETAILS: PageLink = '/confirm-contact-details';
export const CHECK_ANSWERS: PageLink = `${CONFIRM_CONTACT_DETAILS}/checkanswers`;
export const PERSONAL_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/personaldetails`;
export const CONTACT_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/contactdetails`;
export const ADDRESS_DETAILS: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressdetails`;
export const ADDRESS_LOOKUP: PageLink = `${CONFIRM_CONTACT_DETAILS}/addresslookup`;
export const ADDRESS_LOOKUP_CONT: PageLink = `${CONFIRM_CONTACT_DETAILS}/addresslookupcont`;
export const FIND_ADDRESS: PageLink = `${ADDRESS_LOOKUP}`;
export const ADDRESS_CONFIRMATION: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressconfirmation`;
export const ADDRESS_BLANK: PageLink = `${CONFIRM_CONTACT_DETAILS}/addressblank`;
export const ADDRESS_HISTORY: PageLink = `${CONFIRM_CONTACT_DETAILS}/addresshistory`;
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
/* respondent-keep-details-private */
export const RESPONDENT: PageLink = '/respondent';
export const RESPONDENT_KEEP_DETAILS_PRIVATE: PageLink = `${RESPONDENT}${KEEP_DETAILS_PRIVATE}`;
export const RESPONDENT_DETAILS_KNOWN: PageLink = `${RESPONDENT}${DETAILS_KNOWN}`;
export const RESPONDENT_START_ALTERNATIVE: PageLink = `${RESPONDENT}${START_ALTERNATIVE}`;
export const RESPONDENT_PRIVATE_DETAILS_CONFIRMED: PageLink = `${RESPONDENT}${PRIVATE_DETAILS_CONFIRMED}`;
export const RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${RESPONDENT}${PRIVATE_DETAILS_NOT_CONFIRMED}`;
/* respondent-keep-details-private-end */

/* MIAM */
export const MIAM: PageLink = `${RESPONDENT}/miam`;
export const MIAM_START: PageLink = `${MIAM}/miam-start`;
export const MIAM_ATTEND_WILLINGNESS: PageLink = `${MIAM}/willingness-to-attend-miam`;

/* international-factors */
export const INTERNATIONAL_FACTORS: PageLink = `${RESPONDENT}/international-factors`;
export const INTERNATIONAL_FACTORS_START: PageLink = `${INTERNATIONAL_FACTORS}/start`;
export const INTERNATIONAL_FACTORS_PARENTS: PageLink = `${INTERNATIONAL_FACTORS}/parents`;
export const INTERNATIONAL_FACTORS_JURISDICTION: PageLink = `${INTERNATIONAL_FACTORS}/jurisdiction`;
export const INTERNATIONAL_FACTORS_REQUEST: PageLink = `${INTERNATIONAL_FACTORS}/request`;
export const INTERNATIONAL_FACTORS_SUMMARY: PageLink = `${INTERNATIONAL_FACTORS}/summary`;

/* international-factors */

export const MIAM_SUMMARY: PageLink = `${MIAM}/summary`;
/* MIAM */

/* respondent-confirm-contact-details-start */
export const RESPONDENT_CONFIRM_CONTACT_DETAILS: PageLink = `${RESPONDENT}${CONFIRM_CONTACT_DETAILS}`;
export const RESPONDENT_CHECK_ANSWERS: PageLink = `${RESPONDENT}${CHECK_ANSWERS}`;
export const RESPONDENT_PERSONAL_DETAILS: PageLink = `${RESPONDENT}${PERSONAL_DETAILS}`;
export const RESPONDENT_CONTACT_DETAILS: PageLink = `${RESPONDENT}${CONTACT_DETAILS}`;
export const RESPONDENT_ADDRESS_DETAILS: PageLink = `${RESPONDENT}${ADDRESS_DETAILS}`;
export const RESPONDENT_ADDRESS_LOOKUP: PageLink = `${RESPONDENT}${ADDRESS_LOOKUP}`;
export const RESPONDENT_ADDRESS_LOOKUP_CONT: PageLink = `${RESPONDENT}${ADDRESS_LOOKUP_CONT}`;
export const RESPONDENT_FIND_ADDRESS: PageLink = `${RESPONDENT_ADDRESS_LOOKUP}`;
export const RESPONDENT_ADDRESS_CONFIRMATION: PageLink = `${RESPONDENT}${ADDRESS_CONFIRMATION}`;
export const RESPONDENT_ADDRESS_BLANK: PageLink = `${RESPONDENT}${ADDRESS_BLANK}`;
export const RESPONDENT_ADDRESS_HISTORY: PageLink = `${RESPONDENT}${ADDRESS_HISTORY}`;
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
export const APPLICANT_ADDRESS_LOOKUP_CONT: PageLink = `${APPLICANT}${ADDRESS_LOOKUP_CONT}`;
export const APPLICANT_FIND_ADDRESS: PageLink = `${APPLICANT_ADDRESS_LOOKUP}`;
export const APPLICANT_ADDRESS_CONFIRMATION: PageLink = `${APPLICANT}${ADDRESS_CONFIRMATION}`;
export const APPLICANT_ADDRESS_BLANK: PageLink = `${APPLICANT}${ADDRESS_BLANK}`;
export const APPLICANT_ADDRESS_HISTORY: PageLink = `${APPLICANT}${ADDRESS_HISTORY}`;
/* applicant-confirm-contact-details-end */

/* applicant-respondent-keep-details-private */
export const APPLICANT_KEEP_DETAILS_PRIVATE: PageLink = `${APPLICANT}${KEEP_DETAILS_PRIVATE}`;
export const APPLICANT_DETAILS_KNOWN: PageLink = `${APPLICANT}${DETAILS_KNOWN}`;
export const APPLICANT_START_ALTERNATIVE: PageLink = `${APPLICANT}${START_ALTERNATIVE}`;
export const APPLICANT_PRIVATE_DETAILS_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_CONFIRMED}`;
export const APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_NOT_CONFIRMED}`;
/* applicant-keep-details-private-end */

export const APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT: PageLink = `${APPLICANT}/yourdocuments/alldocuments/alldocuments/orders`;
export const APPLICANT_ORDERS_FROM_THE_COURT: PageLink = `${APPLICANT}/yourdocuments/alldocuments/alldocuments/orders`;

/* consent-to-the-application */
export const CONSENT: PageLink = `${RESPONDENT}/consent-to-application`;
export const CONSENT_TO_APPLICATION: PageLink = `${CONSENT}/consent`;
export const CONSENT_SUMMARY: PageLink = `${CONSENT}/summary`;

/* consent-to-the-application */
export const RESPONDENT_VIEW_ALL_ORDERS_FROM_THE_COURT: PageLink = `${RESPONDENT}/yourdocuments/alldocuments/alldocuments/orders`;
export const RESPONDENT_ORDERS_FROM_THE_COURT: PageLink = `${RESPONDENT}/yourdocuments/alldocuments/orders`;

export const APPLICATION_FL401: PageLink = '/public/docs/FL401-Final-Document.pdf';
export const YOUR_APPLICATION_FL401: PageLink = `${APPLICANT}${APPLICATION_FL401}`;
export const APPLICATION_WITNESS_STATEMENT: PageLink = '/public/docs/witness-statement-Final-Document.pdf';
export const YOUR_APPLICATION_WITNESS_STATEMENT: PageLink = `${APPLICANT}${APPLICATION_WITNESS_STATEMENT}`;

export const VIEW_ALL_DOCUMENTS: PageLink = '/yourdocuments/alldocuments';
export const RESPONDENT_VIEW_ALL_DOCUMENTS: PageLink = `${RESPONDENT}${VIEW_ALL_DOCUMENTS}/alldocuments`;
export const APPLICANT_VIEW_ALL_DOCUMENTS: PageLink = `${APPLICANT}${VIEW_ALL_DOCUMENTS}/alldocuments`;

/* view all documents */
/* Applicant Documents */
export const APPLICANT_CA_DA_REQUEST: PageLink = `${VIEW_ALL_DOCUMENTS}/cadafinaldocumentrequest`;
export const APPLICANT_ALLEGATION_OF_HARM_VOILENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/aohviolence`;
export const APPLICANT_RESPONSE_TO_AOH_VIOLENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/aohviolenceresponse`;
export const APPLICANT_POSITION_STATEMENT: PageLink = `${VIEW_ALL_DOCUMENTS}/positionstatement`;
export const APPLICANT_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/applicantwitnessstatements`;
export const OTHER_PEOPLE_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/otherpeoplewitnessstatement`;
export const APPLICANT_MEDICAL_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/medicalreports`;
export const APPLICANT_MIAM_CERTIFICATE: PageLink = `${VIEW_ALL_DOCUMENTS}/miamcertificate`;
export const APPLICANT_APP_MADE_IN_PRCEEDINGS: PageLink = `${VIEW_ALL_DOCUMENTS}/applicationmade`;
export const APPLICANT_PREVIOUS_ORDERS_SUBMITTED: PageLink = `${VIEW_ALL_DOCUMENTS}/previousorders`;
export const APPLICANT_LETTER_FROM_SCHOOL: PageLink = `${VIEW_ALL_DOCUMENTS}/letterfromschool`;
export const APPLICANT_DIGITAL_DOWNLOADS: PageLink = `${VIEW_ALL_DOCUMENTS}/digitaldownloads`;
export const APPLICANT_PHOTOGRAPHIC_EVIDENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/photographicevidence`;
export const APPLICANT_MOBILE_SCREENSHOTS: PageLink = `${VIEW_ALL_DOCUMENTS}/mobilescreenshots`;
export const APPLICANT_MEDICAL_RECORDS: PageLink = `${VIEW_ALL_DOCUMENTS}/medicalrecords`;
export const APPLICANT_PATERNITY_TEST_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/paternity_test_reports`;
export const APPLICANT_DRUG_ALCOHOL_TESTS: PageLink = `${VIEW_ALL_DOCUMENTS}/drug_alcohol_tests`;
export const APPLICANT_POLICE_DISCLOSURE: PageLink = `${VIEW_ALL_DOCUMENTS}/police_disclosures`;
export const APPLICANT_WITNESS_AVAILABILITY: PageLink = `${VIEW_ALL_DOCUMENTS}/witness_availability`;
/* Respondent Documents */
export const RESPONDENT_CA_RESPONSE: PageLink = `${VIEW_ALL_DOCUMENTS}/caresponse`;
export const RESPONDENT_RESPONSE_TO_AOH_VIOLENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentaohresponse`;
export const RESPONDENT_ALLEGATION_OF_HARM_VOILENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentaohviolence`;
export const RESPONDENT_APP_MADE_IN_PRCEEDINGS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentapplicationmade`;
export const RESPONDENT_PREVIOUS_ORDERS_SUBMITTED: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentpreviousorders`;
export const RESPONDENT_LETTER_FROM_SCHOOL: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentletterfromschool`;
export const RESPONDENT_POSITION_STATEMENT: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentpositionstatement`;
export const RESPONDENT_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentwitnessstatement`;
export const RESPONDENT_OTHER_PEOPLE_WITNESS_STATEMENTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentOtherPeopleWitnessStatement`;
export const RESPONDENT_DIGITAL_DOWNLOADS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentdigitaldownloads`;
export const RESPONDENT_PHOTOGRAPHIC_EVIDENCE: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentphotographicevidence`;
export const RESPONDENT_MOBILE_SCREENSHOTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentmobilescreenshots`;
export const RESPONDENT_MEDICAL_RECORDS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentmedicalrecords`;
export const RESPONDENT_MEDICAL_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondentmedicalreports`;
export const RESPONDENT_PATERNITY_TEST_REPORTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondent_paternity_test_reports`;
export const RESPONDENT_DRUG_ALCOHOL_TESTS: PageLink = `${VIEW_ALL_DOCUMENTS}/respondent_drug_alcohol_tests`;
export const RESPONDENT_POLICE_DISCLOSURE: PageLink = `${VIEW_ALL_DOCUMENTS}/respondent_police_disclosure`;
export const RESPONDENT_WITNESS_AVAILABILITY: PageLink = `${VIEW_ALL_DOCUMENTS}/respondent_drug_alcohol_tests`;
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
/** Attending the hearing */
export const RESPONDENT_NOTICE_OF_HEARING: PageLink = `${VIEW_ALL_DOCUMENTS}/notice_of_hearing`;
export const RESPONDENT_SUPPORT_NEEDED: PageLink = `${VIEW_ALL_DOCUMENTS}/support_needed`;

/** Document Urls */
