/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UPDATE_CASE_YES } from '../../../../../constants';
import { APPLICANT_CA_DA_REQUEST } from '../../../../../urls';
import { TaskListSection, Tasks, getContents, getFinalApplicationStatus } from '../utils';

import { aboutYou, document, hearing, order } from './ca_respondent';

export const DA_RESPONDENT = [
  aboutYou,
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    tasks: [
      {
        id: Tasks.CHECK_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return getFinalApplicationStatus(caseData, userDetails) ? APPLICANT_CA_DA_REQUEST + UPDATE_CASE_YES : null;
        },
        stateTag: (caseData, userDetails) => getFinalApplicationStatus(caseData, userDetails),
        openInAnotherTab: true,
      },
    ],
  },
  hearing,
  document,
  order,
];
