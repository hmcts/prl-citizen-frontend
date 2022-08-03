/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getConfirmOrEditYourContactDetails, getKeepYourDetailsPrivateStatus, getYourApplication } from './utils';

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
          id: 'your-application',
          text: taskListItems.your_application,
          status: getYourApplication(userCase),
          href: URL.YOUR_APPLICATION_FL401,
        },
        {
          id: 'your-application-witness-statment',
          text: taskListItems.your_application_witness_statement,
          status: getYourApplication(userCase),
          href: URL.YOUR_APPLICATION_WITNESS_STATEMENT,
        },
      ],
    },
  ];
};
