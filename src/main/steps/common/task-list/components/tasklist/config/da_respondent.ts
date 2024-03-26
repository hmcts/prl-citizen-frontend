/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { UPDATE_CASE } from '../../../../../constants';
import { APPLICANT_CA_DA_REQUEST } from '../../../../../urls';
import { TaskListSection, Tasks, getContents, getFinalApplicationStatus } from '../utils';

import { aboutYou, document, hearing, order } from './ca_respondent';

export const DA_RESPONDENT: TaskListConfigProps[] = [
  aboutYou,
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    tasks: (): Task[] => [
      {
        id: Tasks.CHECK_THE_APPLICATION,
        href: (caseData, userDetails) => {
          return getFinalApplicationStatus(caseData, userDetails)
            ? applyParms(APPLICANT_CA_DA_REQUEST, { docContext: UPDATE_CASE })
            : null;
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
