import { CommonContent } from '../../../../../steps/common/common.content';
import * as URL from '../../../../urls';
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
          text: getText(taskListItems.applicant_response_to_request_for_child_arrangements, userCase),
          href:
            getApplicantResponseToRequestForChildArrangements(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
        {
          id: 'applicant-allegations-of-harm-and-violence',
          text: getText(taskListItems.applicant_allegations_of_harm_and_violence, userCase),
          href:
            getApplicantAllegationsOfHarmAndViolence(userCase) === true
              ? URL.APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT
              : '#',
        },
      ],
    },
  ];
};

function getText(inputStr: string, userCase: CommonContent) {
  console.log(userCase);
  return inputStr.replace('<nameapplicantxxxxx>', 'Applicant_FNAME_LNAME');
}
