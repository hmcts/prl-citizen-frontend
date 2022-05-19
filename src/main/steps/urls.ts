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


export const RESPONDENT: PageLink = '/respondent';
export const KEEP_DETAILS_PRIVATE: PageLink =  `${RESPONDENT}/keep-details-private`;
export const details_known: PageLink = `${KEEP_DETAILS_PRIVATE}/details_known`;
export const START_ALTERNATIVE: PageLink = `${KEEP_DETAILS_PRIVATE}/start_alternative`;

