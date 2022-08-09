import * as URL from '../../../../../steps/urls';
import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantResponseToRequestForChildArrangements,
  getApplicantViewAllOrdersFromTheCourtAllDocuments,
} from '../../../task-list/utils';

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
    {
      title: sectionTitles.applicantsDocuments,
      items: [
        {
          id: 'applicant-response-to-request-for-child-arrangements',
          text: taskListItems.applicant_response_to_request_for_child_arrangements,
          href:
            getApplicantResponseToRequestForChildArrangements(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
        {
          id: 'applicant-allegations-of-harm-and-violence',
          text: taskListItems.applicant_allegations_of_harm_and_violence,
          href:
            getApplicantAllegationsOfHarmAndViolence(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
  ];
};
