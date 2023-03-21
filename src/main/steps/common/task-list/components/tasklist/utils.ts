/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  C100_APPLICANT_TASKLIST,
  C100_DOWNLOAD_APPLICATION,
  C100_START,
} from '../../../../urls';

import { languages as content } from './content';

enum TaskListSection {
  YOUR_APPLICATION = 'yourApplication',
  YOUR_DOCUMENTS = 'yourDocuments',

  YOUR_HEARING = 'yourHearing',

  ABOUT_YOU = 'aboutYou',
  YOUR_ORDERS = 'ordersFromTheCourt',
}
enum Tasks {
  CHILD_ARRANGEMENT_APPLICATION = 'childArrangementApplication',
  VIEW_ALL_DOCUMENTS = 'viewAllDocuments',
  UPLOAD_DOCUMENTS = 'uploadDocuments',
  VIEW_HEARING_DETAILS = 'viewHearingDetails',

  EDIT_YOUR_CONTACT_DETAILS = 'editYouContactDetails',
  CONTACT_PREFERENCES = 'contactPreferences',
  KEEP_YOUR_DETAILS_PRIVATE = 'keepYourDetailsPrivate',
  SUPPORT_DURING_CASE = 'supportDuringCase',
  VIEW_ORDERS = 'viewOrders',
}

enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
  NOT_AVAILABLE_YET = 'notAvailableYet',
  READY_TO_VIEW = 'readyToView',
  SUBMITTED = 'submitted',
  OPTIONAL = 'optional',
}

export const showOrders = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData && caseData.orderCollection && caseData.orderCollection.length > 0);

export const showHearing = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0);

export const isActiveCase = (caseData: Partial<CaseWithId>): boolean =>
  caseData &&
  ![State.AwaitingSubmissionToHmcts, State.SUBMITTED_NOT_PAID, State.SUBMITTED_PAID].includes(caseData.state!);

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
  [StateTags.OPTIONAL]: {
    label: getStateTagLabel.bind(null, StateTags.OPTIONAL),
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
            href: (caseData: Partial<CaseWithId>) => {
              return `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`;
            },
            show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.CONTACT_PREFERENCES,
            href: (caseData: Partial<CaseWithId>) => {
              return `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/${caseData.id}`;
            },
            show: (caseData: Partial<CaseWithId>): boolean => isActiveCase(caseData),
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
          {
            id: Tasks.SUPPORT_DURING_CASE,
            href: () => {
              return `${APPLICANT_TASKLIST_HEARING_NEEDS}`;
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
                return C100_START;
              }

              if (caseData?.state === State.AwaitingSubmissionToHmcts) {
                return caseData.c100RebuildReturnUrl;
              } else {
                return C100_DOWNLOAD_APPLICATION;
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
        show: isActiveCase,
        tasks: [
          {
            id: Tasks.UPLOAD_DOCUMENTS,
            href: () => {
              return APPLICANT_UPLOAD_DOCUMENT_LIST_URL;
            },
            show: isActiveCase,
            stateTag: () => {
              return StateTags.OPTIONAL;
            },
          },
          {
            id: Tasks.VIEW_ALL_DOCUMENTS,
            href: () => {
              return APPLICANT_VIEW_ALL_DOCUMENTS;
            },
            show: isActiveCase,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_AVAILABLE_YET;
              } else {
                return StateTags.READY_TO_VIEW;
              }
            },
            disabled: () => false,
          },
        ],
      },
      {
        id: TaskListSection.YOUR_ORDERS,
        content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
        show: showOrders,
        tasks: [
          {
            id: Tasks.VIEW_ORDERS,
            href: (caseData: Partial<CaseWithId>) => {
              if (caseData && caseData.orderCollection && caseData.orderCollection.length > 0) {
                return APPLICANT_ORDERS_FROM_THE_COURT;
              } else {
                return C100_APPLICANT_TASKLIST;
              }
            },
            show: showOrders,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (caseData && caseData.orderCollection && caseData.orderCollection.length > 0) {
                return StateTags.READY_TO_VIEW;
              } else {
                return StateTags.NOT_AVAILABLE_YET;
              }
            },
            disabled: showOrders,
          },
        ],
      },
      {
        id: TaskListSection.YOUR_HEARING,
        content: getContents.bind(null, TaskListSection.YOUR_HEARING),
        show: showHearing,
        tasks: [
          {
            id: Tasks.VIEW_HEARING_DETAILS,
            href: (caseData: Partial<CaseWithId>) => {
              if (caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0) {
                return APPLICANT_YOURHEARINGS_HEARINGS;
              } else {
                return '/';
              }
            },
            show: showHearing,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (caseData && caseData.hearingCollection && caseData.hearingCollection.length > 0) {
                return StateTags.READY_TO_VIEW;
              }
              return StateTags.NOT_AVAILABLE_YET;
            },
            disabled: showHearing,
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
