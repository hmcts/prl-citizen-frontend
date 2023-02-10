/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { languages as content } from './content';

enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
}
enum Tasks {
  CHILD_ARRANGEMENT_APPLICATION = 'childArrangementApplication',
}

enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
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
                return '/';
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
