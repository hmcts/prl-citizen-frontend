/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import {
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getYourApplicationSubmittedFL401,
} from './utils';

export const generateApplicantTaskList = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.applicantYourDetails,
      items: [
        {
          id: 'keep-your-details-private',
          text: taskListItems.keep_your_details_private,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_DETAILS_KNOWN,
        },
        {
          id: 'confirm-or-edit-your-contact-details',
          text: taskListItems.confirm_or_edit_your_contact_details,
          status: getConfirmOrEditYourContactDetails(userCase),
          href: URL.APPLICANT_CHECK_ANSWERS,
        },
      ],
    },
    {
      title: sectionTitles.yourApplication,
      items: [
        {
          id: 'application-submitted-fl401',
          text: taskListItems.application_submitted_fl401,
          status: getYourApplicationSubmittedFL401(userCase),
          href: URL.APPLICATION_SUBMITTED_FL401,
        },
      ],
    },
  ];
};
