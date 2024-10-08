import { TranslationFn } from '../../../app/controller/GetController';

import { DASHBOARD_URL } from './../../urls';
import { getNotifications } from './components/notification-banner/index';
import { getProgressBarConfig } from './components/progress-bar/index';
import { getQuickLinks } from './components/side-links';
import { getTaskListConfig } from './components/tasklist/index';
import { getPartyName } from './utils';

const en = {
  title: 'Child arrangements and family injunction cases',
  caseNumber: 'Case number ',
  iWantTo: 'I want to...',
};

const cy = {
  title: 'Trefniadau plant a gwaharddebau teulu',
  caseNumber: 'Rhif yr achos ',
  iWantTo: 'Rwyf eisiau...',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const userDetails = request.session.user;
  const partyType = request.params.partyType;

  return {
    ...translations,
    breadcrumbs: [
      {
        id: 'home',
        href: DASHBOARD_URL,
      },
    ],
    partyName: getPartyName(caseData, partyType, userDetails),
    progressBar: request.session.enableCaseTrainTrack
      ? getProgressBarConfig(caseData, partyType, content.language, userDetails)
      : [],
    notifications: getNotifications(caseData, userDetails, partyType, content.language),
    taskLists: getTaskListConfig(caseData, userDetails, partyType, content.language),
    quickLinks: getQuickLinks(caseData, userDetails, partyType, content.language),
  };
};
