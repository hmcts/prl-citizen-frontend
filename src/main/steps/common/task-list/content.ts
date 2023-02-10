import { TranslationFn } from '../../../app/controller/GetController';

import { getNotificationBannerConfig } from './components/notification-banner/utils';
import { getProgressBarConfig } from './components/progress-bar/utils';
import { getTaskListConfig } from './components/tasklist/utils';
import { getPartyName } from './utils';

const en = {
  title: 'Child arrangements and family injunction cases',
  caseNumber: 'Case number #',
};

const cy = {
  title: 'Child arrangements and family injunction cases - welsh',
  caseNumber: 'Case number # - welsh',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const partyType = request.params.partyType;

  const n = getTaskListConfig(caseData, partyType, content.language);
  return {
    ...translations,
    partyName: getPartyName(caseData, partyType, request.session.user),
    progressBar: getProgressBarConfig(caseData, partyType, content.language),
    notifications: getNotificationBannerConfig(caseData, partyType, content.language),
    taskLists: n,
  };
};
