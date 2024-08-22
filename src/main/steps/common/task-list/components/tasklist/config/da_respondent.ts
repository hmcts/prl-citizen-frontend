/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PartyType } from '../../../../../../app/case/definition';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseClosed, isCaseLinked } from '../../../../../../steps/common/task-list/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, DOWNLOAD_DOCUMENT_BY_TYPE } from '../../../../../urls';
import { StateTags, TaskListSection, Tasks, getContents, getFinalApplicationStatus } from '../utils';

import { aboutYou, document, hearing, order } from './ca_respondent';

export const DA_RESPONDENT: TaskListConfigProps[] = [
  aboutYou,
  {
    id: TaskListSection.THE_APPLICATION,
    content: getContents.bind(null, TaskListSection.THE_APPLICATION),
    tasks: (): Task[] => [
      {
        //** validate **
        id: Tasks.CHECK_THE_APPLICATION,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData),
        disabled: caseData => {
          return getFinalApplicationStatus(caseData) === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.MAKE_REQUEST_TO_COURT_ABOUT_CASE,
        href: () =>
          applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
            partyType: PartyType.RESPONDENT,
            pageNumber: '1',
          }),
        stateTag: () => StateTags.OPTIONAL,
        show: isCaseLinked,
        disabled: isCaseClosed,
      },
    ],
  },
  hearing,
  document,
  order,
];
