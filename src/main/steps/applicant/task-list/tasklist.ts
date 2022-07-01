/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getConfirmOrEditYourContactDetails, getKeepYourDetailsPrivateStatus } from './utils';

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
  ];
};
