/* eslint-disable @typescript-eslint/no-shadow */
import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';

import { BannerNotification } from './components/notification-banner/utils';
import { CaseProgressionStage } from './components/progress-bar/utils';
import { StateTags, TaskListSection, Tasks } from './components/tasklist/utils';

export type StateTagsConfig = {
  [key in StateTags]: StateTagsProps;
};

type StateTagsProps = {
  label: (StateTags) => string;
  className: string;
};

export type TaskListConfig = {
  [key in CaseType]: {
    [key in PartyType]?: TaskListConfigProps[];
  };
};

export type TaskListConfigProps = {
  id: TaskListSection;
  content: (caseType: CaseType, partyType: PartyType, language: string) => TaskListContent;
  show?: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => boolean;
  tasks: (caseData: Partial<CaseWithId>, content: SectionContent) => Task[];
};

export type TaskListContent = {
  stateTags: {
    [key in StateTags]: string;
  };
} & {
  [key in CaseType]: {
    [key in PartyType]?: {
      [key in TaskListSection]?: SectionContent;
    };
  };
};

export type SectionContent = {
  heading: string;
  tasks: {
    [key in Tasks]?: {
      linkText: string;
      hintText?: string;
    };
  };
};

export type Task = {
  id: Tasks;
  linkText?: string;
  href: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => string | null;
  stateTag: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => StateTags;
  show?: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => boolean;
  disabled?: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => boolean;
  showHint?: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => boolean;
  openInAnotherTab?: boolean;
};

export type PreparedTask = {
  id: Tasks;
  linkText?: string;
  href: string | null | undefined;
  stateTag: PreparedStateTag;
  show?: boolean;
  disabled?: boolean;
};

export type HintConfig = {
  hintText: string | null | undefined;
};

export type HyperLinkConfig = {
  openInAnotherTab: boolean | undefined;
};

type PreparedStateTag = {
  label: string;
  className: string;
};

export type NotificationBannerConfig = {
  [key in CaseType]: {
    [key in PartyType]?: NotificationBannerProps[];
  };
};

export type NotificationBannerProps = {
  id: BannerNotification;
  content?: (caseType: CaseType, language: string, partyType: PartyType) => NotificationBannerContent;
  show?: (caseData: Partial<CaseWithId>, userDetails: UserDetails) => boolean;
};

export type NotificationBannerContent = {
  title: string;
} & {
  [key in CaseType]: {
    [key in PartyType]?: {
      notifications: {
        [key in BannerNotification]?: NotificationContent;
      };
    };
  };
};

type NotificationContent = {
  heading: string;
  sections: NotificationSection[];
};

export type NotificationSection = {
  contents: {
    text: string;
    show?: (caseData: Partial<CaseWithId>) => boolean;
    html?: string;
  }[];
  links?: {
    text: string;
    href?: string;
    show?: (caseData: Partial<CaseWithId>) => boolean;
    external?: boolean;
  }[];
};

export type ProgressBarConfig = {
  [key in CaseType]: {
    [key in PartyType]?: ProgressBarProps[];
  };
};

export type ProgressBarProps = {
  id: CaseProgressionStage | undefined;
  label: (caseType: CaseType, language: string) => string;
  ariaLabel: (caseType: CaseType, language: string) => string;
  isComplete: (caseData: Partial<CaseWithId>, UserDetails: UserDetails) => boolean;
  isInProgress: (caseData: Partial<CaseWithId>, UserDetails: UserDetails) => boolean;
};
