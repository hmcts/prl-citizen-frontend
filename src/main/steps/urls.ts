export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
export const HEALTH_URL: PageLink = '/health';
export const CALLBACK_URL: PageLink = '/receiver';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';
export const KEEP_ALIVE_URL: PageLink = '/keep-alive';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';
export const SERVICE_TYPE: PageLink = '/service-type';
export const DASHBOARD_URL: PageLink = '/dashboard';
export const DASHBOARD_URL_NEW: PageLink = '/dashboard/new';
export const ELIGIBILITY_URL: PageLink = '/eligibility';
export const PRL_CASE_URL: PageLink = '/prl-cases';

export const MANUAL_ADDRESS: PageLink = '/address/manual';

export const COOKIES_PAGE: PageLink = '/cookies';
export const PRIVACY_POLICY: PageLink = '/privacy-policy';
export const ACCESSIBILITY_STATEMENT: PageLink = '/accessibility-statement';
export const TERMS_AND_CONDITIONS: PageLink = '/terms-and-conditions';

export const RESPOND_TO_APPLICATION: PageLink = '/tasklistresponse/start';
export const RESPOND_TO_APPLICATION_SUMMARY: PageLink = '/tasklistresponse/summary';
export const RESPONSE_TASKLIST: PageLink = '/tasklistresponse';
export const RESPONDENT: PageLink = '/respondent';
export const FETCH_CASE_DETAILS: PageLink = '/case/:caseId';
export const PARTY_TASKLIST: PageLink = '/task-list/:partyType';

export const C100_APPLICANT_TASKLIST: PageLink = '/task-list/applicant';
export const TASKLIST_RESPONDENT: PageLink = '/task-list/respondent';

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
export const KEEP_DETAILS_PRIVATE: PageLink = '/:partyType/keep-details-private';
export const DETAILS_KNOWN: PageLink = `${KEEP_DETAILS_PRIVATE}/details_known`;
export const START_ALTERNATIVE: PageLink = `${KEEP_DETAILS_PRIVATE}/start_alternative`;
export const PRIVATE_DETAILS_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_confirmed`;
export const PRIVATE_DETAILS_NOT_CONFIRMED: PageLink = `${KEEP_DETAILS_PRIVATE}/private_details_not_confirmed`;
/* keep-details-private-end */

/* MIAM */
export const TASK_LIST_RESPONSE: PageLink = '/tasklistresponse';
export const MIAM: PageLink = `${TASK_LIST_RESPONSE}/miam`;
export const MIAM_START: PageLink = `${MIAM}/miam-start`;
export const MIAM_ATTEND_WILLINGNESS: PageLink = `${MIAM}/willingness-to-attend-miam`;

/* international-factors */
export const INTERNATIONAL_FACTORS: PageLink = `${TASK_LIST_RESPONSE}/international-factors`;
export const INTERNATIONAL_FACTORS_START: PageLink = `${INTERNATIONAL_FACTORS}/start`;
export const INTERNATIONAL_FACTORS_PARENTS: PageLink = `${INTERNATIONAL_FACTORS}/parents`;
export const INTERNATIONAL_FACTORS_JURISDICTION: PageLink = `${INTERNATIONAL_FACTORS}/jurisdiction`;
export const INTERNATIONAL_FACTORS_REQUEST: PageLink = `${INTERNATIONAL_FACTORS}/request`;
export const INTERNATIONAL_FACTORS_SUMMARY: PageLink = `${INTERNATIONAL_FACTORS}/summary`;
/* international-factors */

export const MIAM_SUMMARY: PageLink = `${MIAM}/summary`;
/* MIAM */

/* your hearings */
export const YOURHEARINGS: PageLink = '/yourhearings';
export const HEARINGS: PageLink = '/hearings';
export const FETCH_HEARING_DETAILS = '/:partyType/hearings/:caseId';
export const PARTY_YOUR_HEARINGS = `/:partyType${YOURHEARINGS}${HEARINGS}`;
export const RESPONDENT_YOURHEARINGS_HEARINGS: PageLink = `${RESPONDENT}${YOURHEARINGS}${HEARINGS}`;
/* your hearings */

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
/* respondent-confirm-contact-details-end */

/* Applicant-start */
export const APPLICANT: PageLink = '/applicant';

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
export const APPLICANT_SELECT_ADDRESS: PageLink = `${APPLICANT_CONFIRM_CONTACT_DETAILS}/address/select`;
export const APPLICANT_MANUAL_ADDRESS: PageLink = `${APPLICANT_CONFIRM_CONTACT_DETAILS}/address/manual`;
/* applicant-confirm-contact-details-end */

/* consent-to-the-application */
export const CONSENT: PageLink = `${RESPONSE_TASKLIST}/consent-to-application`;
export const CONSENT_TO_APPLICATION: PageLink = `${CONSENT}/consent`;
export const CONSENT_SUMMARY: PageLink = `${CONSENT}/summary`;

/** Documents */
const DOCUMENTS = '/:partyType/documents';

/** View all documents */
export const VIEW_ALL_DOCUMENT_TYPES: PageLink = `${DOCUMENTS}/view/all-documents`;
export const VIEW_DOCUMENTS: PageLink = `${DOCUMENTS}/view/:documentCategory/:documentPartyType/:documentPartyId?`;
export const VIEW_APPLICATION_PACK_DOCUMENTS: PageLink = `${DOCUMENTS}/view/application-pack-documents/:context?`;
export const VIEW_ALL_ORDERS: PageLink = `${DOCUMENTS}/view/orders-from-the-court`;

/* Upload documents */
export const UPLOAD_DOCUMENT: PageLink = `${DOCUMENTS}/upload`;
export const UPLOAD_DOCUMENT_HAS_COURT_ASKED_FOR_DOCUMENT: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/has-the-court-asked-for-this-documents`;
export const UPLOAD_DOCUMENT_DOCUMENT_SHARING_DETAILS: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/document-sharing-details`;
export const UPLOAD_DOCUMENT_SHARING_YOUR_DOCUMENTS: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/sharing-your-documents`;
export const UPLOAD_DOCUMENT_OTHER_PARTY_NOT_SEE_DOCUMENT: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/other-party-not-see-this-document`;
export const UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/upload-your-documents`;
export const UPLOAD_DOCUMENT_SUCCESS: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/upload-documents-success`;
export const UPLOAD_DOCUMENT_SUBMIT_EXTRA_EVIDENCE: PageLink = `${UPLOAD_DOCUMENT}/:docCategory/submit-extra-evidence`;

/* Download documents */
export const DOWNLOAD_DOCUMENT: PageLink = `${DOCUMENTS}/download/:documentId/:documentName/:forceDownload?`;
export const DOWNLOAD_DOCUMENT_BY_TYPE: PageLink = `${DOCUMENTS}/download/type/:documentType/:forceDownload?`;

export const RESPONDENT_TO_APPLICATION_SUMMARY: PageLink = '/tasklistresponse/summary';
export const RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT: PageLink = '/tasklistresponse/summary/equality';

export const DOCUMENT_MANAGER: PageLink = '/document-manager';

export const PROCEEDINGS: PageLink = `${RESPONSE_TASKLIST}/proceedings`;
export const PROCEEDINGS_START: PageLink = `${PROCEEDINGS}/start`;
export const PROCEEDINGS_COURT_PROCEEDINGS: PageLink = `${PROCEEDINGS}/courtproceedings`;
export const PROCEEDINGS_ORDER_DETAILS: PageLink = `${PROCEEDINGS}/:orderType/order-details`;
export const COURT_PROCEEDINGS_SUMMARY: PageLink = `${PROCEEDINGS}/document-summary`;
export const PROCEEDINGS_DOCUMENT_UPLOAD: PageLink = `${PROCEEDINGS}/documentUpload`;
export const PROCEEDINGS_SUMMARY: PageLink = `${PROCEEDINGS}/summary`;
export const PROCEEDING_SAVE: PageLink = `${PROCEEDINGS}/save`;

/* Banner Links */
export const FIND_OUT_ABOUT_CAFCASS =
  'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/';
export const FIND_OUT_ABOUT_CAFCASS_WELSH =
  'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/';
export const FIND_OUT_ABOUT_CAFCASS_CYMRU = 'https://gov.wales/cafcass-cymru/what-we-do';
export const FIND_OUT_ABOUT_CAFCASS_CYMRU_WELSH = 'https://llyw.cymru/cafcass-cymru/yr-hyn-yr-ydym-nin-ei-wneud';

/* Respondent respnse */
export const CA_RESPONDENT_RESPONSE_CONFIRMATION: PageLink = '/tasklistresponse/summary-confirmation';
export const CA_RESPONDENT_RESPONSE_SUBMIT: PageLink = `${CA_RESPONDENT_RESPONSE_CONFIRMATION}/submit`;
export const CA_RESPONDENT_GENERATE_C7_DRAFT: PageLink = '/tasklistresponse/generate-c7-draft';
/* Legal representation*/
const RESPOND_TO_APPLICATION_LEGAL_REPRESENTATION = '/tasklistresponse/legalrepresentation';
export const LEGAL_REPRESENTATION_START: PageLink = `${RESPOND_TO_APPLICATION_LEGAL_REPRESENTATION}/start`;
export const LEGAL_REPRESENTATION_SOLICITOR_DIRECT: PageLink = `${RESPOND_TO_APPLICATION_LEGAL_REPRESENTATION}/solicitordirect`;
export const LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT: PageLink = `${RESPOND_TO_APPLICATION_LEGAL_REPRESENTATION}/solicitornotdirect`;

/* Applicant Hearings */
export const APPLICANT_YOURHEARINGS_HEARINGS: PageLink = `${APPLICANT}${YOURHEARINGS}${HEARINGS}`;

/**   @C100 features */
/* This is a route for the C100 application. */
export const C100_URL: PageLink = '/c100-rebuild';
export const C100_START: PageLink = `${C100_URL}/start`;
export const C100_CHILD_ADDRESS: PageLink = `${C100_URL}/childaddress`;

export const C100_RETRIVE_CASE: PageLink = `${C100_URL}/case/:caseId/retrive`;
export const C100_CONFIRMATIONPAGE: PageLink = `${C100_URL}/confirmation-page`;
export const C100_CONFIDENTIALITY_DETAILS_KNOW: PageLink = `${C100_URL}/confidentiality/details-know`;
export const C100_CONFIDENTIALITY_START: PageLink = `${C100_URL}/confidentiality/start`;
export const C100_CONFIDENTIALITY_START_ALTERNATIVE: PageLink = `${C100_URL}/confidentiality/start-alternative`;
export const C100_CONFIDENTIALITY_FEEDBACK: PageLink = `${C100_URL}/confidentiality/feedback`;
export const C100_CONFIDENTIALITY_FEEDBACK_NO: PageLink = `${C100_URL}/confidentiality/feedbackno`;
export const C100_INTERNATIONAL_ELEMENTS_START: PageLink = `${C100_URL}/international-elements/start`;
export const C100_INTERNATIONAL_ELEMENTS_PARENTS: PageLink = `${C100_URL}/international-elements/parents`;
export const C100_INTERNATIONAL_ELEMENTS_JURISDICTION: PageLink = `${C100_URL}/international-elements/jurisdiction`;
export const C100_INTERNATIONAL_ELEMENTS_REQUEST: PageLink = `${C100_URL}/international-elements/request`;

/** @c100 Hearing without notice */
export const C100_HEARING_WITHOUT_NOTICE_PART1: PageLink = `${C100_URL}/hearing-without-notice/hearing-part1`;
export const C100_HEARING_WITHOUT_NOTICE_PART2: PageLink = `${C100_URL}/hearing-without-notice/hearing-part2`;

/** @C100 Type of order */
export const C100_TYPE_ORDER_SELECT_COURT_ORDER: PageLink = `${C100_URL}/typeoforder/select-courtorder`;
export const C100_TYPE_ORDER_CAORDER: PageLink = `${C100_URL}/typeoforder/caorder`;
export const C100_TYPE_ORDER_SHORT_STATEMENT: PageLink = `${C100_URL}/typeoforder/shortstatement`;

/** @C100 Other proceedings */
export const C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS: PageLink = `${C100_URL}/other-proceedings/current-previous-proceedings`;
export const C100_OTHER_PROCEEDINGS_DETAILS: PageLink = `${C100_URL}/other-proceedings/proceeding-details`;
export const C100_OTHER_PROCEEDINGS_ORDER_DETAILS: PageLink = `${C100_URL}/other-proceedings/:orderType/order-details`;
export const C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: PageLink = `${C100_URL}/other-proceedings/:orderType/:orderId/documentUpload/:removeId?`;
export const C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY: PageLink = `${C100_URL}/other-proceedings/document-summary`;

/** @C100 Help with Fees */
export const C100_HELP_WITH_FEES: PageLink = `${C100_URL}/help-with-fees`;
export const C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES: PageLink = `${C100_HELP_WITH_FEES}/need-help-with-fees`;
export const C100_HELP_WITH_FEES_FEES_APPLIED: PageLink = `${C100_HELP_WITH_FEES}/fees-applied`;
export const C100_HELP_WITH_FEES_HWF_GUIDANCE: PageLink = `${C100_HELP_WITH_FEES}/hwf-guidance`;

/** @C100 Children Details */
export const C100_CHILDERN_DETAILS: PageLink = `${C100_URL}/child-details`;
export const C100_CHILDERN_DETAILS_ADD: PageLink = `${C100_CHILDERN_DETAILS}/add-children`;
export const C100_CHILDERN_DETAILS_PERSONAL_DETAILS: PageLink = `${C100_CHILDERN_DETAILS}/:childId/personal-details`;
export const C100_CHILDERN_DETAILS_CHILD_MATTERS: PageLink = `${C100_CHILDERN_DETAILS}/:childId/child-matters`;
export const C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY: PageLink = `${C100_CHILDERN_DETAILS}/:childId/parental-responsibility`;
export const C100_CHILDERN_FURTHER_INFORMATION: PageLink = `${C100_CHILDERN_DETAILS}/further-information`;
export const C100_CHILDERN_DETAILS_OTHERS: PageLink = `${C100_CHILDERN_DETAILS}/other-children`;
export const C100_CHILDERN_DETAILS_OTHER_CHILDREN: PageLink = `${C100_CHILDERN_DETAILS}/has-other-children`;
export const C100_CHILDERN_OTHER_CHILDREN_NAMES: PageLink = `${C100_CHILDERN_DETAILS_OTHERS}/names`;
export const C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS: PageLink = `${C100_CHILDERN_DETAILS_OTHERS}/:childId/personal-details`;
export const C100_CHILDERN_LIVE_WITH: PageLink = `${C100_CHILDERN_DETAILS}/:childId/live-with`;

/** @C100  Payment Handler*/
export const PAYMENT_GATEWAY_ENTRY_URL: PageLink = '/payments/gateway';
export const PAYMENT_RETURN_URL: PageLink = '/payment/reciever/callback';
export const PAYMENT_RETURN_URL_CALLBACK: PageLink = `${PAYMENT_RETURN_URL}/:paymentId/:status`;

/** common C1A Safety Concerns */
export const C1A_SAFETY_CONCERNS: PageLink = '/:root/safety-concerns';
export const C1A_SAFETY_CONCERNS_ABDUCTION: PageLink = '/:root/safety-concerns/abduction';
export const C1A_SAFETY_CONCERNS_CHILD: PageLink = '/:root/safety-concerns/child';
export const C1A_SAFETY_CONCERNS_YOURSELF: PageLink = '/:root/safety-concerns/yourself';
export const C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE: PageLink = '/:root/safety-concerns/concern-guidance';
export const C1A_SAFETY_CONCERNS_CONCERN_ABOUT: PageLink = '/:root/safety-concerns/concern-about';
export const C1A_SAFETY_CONCERNS_CONCERNS_FOR_SAFETY: PageLink = '/:root/safety-concerns/concerns-for-safety';
export const C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD: PageLink = `${C1A_SAFETY_CONCERNS_CHILD}/concerns-about`;
export const C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE: PageLink = `${C1A_SAFETY_CONCERNS_CHILD}/report-abuse/:abuseType`;
export const C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF: PageLink = `${C1A_SAFETY_CONCERNS_YOURSELF}/concerns-about`;
export const C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE: PageLink = `${C1A_SAFETY_CONCERNS_YOURSELF}/report-abuse/:abuseType`;
export const C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS: PageLink = '/:root/safety-concerns/other-concerns/drugs';
export const C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_UNSUPERVISED: PageLink =
  '/:root/safety-concerns/orders-required/unsupervised';
export const C1A_SAFETY_CONCERNS_OTHER: PageLink = '/:root/safety-concerns/other-concerns/other-issues';
export const C1A_SAFETY_CONCERNS_ORDERS_REQUIRED_COURT_ACTION: PageLink =
  '/:root/safety-concerns/orders-required/court-action';
export const C1A_SAFETY_CONCERNS_NOFEEDBACK: PageLink = '/:root/safety-concerns/no-feedback';

/***@C100 SafetyConcerns Abduction */
export const C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE_NOTIFICATION: PageLink =
  '/:root/safety-concerns/abduction/passport-office-notified';
export const C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_OFFICE: PageLink =
  '/:root/safety-concerns/abduction/passport-office';
export const C1A_SAFETY_CONCERNS_ABDUCTION_PASSPORT_AMOUNT: PageLink =
  '/:root/safety-concerns/abduction/passport-amount';
export const C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS: PageLink = '/:root/safety-concerns/abduction/previousabductions';
export const C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION: PageLink = '/:root/safety-concerns/abduction/child-location';
export const C1A_CHILD_ABDUCTION_THREATS: PageLink = '/:root/safety-concerns/abduction/threats';
export const C1A_SAFETY_CONCERNS_REVIEW: PageLink = '/:root/safety-concerns/review';

/** @C100 Document Submission */
export const C100_DOCUMENT_SUBMISSION: PageLink = `${C100_URL}/document-submission`;

/** @C100 MIAM */
export const C100_MIAM: PageLink = `${C100_URL}/miam`;
export const C100_MIAM_OTHER_PROCEEDINGS: PageLink = `${C100_MIAM}/other-proceedings`;
export const C100_MIAM_MEDIATOR_DOCUMENT: PageLink = `${C100_MIAM}/mediator-document`;
export const C100_MIAM_CHILD_PROTECTION: PageLink = `${C100_MIAM}/child-protection`;
export const C100_MIAM_ATTENDANCE: PageLink = `${C100_MIAM}/attendance`;
export const C100_MIAM_MEDIATOR_CONFIRMAION: PageLink = `${C100_MIAM}/mediator-confirmation`;
export const C100_MIAM_UPLOAD_CONFIRMATION: PageLink = `${C100_MIAM}/upload-confirmation`;
export const C100_MIAM_URGENCY: PageLink = `${C100_MIAM}/urgency`;
export const C100_MIAM_PREVIOUS_ATTENDANCE: PageLink = `${C100_MIAM}/previous-attendance`;
export const C100_MIAM_INFO: PageLink = `${C100_MIAM}/miam-info`;
export const C100_MIAM_VALID_REASON: PageLink = `${C100_MIAM}/valid-reason`;
export const C100_MIAM_NONEED: PageLink = `${C100_MIAM}/no-need`;
export const C100_MIAM_OTHER: PageLink = `${C100_MIAM}/miam-other`;
export const C100_MIAM_MIAM_DOMESTIC_ABUSE: PageLink = `${C100_MIAM}/domestic-abuse`;
export const C100_MIAM_GENERAL_REASONS: PageLink = `${C100_MIAM}/general-reasons`;
export const C100_MIAM_GET_MEDIATOR: PageLink = `${C100_MIAM}/get-mediator`;
export const C100_MIAM_UPLOAD: PageLink = `${C100_MIAM}/upload`;
export const C100_MIAM_GET_DOC: PageLink = `${C100_MIAM}/get-doc`;
export const C100_MIAM_NO_NEED_WITH_REASONS: PageLink = `${C100_MIAM}/no-need-with-reasons`;

/** @C100 Urgency */
export const C100_HEARING_URGENCY: PageLink = `${C100_URL}/hearing-urgency`;
export const C100_HEARING_URGENCY_URGENT: PageLink = `${C100_HEARING_URGENCY}/urgent`;
export const C100_HEARING_URGENCY_URGENT_DETAILS: PageLink = `${C100_HEARING_URGENCY}/urgent-details`;

/**@C100 Screening Questions */
// eslint-disable-next-line import/export
export const C100_SCREENING_QUESTIONS: PageLink = `${C100_URL}/screening-questions`;
export const C100_SCREENING_QUESTIONS_CONSENT_AGREEMENT: PageLink = `${C100_SCREENING_QUESTIONS}/consent-agreement`;
export const C100_SCREENING_QUESTIONS_ALTERNATIVE_RESOLUTION: PageLink = `${C100_SCREENING_QUESTIONS}/alternative-resolution`;
export const C100_SCREENING_QUESTIONS_LEGAL_RESPRESENTATION: PageLink = `${C100_SCREENING_QUESTIONS}/legal-representation`;
export const C100_SCREENING_QUESTIONS_PERMISSIONS_REQUEST: PageLink = `${C100_SCREENING_QUESTIONS}/permissions-request`;
export const C100_SCREENING_QUESTIONS_PERMISSIONS_WHY: PageLink = `${C100_SCREENING_QUESTIONS}/permissions-why`;
export const C100_SCREENING_QUESTIONS_ALTERNATIVE_ROUTES: PageLink = `${C100_SCREENING_QUESTIONS}/alternative-routes`;
export const C100_SCREENING_QUESTIONS_COURT_PERMISSION: PageLink = `${C100_SCREENING_QUESTIONS}/permission`;
export const C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION: PageLink = `${C100_SCREENING_QUESTIONS}/legal-representation-application`;
export const C100_SCREENING_QUESTIONS_CONTACT_REPRESENTATIVE: PageLink = `${C100_SCREENING_QUESTIONS}/contact-representative`;

/** @C100 Applicant Details and confidentaility */
export const C100_APPLICANT_ADD_APPLICANTS: PageLink = `${C100_URL}/applicant/add-applicants`;
export const C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW: PageLink = `${C100_URL}/applicant/:applicantId/confidentiality/details-know`;
export const C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START: PageLink = `${C100_URL}/applicant/:applicantId/confidentiality/start`;
export const C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE: PageLink = `${C100_URL}/applicant/:applicantId/confidentiality/start-alternative`;
export const C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK: PageLink = `${C100_URL}/applicant/:applicantId/confidentiality/feedback`;
export const C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO: PageLink = `${C100_URL}/applicant/:applicantId/confidentiality/feedbackno`;
export const C100_APPLICANT_RELATIONSHIP_TO_CHILD: PageLink = `${C100_URL}/applicant/:applicantId/relationship-to-child/:childId`;
export const C100_APPLICANTS_PERSONAL_DETAILS: PageLink = `${C100_URL}/applicant/:applicantId/personal-details`;

/**@C100 applicant address and contact detail*/
export const C100_APPLICANT_ADDRESS: PageLink = `${C100_URL}/applicant/:applicantId/address`;
export const C100_APPLICANT_ADDRESS_LOOKUP: PageLink = `${C100_APPLICANT_ADDRESS}/lookup`;
export const C100_APPLICANT_ADDRESS_SELECT: PageLink = `${C100_APPLICANT_ADDRESS}/select`;
export const C100_APPLICANT_ADDRESS_MANUAL: PageLink = `${C100_APPLICANT_ADDRESS}/manual`;
export const C100_APPLICANT_CONTACT_DETAIL: PageLink = `${C100_URL}/applicant/:applicantId/contact-detail`;
/**@C100 applicant contact preferences*/
export const C100_APPLICANT_CONTACT_PREFERENCES: PageLink = `${C100_URL}/applicant/:applicantId/contact-preference`;

/** @C100 Respondent Details */
export const C100_RESPONDENT_DETAILS: PageLink = `${C100_URL}/respondent-details`;
export const C100_RESPONDENT_DETAILS_ADD: PageLink = `${C100_RESPONDENT_DETAILS}/add-respondents`;
export const C100_RESPONDENT_DETAILS_ADDRESS: PageLink = `${C100_URL}/respondent-details/:respondentId/address`;
export const C100_RESPONDENT_DETAILS_ADDRESS_LOOKUP: PageLink = `${C100_RESPONDENT_DETAILS_ADDRESS}/lookup`;
export const C100_RESPONDENT_DETAILS_ADDRESS_SELECT: PageLink = `${C100_RESPONDENT_DETAILS_ADDRESS}/select`;
export const C100_RESPONDENT_DETAILS_ADDRESS_MANUAL: PageLink = `${C100_RESPONDENT_DETAILS_ADDRESS}/manual`;
export const C100_RESPONDENT_DETAILS_PERSONAL_DETAILS: PageLink = `${C100_RESPONDENT_DETAILS}/:respondentId/personal-details`;
export const C100_RESPONDENT_DETAILS_CONTACT_DETAILS: PageLink = `${C100_RESPONDENT_DETAILS}/:respondentId/contact-details`;
export const C100_RESPONDENT_DETAILS_RELATIONSHIP_TO_CHILD: PageLink = `${C100_RESPONDENT_DETAILS}/:respondentId/relationship-to-child/:childId`;

/** @C100 OTher Person Details */
export const C100_OTHER_PERSON_DETAILS: PageLink = `${C100_URL}/other-person-details`;
export const C100_OTHER_PERSON_CHECK: PageLink = `${C100_OTHER_PERSON_DETAILS}/other-person-check`;
export const C100_OTHER_PERSON_DETAILS_ADD: PageLink = `${C100_OTHER_PERSON_DETAILS}/add-other-persons`;
export const C100_OTHER_PERSON_DETAILS_PERSONAL_DETAILS: PageLink = `${C100_OTHER_PERSON_DETAILS}/:otherPersonId/personal-details`;
export const C100_OTHER_PERSON_DETAILS_RELATIONSHIP_TO_CHILD: PageLink = `${C100_OTHER_PERSON_DETAILS}/:otherPersonId/relationship-to-child/:childId`;
export const C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP: PageLink = `${C100_OTHER_PERSON_DETAILS}/:otherPersonId/address/lookup`;
export const C100_OTHER_PERSON_DETAILS_ADDRESS_MANUAL: PageLink = `${C100_OTHER_PERSON_DETAILS}/:otherPersonId/address/manual`;
export const C100_OTHER_PERSON_DETAILS_ADDRESS_SELECT: PageLink = `${C100_OTHER_PERSON_DETAILS}/:otherPersonId/address/select`;

/** @C100 Consent Order */
export const C100_CONSENT_ORDER: PageLink = `${C100_URL}/consent-order`;
export const C100_CONSENT_ORDER_UPLOAD: PageLink = `${C100_CONSENT_ORDER}/upload`;
export const C100_CONSENT_ORDER_UPLOAD_CONFIRMATION: PageLink = `${C100_CONSENT_ORDER}/upload-confirmation`;
/**@C100 check you answers */
export const C100_CHECK_YOUR_ANSWER: PageLink = `${C100_URL}/check-your-answers`;
export const C100_CHECK_YOUR_ANSWER_REDIRECT: PageLink = `${C100_URL}/check-your-answers/equality`;

export const OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: PageLink = `${PROCEEDINGS}/:orderType/:orderId/documentUpload/:removeId?`;

export const TESTING_SUPPORT: PageLink = '/testing-support';
export const TESTING_SUPPORT_CREATE_DRAFT: PageLink = '/testing-support/create-draft';
export const TESTING_SUPPORT_DELETE_DRAFT: PageLink = '/testing-support/delete-draft';
export const CREATE_DRAFT: PageLink = '/draft-controller';
/* tasklist-contactpreferences*/
export const CONTACT_PREFERENCE: PageLink = '/:partyType/contact-preference';
export const CHOOSE_CONTACT_PREFERENCE: PageLink = `${CONTACT_PREFERENCE}/choose-a-contact-preference`;
export const REVIEW_CONTACT_PREFERENCE: PageLink = `${CONTACT_PREFERENCE}/review`;
export const CONTACT_PREFERENCE_CONFIRMATION: PageLink = `${CONTACT_PREFERENCE}/confirmation`;

/*temporary task-list/applicant URL for applicant dashboard */
export const TASK_LIST_APPLICANT_URL: PageLink = '/task-list/applicant';
/*temporary task-list/applicant URL for applicant dashboard end/*
/* applicant-tasklist-contactpreferences-end*/

/** @C100 PIN-ACTIVATION */
export const PIN_ACTIVATION_URL: PageLink = '/pin-activation';
export const PIN_ACTIVATION_ENTER_PIN_URL: PageLink = `${PIN_ACTIVATION_URL}/enter-pin`;
export const PIN_ACTIVATION_CASE_ACTIVATED_URL: PageLink = `${PIN_ACTIVATION_URL}/case-activated`;
/** @C100 PIN-ACTIVATION ends here */

/**@C100 withdraw case */
export const C100_WITHDRAW_CASE: PageLink = `${C100_URL}/:caseId/withdraw`;
export const C100_WITHDRAW_CASE_CONFIRMATION: PageLink = `${C100_URL}/withdraw/confirmation`;

/** applicant/tasklist hearing needs */
export const HEARING_NEEDS: PageLink = '/hearing-needs';
export const APPLICANT_TASKLIST_HEARING_NEEDS: PageLink = `${APPLICANT}${HEARING_NEEDS}/support-help`;
export const RESPONDENT_TASKLIST_HEARING_NEEDS: PageLink = `${RESPONDENT}${HEARING_NEEDS}/support-help`;

export const RESPONDENT_ADD_LEGAL_REPRESENTATIVE: PageLink = `${RESPONDENT}/add-legal-representative`;
export const APPLICANT_ADD_LEGAL_REPRESENTATIVE: PageLink = `${APPLICANT}/add-legal-representative`;

export const REMOVE_LEGAL_REPRESENTATIVE_START: PageLink = '/:partyType/remove-legal-representative/start';
export const REMOVE_LEGAL_REPRESENTATIVE_CONFIRM: PageLink = '/:partyType/remove-legal-representative/confirm';

/** Screening questions */
export const SCREENING_QUESTION_GUIDANCE: PageLink = '/complete-your-application-guidance';
export const SCREENING_QUESTION_COURT_FEE: PageLink = '/agree-court-fee';
export const SCREENING_QUESTION_PROCEEDINGS_LEGAL_REP: PageLink = '/legal-representative-proceedings';
export const SCREENING_QUESTION_PAPER_FORM: PageLink = '/complete-your-application-paper-form';
export const SCREENING_QUESTION_COMPLETE_APP_LEGAL_REP: PageLink = '/complete-your-application-legal-representative';
export const SCREENING_QUESTION_CONTACT_LEGAL_REP: PageLink = '/contact-legal-representative';
export const SCREENING_QUESTIONS = [
  SCREENING_QUESTION_GUIDANCE,
  SCREENING_QUESTION_COURT_FEE,
  SCREENING_QUESTION_PROCEEDINGS_LEGAL_REP,
  SCREENING_QUESTION_PAPER_FORM,
  SCREENING_QUESTION_COMPLETE_APP_LEGAL_REP,
  SCREENING_QUESTION_CONTACT_LEGAL_REP,
];
/** Reasonable Adjustments */
const REASONABLE_ADJUSTMENTS_BASE_URL = 'reasonable-adjustments';
/** common component related end points */
export const REASONABLE_ADJUSTMENTS_INTRO: PageLink = `/:partyType/${REASONABLE_ADJUSTMENTS_BASE_URL}/intro`;
export const REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS: PageLink = `/:partyType/${REASONABLE_ADJUSTMENTS_BASE_URL}/language-requirements-and-special-arrangements`;
export const REASONABLE_ADJUSTMENTS_LANGUAGE_REQ_SPECIAL_ARRANGEMENTS_REVIEW: PageLink = `/:partyType/${REASONABLE_ADJUSTMENTS_BASE_URL}/language-requirements-and-special-arrangements/review`;
export const REASONABLE_ADJUSTMENTS_SUBMIT_LANGUAGE_REQ = ':appBaseUrl/:caseId/language-support-notes';
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_LAUNCH: PageLink = `/${REASONABLE_ADJUSTMENTS_BASE_URL}/launch`;
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_HEALTH_CHECK_URL = '/health';
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL = '/api/payload';
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL = '/api/payload/:id';
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL = `:appBaseUrl/${REASONABLE_ADJUSTMENTS_BASE_URL}/callback/:id`;
export const REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl = `:appBaseUrl${SIGN_OUT_URL}`;
export const REASONABLE_ADJUSTMENTS_BACK_URL: PageLink = `/${REASONABLE_ADJUSTMENTS_BASE_URL}/back`;
export const REASONABLE_ADJUSTMENTS_SUCCESS_CONFIRMATION: PageLink = `/:partyType/${REASONABLE_ADJUSTMENTS_BASE_URL}/confirmation`;
export const REASONABLE_ADJUSTMENTS_RETRIEVE_SUPPORT_FLAGS = ':appBaseUrl/:caseId/retrieve-ra-flags/:partyId';
export const REASONABLE_ADJUSTMENTS_MANAGE_SUPPORT_FLAGS = ':appBaseUrl/:caseId/:eventId/party-update-ra';
export const REASONABLE_ADJUSTMENTS_ERROR: PageLink = `/${REASONABLE_ADJUSTMENTS_BASE_URL}/error`;
/** RA local component related end points */
export const REASONABLE_ADJUSTMENTS_ATTENDING_COURT: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/attending-court`;
export const REASONABLE_ADJUSTMENTS_LANGUAGE_REQUIREMENTS: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/language-requirements`;
export const REASONABLE_ADJUSTMENTS_SPECIAL_ARRANGEMENTS: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/special-arrangements`;
export const REASONABLE_ADJUSTMENTS_SUPPORT_DURING_CASE: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/support-during-your-case`;
export const REASONABLE_ADJUSTMENTS_DOCUMENTS_SUPPORT: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/documents-support`;
export const REASONABLE_ADJUSTMENTS_COMMUNICATION_HELP: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/communication-help`;
export const REASONABLE_ADJUSTMENTS_SUPPORT_FOR_HEARING: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/support-for-court-hearing`;
export const REASONABLE_ADJUSTMENTS_NEEDS_FOR_HEARING: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/needs-during-court-hearing`;
export const REASONABLE_ADJUSTMENTS_COURT_NEEDS: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/needs-in-court`;
export const REASONABLE_ADJUSTMENTS_RESPONDENT_RESPONSE_REVIEW: PageLink = `/:root/${REASONABLE_ADJUSTMENTS_BASE_URL}/review`;
/** Reasonable Adjustments end */

export const ANONYMOUS_URLS = [HEALTH_URL, ...SCREENING_QUESTIONS];
export const COMMON_PAGE_URLS = [
  DASHBOARD_URL,
  PIN_ACTIVATION_URL,
  COOKIES_PAGE,
  PRIVACY_POLICY,
  ACCESSIBILITY_STATEMENT,
  TERMS_AND_CONDITIONS,
  ...ANONYMOUS_URLS,
];
export const LOCAL_API_SESSION = '/api/v1/session';
export const SAFEGAURD_EXCLUDE_URLS = [
  C100_URL,
  DASHBOARD_URL,
  LOCAL_API_SESSION,
  PAYMENT_RETURN_URL,
  TASK_LIST_RESPONSE,
  FETCH_CASE_DETAILS,
  PIN_ACTIVATION_CASE_ACTIVATED_URL,
  REASONABLE_ADJUSTMENTS_BASE_URL,
  DOCUMENT_MANAGER,
  CONTACT_PREFERENCE,
  COOKIES_PAGE,
  PRIVACY_POLICY,
  ACCESSIBILITY_STATEMENT,
  TERMS_AND_CONDITIONS,
  PIN_ACTIVATION_URL,
];

export const getMOJForkingScreenUrl = (isNonProd: boolean): string =>
  isNonProd
    ? 'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk/'
    : 'https://apply-to-court-about-child-arrangements.service.justice.gov.uk';
