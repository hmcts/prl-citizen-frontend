import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getYourSafetyStatus,
} from './utils';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase, userIdamId) => {
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
      title: sectionTitles.yourDetails,
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
        {
          id: 'support_you_need_during_your_case',
          text: taskListItems.support_you_need_during_your_case,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.CA_DA_ATTENDING_THE_COURT,
        },
      ],
    },
    {
      title: sectionTitles.applicationDetails,
      items: [
        {
          id: 'medation-miam',
          text: taskListItems.mediation_miam,
          status: getMiamStatus(userCase, userIdamId),
          href: URL.MIAM_START + '/' + userCase.id,
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
      title: sectionTitles.safetyConcerns,
      items: [
        {
          id: 'your-safety',
          text: taskListItems.your_safety,
          status: getYourSafetyStatus(userCase),
          href: URL.SAFETY_MAIN_PAGE,
        },
      ],
    },
    {
      title: sectionTitles.additionalInformation,
      items: [
        {
          id: 'international-factors',
          text: taskListItems.international_factors,
          status: getInternationalFactorsStatus(userCase, userIdamId),
          href: URL.INTERNATIONAL_FACTORS_START + '/' + userCase.id,
        },
      ],
    },
  ];
};
