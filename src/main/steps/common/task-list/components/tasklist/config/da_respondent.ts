/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PartyType } from '../../../../../../app/case/definition';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { isDocPresent } from '../../../../../../steps/common/task-list/utils';
import { applyParms } from '../../../../../../steps/common/url-parser';
import { DOWNLOAD_DOCUMENT_BY_TYPE } from '../../../../../urls';
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
            language: 'en',
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, 'en'),
        disabled: caseData => {
          return getFinalApplicationStatus(caseData, 'en') === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: () => true,
      },
      {
        //** validate **
        id: Tasks.CHECK_THE_APPLICATION_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
            language: 'cy',
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, 'cy'),
        show: caseData => {
          return (
            getFinalApplicationStatus(caseData, 'cy') !== StateTags.NOT_AVAILABLE_YET &&
            isDocPresent(caseData, 'finalWelshDocument')
          );
        },
        openInAnotherTab: () => true,
      },
    ],
  },
  hearing,
  document,
  order,
];
