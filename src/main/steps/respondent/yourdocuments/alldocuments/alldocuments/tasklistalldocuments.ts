import * as URL from '../../../../../steps/urls';
import {
  getRespondentAllegationsOfHarmAndViolence,
  getRespondentResponseToRequestForChildArrangements,
  getViewAllOrdersFromTheCourtAllDocuments,
} from '../../../task-list/utils';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateRespondentTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    {
      title: sectionTitles.ordersFromTheCourt,
      items: [
        {
          id: 'orders-from-the-court-all-docs',
          text: taskListItems.view_all_orders_from_the_court_all_docs,
          href:
            getViewAllOrdersFromTheCourtAllDocuments(userCase) === true
              ? URL.RESPONDENT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
    {
      title: sectionTitles.respondentsDocuments,
      items: [
        {
          id: 'respondent-response-to-request-for-child-arrangements',
          text: taskListItems.respondent_response_to_request_for_child_arrangements,
          href:
            getRespondentResponseToRequestForChildArrangements(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
        {
          id: 'respondent-allegations-of-harm-and-violence',
          text: taskListItems.respondent_allegations_of_harm_and_violence,
          href:
            getRespondentAllegationsOfHarmAndViolence(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
  ];
};
