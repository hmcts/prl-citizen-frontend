/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';
import {  APPLICANT_YOURHEARINGS_HEARINGS } from '../../../../urls';

import { languages as content } from './content';

enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
  YOUR_DOCUMENTS = 'yourDocuments',
  YOUR_HEARING = 'yourHearing',
}
enum Tasks {
  CHILD_ARRANGEMENT_APPLICATION = 'childArrangementApplication',
  VIEW_ALL_DOCUMENTS = 'viewAllDocuments',
  VIEW_HEARING_DETAILS = 'viewHearingDetails',
}

enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
  NOT_AVAILABLE_YET = 'notAvailableYet',
  READY_TO_VIEW = 'readyToView',
}

/*interface StateTag {
    lebel: string;
    className: string;
} */

interface TaskList {
  id: TaskList;
  content: Record<string, any>;
  tasks: Task;
}
interface Task {
  id: TaskList;
  content: Record<string, any>;
  show: boolean;
  stateTag: StateTags;
  disabled?: boolean;
  showHint?: boolean;
}

const getStateTagLabel = (state: StateTags, language: string): string =>
  content?.[language]?.['stateTags']?.[state] ?? '';

const getContents = (
  taskListSection: TaskListSection,
  caseType: CaseType,
  partyType: PartyType,
  language: string
): Record<string, any> => content[language]?.[caseType]?.[partyType]?.[taskListSection] ?? {};

const stateTagsConfig = {
  [StateTags.NOT_STARTED_YET]: {
    label: getStateTagLabel.bind(null, StateTags.NOT_STARTED_YET),
    className: 'govuk-tag--red',
  },
  [StateTags.IN_PROGRESS]: {
    label: getStateTagLabel.bind(null, StateTags.IN_PROGRESS),
    className: 'govuk-tag--yellow',
  },
  [StateTags.NOT_AVAILABLE_YET]: {
    label: getStateTagLabel.bind(null, StateTags.NOT_AVAILABLE_YET),
    className: 'govuk-tag--grey',
  },
  [StateTags.READY_TO_VIEW]: {
    label: getStateTagLabel.bind(null, StateTags.READY_TO_VIEW),
    className: 'govuk-tag--blue',
  },
};

const taskListConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: [
      {
        id: TaskListSection.YOUR_APPLICATION,
        content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
        show: () => true,
        tasks: [
          {
            id: Tasks.CHILD_ARRANGEMENT_APPLICATION,
            href: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return '/c100-rebuild/start';
              }

              if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return caseData.c100RebuildReturnUrl;
              }
            },
            show: (caseData: Partial<CaseWithId>): boolean =>
              !caseData || caseData?.state === State.AwaitingSubmissionToHmcts,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_STARTED_YET;
              }

              if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return StateTags.IN_PROGRESS;
              }
            },
          },
        ],
      },
      {
        id: TaskListSection.YOUR_DOCUMENTS,
        content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
        show: (caseData: Partial<CaseWithId>): boolean => showYourDocuments(caseData),
        tasks: [
          {
            id: Tasks.VIEW_ALL_DOCUMENTS,
            href: () => {
              '/';
            },
            show: (caseData: Partial<CaseWithId>): boolean => showYourDocuments(caseData),
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_AVAILABLE_YET;
              }
              if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return StateTags.READY_TO_VIEW;
              }
            },
            disabled: (caseData: Partial<CaseWithId>): boolean => showYourDocuments(caseData),
          },
        ],
      },
      {
        id: TaskListSection.YOUR_HEARING,
        content: getContents.bind(null, TaskListSection.YOUR_HEARING),
        show: (caseData: Partial<CaseWithId>): boolean => showHearing(caseData),
        tasks: [
          {
            id: Tasks.VIEW_HEARING_DETAILS,
            href: (caseData: Partial<CaseWithId>) => {
                if (caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0) {
                return APPLICANT_YOURHEARINGS_HEARINGS;
              } else{
                return '/';
              }
            },
            show: (caseData: Partial<CaseWithId>): boolean => showHearing(caseData),
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0) {
                return StateTags.READY_TO_VIEW;
              }
              return StateTags.NOT_AVAILABLE_YET;
            },
          },
        ],
      },
    ],
    [PartyType.RESPONDENT]: [],
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: [],
    [PartyType.RESPONDENT]: [],
  },
};

export const getTaskListConfig = (
  caseData: Partial<CaseWithId>,
  partyType: PartyType,
  language: string
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;

  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return taskListConfig[caseType!][partyType]
    .map(section => {
      if (section.show(caseData)) {
        const _content = section.content(caseType, partyType, language);

        return {
          id: section.id,
          heading: _content.heading,
          tasks: section.tasks
            .map(task => {
              if (task.show(caseData)) {
                const stateTag = task.stateTag(caseData);
                const _stateTagConfig = stateTagsConfig?.[stateTag];

                const config = {
                  id: task.id,
                  linkText: _content?.tasks[task.id]?.linkText,
                  href: task.href(caseData),
                  disabled: task?.disabled ? task?.disabled(caseData) : false,
                  stateTag: {
                    label: _stateTagConfig.label ? _stateTagConfig.label(language) : '',
                    className: _stateTagConfig.className ? _stateTagConfig.className : '',
                  },
                };

                if (task?.showHint && task?.showHint(caseData)) {
                  Object.assign(config, {
                    hintText: _content?.tasks[task.id]?.hintText,
                  });
                }

                return config;
              }
              return null;
            })
            .filter(task => {
              return task !== null;
            }),
        };
      }

      return null;
    })
    .filter(config => {
      return config !== null;
    });
};

export const showYourDocuments = (caseData: Partial<CaseWithId>): boolean =>
  caseData
    ? ![State.AwaitingSubmissionToHmcts, State.SUBMITTED_NOT_PAID, State.SUBMITTED_PAID].includes(caseData.state!)
    : false;
export const showHearing=(caseData: Partial<CaseWithId>): boolean =>
 (caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0)? true:false;

