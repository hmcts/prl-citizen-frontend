import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getViewAllDocuments,
  getViewAllOrdersFromTheCourt,
  getYourSafetyStatus,
} from './utils';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.consentToTheApplication,
      items: [
        {
          id: 'consent-to-the-application',
          text: taskListItems.do_you_consent_to_the_application,
          status: getConsentToApplicationStatus(userCase),
          href: URL.CONSENT_TO_APPLICATION,
        },
      ],
    },
    {
      title: sectionTitles.respondentYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.RESPONDENT_DETAILS_KNOWN,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.RESPONDENT_CHECK_ANSWERS,
        },
      ],
    },
    {
      title: sectionTitles.applicationDetails,
      items: [
        {
          id: 'medation-miam',
          text: taskListItems.mediation_miam,
          status: getMiamStatus(userCase),
          href: URL.MIAM_START,
        },
        {
          id: 'current-or-previous-proceedings',
          text: taskListItems.current_or_previous_proceedings,
          status: getCurrentOrOtherProceedingsStatus(userCase),
          href: URL.PROCEEDINGS_START,
        },
      ],
    },
    {
      title: sectionTitles.respondentAdditionalInformation,
      items: [
        {
          id: 'international-factors',
          text: taskListItems.international_factors,
          status: getInternationalFactorsStatus(userCase),
          href: URL.INTERNATIONAL_FACTORS_START,
        },
      ],
    },
    {
      title: sectionTitles.viewAllDocuments,
      items: [
        {
          id: 'view-all-documents',
          text: taskListItems.view_all_documents,
          status: getViewAllDocuments(userCase),
          href: getViewAllDocuments(userCase) === 'READY_TO_VIEW' ? URL.RESPONDENT_VIEW_ALL_DOCUMENTS : '#',
        },
      ],
    },
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'view-all-orders-from-the-court',
          text: taskListItems.view_all_orders_from_the_court,
          status: getViewAllOrdersFromTheCourt(userCase),
          href:
            getViewAllOrdersFromTheCourt(userCase) === 'READY_TO_VIEW'
              ? URL.RESPONDENT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
    {
      title: sectionTitles.respondentSafetyConcerns,
      items: [
        {
          id: 'your-safety',
          text: taskListItems.your_safety,
          status: getYourSafetyStatus(userCase),
          href: URL.SAFETY_MAIN_PAGE,
        },
      ],
    },
  ];
};
