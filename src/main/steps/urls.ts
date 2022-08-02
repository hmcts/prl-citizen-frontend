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
export const RESPONDENT: PageLink = '/respondent';
export const KEEP_DETAILS_PRIVATE: PageLink = '/keep-details-private';
export const DETAILS_KNOWN: PageLink = `${KEEP_DETAILS_PRIVATE}/details_known`;
export const START_ALTERNATIVE: PageLink = `${KEEP_DETAILS_PRIVATE}/start_alternative`;
export const PRIVATE_DETAILS_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_confirmed`;
export const PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_not_confirmed`;
/* keep-details-private-end */

/* Respondent-start */
export const RESPONDENT_TASK_LIST_URL: PageLink = '/respondent/task-list';
/* respondent-keep-details-private */
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

export const SAFETY_CONCERNS: PageLink = `${RESPONDENT}/safety_concerns`;
export const SAFETY_MAIN_PAGE: PageLink = `${SAFETY_CONCERNS}/main_page`;
export const YOUR_SAFETY: PageLink = `${SAFETY_CONCERNS}/your_safety`;
export const DOMESTIC_ABUSE_RISK: PageLink = `${SAFETY_CONCERNS}/domestic_abuse_risk`;
export const DOMESTIC_ABUSE_RISK_NO: PageLink = `${SAFETY_CONCERNS}/domestic_abuse_risk_no`;

/* consent-to-the-application */
export const CONSENT: PageLink = `${RESPONDENT}/consent-to-application`;
export const CONSENT_TO_APPLICATION: PageLink = `${CONSENT}/consent`;
export const CONSENT_SUMMARY: PageLink = `${CONSENT}/summary`;

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

/* respondent-confirm-contact-details-start */
export const APPLICANT_CONFIRM_CONTACT_DETAILS: PageLink = `${APPLICANT}${CONFIRM_CONTACT_DETAILS}`;
export const APPLICANT_CHECK_ANSWERS: PageLink = `${APPLICANT}${CHECK_ANSWERS}`;
export const APPLICANT_PERSONAL_DETAILS: PageLink = `${APPLICANT}${PERSONAL_DETAILS}`;
export const APPLICANT_CONTACT_DETAILS: PageLink = `${APPLICANT}${CONTACT_DETAILS}`;
export const APPLICANT_ADDRESS_DETAILS: PageLink = `${APPLICANT}${ADDRESS_DETAILS}`;
export const APPLICANT_ADDRESS_LOOKUP: PageLink = `${APPLICANT}${ADDRESS_LOOKUP}`;
export const APPLICANT_ADDRESS_LOOKUP_CONT: PageLink = `${APPLICANT}${ADDRESS_LOOKUP_CONT}`;
export const APPLICANT_FIND_ADDRESS: PageLink = `${APPLICANT_ADDRESS_LOOKUP}`;
export const APPLICANT_ADDRESS_CONFIRMATION: PageLink = `${APPLICANT}${ADDRESS_CONFIRMATION}`;
export const APPLICANT_ADDRESS_BLANK: PageLink = `${APPLICANT}${ADDRESS_BLANK}`;
export const APPLICANT_ADDRESS_HISTORY: PageLink = `${APPLICANT}${ADDRESS_HISTORY}`;
/* respondent-confirm-contact-details-end */

/* applicant-respondent-keep-details-private */
export const APPLICANT_KEEP_DETAILS_PRIVATE: PageLink = `${APPLICANT}${KEEP_DETAILS_PRIVATE}`;
export const APPLICANT_DETAILS_KNOWN: PageLink = `${APPLICANT}${DETAILS_KNOWN}`;
export const APPLICANT_START_ALTERNATIVE: PageLink = `${APPLICANT}${START_ALTERNATIVE}`;
export const APPLICANT_PRIVATE_DETAILS_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_CONFIRMED}`;
export const APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${APPLICANT}${PRIVATE_DETAILS_NOT_CONFIRMED}`;
/* applicant-keep-details-private-end */

/* fl401 applicant document list */
export const APPLICANT_ALL_DOCUEMNTS: PageLink = `${APPLICANT}/alldocuments`;

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

export const PROCEEDINGS: PageLink = `${RESPONDENT}/proceedings`;
export const PROCEEDINGS_START: PageLink = `${PROCEEDINGS}/start`;
export const PROCEEDINGS_COURT_PROCEEDINGS: PageLink = `${PROCEEDINGS}/court-proceedings`;
export const COURT_PROCEEDINGS_SUMMARY: PageLink = `${PROCEEDINGS}/summary`;

/**   @C100 features */
/* This is a route for the C100 application. */
export const C100_URL: PageLink = '/c100-rebuild';
export const C100_CONFIDENTIALITY_DETAILS_KNOW: PageLink = `${C100_URL}/confidentiality/details-know`;
export const C100_CONFIDENTIALITY_START: PageLink = `${C100_URL}/confidentiality/start`;
export const C100_CONFIDENTIALITY_START_ALTERNATIVE: PageLink = `${C100_URL}/confidentiality/start-alternative`;
export const C100_CONFIDENTIALITY_FEEDBACK: PageLink = `${C100_URL}/confidentiality/feedback`;
export const C100_CONFIDENTIALITY_FEEDBACK_NO: PageLink = `${C100_URL}/confidentiality/feedbackno`;
export const C100_INTERNATIONAL_ELEMENTS_START: PageLink = `${C100_URL}/international-elements/start`;
export const C100_INTERNATIONAL_ELEMENTS_PARENTS: PageLink = `${C100_URL}/international-elements/parents`;
export const C100_INTERNATIONAL_ELEMENTS_JURISDICTION: PageLink = `${C100_URL}/international-elements/jurisdiction`;
export const C100_INTERNATIONAL_ELEMENTS_REQUEST: PageLink = `${C100_URL}/international-elements/request`;
export const C100_REASONABLE_ADJUSTMENTS_ATTENDING_COURT: PageLink = `${C100_URL}/reasonable-adjustments/attending-court`;
export const C100_REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS: PageLink = `${C100_URL}/reasonable-adjustments/language-requirements`;
