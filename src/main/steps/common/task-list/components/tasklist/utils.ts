/* eslint-disable @typescript-eslint/no-explicit-any */

import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_YOURHEARINGS_HEARINGS,
  C100_DOWNLOAD_APPLICATION,
  C100_START,
} from '../../../../urls';
import { isCaseClosed, isCaseLinked, isDraftCase } from '../../utils';

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
  YOUR_APPLICATION_PDF = 'yourApplicationPDF',
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

const hasAnyOrder = (caseData: Partial<CaseWithId>): boolean => !!caseData?.orderCollection?.length;

const hasAnyHearing = (caseData: Partial<CaseWithId>): boolean => caseData && true;

const isCaseSubmitted = (caseData: Partial<CaseWithId>): boolean =>
  caseData &&
  [
    State.CASE_SUBMITTED_NOT_PAID,
    State.CASE_SUBMITTED_PAID,
    State.CASE_ISSUED_TO_LOCAL_COURT,
    State.CASE_GATE_KEEPING,
    State.CASE_CLOSED,
  ].includes(caseData.state!);

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
        show: isCaseLinked,
        tasks: [
          {
            id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
            href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
            disabled: isCaseClosed,
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.CONTACT_PREFERENCES,
            href: (caseData: Partial<CaseWithId>) => `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/${caseData.id}`,
            disabled: isCaseClosed,
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
            href: (caseData: Partial<CaseWithId>) => `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`,
            disabled: isCaseClosed,
            stateTag: () => StateTags.SUBMITTED,
          },
          {
            id: Tasks.SUPPORT_DURING_CASE,
            href: () => {
              return `${APPLICANT_TASKLIST_HEARING_NEEDS}`;
            },
            disabled: isCaseClosed,
            stateTag: () => StateTags.SUBMITTED,
          },
        ],
      },
      {
        id: TaskListSection.YOUR_APPLICATION,
        content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
        tasks: [
          {
            id: Tasks.CHILD_ARRANGEMENT_APPLICATION,
            href: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return C100_START;
              }
              return caseData.c100RebuildReturnUrl;
            },
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (!caseData) {
                return StateTags.NOT_STARTED_YET;
              }
              return StateTags.IN_PROGRESS;
            },
            show: (caseData: Partial<CaseWithId>) => !caseData || isDraftCase(caseData),
          },
          {
            id: Tasks.YOUR_APPLICATION_PDF,
            href: () => C100_DOWNLOAD_APPLICATION,
            stateTag: () => StateTags.SUBMITTED,
            show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
          },
        ],
      },
      {
        id: TaskListSection.YOUR_DOCUMENTS,
        content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
        show: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => {
          return isCaseSubmitted(caseData) || isCaseLinked(caseData, userDetails);
        },
        tasks: [
          {
            id: Tasks.UPLOAD_DOCUMENTS,
            href: () => APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
            show: isCaseLinked,
            disabled: isCaseClosed,
            stateTag: () => StateTags.OPTIONAL,
          },
          {
            id: Tasks.VIEW_ALL_DOCUMENTS,
            href: () => APPLICANT_VIEW_ALL_DOCUMENTS,
            stateTag: () => StateTags.READY_TO_VIEW,
          },
        ],
      },
      {
        id: TaskListSection.YOUR_ORDERS,
        content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
        show: isCaseLinked,
        tasks: [
          {
            id: Tasks.VIEW_ORDERS,
            href: () => APPLICANT_ORDERS_FROM_THE_COURT,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (hasAnyOrder(caseData)) {
                return StateTags.READY_TO_VIEW;
              }
              return StateTags.NOT_AVAILABLE_YET;
            },
            disabled: (caseData: Partial<CaseWithId>) => !hasAnyOrder(caseData),
          },
        ],
      },
      {
        id: TaskListSection.YOUR_HEARING,
        content: getContents.bind(null, TaskListSection.YOUR_HEARING),
        show: isCaseLinked,
        tasks: [
          {
            id: Tasks.VIEW_HEARING_DETAILS,
            href: () => APPLICANT_YOURHEARINGS_HEARINGS,
            stateTag: (caseData: Partial<CaseWithId>) => {
              if (hasAnyHearing(caseData)) {
                return StateTags.READY_TO_VIEW;
              }
              return StateTags.NOT_AVAILABLE_YET;
            },
            disabled: (caseData: Partial<CaseWithId>) => !hasAnyHearing(caseData),
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
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): Record<string, any>[] => {
  let caseType = caseData?.caseTypeOfApplication;
  if (!caseType && partyType === PartyType.APPLICANT) {
    caseType = CaseType.C100;
  }

  return taskListConfig[caseType!][partyType]
    .map(section => {
      if (
        !section.hasOwnProperty('show') ||
        (section.show instanceof Function && section.show(caseData, userDetails))
      ) {
        const _content = section.content(caseType, partyType, language);

        return {
          id: section.id,
          heading: _content.heading,
          tasks: section.tasks
            .map(task => {
              if (!task.hasOwnProperty('show') || (task.show instanceof Function && task.show(caseData, userDetails))) {
                const stateTag = task.stateTag(caseData, userDetails);
                const _stateTagConfig = stateTagsConfig?.[stateTag];

                const config = {
                  id: task.id,
                  linkText: _content?.tasks[task.id]?.linkText,
                  href: task.href(caseData, userDetails),
                  disabled:
                    task?.disabled && task.disabled instanceof Function ? task.disabled(caseData, userDetails) : false,
                  stateTag: {
                    label: _stateTagConfig.label ? _stateTagConfig.label(language) : '',
                    className: _stateTagConfig.className ? _stateTagConfig.className : '',
                  },
                };

                if (task?.showHint && task.showHint instanceof Function && task.showHint(caseData, userDetails)) {
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
