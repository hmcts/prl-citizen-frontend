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

/* Respondent-start */
export const RESPONDENT_TASK_LIST_URL: PageLink = '/respondent/task-list';
/* keep-details-private */
export const RESPONDENT: PageLink = '/respondent';
export const KEEP_DETAILS_PRIVATE: PageLink = `${RESPONDENT}/keep-details-private`;
export const DETAILS_KNOWN: PageLink = `${KEEP_DETAILS_PRIVATE}/details_known`;
export const START_ALTERNATIVE: PageLink = `${KEEP_DETAILS_PRIVATE}/start_alternative`;
export const PRIVATE_DETAILS_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_confirmed`;
export const PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_not_confirmed`;
/* keep-details-private-end */

/* MIAM */
export const MIAM: PageLink = `${RESPONDENT}/miam`;
export const MIAM_START: PageLink = `${MIAM}/miam-start`;
export const MIAM_ATTEND_WILLINGNESS: PageLink = `${MIAM}/willingness-to-attend-miam`;
export const MIAM_SUMMARY: PageLink = `${MIAM}/summary`;
/* MIAM */

/* confirm-contact-details-start */
export const CONFIRM_CONTACT_DETAILS: PageLink = `${RESPONDENT}/confirmcontactdetails`;
export const CHECK_ANSWERS: PageLink = `${CONFIRM_CONTACT_DETAILS}/checkanswers`;
/* confirm-contact-details-end */

export const PROCEEDINGS: PageLink = `${RESPONDENT}/proceedings`;
export const PROCEEDINGS_START: PageLink = `${PROCEEDINGS}/start`;
export const PROCEEDINGS_COURT_PROCEEDINGS: PageLink = `${PROCEEDINGS}/court-proceedings`;
