import {
    getKeepYourDetailsPrivateStatus,
    getConsentToApplicationStatus
  } from './utils';
import * as URL from '../../urls';

export const generateRespondentTaskList = (sectionTitles, taskListItems, userCase) => [
  {
    title: sectionTitles.consentToTheApplication,
    items: [
      {
        id: 'keep-your-details-private',
        text: taskListItems.do_you_consent_to_the_application,
        status: getConsentToApplicationStatus(userCase),
        href: URL.CONSENT_TO_APPLICATION,
      },
    ]
  },
  {
    title: sectionTitles.respondentYourDetails,
    items: [
      {
        id: 'keep-your-details-private',
        text: taskListItems.keep_your_details_private,
        status: getKeepYourDetailsPrivateStatus(userCase),
        href: URL.DETAILS_KNOWN,
      },
    ]
  }
  
  ];