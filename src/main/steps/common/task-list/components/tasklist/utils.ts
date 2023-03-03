/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';
import { APPLICANT_DETAILS_KNOWN } from '../../../../../steps/urls';

import { languages as content } from './content';

enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
  YOUR_DOCUMENTS = 'yourDocuments',
  ABOUT_YOU = 'aboutYou',
}
enum Tasks {
  CHILD_ARRANGEMENT_APPLICATION = 'childArrangementApplication',
  VIEW_ALL_DOCUMENTS = 'viewAllDocuments',
  EDIT_YOUR_CONTACT_DETAILS = 'editYouContactDetails',
  CONTACT_PREFERENCES = 'contactPreferences',
  KEEP_YOUR_DETAILS_PRIVATE = 'keepYourDetailsPrivate',
}

enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
  NOT_AVAILABLE_YET = 'notAvailableYet',
  READY_TO_VIEW = 'readyToView',
  SUBMITTED = 'submitted',
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
  [StateTags.SUBMITTED]: {
    label: getStateTagLabel.bind(null, StateTags.SUBMITTED),
    className: 'govuk-tag--turquoise',
  },
};

const taskListConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: [
      {
        id: TaskListSection.ABOUT_YOU,
        content: getContents.bind(null, TaskListSection.ABOUT_YOU),
        show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
        tasks: [
          {
            id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
            href: () => {
              '/';
            },
            show: () => false,
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.CONTACT_PREFERENCES,
            href: () => {
              '/';
            },
            show: () => false,
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
            href: (caseData: Partial<CaseWithId>) => {
              return `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`;
            },
            show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
            stateTag: () => StateTags.SUBMITTED,
          },
        ],
      },
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
              } else if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return caseData.c100RebuildReturnUrl;
              } else {
                return '#download';
              }
            },
            show: () => true,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_STARTED_YET;
              } else if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return StateTags.IN_PROGRESS;
              } else {
                return StateTags.SUBMITTED;
              }
            },
          },
        ],
      },
      {
        id: TaskListSection.YOUR_DOCUMENTS,
        content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
        show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
        tasks: [
          {
            id: Tasks.VIEW_ALL_DOCUMENTS,
            href: () => {
              '/';
            },
            show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_AVAILABLE_YET;
              } else {
                return StateTags.READY_TO_VIEW;
              }
            },
            disabled: () => true,
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

export const isActiveCase = (caseData: Partial<CaseWithId>): boolean =>
  caseData &&
  ![State.AwaitingSubmissionToHmcts, State.SUBMITTED_NOT_PAID, State.SUBMITTED_PAID].includes(caseData.state!);
