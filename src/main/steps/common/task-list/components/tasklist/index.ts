/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import tasklistConfig from './config/index';
import { StateTags, getStateTagLabel } from './utils';

const stateTagsConfig = {
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
};

const taskListConfig = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: tasklistConfig.CA_APPLICANT,
    [PartyType.RESPONDENT]: [],
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: tasklistConfig.DA_APPLICANT,
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
