/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PartyType } from '../../../../../../app/case/definition';
import { DOCUMENT_LANGUAGE } from '../../../../../../steps/common/documents/download/utils';
import { Task, TaskListConfigProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseClosed, isCaseLinked, isDocPresent } from '../../../../../../steps/common/task-list/utils';
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
        id: Tasks.CHECK_THE_APPLICATION,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
            language: DOCUMENT_LANGUAGE.ENGLISH,
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH),
        disabled: caseData => {
          return getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.ENGLISH) === StateTags.NOT_AVAILABLE_YET;
        },
        openInAnotherTab: () => true,
      },
      {
        id: Tasks.CHECK_THE_APPLICATION_WELSH,
        href: () =>
          applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
            partyType: PartyType.RESPONDENT,
            documentType: 'cada-document',
            language: DOCUMENT_LANGUAGE.WELSH,
          }),
        stateTag: caseData => getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.WELSH),
        show: caseData => {
          return (
            getFinalApplicationStatus(caseData, DOCUMENT_LANGUAGE.WELSH) !== StateTags.NOT_AVAILABLE_YET &&
            isDocPresent(caseData, 'finalWelshDocument')
          );
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
