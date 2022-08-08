import * as URL from '../../../../../steps/urls';
import { getApplicantViewAllOrdersFromTheCourtAllDocuments } from '../../../task-list/utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateApplicantTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'orders-from-the-court-all-docs',
          text: taskListItems.view_all_orders_from_the_court_all_docs,
          href:
            getApplicantViewAllOrdersFromTheCourtAllDocuments(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
  ];
};
