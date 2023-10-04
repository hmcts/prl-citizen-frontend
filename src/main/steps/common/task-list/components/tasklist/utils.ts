/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import {
  APPLICANT_ATTENDING_THE_COURT,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  APPLICANT_WITNESS_STATEMENTS_DA,
  APPLICANT_YOURHEARINGS_HEARINGS,
  C100_DOWNLOAD_APPLICATION,
  C100_START,
  YOUR_APPLICATION_FL401,
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
  YOUR_APPLICATION_WITNESS_STATEMENT = "yourAapplicationWitnessStatment"
}

enum StateTags {
  NOT_STARTED_YET = 'notStartedYet',
  IN_PROGRESS = 'inProgress',
  NOT_AVAILABLE_YET = 'notAvailableYet',
  READY_TO_VIEW = 'readyToView',
  SUBMITTED = 'submitted',
  OPTIONAL = 'optional',
  COMPLETED = "completed",
  TO_DO = "toDo",
  DOWNLOAD = "download"
}

const hasAnyOrder = (caseData: Partial<CaseWithId>): boolean => !!caseData?.orderCollection?.length;

const hasAnyHearing = (caseData: Partial<CaseWithId>): boolean =>
  !!(caseData?.hearingCollection && caseData?.hearingCollection?.length >= 1);

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
  [StateTags.COMPLETED]: {
    label: getStateTagLabel.bind(null, StateTags.COMPLETED),
    className: 'govuk-tag--turquoise',
  },
  [StateTags.TO_DO]: {
    label: getStateTagLabel.bind(null, StateTags.TO_DO),
    className: 'govuk-tag--turquoise',
  },
  [StateTags.DOWNLOAD]: {
    label: getStateTagLabel.bind(null, StateTags.DOWNLOAD),
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
        show: isCaseLinked,
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
            show: isCaseLinked,
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
            href: (caseData: Partial<CaseWithId>) => `${APPLICANT_YOURHEARINGS_HEARINGS}/${caseData.id}`,
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
    [PartyType.APPLICANT]: [
        {
          id: TaskListSection.ABOUT_YOU,
          content: getContents.bind(null, TaskListSection.ABOUT_YOU),
          show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
          tasks: [
            {
              id: Tasks.KEEP_YOUR_DETAILS_PRIVATE,
              href: (caseData: Partial<CaseWithId>) => `${APPLICANT_DETAILS_KNOWN}/${caseData.id}`,
              disabled: isCaseClosed,
              stateTag: (caseData) => getKeepYourDetailsPrivateStatus(caseData?.applicantsFL401?.response?.keepDetailsPrivate),
            },
            {
              id: Tasks.EDIT_YOUR_CONTACT_DETAILS,
              href: (caseData: Partial<CaseWithId>) => `${APPLICANT_CHECK_ANSWERS}/${caseData.id}`,
              disabled: isCaseClosed,
              stateTag: (caseData) => getConfirmOrEditYourContactDetails(caseData?.applicantsFL401),
            },
            // {
            //   id: Tasks.CONTACT_PREFERENCES,
            //   href: (caseData: Partial<CaseWithId>) => `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/${caseData.id}`,
            //   disabled: isCaseClosed,
            //   stateTag: () => StateTags.SUBMITTED,
            // },
            {
              id: Tasks.SUPPORT_DURING_CASE,
              href: () => {
                return `${APPLICANT_ATTENDING_THE_COURT}`;
              },
              disabled: isCaseClosed,
              stateTag: (caseData) => getSupportYourNeedsDetails(caseData),
            },
          ],
        },
        {
          id: TaskListSection.YOUR_APPLICATION,
          content: getContents.bind(null, TaskListSection.YOUR_APPLICATION),
          tasks: [
            {
              id: Tasks.YOUR_APPLICATION_PDF,
              href: () => YOUR_APPLICATION_FL401,
              stateTag: () => StateTags.SUBMITTED,
              show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
            },
            {
              id: Tasks.YOUR_APPLICATION_WITNESS_STATEMENT,
              href: () => APPLICANT_WITNESS_STATEMENTS_DA,
              stateTag: (caseData) => getYourWitnessStatement(caseData),
              show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
            },
          ],
        },
        {
          id: TaskListSection.YOUR_HEARING,
          content: getContents.bind(null, TaskListSection.YOUR_HEARING),
          show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
          tasks: [
            {
              id: Tasks.VIEW_HEARING_DETAILS,
              href: (caseData: Partial<CaseWithId>) => hasAnyHearing(caseData)
              ? `${APPLICANT_YOURHEARINGS_HEARINGS}/${caseData.id}`
              : '#',
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
        {
          id: TaskListSection.YOUR_DOCUMENTS,
          content: getContents.bind(null, TaskListSection.YOUR_DOCUMENTS),
          show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
          tasks: [
            {
              id: Tasks.UPLOAD_DOCUMENTS,
              href: () => APPLICANT_UPLOAD_DOCUMENT_LIST_URL,
              show: isCaseLinked,
              disabled: isCaseClosed,
              stateTag: () => StateTags.TO_DO,
            },
            {
              id: Tasks.VIEW_ALL_DOCUMENTS,
              href: () => APPLICANT_VIEW_ALL_DOCUMENTS,
              stateTag: () => StateTags.READY_TO_VIEW,
              show: isCaseLinked,
            },
          ],
        },
        {
          id: TaskListSection.YOUR_ORDERS,
          content: getContents.bind(null, TaskListSection.YOUR_ORDERS),
          show: (caseData: Partial<CaseWithId>) => caseData && !isDraftCase(caseData),
          tasks: [
            {
              id: Tasks.VIEW_ORDERS,
              href: (caseData) => hasAnyOrder(caseData)?APPLICANT_ORDERS_FROM_THE_COURT:'#',
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
    ],
    [PartyType.RESPONDENT]: [],
  },
};

export const getTaskListConfig = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string,
  isRepresentedBySolicotor: boolean
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
                const config = prepareTaskListConfig(
                  task,
                  caseData,
                  userDetails,
                  _content,
                  language,
                  isRepresentedBySolicotor
                );

                prepareHintConfig(task, caseData, userDetails, config, _content);
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
const prepareTaskListConfig = (
  task: any,
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  _content: any,
  language: string,
  isRepresentedBySolicotor: boolean
) => {
  const stateTag = task.stateTag(caseData, userDetails);
  const _stateTagConfig = stateTagsConfig?.[stateTag];

  const config = {
    id: task.id,
    linkText: _content?.tasks[task.id]?.linkText,
    href: task.href(caseData, userDetails),
    disabled:
      task?.disabled && task.disabled instanceof Function
        ? task.disabled(caseData, userDetails) || isRepresentedBySolicotor
        : false,
    stateTag: {
      label: _stateTagConfig.label ? _stateTagConfig.label(language) : '',
      className: _stateTagConfig.className ? _stateTagConfig.className : '',
    },
  };
  return config;
};

const prepareHintConfig = (
  task: any,
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  config: { id: any; linkText: any; href: any; disabled: any; stateTag: { label: any; className: any } },
  _content: any
) => {
  if (task?.showHint && task.showHint instanceof Function && task.showHint(caseData, userDetails)) {
    Object.assign(config, {
      hintText: _content?.tasks[task.id]?.hintText,
    });
  }
};
const getKeepYourDetailsPrivateStatus=(keepDetailsPrivate)=> {
  let status = StateTags.TO_DO;
  if (keepDetailsPrivate?.confidentiality && keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = StateTags.COMPLETED;
  } else if (keepDetailsPrivate?.confidentiality || keepDetailsPrivate?.otherPeopleKnowYourContactDetails) {
    status = StateTags.IN_PROGRESS;
  }
  return status;
}
const getConfirmOrEditYourContactDetails = (
  party
) => {
  const status = StateTags.TO_DO;
  if (party.firstName && party.lastName && party.dateOfBirth && party.applicantsFL401?.placeOfBirth) {
    return StateTags.COMPLETED;
  }
  if (party.firstName || party.lastName || party.dateOfBirth || party.placeOfBirth) {
    return StateTags.IN_PROGRESS;
  }
  return status;
}
 const getSupportYourNeedsDetails = (userCase: CaseWithId): StateTags => {
  if (
    userCase?.languageRequirements?.length &&
    userCase?.reasonableAdjustments?.length &&
    userCase?.safetyArrangements?.length &&
    userCase?.attendingToCourt?.length
  ) {
    return StateTags.COMPLETED;
  }
  return StateTags.TO_DO;
};
 const getYourWitnessStatement = (userCase: CaseWithId): StateTags => {
  return userCase.citizenUploadedDocumentList?.find(
    document => document?.value?.documentType === 'Your witness statements'
  )
    ? StateTags.DOWNLOAD
    : StateTags.NOT_AVAILABLE_YET;
};
