/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as URL from '../../urls';

import { getConfirmOrEditYourContactDetails, getKeepYourDetailsPrivateStatus, getOrderDetailsStatus } from './utils';

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
      title: sectionTitles.applicantOrderDetails,
      items: [
        {
          id: 'view_all_orders_from_the_court',
          text: taskListItems.view_all_orders_from_the_court,
          status: getOrderDetailsStatus(userCase),
          href: URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT,
        },
      ],
    },
  ];
};
