import {
  getApplicantDocuments,
  getAttendingTheHearingDocs,
  getCafcassDocuments,
  getOrdersFromCourt,
  getOtherDocuments,
  getRespondentDocuments,
} from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklistalldocuments';
import * as URL from '../../../../urls';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateRespondentTaskListAllDocuments = (sectionTitles, taskListItems, userCase) => {
  return [
    ...getOrdersFromCourt(sectionTitles, taskListItems, URL.RESPONDENT_ORDERS_FROM_THE_COURT),
    getRespondentDocuments(sectionTitles, taskListItems, userCase, false),
    getApplicantDocuments(sectionTitles, taskListItems, userCase, false),
    getCafcassDocuments(sectionTitles, taskListItems, userCase),
    getOtherDocuments(sectionTitles, taskListItems, userCase),
    getAttendingTheHearingDocs(sectionTitles, taskListItems, userCase),
  ];
};
