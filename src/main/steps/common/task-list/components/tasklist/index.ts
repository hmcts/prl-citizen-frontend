import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { DocumentCategory } from '../../../../../steps/common/documents/definitions';
import { getDownloadDocUrl } from '../../../../../steps/common/documents/view/utils';
import { interpolate } from '../../../../../steps/common/string-parser';
import {
  HintConfig,
  HyperLinkConfig,
  PreparedTask,
  SectionContent,
  StateTagsConfig,
  Task,
  TaskListConfig,
  TaskListConfigProps,
} from '../../definitions';
import { hasResponseBeenReviewed, isC7ResponseSubmitted, isDraftCase } from '../../utils';

import tasklistConfig from './config/index';
import { StateTags, Tasks, getStateTagLabel } from './utils';

const stateTagsConfig: StateTagsConfig = {
  [StateTags.NOT_STARTED_YET]: {
    label: getStateTagLabel.bind(null, StateTags.NOT_STARTED_YET),
    className: 'govuk-tag--red',
  },
  [StateTags.IN_PROGRESS]: {
    label: getStateTagLabel.bind(null, StateTags.IN_PROGRESS),
    className: 'govuk-tag--yellow',
    //"govuk-tag--blue"
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
    className: 'govuk-tag--green',
  },
  [StateTags.TO_DO]: {
    label: getStateTagLabel.bind(null, StateTags.TO_DO),
    className: 'govuk-tag--grey',
  },
  [StateTags.DOWNLOAD]: {
    label: getStateTagLabel.bind(null, StateTags.DOWNLOAD),
    className: 'govuk-tag--green',
  },
  [StateTags.VIEW]: {
    label: getStateTagLabel.bind(null, StateTags.VIEW),
    className: 'govuk-tag--dark-blue',
  },
};

const taskListConfig: TaskListConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: tasklistConfig.CA_APPLICANT,
    [PartyType.RESPONDENT]: tasklistConfig.CA_RESPONDENT,
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: tasklistConfig.DA_APPLICANT,
    [PartyType.RESPONDENT]: tasklistConfig.DA_RESPONDENT,
  },
};

export const getTaskListConfig = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  partyType: PartyType,
  language: string
): TaskListConfigProps[] => {
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
          tasks: section
            .tasks(caseData, _content)
            .map(task => {
              if (!task.hasOwnProperty('show') || (task.show instanceof Function && task.show(caseData, userDetails))) {
                return {
                  ...prepareTaskListConfig(task, caseData, userDetails, _content, language, partyType),
                  ...prepareHintConfig(task, caseData, userDetails, _content),
                  ...prepareHyperLinkConfig(task, caseData, userDetails),
                };
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
  task: Task,
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  _content: SectionContent,
  language: string,
  partyType: PartyType
): PreparedTask => {
  const stateTag = task.stateTag(caseData, userDetails);
  const _stateTagConfig = stateTagsConfig?.[stateTag];

  if (
    stateTag === StateTags.IN_PROGRESS &&
    (caseData.caseTypeOfApplication !== 'C100' || partyType === PartyType.RESPONDENT)
  ) {
    _stateTagConfig.className = 'govuk-tag--blue';
  }

  const config = {
    id: task.id,
    linkText: task?.linkText ?? _content?.tasks[task.id]?.linkText,
    href: task.href(caseData, userDetails),
    disabled: _.isFunction(task?.disabled) ? task.disabled(caseData, userDetails) : false,
    stateTag: {
      label: _stateTagConfig.label ? _stateTagConfig.label(language) : '',
      className: _stateTagConfig.className ? _stateTagConfig.className : '',
    },
  };
  return config;
};

const prepareHintConfig = (
  task: Task,
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  _content: SectionContent
): HintConfig => {
  return {
    hintText:
      task?.showHint && task.showHint instanceof Function && task.showHint(caseData, userDetails)
        ? _content?.tasks[task.id]?.hintText
        : null,
  };
};

const prepareHyperLinkConfig = (
  task: Task,
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails
): HyperLinkConfig => {
  return {
    openInAnotherTab: _.isFunction(task.openInAnotherTab)
      ? task.openInAnotherTab(caseData, userDetails)
      : task.openInAnotherTab ?? false,
  };
};

export const generateTheResponseTasks = (caseData: Partial<CaseWithId>, content: SectionContent): Task[] => {
  const tasks: Task[] = [];

  caseData.respondents?.forEach((respondent, index) => {
    tasks.push({
      id: Tasks.THE_RESPONSE_PDF,
      linkText: interpolate(_.get(content, 'tasks.theResponsePDF.linkText', ''), {
        respondentPosition: `${index + 1}`,
      }),
      href: () => {
        if (!isC7ResponseSubmitted(respondent.value) || !hasResponseBeenReviewed(caseData, respondent)) {
          return '#';
        }
        const c7Document = caseData.respondentDocuments?.find(
          doc =>
            (doc.partyId === respondent.value.user.idamId || doc.solicitorRepresentedPartyId === respondent.id) &&
            doc.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION
        );
        return getDownloadDocUrl(c7Document!, PartyType.APPLICANT);
      },
      stateTag: () => {
        return isC7ResponseSubmitted(respondent.value) && hasResponseBeenReviewed(caseData, respondent)
          ? StateTags.READY_TO_VIEW
          : StateTags.NOT_AVAILABLE_YET;
      },
      show: () => caseData && !isDraftCase(caseData),
      disabled: () => {
        return !isC7ResponseSubmitted(respondent.value) || !hasResponseBeenReviewed(caseData, respondent);
      },
      openInAnotherTab: () => true,
    });
  });

  return tasks;
};
